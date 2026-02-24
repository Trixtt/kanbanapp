export type Status = 'To Do' | 'Doing' | 'Done';

export interface Task {
  id: string;
  title: string;
  status: Status;
}