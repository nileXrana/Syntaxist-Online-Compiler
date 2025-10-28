"use client";
import { useState, useRef } from "react";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import AnalysisPopup from "./components/AnalysisPopup";

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("java");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupContent, setPopupContent] = useState<string>("");
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisType, setAnalysisType] = useState<'complexity' | 'suggestions' | 'optimize'>('complexity');
  
  const codeEditorRef = useRef<any>(null);

  const handleComplexityAnalysis = async () => {
    // Get code from CodeEditor
    const code = codeEditorRef.current?.getCode();
    
    if (!code || code.trim() === "") {
      alert("Please write some code first!");
      return;
    }

    setAnalysisType('complexity');
    setPopupTitle("Time & Space Complexity Analysis");
    setPopupContent("");
    setIsPopupOpen(true);
    setIsLoading(true);

    try {
      const response = await fetch('/api/complexity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: selectedLanguage })
      });

      const data = await response.json();

      if (response.ok) {
        setPopupContent(data.analysis);
      } else {
        setPopupContent(`**Error**: ${data.error || 'Failed to analyze code'}`);
      }
    } catch (error: any) {
      setPopupContent(`**Error**: ${error.message || 'Network error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestions = async () => {
    // Get code from CodeEditor
    const code = codeEditorRef.current?.getCode();
    
    if (!code || code.trim() === "") {
      alert("Please write some code first!");
      return;
    }

    setAnalysisType('optimize');
    setPopupTitle("Code Optimization Analysis");
    setPopupContent("");
    setIsPopupOpen(true);
    setIsLoading(true);

    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: selectedLanguage })
      });

      const data = await response.json();

      if (response.ok) {
        setPopupContent(data.suggestions);
      } else {
        setPopupContent(`**Error**: ${data.error || 'Failed to analyze optimization'}`);
      }
    } catch (error: any) {
      setPopupContent(`**Error**: ${error.message || 'Network error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <CodeEditor
        ref={codeEditorRef}
        selectedLanguage={selectedLanguage} 
        isDarkMode={isDarkMode}
      />
      <Header
        selectedLanguage={selectedLanguage} 
        setSelectedLanguage={setSelectedLanguage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onComplexityClick={handleComplexityAnalysis}
        onSuggestionsClick={handleSuggestions}
      />
      <AnalysisPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={popupTitle}
        content={popupContent}
        isLoading={isLoading}
        type={analysisType}
      />
    </div>
  );
}
