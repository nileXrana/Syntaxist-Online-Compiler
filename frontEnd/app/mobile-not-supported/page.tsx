import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Not Supported - Syntaxist",
  description: "Syntaxist is optimized for desktop devices. Please access from a desktop or laptop computer.",
};

export default function MobileNotSupported() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 p-8 text-center">
        {/* Icon */}
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Mobile Not Supported
        </h1>

        {/* Description */}
        <p className="text-gray-300 mb-6 leading-relaxed">
          <strong className="text-blue-400">Syntaxist</strong> is an advanced online compiler and code editor optimized for desktop devices.
        </p>

        <p className="text-gray-400 text-sm mb-8">
          For the best coding experience with full IDE features, syntax highlighting, and multi-language support, please access this website from a desktop or laptop computer.
        </p>

        {/* Features List */}
        <div className="bg-gray-900/50 rounded-lg p-4 mb-6 text-left">
          <h2 className="text-sm font-semibold text-gray-300 mb-3">Why Desktop?</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Full keyboard support for coding</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Better screen real estate for code editing</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Enhanced IDE features and tools</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Optimized performance for compilation</span>
            </li>
          </ul>
        </div>

        {/* Supported Languages Badge */}
        <div className="text-xs text-gray-500">
          Supports Python, JavaScript, C++, Java, Go, Rust, Ruby, PHP, Swift, C#
        </div>
      </div>
    </div>
  );
}
