import React, { useState, useRef, useEffect } from "react";
import DashboardLayout from "./layout";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { AnimatePresence, motion } from "framer-motion";
import { useFlowData } from "./hooks/useFlowdata";
import { useChatMessages } from "./hooks/useChatMessages";
import InfoNode from "../InfoNode";
import CompactAnimatedSphere from "@/components/ui/CompactAnimatedSphere";
import { useDarkMode } from "./useDarkMode";

const nodeTypes = { infoNode: InfoNode };

// Inner component that uses the dark mode context (must be inside DarkModeProvider)
const DashboardContent: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange } = useFlowData();
  const { messages, addMessage } = useChatMessages();

  const [aiText, setAiText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto resize textarea
  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = el.scrollHeight + "px";
  };

  useEffect(() => {
    autoResize();
  }, [aiText]);

  // Auto scroll chat to bottom
  const chatRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Right panel toggle: show/hide graph
  const [showGraph, setShowGraph] = useState(false);
  const [downloadUrl] = useState<string | null>(null);

  // Use shared dark mode context
  const { isDarkMode } = useDarkMode();

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "kafei-project.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Send message to backend API
  const sendMessage = () => {
    if (!aiText.trim()) return;

    const userMsg = aiText.trim();
    addMessage(userMsg, "user");
    setAiText("");

    // All messages go through the backend /chat/ API
    handleNormalChat(userMsg);
  };

  // Function to handle normal conversation via /chat/ API
  const handleNormalChat = (message: string) => {
    setIsLoading(true);

    fetch("/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.detail || `Server error: ${res.status}`);
        }

        return data;
      })
      .then((response) => {
        // Remove the "Thinking..." message and add the actual response
        // The response structure depends on your API, adjust as needed
        setIsLoading(false);
        const aiResponse =
          response.reply ||
          response.response ||
          response.message ||
          response.text ||
          "I received your message!";

        addMessage(aiResponse, "ai");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Chat API Error:", error);
        addMessage(`Failed to get response: ${error.message}`, "ai");
      });
  };

  // Enter key sends message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={`flex flex-row w-full h-full overflow-hidden ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* LEFT CHAT PANEL - MODERN "STRUCTURED" DESIGN */}
      <div
        className={`w-full md:w-[30%] h-full flex flex-col relative z-10 rounded-lg border-r ${
          isDarkMode ? "bg-black border-white/5" : "bg-gray-50 border-gray-200"
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-5 flex items-center justify-between backdrop-blur-sm flex-shrink-0 z-20 ${
            isDarkMode ? "bg-black/50" : "bg-white/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
            <span
              className={`font-semibold text-sm tracking-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Assistant
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-2 hide-scrollbar scroll-smooth">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3 px-6">
                <div className="w-16 h-16 mx-auto flex items-center justify-center">
                  <CompactAnimatedSphere />
                </div>
                <h3
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Welcome to Kafei AI
                </h3>
                <p
                  className={`text-sm max-w-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Start a conversation to generate your project architecture.
                  Just describe what you want to build!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 pt-4 pb-20">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";

                return (
                  <div
                    key={msg.id}
                    className={`flex w-full ${
                      isUser ? "justify-end" : "justify-start"
                    } animate-in slide-in-from-bottom-2 duration-500`}
                  >
                    <div
                      className={`flex gap-3 max-w-[85%] ${
                        isUser ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Avatar Area */}
                      <div className="flex-shrink-0 mt-1">
                        {isUser ? (
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
                              isDarkMode ? "bg-white/10" : "bg-gray-200"
                            }`}
                          >
                            <svg
                              className={`w-4 h-4 ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                        ) : (
                          <CompactAnimatedSphere />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`flex flex-col ${
                          isUser ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`px-5 py-3.5 text-[14px] leading-relaxed shadow-sm ${
                            isUser
                              ? isDarkMode
                                ? "bg-white text-black rounded-2xl rounded-tr-none"
                                : "bg-black text-white rounded-2xl rounded-tr-none"
                              : isDarkMode
                              ? "bg-[#111] text-gray-200 border border-white/10 rounded-2xl rounded-tl-none"
                              : "bg-white text-gray-700 border border-gray-100 rounded-2xl rounded-tl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                        {/* Timestamp or Label (Optional) */}
                        <span className="text-[10px] text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity px-1">
                          {isUser ? "You" : "Kafei AI"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatRef} />
              {/* Animated Thinking Dots */}
              {isLoading && (
                <div className="flex w-full justify-start animate-in slide-in-from-bottom-2 duration-500">
                  <div className="flex gap-3 max-w-[85%] flex-row">
                    <div className="flex-shrink-0 mt-1">
                      <CompactAnimatedSphere />
                    </div>
                    <div className="flex flex-col items-start">
                      <div
                        className={`px-5 py-3.5 border rounded-2xl rounded-tl-none shadow-sm ${
                          isDarkMode
                            ? "bg-[#111] border-white/10"
                            : "bg-white border-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></span>
                          <span
                            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></span>
                          <span
                            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* FLOATING ISLAND INPUT */}
        <div className="flex-shrink-0 px-4 pt-2 pb-3 z-30">
          <div
            className={`rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border p-1.5 flex items-center gap-2 transition-all duration-300 focus-within:shadow-[0_8px_40px_rgb(0,0,0,0.2)] focus-within:scale-[1.01] ${
              isDarkMode
                ? "bg-[#111] border-white/10"
                : "bg-white border-gray-100"
            }`}
          >
            {/* Animated Sphere */}
            <div className="ml-1">
              <CompactAnimatedSphere />
            </div>
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={aiText}
                onChange={(e) => setAiText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your architecture..."
                rows={1}
                className="w-full bg-transparent text-sm font-medium placeholder-gray-400 outline-none resize-none py-2.5 text-gray-800"
                style={{ minHeight: "40px", maxHeight: "120px" }}
              />
            </div>

            <button
              onClick={sendMessage}
              disabled={!aiText.trim()}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                aiText.trim()
                  ? isDarkMode
                    ? "bg-white text-black shadow-md scale-100"
                    : "bg-black text-white shadow-md scale-100"
                  : isDarkMode
                  ? "bg-white/5 text-white/20 scale-90"
                  : "bg-gray-100 text-gray-300 scale-90"
              }`}
            >
              <svg
                className="w-4 h-4 transform rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 19V5m0 0l-7 7m7-7l7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT FLOW PANEL */}
      <div className="w-full md:w-[70%] h-full hidden md:block p-1">
        <ReactFlowProvider>
          <div
            className={`relative w-full h-full rounded-xl overflow-hidden shadow-inner border border-white/20 ${
              isDarkMode ? "bg-black/20" : "bg-slate-50"
            }`}
          >
            {/* Dynamic Island Navbar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Glow effect behind the island */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                {/* Main Dynamic Island Container */}
                <motion.div
                  layout
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-full border backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out ${
                    isDarkMode
                      ? "bg-black/80 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
                      : "bg-white/90 border-gray-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.5)]"
                  } hover:scale-[1.02]`}
                >
                  {/* Navbar Buttons */}
                  <div className="flex items-center relative">
                    {/* Graph Button */}
                    <button
                      onClick={() => setShowGraph(true)}
                      className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                        showGraph
                          ? "text-white"
                          : isDarkMode
                          ? "text-gray-400 hover:text-gray-200"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {showGraph && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute inset-0 bg-gray-600 rounded-full shadow-lg shadow-gray-600/30"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">Graph</span>
                    </button>

                    {/* Doc Button */}
                    <button
                      onClick={() => setShowGraph(false)}
                      className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                        !showGraph
                          ? "text-white"
                          : isDarkMode
                          ? "text-gray-400 hover:text-gray-200"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {!showGraph && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute inset-0 bg-gray-600 rounded-full shadow-lg shadow-gray-600/30"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">Doc</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <AnimatePresence>
                    {downloadUrl && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 1 }}
                        exit={{ opacity: 0, width: 0 }}
                        className={`h-4 ${
                          isDarkMode ? "bg-white/20" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </AnimatePresence>

                  {/* Download Button - Expands the island */}
                  <AnimatePresence>
                    {downloadUrl && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8, width: 0 }}
                        animate={{ opacity: 1, scale: 1, width: "auto" }}
                        exit={{ opacity: 0, scale: 0.8, width: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        onClick={handleDownload}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 font-medium text-xs tracking-wide overflow-hidden whitespace-nowrap ${
                          isDarkMode
                            ? "bg-white/10 hover:bg-white/20 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }`}
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        <span>Download</span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </div>

            {showGraph ? (
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                proOptions={{ hideAttribution: true }}
                className="w-full h-full"
                fitView
                nodesDraggable={true}
                nodesConnectable={false}
                elementsSelectable={true}
              >
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={20}
                  size={2}
                  color="#000000"
                />
              </ReactFlow>
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center backdrop-blur-sm ${
                  isDarkMode ? "bg-black/20" : "bg-gray-50/50"
                }`}
              >
                <div className="text-center space-y-3">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                      isDarkMode ? "bg-white/5" : "bg-gray-200"
                    }`}
                  >
                    <span className="text-2xl text-gray-400">📄</span>
                  </div>
                  <p
                    className={`font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Documentation View
                  </p>
                </div>
              </div>
            )}
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

// Wrapper component that provides the layout with DarkModeProvider
const KafeiDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
};

export default KafeiDashboard;
