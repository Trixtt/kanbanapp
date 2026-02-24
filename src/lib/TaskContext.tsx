'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase'; 
import { useUser, useClerk } from '@clerk/nextjs'; 
import { Task, Status } from '@/types';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => Promise<void>;
  updateStatus: (id: string, status: Status) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  isLoading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoaded: userLoaded } = useUser();
  const { openSignIn } = useClerk();

  // 1. Ambil data dari Supabase
  const fetchTasks = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false }); // Terbaru di atas

    if (error) {
      console.error("Error fetching tasks:", error.message);
    } else {
      setTasks(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Tambah tugas
  const addTask = async (title: string) => {
    // Jika user klik tambah tapi belum login, suruh login dulu
    if (!userLoaded) return;
    if (!user) {
      openSignIn();
      return;
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ 
        title, 
        status: 'To Do' as Status, 
        user_id: user.id 
      }])
      .select()
      .single();

    if (error) {
      console.error("Error adding task:", error.message);
      alert("Gagal menambah tugas. Cek koneksi atau database.");
    } else if (data) {
      setTasks((prev) => [data, ...prev]);
    }
  };

  // 3. Update status
  const updateStatus = async (id: string, status: Status) => {
    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error("Error updating task:", error.message);
    } else {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    }
  };

  // 4. Hapus tugas
  const deleteTask = async (id: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting task:", error.message);
    } else {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateStatus, deleteTask, isLoading }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
  return context;
};