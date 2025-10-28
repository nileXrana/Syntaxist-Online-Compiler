"use client";
import React from 'react'
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { FiClock } from "react-icons/fi";
import { HiLightBulb } from "react-icons/hi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { 
  SiPython, 
  SiJavascript, 
  SiCplusplus, 
  SiGo, 
  SiRuby, 
  SiPhp, 
  SiSharp, 
  SiSwift, 
  SiRust
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import Image from 'next/image';

interface HeaderProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  onComplexityClick: () => void;
  onSuggestionsClick: () => void;
}

// Language icons mapping
const languageIcons: Record<string, React.ElementType> = {
  python: SiPython,
  javascript: SiJavascript,
  cpp: SiCplusplus,
  java: FaJava,
  go: SiGo,
  ruby: SiRuby,
  php: SiPhp,
  csharp: SiSharp,
  swift: SiSwift,
  rust: SiRust,
};

const Header = ({ selectedLanguage, setSelectedLanguage, isDarkMode, setIsDarkMode, onComplexityClick, onSuggestionsClick }: HeaderProps) => {
  const LanguageIcon = languageIcons[selectedLanguage] || SiPython;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className='h-[8vh] flex items-center justify-between pr-3 py-5 bg-blue-700 text-white shadow-lg'>
      <div className='flex items-center justify-between w-[65vw]'>
        <div className='text-xl tracking-tight flex items-center'>
          <Image src="/logo2.png" alt="Logo" width={60} height={60} className='border' />
          <div className='flex flex-col items-center justify-center font-serif'>
            <span className='scale-105'>Syntaxist</span>
            <span className='text-xs scale-95'>Online Compiler</span>
          </div>
        </div>

        {/* Analysis Buttons */}
        <div className='flex items-center gap-3'>
          <button
            onClick={onComplexityClick}
            className='cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:scale-110'
            title='Analyze Time & Space Complexity'
          >
            <FiClock className='text-lg' />
            <span>TC / SC</span>
          </button>
          <button
            onClick={onSuggestionsClick}
            className='cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:scale-110'
            title='Optimize Code with AI'
          >
            <AiOutlineThunderbolt className='text-lg' />
            <span>Optimize</span>
          </button>
        </div>
      </div>
      <div className='flex items-center justify-between gap-5'>
        {/* Language Selector with Icon */}
        <div className='relative flex items-center gap-1 px-2 py-2 rounded-lg bg-blue-800/50 backdrop-blur-sm border border-blue-500/50 hover:bg-blue-800/70 focus-within:ring-2 focus-within:ring-white/50 transition-all duration-200 shadow-md hover:shadow-lg'>
          <LanguageIcon className='text-xl text-white' />
          <select
            className='bg-transparent text-white font-medium pr-1 font-serif cursor-pointer focus:outline-none'
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="python" className='bg-gray-800 text-white'>Python</option>
            <option value="javascript" className='bg-gray-800 text-white'>JavaScript</option>
            <option value="cpp" className='bg-gray-800 text-white'>C++</option>
            <option value="java" className='bg-gray-800 text-white'>Java</option>
            <option value="go" className='bg-gray-800 text-white'>Go</option>
            <option value="ruby" className='bg-gray-800 text-white'>Ruby</option>
            <option value="php" className='bg-gray-800 text-white'>PHP</option>
            <option value="csharp" className='bg-gray-800 text-white'>C#</option>
            <option value="swift" className='bg-gray-800 text-white'>Swift</option>
            <option value="rust" className='bg-gray-800 text-white'>Rust</option>
          </select>
        </div>

        <button
          onClick={handleThemeToggle}
          className='cursor-pointer hover:scale-110 hover:rotate-90 transition-all duration-300 flex items-center gap-2 bg-white/10 hover:bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/20 shadow-md'
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <CiDark className='scale-[2]' />
          ) : (
            <MdDarkMode className='scale-[2]' />
          )}
        </button>
      </div>
    </div>
  )
}

export default Header
