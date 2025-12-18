// ./hooks/useFlowdata.ts
import { useState, useEffect } from "react";
import type { Node, Edge } from "reactflow";

type AIResult = {
  architecture: string;
  diagram?: string;
  structure?: string[];
  deployment?: string;
  risks?: string;
  tech_stack: string[];
};

export function useFlowData() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const updateFlowFromAI = (result: AIResult) => {
    const { tech_stack } = result;

    if (!tech_stack || tech_stack.length === 0) return;

    const newNodes: Node[] = tech_stack.map((tech, index) => ({
      id: `tech-${index}`,
      position: { x: 100 + index * 220, y: 150 },
      data: { label: tech },
      type: "default",
    }));

    const newEdges: Edge[] = tech_stack.slice(0, -1).map((_, index) => ({
      id: `e-${index}`,
      source: `tech-${index}`,
      target: `tech-${index + 1}`,
      animated: true,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  };

  // 👇 Load Demo Tech Stack on First Render
  useEffect(() => {
    updateFlowFromAI({
      architecture: "Demo architecture",
      tech_stack: ["React", "Node.js", "Express", "MongoDB"],
    });
  }, []);

  return { nodes, edges, updateFlowFromAI };
}
