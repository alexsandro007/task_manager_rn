export type TaskStatus = "In Progress" | "Completed" | "Cancelled";

export type Todo = {
  id: number;
  title: string;
  description: string;
  dateTime: string; // ISO string
  createdAt: string;
  location: string;
  status: TaskStatus;
};