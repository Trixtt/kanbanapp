'use client';

import { useState, useRef, useEffect } from 'react';
import { Task, Status } from '@/types';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onUpdate, onDelete }: TaskCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const statuses: Status[] = ['To Do', 'Doing', 'Done'];

  // Menutup dropdown jika klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all group">
      <h4 className={`font-bold text-slate-800 mb-5 leading-tight text-lg ${task.status === 'Done' ? 'line-through opacity-40' : ''}`}>
        {task.title}
      </h4>
      
      <div className="flex items-center justify-between gap-3 pt-2">
        {/* Custom Modern Dropdown */}
        <div className="relative flex-1" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between text-xs font-black py-2.5 px-4 rounded-xl border transition-all ${
              isOpen ? 'border-blue-400 ring-4 ring-blue-50 bg-white' : 'border-slate-100 bg-slate-50 text-slate-500'
            }`}
          >
            <span>{task.status}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
          </button>

          {/* Floating Menu yang Sudah Dirapikan */}
          {isOpen && (
            <div className="absolute bottom-full mb-2 left-0 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    onUpdate(task.id, s);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                    task.status === s ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tombol Hapus Ikon Saja */}
        <button
          onClick={() => onDelete(task.id)}
          className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-90 border border-transparent hover:border-red-100 shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        </button>
      </div>
    </div>
  );
};