'use client'; // WAJIB: karena kita menggunakan Context di sisi client

import Link from 'next/link';
import { useTaskContext } from '@/lib/TaskContext'; 

export default function LandingPage() {
  const { tasks } = useTaskContext(); 

  // Data untuk mapping kolom mockup agar rapi
  const mockupColumns = [
    { label: 'Akan Dikerjakan', status: 'To Do', color: 'text-slate-400', dot: 'bg-slate-300' },
    { label: 'Sedang Dikerjakan', status: 'Doing', color: 'text-blue-500', dot: 'bg-blue-500' },
    { label: 'Selesai', status: 'Done', color: 'text-emerald-500', dot: 'bg-emerald-500' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="flex flex-col items-center justify-center pt-20 pb-10 px-6 text-center">
        {/* Hero Section */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-8 uppercase tracking-widest">
          Simple Project Management
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter max-w-4xl leading-[1.1]">
          Kelola tugas tim tanpa <br /> <span className="text-blue-600">keribetan chat group.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
          Papan tugas minimalis untuk tim kecil. Buat kartu, pantau progress, 
          dan selesaikan pekerjaan lebih cepat.
        </p>
        
        <div className="mt-12 flex flex-col items-center gap-6">
          <Link 
            href="/dashboard" 
            className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 inline-block"
          >
            Mulai Sekarang, Gratis
          </Link>

          {/* Widget Status Tugas */}
          {tasks.length > 0 ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <p className="text-sm font-medium text-blue-800">
                Kamu punya <span className="font-bold">{tasks.length} tugas</span> yang sedang berjalan.
                <Link href="/dashboard" className="ml-2 underline hover:text-blue-600 transition">Lanjutkan kerja</Link>
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-400 font-medium italic">
              Belum ada tugas. Mulai buat tugas pertamamu di dashboard!
            </p>
          )}
        </div>

        {/* Mockup Dashboard Preview Updated */}
        <div className="mt-20 w-full max-w-6xl p-4 bg-slate-100 rounded-[3rem] border border-slate-200/60 shadow-inner">
          <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-slate-200">
            
            {/* Header Mockup */}
            <div className="h-12 border-b border-slate-100 bg-slate-50/50 flex items-center px-6 justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="bg-white px-8 py-1 rounded-md border border-slate-200 text-[10px] text-slate-400 font-mono">
                kanbanapp.io/workspace
              </div>
              <div className="w-12" />
            </div>

            {/* Preview Columns */}
            <div className="p-8 grid grid-cols-3 gap-6 min-h-[400px]">
              {mockupColumns.map((col) => (
                <div key={col.status} className="flex flex-col gap-4 text-left">
                  {/* Kolom Title & Counter */}
                  <div className="flex justify-between items-center px-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                      <h3 className={`text-[11px] font-black uppercase tracking-widest ${col.color}`}>
                        {col.label}
                      </h3>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                      {tasks.filter(t => t.status === col.status).length}
                    </span>
                  </div>

                  {/* Task List Preview */}
                  <div className="bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-4 flex flex-col gap-3 min-h-[250px]">
                    {tasks.filter(t => t.status === col.status).length > 0 ? (
                      tasks.filter(t => t.status === col.status).slice(0, 3).map(task => (
                        <div key={task.id} className={`p-3 bg-white border border-slate-100 rounded-xl shadow-sm ${col.status === 'Done' ? 'opacity-50' : ''}`}>
                          <p className={`text-[11px] font-bold text-slate-700 truncate ${col.status === 'Done' ? 'line-through' : ''}`}>
                            {task.title}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="h-16 border border-slate-100 bg-white/50 rounded-xl border-dashed" />
                    )}
                    {/* Placeholder box to fill space */}
                    <div className="h-10 w-full bg-slate-100/50 rounded-xl animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}