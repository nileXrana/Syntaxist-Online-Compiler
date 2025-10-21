"use client";
import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "@xterm/addon-fit";
import "xterm/css/xterm.css";

export default function TerminalBox() {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      theme: { background: "#1e1e1e" },
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      scrollback: 1000,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef.current!);
    
    // Fit terminal to container size
    fitAddon.fit();

    term.write("Welcome to your compiler terminal\r\n");

    // Example input listener
    term.onData((data) => {
      term.write(data); // echoes user input
    });

    // Handle window resize to keep terminal fitted
    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
    };
  }, []);

  return (
    <div 
      ref={terminalRef} 
      className="overflow-hidden p-1 bg-slate-900"
      style={{ height: "87vh", width: "40vw" }} 
    />
  );
}
