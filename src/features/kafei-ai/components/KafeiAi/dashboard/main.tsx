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

const nodeTypes = { infoNode: InfoNode };

const KafeiDashboard: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, updateFlowFromAI } =
    useFlowData();
  const { messages, addMessage } = useChatMessages();

  const [aiText, setAiText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Conversation state for step-by-step collection
  type ConversationStep =
    | "idle"
    | "awaiting_project_name"
    | "awaiting_description"
    | "awaiting_tech_stack"
    | "awaiting_requirements"
    | "awaiting_use_case";

  const [conversationStep, setConversationStep] =
    useState<ConversationStep>("idle");

  // Collected project data (using useRef for synchronous updates)
  const projectDataRef = useRef({
    project_name: "",
    description: "",
    tech_stack: "",
    requirements: "",
    use_case: "",
  });

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
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "kafei-project.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 🔥 CONVERSATIONAL STEP-BY-STEP PROJECT COLLECTION
  const sendMessage = () => {
    if (!aiText.trim()) return;

    const userMsg = aiText.trim();
    addMessage(userMsg, "user");
    setAiText("");

    const lower = userMsg.toLowerCase();

    // ------------------------------------
    // HANDLE CONVERSATION FLOW
    // ------------------------------------
    // ... (rest of function)

    // If we're in a conversation flow, collect the data step by step
    if (conversationStep === "awaiting_project_name") {
      projectDataRef.current.project_name = userMsg;
      setConversationStep("awaiting_description");
      addMessage(
        "Great! 📝\n\nNow, could you describe your project? What does it do?",
        "ai"
      );
      return;
    }

    if (conversationStep === "awaiting_description") {
      projectDataRef.current.description = userMsg;
      setConversationStep("awaiting_tech_stack");
      addMessage(
        "Perfect! 🛠️\n\nWhat tech stack would you like to use?\n(For example: React, Node.js, PostgreSQL - or type 'skip' if you want me to choose)",
        "ai"
      );
      return;
    }

    if (conversationStep === "awaiting_tech_stack") {
      const techStack = lower === "skip" ? "" : userMsg;
      projectDataRef.current.tech_stack = techStack;
      setConversationStep("awaiting_requirements");
      addMessage(
        "Got it! 📌\n\nAre there any specific requirements or features you need?\n(Or type 'skip' to continue)",
        "ai"
      );
      return;
    }

    if (conversationStep === "awaiting_requirements") {
      const requirements = lower === "skip" ? "" : userMsg;
      projectDataRef.current.requirements = requirements;
      setConversationStep("awaiting_use_case");
      addMessage(
        "Almost done! 🎯\n\nWhat's the main use case or purpose of this project?\n(Or type 'skip' to finish)",
        "ai"
      );
      return;
    }

    if (conversationStep === "awaiting_use_case") {
      const useCase = lower === "skip" ? "" : userMsg;
      projectDataRef.current.use_case = useCase;

      // Build the complete data object with ALL accumulated fields from ref
      const finalData = {
        project_name: projectDataRef.current.project_name,
        description: projectDataRef.current.description,
        tech_stack: projectDataRef.current.tech_stack,
        requirements: projectDataRef.current.requirements,
        use_case: projectDataRef.current.use_case,
      };

      // Reset conversation state
      setConversationStep("idle");
      projectDataRef.current = {
        project_name: "",
        description: "",
        tech_stack: "",
        requirements: "",
        use_case: "",
      };

      // Generate architecture with collected data
      generateArchitecture(finalData);
      return;
    }

    // ------------------------------------
    // DETECT IF USER WANTS TO START PROJECT CREATION
    // ------------------------------------
    const architectureKeywords = [
      "create",
      "build",
      "make",
      "generate",
      "design",
      "develop",
      "architecture",
      "system",
      "app",
      "application",
      "website",
      "platform",
      "project",
      "service",
      "new project",
      "start project",
    ];

    const isArchitectureRequest = architectureKeywords.some((keyword) =>
      lower.includes(keyword)
    );

    if (isArchitectureRequest) {
      // Start the conversation flow
      setConversationStep("awaiting_project_name");
      projectDataRef.current = {
        project_name: "",
        description: "",
        tech_stack: "",
        requirements: "",
        use_case: "",
      };
      addMessage(
        "Awesome! Let's create your project architecture! 🚀\n\nFirst, what's the name of your project?",
        "ai"
      );
      return;
    }

    // ------------------------------------
    // HANDLE GREETINGS
    // ------------------------------------
    if (["hi", "hello", "hey", "hi!", "hello!", "hey!"].includes(lower)) {
      addMessage(
        "Hello! 👋 I'm Kafei AI, your architecture assistant.\n\n🏗️ I can help you generate system architectures for your projects!\n\nJust say 'create a project' or 'build an app' and I'll guide you through it step by step!",
        "ai"
      );
      return;
    }

    if (lower.includes("how are you")) {
      addMessage(
        "I'm doing great! Ready to help you design amazing projects 😊\n\nWant to build something? Just let me know!",
        "ai"
      );
      return;
    }

    // HANDLE OTHER QUESTIONS

    addMessage(
      "I'm here to help you create project architectures! 🏗️\n\nTo get started, just say:\n• 'Create a new project'\n• 'Build an app'\n• 'Generate architecture'\n\nI'll guide you through the process step by step!",
      "ai"
    );
  };

  // Function to generate architecture
  const generateArchitecture = (data: {
    project_name: string;
    description: string;
    tech_stack: string;
    requirements: string;
    use_case: string;
  }) => {
    addMessage(
      `🤔 Generating architecture for "${data.project_name}"...`,
      "ai"
    );

    // Prepare request body
    const tech_stack_array = data.tech_stack
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0);

    const requestBody = {
      project_name: data.project_name.trim(),
      description: data.description.trim(),
      tech_stack: tech_stack_array,
      requirements: data.requirements.trim() || data.description.trim(),
      use_case: data.use_case.trim() || data.description.trim(),
      generate_zip: true,
    };

    fetch("/generate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.detail || `Server error: ${res.status}`);
        }

        return data;
      })
      .then((apiResponse) => {
        addMessage("✅ Architecture generated successfully!", "ai");

        // Use the data we sent (requestBody) since API doesn't return these fields
        const formattedResponse = `
📋 **Project Name:** ${requestBody.project_name || "N/A"}

📝 **Description:** ${requestBody.description || "N/A"}

🛠️ **Tech Stack:**
${
  requestBody.tech_stack?.map((tech: string) => `  • ${tech}`).join("\n") ||
  "  • None specified"
}

📌 **Requirements:** ${requestBody.requirements || "N/A"}

🎯 **Use Case:** ${requestBody.use_case || "N/A"}
        `.trim();

        addMessage(formattedResponse, "ai");

        if (apiResponse.result) {
          updateFlowFromAI(apiResponse.result);
          if (apiResponse.result.download_url) {
            setDownloadUrl(apiResponse.result.download_url);
          }
        }
      })
      .catch((error) => {
        console.error("Generate API Error:", error);

        let errorMessage = "❌ Failed to generate architecture.";

        if (error.message.includes("API key not valid")) {
          errorMessage +=
            "\n\n⚠️ Backend API key issue: The Gemini API key is invalid or missing. Please check your backend configuration.";
        } else if (error.message.includes("Generation failed")) {
          errorMessage +=
            "\n\n⚠️ The AI service encountered an error. Please try again or contact support.";
        } else {
          errorMessage += `\n\n🔍 Error: ${error.message}`;
        }

        addMessage(errorMessage, "ai");
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
    <DashboardLayout>
      <div className="flex flex-row w-full h-full overflow-hidden">
        {/* LEFT CHAT PANEL - MODERN "STRUCTURED" DESIGN */}
        <div className="w-full md:w-[30%] h-full flex flex-col relative z-10 bg-gray-50 rounded-lg dark:bg-black border-r border-gray-200 dark:border-white/5">
          {/* Header */}
          <div className="px-6 py-5 flex items-center justify-between bg-white/50 dark:bg-black/50 backdrop-blur-sm flex-shrink-0 z-20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
              <span className="font-semibold text-sm tracking-tight text-gray-900 dark:text-white">
                Assistant
              </span>
            </div>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-2 hide-scrollbar scroll-smooth">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-3 px-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Welcome to Kafei AI
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
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
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center overflow-hidden">
                              <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              </svg>
                            </div>
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
                                ? "bg-black dark:bg-white text-white dark:text-black rounded-2xl rounded-tr-none"
                                : "bg-white dark:bg-[#111] text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-white/10 rounded-2xl rounded-tl-none"
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
              </div>
            )}
          </div>

          {/* FLOATING ISLAND INPUT */}
          <div className="flex-shrink-0 px-4 pt-2 pb-3 z-30">
            <div className="bg-white dark:bg-[#111] rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 dark:border-white/10 p-1.5 flex items-center gap-2 transition-all duration-300 focus-within:shadow-[0_8px_40px_rgb(0,0,0,0.2)] focus-within:scale-[1.01]">
              <div className="pl-4 flex-1">
                <textarea
                  ref={textareaRef}
                  value={aiText}
                  onChange={(e) => setAiText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your architecture..."
                  rows={1}
                  className="w-full bg-transparent text-sm font-medium text-gray-800 dark:text-gray-200 placeholder-gray-400 outline-none resize-none py-2.5"
                  style={{ minHeight: "40px", maxHeight: "120px" }}
                />
              </div>

              <button
                onClick={sendMessage}
                disabled={!aiText.trim()}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  aiText.trim()
                    ? "bg-black dark:bg-white text-white dark:text-black shadow-md scale-100"
                    : "bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-white/20 scale-90"
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
            <div className="relative w-full h-full bg-slate-50 dark:bg-black/20 rounded-xl overflow-hidden shadow-inner border border-white/20">
              {/* Top toolbar with toggle */}
              <div className="absolute top-2 right-2 z-50 flex items-center gap-3">
                {/* Download Button */}
                <AnimatePresence>
                  {downloadUrl && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={handleDownload}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-1.5 rounded-full shadow-lg shadow-purple-500/30 transition-all font-medium text-xs tracking-wide border border-white/20"
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
                      Download Project
                    </motion.button>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/20 shadow-sm">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {showGraph ? "Graph View" : "Doc View"}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={!showGraph}
                      onChange={() => setShowGraph((s) => !s)}
                    />
                    <span
                      className={`w-10 h-5 border-2 ${
                        !showGraph
                          ? "bg-gray-200 border-gray-300"
                          : "bg-purple-500/10 border-purple-500"
                      } rounded-full transition-all duration-300 ease-out`}
                    >
                      <span
                        className={`block w-3 h-3 rounded-full transform transition-all duration-300 ease-out absolute top-1 left-1 ${
                          !showGraph
                            ? "translate-x-5 bg-gray-400"
                            : "translate-x-0 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        }`}
                      />
                    </span>
                  </label>
                </div>
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
                <div className="w-full h-full flex items-center justify-center bg-gray-50/50 dark:bg-black/20 backdrop-blur-sm">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl text-gray-400">📄</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      Documentation View
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ReactFlowProvider>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KafeiDashboard;
