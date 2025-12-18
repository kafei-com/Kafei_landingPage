import React, { useState, useRef, useEffect } from "react";
import DashboardLayout from "./layout";
import ReactFlow, {
    ReactFlowProvider,
    Background,
    BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { Plus } from "lucide-react";
import { useFlowData } from "./hooks/useFlowdata";
import { useChatMessages } from "./hooks/useChatMessages";
import InfoNode from "../InfoNode";

const KafeiDashboard: React.FC = () => {
    const { nodes, edges, updateFlowFromAI } = useFlowData();
    const { messages, addMessage } = useChatMessages();

    const [aiText, setAiText] = useState("");
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

    // 🔥 FINAL AI LOGIC + JSON LOADER
    const sendMessage = () => {
        if (!aiText.trim()) return;

        const userMsg = aiText.trim();
        addMessage(userMsg, "user");
        setAiText("");

        const lower = userMsg.toLowerCase();

        // ------------------------------------
        // 1️⃣ SIMPLE AI RESPONSES
        // ------------------------------------
        if (["hi", "hello", "hey"].includes(lower)) {
            addMessage("Hello! How can I help you today?", "ai");
            return;
        }

        if (lower.includes("how are you")) {
            addMessage("I'm doing great! Ready to help you build system architectures 😊", "ai");
            return;
        }

        // ------------------------------------
        // 2️⃣ CHECK IF USER WANTS ARCHITECTURE
        // ------------------------------------
        const keywords = ["architecture", "flow", "diagram", "tech", "stack", "project"];
        const isArchitectureQuery = keywords.some((word) => lower.includes(word));

        if (!isArchitectureQuery) {
            addMessage(
                "I'm not fully trained yet 🤖. But I can generate system architecture if you ask! Try saying: \"Create an eCommerce architecture\"",
                "ai"
            );
            return;
        }

        // ------------------------------------
        // 3️⃣ FETCH ARCHITECTURE JSON
        // ------------------------------------
        fetch("/demo-response.json")
            .then((res) => res.json())
            .then((data) => {
                addMessage("Here is the architecture I generated:", "ai");

                // Show readable architecture (not raw JSON)
                addMessage(data.result.architecture, "ai");

                // Update React Flow diagram
                updateFlowFromAI(data.result);
            })
            .catch((error) => {
                addMessage("Error loading architecture data.", "ai");
                console.error(error);
            });
    };

    // Enter key sends message
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Dropdown logic
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                showMenu &&
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                !buttonRef.current?.contains(e.target as Node)
            ) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [showMenu]);

    return (
        <DashboardLayout>
            <div className="flex flex-row w-full h-full p-5">

                {/* LEFT CHAT PANEL */}
                <div className="w-[40%] h-full rounded-xl bg-[#e9eeea] dark:bg-[#1f1f1f]">
                    <div className="px-1 py-0 h-full flex flex-col">

                        {/* CHAT DISPLAY */}
                        <div
                            ref={chatRef}
                            className="flex-1 overflow-y-auto space-y-3 hide-scrollbar"
                        >
                            {messages.map((msg) => {
                                const isUser = msg.sender === "user";

                                return (
                                    <div
                                        key={msg.id}
                                        className={`flex w-full ${
                                            isUser ? "justify-end" : "justify-start"
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[80%] px-4 py-2 rounded-2xl text-[15px] leading-relaxed shadow ${
                                                isUser
                                                    ? "bg-black text-white dark:bg-white dark:text-black rounded-br-none"
                                                    : "bg-gray-200 dark:bg-[#2f2f2f] text-black dark:text-white rounded-bl-none"
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* INPUT BAR */}
                        <div className="w-full mt-3">
                            <div className="relative w-full bg-white dark:bg-[#2f2f2f] rounded-3xl p-3 flex items-end shadow-lg">

                                {/* PLUS BUTTON */}
                                <button
                                    ref={buttonRef}
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/20 flex items-center justify-center text-black dark:text-white"
                                >
                                    <Plus className="w-6 h-6" />
                                </button>

                                {/* TEXTAREA */}
                                <textarea
                                    ref={textareaRef}
                                    value={aiText}
                                    onChange={(e) => setAiText(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask Kafei AI…"
                                    rows={1}
                                    className="flex-1 min-h-[24px] max-h-[200px] w-full bg-transparent text-black dark:text-white text-[16px] leading-[22px] resize-none outline-none overflow-hidden whitespace-pre-wrap break-words ml-3 mr-3 pt-[10px] pb-[12px]"
                                />

                                {/* SEND BUTTON */}
                                <button
                                    onClick={sendMessage}
                                    className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-md"
                                >
                                    <span className="text-white dark:text-black text-xl">↑</span>
                                </button>

                                {/* DROPDOWN MENU */}
                                {showMenu && (
                                    <div
                                        ref={menuRef}
                                        className="absolute bottom-16 left-3 bg-white text-black w-40 rounded-xl shadow-lg border p-2 z-50"
                                    >
                                        <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                                            Create Node
                                        </button>
                                        <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                                            Create Group
                                        </button>
                                        <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                                            Upload File
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT FLOW PANEL */}
                <div className="w-full md:w-[70%] h-full hidden md:block p-1">
                    <ReactFlowProvider>
                        <ReactFlow nodes={nodes} edges={edges} nodeTypes={{ infoNode: InfoNode }}>
                            <Background variant={BackgroundVariant.Dots} gap={20} size={2} />
                        </ReactFlow>
                    </ReactFlowProvider>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default KafeiDashboard;
