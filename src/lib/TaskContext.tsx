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
  fetchTasks: (isSharedPage?: boolean) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoaded: userLoaded } = useUser();
  const { openSignIn } = useClerk();

  const fetchTasks = async (isSharedPage = false) => {
    setIsLoading(true);
    
    let query = supabase.from('tasks').select('*');

    if (!isSharedPage) {
      if (!user) {
        setTasks([]);
        setIsLoading(false);
        return;
      }
      query = query.eq('user_id', user.id);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });

    if (!error) {
      setTasks(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (userLoaded && window.location.pathname.includes('/dashboard')) {
      fetchTasks(false);
    }
  }, [user, userLoaded]);

  useEffect(() => {
    if (userLoaded) {
      fetchTasks();
    }
  }, [user, userLoaded]);

  const addTask = async (title: string) => {
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
    } else if (data) {
      setTasks((prev) => [data, ...prev]);
    }
  };

  const updateStatus = async (id: string, status: Status) => {
    if (!user) return;

    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error("Error updating task:", error.message);
    } else {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    }
  };

  const deleteTask = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error("Error deleting task:", error.message);
    } else {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateStatus, deleteTask, isLoading, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
  return context;
};