// src/hooks/useChatMessages.tsx
import { useState } from "react";

export interface ChatMessage {
    id: string;
    text: string;
    timestamp: number;
    sender: "user" | "ai";
}

export const useChatMessages = () => {
    // ❌ Removed demo messages
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const addMessage = (text: string, sender: "user" | "ai" = "user") => {
        const newMessage: ChatMessage = {
            id: crypto.randomUUID(),
            text,
            sender,
            timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, newMessage]);
        return newMessage;
    };

    return { messages, addMessage };
};
