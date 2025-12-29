import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Task = {
  text: string;
  IsCompleted: boolean;
  IsPinned: boolean;
};
type FilterType = "all" | "pending" | "completed";

interface FormContextType {
  tasks: Task[];
  addTask: (task: string) => void;
  deleteTask: (index: number) => void;
  editTask: (index: number, updatedTask: string) => void;
  toggleComplete: (index: number) => void;
  togglePin: (index: number) => void;
  filterStatus: FilterType;
  setFilterStatus: (status: FilterType) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

export const FormContext = createContext<FormContextType | null>(null);

const FormProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedtasks = localStorage.getItem("Tasks");

    return savedtasks ? JSON.parse(savedtasks) : [];
  });

    const [filterStatus, setFilterStatus] = useState<FilterType>("all");
    const[searchText, setSearchText] = useState("")

  // to save data whenev3er tasks state change;
  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    setTasks((prev) => [
      ...prev,
      { text, IsCompleted: false, IsPinned: false },
    ]);
  };
  const deleteTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const editTask = (index: number, updatedTask: string) => {
    setTasks((prev) => {
      const updated = [...prev];
      updated[index].text = updatedTask;
      return updated;
    });
  };

  const toggleComplete = (index: number) => {
    setTasks((prev) => {
      const updated = [...prev];
      updated[index].IsCompleted = !updated[index].IsCompleted;

      return updated;
    });
  };
  const togglePin = (index: number) => {
    setTasks((prev) => {
      const updated = [...prev];

      updated[index].IsPinned = !updated[index].IsPinned;
      return updated;
    });
  };

  return (
    <FormContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        editTask,
        toggleComplete,
        togglePin,
         filterStatus,  
        setFilterStatus,
        searchText,
        setSearchText
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
