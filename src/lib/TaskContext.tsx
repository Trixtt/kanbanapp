'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, Status } from '@/types';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  updateStatus: (id: string, newStatus: Status) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load data dari LocalStorage saat aplikasi pertama kali jalan
  useEffect(() => {
    const saved = localStorage.getItem('my-pro-tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Gagal memuat data", e);
      }
    }
  }, []);

  // Simpan setiap ada perubahan
  useEffect(() => {
    localStorage.setItem('my-pro-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = { id: crypto.randomUUID(), title, status: 'To Do' };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateStatus = (id: string, newStatus: Status) => {
    setTasks((prev) => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter(t => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext harus digunakan di dalam TaskProvider');
  return context;
};