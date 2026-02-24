'use client';
import { useState, useEffect } from 'react';
import { Task, Status } from '@/types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('my-tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('my-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = { id: crypto.randomUUID(), title, status: 'To Do' };
    setTasks([...tasks, newTask]);
  };

  const updateStatus = (id: string, newStatus: Status) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return { tasks, addTask, updateStatus, deleteTask };
};