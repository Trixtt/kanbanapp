'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? 'border-b border-slate-200 bg-white/90 backdrop-blur-md py-3 shadow-sm' 
          : 'border-b border-transparent bg-white py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
            K
          </div>
          <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
            isScrolled ? 'text-slate-900' : 'text-slate-800'
          }`}>
            KanbanApp
          </span>
        </div>

        {/* Links Section */}
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className={`text-sm font-bold transition-colors duration-300 ${
              isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-700 hover:text-blue-600'
            }`}
          >
            Beranda
          </Link>
          <Link 
            href="/dashboard" 
            className={`text-sm font-bold transition-colors duration-300 ${
              isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-700 hover:text-blue-600'
            }`}
          >
            Dashboard
          </Link>
          
          {/* Action Button */}
          <Link 
            href="/dashboard" 
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 ${
              isScrolled 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700' 
                : 'bg-white text-slate-900 border border-slate-200 shadow-sm hover:bg-slate-50'
            }`}
          >
            Mulai Gratis
          </Link>
        </div>
      </div>
    </nav>
  );
};