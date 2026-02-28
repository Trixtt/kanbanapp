'use client';

import { useState } from 'react';

export const ShareModal = ({ isOpen, onClose, boardId }: { isOpen: boolean; onClose: () => void; boardId: string }) => {
  // 1. Ubah default state agar cocok dengan sistem kita
  const [accessType, setAccessType] = useState('view'); // 'view' atau 'edit'
  
  // 2. Tambahkan parameter ?mode= ke link-nya
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareLink = `${baseUrl}/share/${boardId}?mode=${accessType}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-all">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900">Bagikan Papan</h3>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Opsi Akses */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Siapa yang punya link bisa:
            </label>
            <select 
              value={accessType}
              onChange={(e) => setAccessType(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all cursor-pointer font-bold text-sm"
            >
              <option value="view">Hanya Melihat (Viewer)</option>
              <option value="edit">Bisa Mengedit (Editor)</option>
            </select>
          </div>

          {/* Input Link */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Link Papan Tugas
            </label>
            <div className="flex gap-2">
              <input 
                readOnly 
                value={shareLink}
                className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 outline-none font-mono overflow-ellipsis"
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(shareLink);
                  alert("Link berhasil disalin!");
                }}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-100 active:scale-95 whitespace-nowrap"
              >
                Salin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};