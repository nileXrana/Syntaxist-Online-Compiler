"use client";
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import TerminalBox, { TerminalHandle } from "./Terminal";
import React from 'react'
import { FaCopy } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface CodeEditorProps {
  selectedLanguage: string;
  isDarkMode: boolean;
}

export interface CodeEditorHandle {
  getCode: () => string;
}

// Default code templates for each language
const defaultCode: Record<string, string> = {
  python: `# Welcome to AI Compiler
print("Welcome to AI Compiler")`,
  javascript: `// Welcome to AI Compiler
console.log("Welcome to AI Compiler");`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Welcome to AI Compiler" << endl;
    return 0;
}`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to AI Compiler");
    }
}`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Welcome to AI Compiler")
}`,
  ruby: `# Welcome to AI Compiler
puts "Welcome to AI Compiler"`,
  php: `<?php
// Welcome to AI Compiler
echo "Welcome to AI Compiler";
?>`,
  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Welcome to AI Compiler");
    }
}`,
  typescript: `// Welcome to AI Compiler
console.log("Welcome to AI Compiler");`,
  swift: `// Welcome to AI Compiler
print("Welcome to AI Compiler")`,
  kotlin: `fun main() {
    println("Welcome to AI Compiler")
}`,
  rust: `fn main() {
    println!("Welcome to AI Compiler");
}`
};

// File extensions for each language
const fileExtensions: Record<string, string> = {
  python: "Main.py",
  javascript: "Main.js",
  cpp: "Main.cpp",
  java: "Main.java",
  go: "Main.go",
  ruby: "Main.rb",
  php: "Main.php",
  csharp: "Main.cs",
  typescript: "Main.ts",
  swift: "Main.swift",
  kotlin: "Main.kt",
  rust: "Main.rs"
};

// Monaco editor language mappings
const monacoLanguages: Record<string, string> = {
  python: "python",
  javascript: "javascript",
  cpp: "cpp",
  java: "java",
  go: "go",
  ruby: "ruby",
  php: "php",
  csharp: "csharp",
  typescript: "typescript",
  swift: "swift",
  kotlin: "kotlin",
  rust: "rust"
};

const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(({ selectedLanguage, isDarkMode }, ref) => {
  const [code, setCode] = useState<string>(defaultCode[selectedLanguage] || "// write your code here...");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const terminalRef = useRef<TerminalHandle>(null);
  const [terminalKey, setTerminalKey] = useState<number>(0);

  // Expose getCode method to parent
  useImperativeHandle(ref, () => ({
    getCode: () => code
  }));

  // Update code when language changes
  useEffect(() => {
    setCode(defaultCode[selectedLanguage] || "// write your code here...");
    setOutput(""); // Clear output when language changes
  }, [selectedLanguage]);

  const handleChange: OnChange = (value) => {
    setCode(value || "");
  };

  const handleMount: OnMount = (editor, monaco) => {
    editor.focus(); // auto-focus on load
    // console.log("Monaco mounted:", editor);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  const handleRun = async () => {
    setIsRunning(true);

    // Run code via WebSocket
    terminalRef.current?.runCode(code, selectedLanguage);

    // Set isRunning to false after a short delay to show the loading animation
    setTimeout(() => {
      setIsRunning(false);
    }, 500);
  };

  const handleCopyOutput = async () => {
    if (terminalRef.current) {
      terminalRef.current.copyTerminalContent();
      alert("Terminal content copied!");
    }
  };

  const handleClearOutput = () => {
    // Re-render terminal by changing key
    setTerminalKey(prev => prev + 1);
  };

  return (
    <div>
      {/* // head : */}
      <div className={`h-[5vh] flex ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-black'}`}>
        <div className="w-[60vw] flex items-center border-r-3  justify-between pr-4">
          <h1 className={`text-lg font-bold p-3 px-5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-600 text-gray-100'}`}>
            {fileExtensions[selectedLanguage] || "Main.txt"}
          </h1>
          <div className="flex gap-10">
            <button onClick={handleCopy} className={`flex items-center cursor-pointer ${isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}><FaCopy /></button>
            {/* run button */}
            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`scale-150 px-7 py-1 cursor-pointer  flex items-center justify-center ${isRunning
                ? isDarkMode ? 'bg-blue-700 cursor-not-allowed' : 'bg-blue-600 cursor-not-allowed'
                : isDarkMode
                  ? 'bg-blue-700 hover:bg-blue-800'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              {isRunning ? (
                <AiOutlineLoading3Quarters className={`animate-spin ${isDarkMode ? 'text-white' : 'text-white'}`} />
              ) : (
                <BiLogoPlayStore />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between w-[40vw] pl-3">
          <div className="font-semibold">Output</div>
          <div className="flex gap-5 items-center ">
            <button onClick={handleCopyOutput} className={`cursor-pointer ${isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}><FaCopy /></button>
            <button onClick={handleClearOutput} className={`p-2 px-3 font-semibold cursor-pointer ${isDarkMode ? 'hover:text-blue-100 bg-slate-700 ' : 'hover:text-slate-200 bg-slate-600 text-white'}`}>Clear</button>
          </div>
        </div>
      </div>


      {/* editor and terminal : */}
      <div className="flex ">
        <div className={`h-[87vh] w-[60vw] border-1 ${isDarkMode ? 'border-r-sky-50' : 'border-black'}`}>
          <Editor
            height="100%"
            language={monacoLanguages[selectedLanguage] || "java"}
            theme={isDarkMode ? "vs-dark" : "vs-light"}
            value={code}
            onChange={handleChange}
            onMount={handleMount}
            options={{
              fontSize: 15, // 👈 
            }}
          />
        </div>
        <div>
          <TerminalBox
            output={output}
            key={terminalKey}
            ref={terminalRef}
            isDarkMode={isDarkMode}
            selectedLanguage={selectedLanguage}
          />
        </div>
      </div>

    </div>
  )
});

CodeEditor.displayName = "CodeEditor";

export default CodeEditor;
