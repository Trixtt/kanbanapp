'use client';

import { useTaskContext } from '@/lib/TaskContext';
import { TaskCard } from '@/components/shared/TaskCard';
import { useParams, useSearchParams } from 'next/navigation';
import { Status } from '@/types';
import { Globe, Lock, Eye } from 'lucide-react';

export default function SharePage() {
  const { tasks, isLoading } = useTaskContext();
  const params = useParams();
  const searchParams = useSearchParams();
  
  // Ambil mode dari URL: ?mode=view atau ?mode=edit
  const mode = searchParams.get('mode') || 'view';
  const isReadOnly = mode === 'view';

  const columns: { label: string; value: Status; color: string }[] = [
    { label: 'To Do', value: 'To Do', color: 'bg-slate-400' },
    { label: 'Doing', value: 'Doing', color: 'bg-blue-500' },
    { label: 'Done', value: 'Done', color: 'bg-emerald-500' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-20">
      {/* Banner Notifikasi Mode */}
      <div className={`w-full py-2 px-4 text-center text-xs font-bold uppercase tracking-widest ${isReadOnly ? 'bg-amber-50 text-amber-700 border-b border-amber-100' : 'bg-blue-50 text-blue-700 border-b border-blue-100'}`}>
        <div className="flex items-center justify-center gap-2">
          {isReadOnly ? <Eye size={14} /> : <Lock size={14} />}
          {isReadOnly ? 'Mode Pratinjau: Hanya Lihat' : 'Mode Editor Aktif'}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                <Globe className="text-blue-600" size={20} />
              </div>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Shared Board</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Papan Tugas Bersama
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              ID Papan: <span className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">#{params.id}</span>
            </p>
          </div>

          <div className="flex gap-3">
             <div className="px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm text-sm font-semibold text-slate-600 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Update
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((col) => (
            <div key={col.value} className="flex flex-col gap-4">
              <div className="flex items-center gap-2 px-2">
                <div className={`w-2 h-2 rounded-full ${col.color}`} />
                <h2 className="font-bold text-slate-800 tracking-tight uppercase text-xs">{col.label}</h2>
                <span className="ml-auto bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {tasks.filter(t => t.status === col.value).length}
                </span>
              </div>
              
              <div className="flex flex-col gap-4 p-4 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 min-h-[500px] backdrop-blur-sm">
                {tasks
                  .filter(t => t.status === col.value)
                  .map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      // Matikan fungsi update/delete jika isReadOnly
                      onUpdate={isReadOnly ? undefined : () => {}} 
                      onDelete={isReadOnly ? undefined : () => {}} 
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