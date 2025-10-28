"use client";
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { AiOutlineClose, AiOutlineLoading3Quarters, AiOutlineThunderbolt } from 'react-icons/ai';
import { FiClock, FiDatabase } from 'react-icons/fi';
import { HiLightBulb } from 'react-icons/hi';

interface AnalysisPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  isLoading: boolean;
  type: 'complexity' | 'suggestions' | 'optimize';
}

const AnalysisPopup = ({ isOpen, onClose, title, content, isLoading, type }: AnalysisPopupProps) => {
  if (!isOpen) return null;

  const getIcon = () => {
    if (type === 'complexity') {
      return <FiClock className="text-3xl" />;
    }
    if (type === 'optimize') {
      return <AiOutlineThunderbolt className="text-3xl" />;
    }
    return <HiLightBulb className="text-3xl" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl border border-blue-200 dark:border-gray-700 overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 px-6 py-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              {getIcon()}
            </div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 group"
            aria-label="Close"
          >
            <AiOutlineClose className="text-2xl text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <AiOutlineLoading3Quarters className="text-6xl text-blue-600 dark:text-blue-400 animate-spin" />
              <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                Analyzing your code with AI...
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This may take a few seconds
              </p>
            </div>
          ) : content ? (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b-2 border-blue-500" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-6 mb-3 flex items-center gap-2" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mt-4 mb-2" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-4 ml-4" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-gray-700 dark:text-gray-300" {...props} />
                  ),
                  code: ({ node, inline, ...props }: any) =>
                    inline ? (
                      <code className="px-2 py-1 bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-300 rounded font-mono text-sm" {...props} />
                    ) : (
                      <code className="block p-4 bg-gray-800 text-gray-100 rounded-lg overflow-x-auto font-mono text-sm my-4" {...props} />
                    ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-gray-900 dark:text-white" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4" {...props} />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="text-6xl">🤔</div>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                No analysis available
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Try analyzing again
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isLoading && content && (
          <div className="sticky bottom-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 px-6 py-3 border-t border-gray-300 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <span>✨</span>
                AI Compiler
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Got it!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPopup;
