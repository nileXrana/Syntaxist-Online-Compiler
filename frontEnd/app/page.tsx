"use client";
import { useState } from "react";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import { Terminal } from "xterm";

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("javascript");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  return (
    <div>
      <CodeEditor
        selectedLanguage={selectedLanguage} 
        isDarkMode={isDarkMode}
      />
      <Header
        selectedLanguage={selectedLanguage} 
        setSelectedLanguage={setSelectedLanguage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    </div>
  );
}
