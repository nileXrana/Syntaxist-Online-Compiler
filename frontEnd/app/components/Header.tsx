"use client";
import React from 'react'
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { FiClock } from "react-icons/fi";
import { HiLightBulb } from "react-icons/hi";
import { AiOutlineThunderbolt } from "react-icons/ai";

interface HeaderProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  onComplexityClick: () => void;
  onSuggestionsClick: () => void;
}

const Header = ({ selectedLanguage, setSelectedLanguage, isDarkMode, setIsDarkMode, onComplexityClick, onSuggestionsClick }: HeaderProps) => {
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <div className='h-[8vh] flex items-center justify-between px-10 py-5 bg-blue-900 text-white shadow-lg'>
        <div className='flex items-center gap-4'>
            <div className='font-bold text-xl tracking-tight flex items-center gap-2'>
                <span className='bg-white text-blue-700 px-3 py-1 rounded-lg shadow-md'>AI</span>
                <span>Compiler</span>
            </div>
            
            {/* Analysis Buttons */}
            <div className='flex items-center gap-2 ml-4'>
                <button
                    onClick={onComplexityClick}
                    className='flex items-center gap-2 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105'
                    title='Analyze Time & Space Complexity'
                >
                    <FiClock className='text-lg' />
                    <span>TC/SC</span>
                </button>
                <button
                    onClick={onSuggestionsClick}
                    className='flex items-center gap-2 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105'
                    title='Optimize Code (TC/SC)'
                >
                    <AiOutlineThunderbolt className='text-lg' />
                    <span>Optimize</span>
                </button>
            </div>
        </div>
        <div className='flex items-center justify-between gap-5'>
            <select 
              className='px-4 py-2 rounded-lg text-white bg-blue-800/50 backdrop-blur-sm border border-blue-500/100 hover:bg-blue-800/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 cursor-pointer font-medium shadow-md'
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
                <option value="python" className='bg-blue-900'>Python</option>
                <option value="javascript" className='bg-blue-900'>JavaScript</option>
                <option value="cpp" className='bg-blue-900'>C++</option>
                <option value="java" className='bg-blue-900'>Java</option>
                <option value="go" className='bg-blue-900'>Go</option>
                <option value="ruby" className='bg-blue-900'>Ruby</option>
                <option value="php" className='bg-blue-900'>PHP</option>
                <option value="csharp" className='bg-blue-900'>C#</option>
                <option value="swift" className='bg-blue-900'>Swift</option>
                <option value="rust" className='bg-blue-900'>Rust</option>
            </select>
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
