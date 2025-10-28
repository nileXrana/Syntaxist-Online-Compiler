"use client";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import "xterm/css/xterm.css";

export interface TerminalHandle {
  copyTerminalContent: () => void;
  clearTerminal: () => void;
  runCode: (code: string, lang: string) => void;
}

interface TerminalBoxProps {
  isDarkMode?: boolean;
  output?: string;
  selectedLanguage?: string;
}

const TerminalBox = forwardRef<TerminalHandle, TerminalBoxProps>(({ isDarkMode = true, output = "", selectedLanguage = "" }, ref) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termInstanceRef = useRef<any>(null);
  const previousOutputRef = useRef<string>("");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let term: any = null;
    let handleResize: (() => void) | null = null;

    // dynamically import xterm and FitAddon on client only
    Promise.all([
      import("xterm"),
      import("@xterm/addon-fit")
    ]).then(([{ Terminal }, { FitAddon }]) => {
      term = new Terminal({
        cursorBlink: true,
        theme: isDarkMode
          ? {
            background: "#1e1e1e",
            foreground: "#ffffff",
            cursor: "#ffffff",
            cursorAccent: "#1e1e1e"
          }
          : {
            background: "#ffffff",
            foreground: "#000000",
            cursor: "#000000",
            cursorAccent: "#ffffff"
          },
        fontSize: 14,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        scrollback: 1000,
        allowProposedApi: true,
        convertEol: true,
        disableStdin: false,
      });

      termInstanceRef.current = term;

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);

      // Clear any existing content in the container before opening
      if (terminalRef.current) {
        terminalRef.current.innerHTML = '';
      }

      term.open(terminalRef.current!);

      // Fit terminal to container size (87vh)
      fitAddon.fit();

      let currentLine = "";

      // Handle input with proper backspace support
      term.onData((data: string) => {
        const code = data.charCodeAt(0);

        // Send input to backend if WebSocket is connected
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          
          // Echo input locally for immediate feedback
          // Docker stdin doesn't echo by default in non-TTY mode
          if (code === 127 || code === 8) {
            // Backspace (ASCII 127 or 8)
            if (currentLine.length > 0) {
              currentLine = currentLine.slice(0, -1);
              term.write("\b \b");
            }
          } else if (code === 13 || code === 10) {
            // Enter key (ASCII 13 = CR, 10 = LF)
            // Send the complete line with newline to backend
            socketRef.current.send(JSON.stringify({ type: "stdin", data: currentLine + "\n" }));
            term.write("\r\n");
            currentLine = "";
          } else if (code >= 32 && code <= 126) {
            // Printable characters including space (ASCII 32-126)
            currentLine += data;
            term.write(data);
          }
        }
      });

      // Handle window resize
      handleResize = () => {
        fitAddon.fit();
      };
      window.addEventListener("resize", handleResize);
    });

    // Cleanup
    return () => {
      if (handleResize) {
        window.removeEventListener("resize", handleResize);
      }
      if (term) {
        term.dispose();
      }
      socketRef.current?.close();
      termInstanceRef.current = null;
      previousOutputRef.current = "";
    };
  }, [selectedLanguage]);

  // Update theme when isDarkMode changes without clearing terminal
  useEffect(() => {
    const term = termInstanceRef.current;
    if (term) {
      term.options.theme = isDarkMode
        ? {
          background: "#1e1e1e",
          foreground: "#ffffff",
          cursor: "#ffffff",
          cursorAccent: "#1e1e1e"
        }
        : {
          background: "#ffffff",
          foreground: "#000000",
          cursor: "#000000",
          cursorAccent: "#ffffff"
        };
    }
  }, [isDarkMode]);

  // Watch for output changes and display in terminal
  useEffect(() => {
    const term = termInstanceRef.current;
    if (term) {
      // Always clear when output changes (including empty string)
      if (output !== previousOutputRef.current) {
        term.clear();

        // Write new output if it exists
        if (output) {
          term.write(output.replace(/\n/g, "\r\n"));
        }

        previousOutputRef.current = output;
      }
    }
  }, [output]);

  // Expose copy, clear and run methods to parent
  useImperativeHandle(ref, () => ({
    copyTerminalContent: () => {
      const term = termInstanceRef.current;
      if (term) {
        // Get all buffer content
        let content = "";
        const buffer = term.buffer.active;
        for (let i = 0; i < buffer.length; i++) {
          const line = buffer.getLine(i);
          if (line) {
            content += line.translateToString(true) + "\n";
          }
        }
        navigator.clipboard.writeText(content.trim());
      }
    },
    clearTerminal: () => {
      const term = termInstanceRef.current;
      if (term) {
        term.clear();
        previousOutputRef.current = "";
      }
    },
    runCode: (code: string, lang: string) => {
      const term = termInstanceRef.current;
      if (!term) return;

      // Map frontend language names to backend language names
      const langMap: Record<string, string> = {
        cpp: "cpp",
        python: "python",
        java: "java",
        javascript: "javascript",
        typescript: "typescript",
        go: "go",
        ruby: "ruby",
        php: "php",
        csharp: "csharp",
        swift: "swift",
        kotlin: "kotlin",
        rust: "rust"
      };

      const backendLang = langMap[lang] || lang;

      // Check if language is supported
      const supportedLanguages = [
        "cpp", "python", "java", "javascript", "typescript", 
        "go", "ruby", "php", "csharp", "swift", "kotlin", "rust"
      ];
      
      if (!supportedLanguages.includes(backendLang)) {
        term.clear();
        term.write(`\x1b[31m[Error: ${lang} is not yet supported.]\x1b[0m\r\n`);
        term.write(`\x1b[33m[Supported languages: Python, JavaScript, TypeScript, C++, Java, Go, Ruby, PHP, C#, Swift, Kotlin, Rust]\x1b[0m\r\n`);
        return;
      }

      // Close existing WebSocket if any
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }

      // Clear terminal before execution
      term.clear();
      previousOutputRef.current = "";
      term.write(`\x1b[36m> Running ${lang} code...\x1b[0m\r\n\r\n`);

      // Create WebSocket connection
      const ws = new WebSocket("ws://localhost:8080");
      socketRef.current = ws;

      ws.onopen = () => {
        // Send code to backend
        ws.send(JSON.stringify({ type: "run", lang: backendLang, code }));
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          if (message.type === "stdout") {
            // Write stdout to terminal
            try {
              term.write(message.data.replace(/\n/g, "\r\n"));
            } catch (e) {
              // Suppress xterm parsing errors
            }
          } else if (message.type === "stderr") {
            // Write stderr in red
            try {
              term.write(`\x1b[31m${message.data.replace(/\n/g, "\r\n")}\x1b[0m`);
            } catch (e) {
              // Suppress xterm parsing errors
            }
          } else if (message.type === "exit") {
            // Execution finished
            const color = message.code === 0 ? "32" : "31"; // green for success, red for error
            try {
              term.write(`\r\n\x1b[${color}m[Process exited with code ${message.code}]\x1b[0m\r\n`);
            } catch (e) {
              // Suppress xterm parsing errors
            }
            ws.close();
          } else if (message.type === "error") {
            // Error occurred
            try {
              term.write(`\r\n\x1b[31m[Error: ${message.data}]\x1b[0m\r\n`);
            } catch (e) {
              // Suppress xterm parsing errors
            }
            ws.close();
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        term.write("\r\n\x1b[31m[WebSocket connection error - Make sure backend server is running]\x1b[0m\r\n");
      };

      ws.onclose = () => {
        socketRef.current = null;
      };
    }
  }));

  return (
    <div
      ref={terminalRef}
      className={`overflow-hidden pl-1 ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}
      style={{ height: "87vh", width: "40vw" }}
    />
  );
});

TerminalBox.displayName = "TerminalBox";

export default TerminalBox;
