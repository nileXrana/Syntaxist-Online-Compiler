"use client";
import { useState, useEffect } from "react";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import React from 'react'
import { FaCopy } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


interface CodeEditorProps {
  selectedLanguage: string;
  isDarkMode: boolean;
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

const CodeEditor = ({ selectedLanguage, isDarkMode }: CodeEditorProps) => {
  const [code, setCode] = useState<string>(defaultCode[selectedLanguage] || "// write your code here...");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);

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
    console.log("Monaco mounted:", editor);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Running code...");

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          language: selectedLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setOutput(`Error: ${data.error}\n${data.details ? JSON.stringify(data.details, null, 2) : ''}`);
      } else {
        setOutput(data.output);
      }
    } catch (error) {
      setOutput(`Error: Failed to execute code\n${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyOutput = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      alert("Output copied!");
    }
  };

  const handleClearOutput = () => {
    setOutput("");
  };

  return (
    <div>
      {/* // head : */}
      <div className={`h-[5vh] flex ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
        <div className="w-[65vw] flex items-center border-r-3 border-black justify-between pr-4">
          <h1 className={`text-lg font-bold p-3 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-700 text-gray-50'}`}>
            {fileExtensions[selectedLanguage] || "Main.txt"}
          </h1>
          <div className="flex gap-10">
            <button onClick={handleCopy} className={`flex items-center cursor-pointer ${isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}><FaCopy /></button>
            {/* run button */}
            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`scale-155 px-7 py-1 cursor-pointer rounded flex items-center justify-center ${isRunning
                  ? isDarkMode ? 'bg-blue-700 cursor-not-allowed' : 'bg-slate-800 cursor-not-allowed'
                  : isDarkMode
                    ? 'bg-blue-700 hover:bg-blue-600'
                    : 'bg-gray-800 hover:bg-gray-900 text-white'
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
        <div className="flex items-center justify-between w-[35vw] px-3">
          <div className="font-semibold">Output</div>
          <div className="flex gap-5 items-center">
            <button onClick={handleCopyOutput} className={`cursor-pointer ${isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}><FaCopy /></button>
            <button onClick={handleClearOutput} className={`font-semibold cursor-pointer ${isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}>Clear</button>
          </div>
        </div>
      </div>
      {/* editor and output : */}
      <div className="flex ">
        <div className={`h-[87vh] w-[65vw] border-1 ${isDarkMode ? 'border-r-sky-50' : 'border-black'}`}>
          <Editor
            height="100%"
            language={monacoLanguages[selectedLanguage] || "javascript"}
            theme={isDarkMode ? "vs-dark" : "vs-light"}
            value={code}
            onChange={handleChange}
            onMount={handleMount}
            options={{
              fontSize: 14, // 👈 change this value
            }}
          />
        </div>
        {/* output div */}
        <div className={`h-[87vh] w-[35vw] border-sky-300 p-4 overflow-auto ${isDarkMode ? 'bg-black text-gray-300' : 'bg-gray-100 text-black'
          }`}>
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
            {output}
          </pre>
        </div>
      </div>

    </div>
  )
}

export default CodeEditor
