import { TaskStatus, Todo } from "@/types/todo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { STORAGE_KEY } from "../constants/storage";

const defaultTodos: Todo[] = [];

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "status">("date");
  const [filterBy, setFilterBy] = useState<"all" | TaskStatus>("all");

  useEffect(() => {
    (async () => {
      const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTodos) setTodos(JSON.parse(storedTodos));
      else setTodos(defaultTodos);
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (title: string, description: string, dateTime: string, location: string) => {
    setTodos([
      ...todos,
      {
        id: Number(new Date()),
        title,
        description,
        dateTime,
        createdAt: new Date().toISOString(),
        location,
        status: "In Progress",
      },
    ]);
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleChangeStatus = (id: number, status: TaskStatus) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, status } : todo)));
  };

  const onUpdateTitle = (id: number, title: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, title } : todo)));
  };

  const completedTodosValue = todos.filter((todo) => todo.status === "Completed").length;

  // 🔹 Фильтрация
  const filteredTodos = filterBy === "all" ? todos : todos.filter(todo => todo.status === filterBy);

  // 🔹 Сортировка
  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === "status") {
      const statusOrder: TaskStatus[] = ["In Progress", "Completed", "Cancelled"];
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    }
    return 0;
  });

  return {
    todos: sortedTodos,
    handleAddTodo,
    handleDeleteTodo,
    handleChangeStatus,
    onUpdateTitle,
    completedTodosValue,
    setSortBy,
    sortBy,
    filterBy,
    setFilterBy
  };
};

export default useTodo;