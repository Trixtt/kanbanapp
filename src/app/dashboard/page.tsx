'use client';

import { useState } from 'react';
// Langkah 4: Ganti import hook lama dengan useTaskContext
import { useTaskContext } from '@/lib/TaskContext'; 
import { TaskCard } from '@/components/shared/TaskCard';
import { Status } from '@/types';

export default function Dashboard() {
  // Langkah 4: Ambil fungsi dari Context Pusat, bukan dari hook lokal lagi
  const { tasks, addTask, updateStatus, deleteTask } = useTaskContext();
  const [input, setInput] = useState('');

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
            <p className="text-slate-500 font-medium">Monitoring tugas tim beranggotakan 5 orang.</p>
          </div>

          <form onSubmit={handleAddTask} className="flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ada tugas apa hari ini?"
              className="px-5 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none w-full md:w-80 transition-all text-slate-700"
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Tambah
            </button>
          </form>
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
    </div>
  );
}