import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Task = {
  text: string;
  IsCompleted: boolean;
  IsPinned: boolean;
};

type CardItem = {
  id: number;
  color: string;
  text: string;
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
  togglePinCard: (id: number) => void;
  filterStatus: FilterType;
  setFilterStatus: (status: FilterType) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;

  cards: CardItem[];
  addCard: () => void;
  deleteCard: (id: number) => void;
  editCard: (id: number, updatedText: string) => void;

  noteText: string;
  setNoteText: (text: string) => void;

  showCard: boolean;
  setShowCard: (value: boolean) => void;
}

export const FormContext = createContext<FormContextType | null>(null);

const FormProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedtasks = localStorage.getItem("Tasks");

    return savedtasks ? JSON.parse(savedtasks) : [];
  });
  const [cards, setCards] = useState<CardItem[]>(() => {
    const saved = localStorage.getItem("Cards");
    return saved ? JSON.parse(saved).reverse() : [];
  });

  const [noteText, setNoteText] = useState("");
  const [showCard, setShowCard] = useState(false);

  const [filterStatus, setFilterStatus] = useState<FilterType>("all");
  const [searchText, setSearchText] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // to save data whenev3er tasks state change;
  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("Cards", JSON.stringify(cards));
  }, [cards]);

  const addCard = () => {
    if (!noteText.trim()) return;

    setCards((prev) => [
      {
        id: Date.now(),
        text: noteText,
        color: selectedColor,
        IsPinned: false,
      },
      ...prev,
    ]);

    setNoteText("");
    setShowCard(false);
  };

  const addTask = (text: string) => {
    setTasks((prev) => [
      ...prev,
      { text, IsCompleted: false, IsPinned: false },
    ]);
  };
  const deleteTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteCard = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const editCard = (id: number, updatedText: string) => {
    setCards((prev) => {
      const updated = prev.map((card) =>
        card.id === id ? { ...card, text: updatedText } : card
      );
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

  const togglePinCard = (id: number) => {
    setCards((prev) => {
      const updated = prev.map((card) =>
        card.id === id ? { ...card, IsPinned: !card.IsPinned } : card
      );
      return updated;
    });
  };

  const editTask = (index: number, updatedTask: string) => {
    setTasks((prev) => {
      const updated = [...prev];
      updated[index].text = updatedTask;
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
        togglePinCard,
        filterStatus,
        setFilterStatus,
        searchText,
        setSearchText,
        selectedColor,
        setSelectedColor,
        cards,
        addCard,
        deleteCard,
        editCard,
        noteText,
        setNoteText,
        showCard,
        setShowCard,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
