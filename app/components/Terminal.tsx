"use client";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import "xterm/css/xterm.css";

export interface TerminalHandle {
  copyTerminalContent: () => void;
  clearTerminal: () => void;
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

        // Handle backspace (ASCII 127 or 8)
        if (code === 127 || code === 8) {
          if (currentLine.length > 0) {
            currentLine = currentLine.slice(0, -1);
            term.write("\b \b");
          }
        }
        // Handle Enter key
        else if (code === 13) {
          term.write("\r\n");
          if (currentLine.trim()) {
            term.write(`You typed: ${currentLine}\r\n`);
          }
          currentLine = "";
        }
        // Handle printable characters
        else if (code >= 32 && code <= 126) {
          currentLine += data;
          term.write(data);
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

  // Expose copy and clear methods to parent
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
