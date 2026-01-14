import { createContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type CardItem = {
  id: number;
  color: string;
  text: string;
  IsPinned: boolean;
  IsCompleted: boolean;
};

interface FormContextType {
  toggleComplete: (index: number) => void;
  togglePinCard: (id: number) => void;
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
  editingId: number | null;
  setEditingId: (id: number | null) => void;

  editingText: string;
  setEditingText: (text: string) => void;

  reorderCards: (activeId: number, overId: number) => void;
}

export const FormContext = createContext<FormContextType | null>(null);

const FormProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<CardItem[]>(() => {
    const saved = localStorage.getItem("Cards");
    return saved ? JSON.parse(saved) : [];
  });

  const [noteText, setNoteText] = useState("");
  const [showCard, setShowCard] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const editTaskRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editingId !== null && editTaskRef.current) {
      editTaskRef.current.focus();
      const len = editTaskRef.current.value.length;
      editTaskRef.current.setSelectionRange(len, len);
    }
  }, [editingId]);

  useEffect(() => {
    localStorage.setItem("Cards", JSON.stringify(cards));
  }, [cards]);

  const addCard = () => {
    if (!noteText.trim()) return;

    setCards((prev) => [
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        text: noteText,
        color: selectedColor,
        IsPinned: false,
        IsCompleted: false,
      },
      ...prev,
    ]);

    setNoteText("");
    setShowCard(false);
  };

  const deleteCard = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const editCard = (id: number, updatedText: string) => {
    setCards((prev) => {
      const updated = prev.map((card) =>
        card.id === id ? { ...card, text: updatedText } : card
      );
      localStorage.setItem("Cards", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleComplete = (id: number) => {
    setCards((prev) => {
      const updated = prev.map((card) =>
        card.id === id ? { ...card, IsCompleted: !card.IsCompleted } : card
      );
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

  const reorderCards = (activeId: number, overId: number) => {
    setCards((prev) => {
      const oldIndex = prev.findIndex((c) => c.id === activeId);
      const newIndex = prev.findIndex((c) => c.id === overId);

      if (oldIndex === -1 || newIndex === -1) return prev;

      const updated = [...prev];
      const [moved] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, moved);

      return updated;
    });
  };

  return (
    <FormContext.Provider
      value={{
        toggleComplete,
        togglePinCard,
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
        setEditingId,
        editingId,
        setEditingText,
        editingText,
        reorderCards,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
