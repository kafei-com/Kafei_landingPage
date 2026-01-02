import { useState } from "react";
import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";

interface InfoNodeData {
  label: string;
  icon?: string;
  description?: string;
  role?: string;
  fullPath?: string;
}

interface InfoNodeProps {
  data: InfoNodeData;
}

const InfoNode = ({ data }: InfoNodeProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.3, type: "spring" } }}
      onClick={() => setExpanded(!expanded)}
      className={`bg-white dark:bg-[#1a1a1a] shadow-lg hover:shadow-xl rounded-2xl border border-gray-200 dark:border-white/10 p-0 relative cursor-pointer overflow-hidden group transition-colors duration-300 ${
        expanded ? "w-80 z-50 ring-2 ring-purple-500/20" : "w-60"
      }`}
    >
      {/* Target Handle (Input) - Top */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-white dark:!border-[#1a1a1a] !-top-1.5 !left-1/2 !-translate-x-1/2 transition-all group-hover:!bg-purple-400"
      />

      {/* Main Content Container */}
      <div className="p-4">
        {/* Header Row */}
        <motion.div
          layout="position"
          className="flex items-start justify-between gap-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            {data.icon ? (
              <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center p-1.5 shrink-0 border border-gray-100 dark:border-white/10">
                <img
                  src={data.icon}
                  className="w-full h-full object-contain"
                  alt="icon"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 flex items-center justify-center shrink-0 border border-purple-500/10 text-purple-600 dark:text-purple-300 text-sm font-bold">
                {data.label.slice(0, 2).toUpperCase()}
              </div>
            )}

            <div className="flex flex-col min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base leading-tight truncate">
                {data.label}
              </h3>
              {data.role && (
                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-0.5">
                  {data.role}
                </span>
              )}
            </div>
          </div>

          {/* Chevron Indicator */}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            className={`text-gray-400 dark:text-gray-500 shrink-0 mt-2 transition-colors ${
              expanded ? "text-purple-500 dark:text-purple-400" : ""
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10 space-y-3"
            >
              {/* Description */}
              {data.description && (
                <div className="group/item">
                  <div className="flex items-center gap-2 mb-1.5 text-gray-400 dark:text-gray-500">
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
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      Description
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pl-5.5 border-l-2 border-gray-100 dark:border-white/5">
                    {data.description}
                  </p>
                </div>
              )}

              {/* Path Info */}
              {data.fullPath && (
                <div className="group/item">
                  <div className="flex items-center gap-2 mb-1.5 text-gray-400 dark:text-gray-500">
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
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      Source Path
                    </span>
                  </div>
                  <div className="bg-gray-50 dark:bg-black/40 rounded-lg p-2 border border-gray-100 dark:border-white/5 font-mono text-[11px] text-gray-500 dark:text-gray-400 break-all leading-tight">
                    {data.fullPath}
                  </div>
                </div>
              )}

              {/* Empty state if no extra info */}
              {!data.description && !data.fullPath && (
                <p className="text-xs text-gray-400 italic text-center py-2">
                  No additional details available.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Color Bar (Decoration) */}
      <div
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 transform origin-left transition-transform duration-300 ${
          expanded ? "scale-x-100" : "scale-x-0"
        }`}
      />

      {/* Source Handle (Output) - Bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-white dark:!border-[#1a1a1a] !-bottom-1.5 !left-1/2 !-translate-x-1/2 transition-all group-hover:!bg-purple-400"
      />
    </motion.div>
  );
};

export default InfoNode;
