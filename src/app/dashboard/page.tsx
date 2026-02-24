'use client';

import { useState } from 'react';
import { useTaskContext } from '@/lib/TaskContext'; 
import { TaskCard } from '@/components/shared/TaskCard';
import { Status } from '@/types';
import { ShareModal } from '@/components/shared/ShareModal';
import { useUser, useClerk } from "@clerk/nextjs"; // Impor Clerk hooks

export default function Dashboard() {
  const { tasks, addTask, updateStatus, deleteTask } = useTaskContext();
  const [input, setInput] = useState('');
  
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser(); // Cek status login
  const { openSignIn } = useClerk(); // Fungsi untuk memicu modal login
  
  const boardId = "id-board-anda"; 

  // Fungsi baru untuk menangani klik tombol bagikan
  const handleShareClick = () => {
    if (!isLoaded) return; // Tunggu Clerk siap

    if (!isSignedIn) {
      // Jika belum login, buka modal login Clerk
      openSignIn({
        afterSignInUrl: window.location.href, // Kembali ke sini setelah login
      });
    } else {
      // Jika sudah login, buka modal share
      setIsShareOpen(true);
    }
  };

  const columns: { label: string; value: Status; color: string }[] = [
    { label: 'Akan Dikerjakan', value: 'To Do', color: 'bg-slate-500' },
    { label: 'Sedang Dikerjakan', value: 'Doing', color: 'bg-blue-500' },
    { label: 'Selesai', value: 'Done', color: 'bg-emerald-500' },
  ];

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Project Board</h1>
            <p className="text-slate-500 font-medium">Monitoring tugas tim.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Update onClick untuk menggunakan fungsi handleShareClick */}
            <button 
              onClick={handleShareClick}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all active:scale-95"
            >
              <span>🔗</span> Bagikan
            </button>

            <form onSubmit={handleAddTask} className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ada tugas apa hari ini?"
                className="px-5 py-3 rounded-2xl border border-slate-200 bg-white focus:ring-4 focus:ring-blue-100 outline-none w-full md:w-80 transition-all text-slate-700"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                Tambah
              </button>
            </form>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((col) => (
            <div key={col.value} className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${col.color}`} />
                  <h2 className="font-bold text-slate-800 tracking-tight uppercase text-xs">{col.label}</h2>
                </div>
                <span className="text-xs font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  {tasks.filter(t => t.status === col.value).length}
                </span>
              </div>
              
              <div className="flex flex-col gap-4 p-4 bg-slate-50/50 rounded-[2rem] border border-slate-100 min-h-[500px]">
                {tasks
                  .filter(t => t.status === col.value)
                  .map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onUpdate={updateStatus} 
                      onDelete={deleteTask} 
                    />
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        boardId={boardId} 
      />
    </div>
  );
}