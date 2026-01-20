import { useContext, useRef } from "react";
import { FormContext } from "../contexts/FormContext";
import { Plus, X } from "lucide-react";
import { toast } from "react-toastify";
const AddTask = () => {
  const formContext = useContext(FormContext);
  if (!formContext) return null;
  const { noteText, addCard, setNoteText, setShowCard } = formContext;

  const addTaskRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <section>
      <textarea
        value={noteText}
        ref={addTaskRef}
        onChange={(e) => setNoteText(e.target.value)}
        className="w-full p-2 rounded-md outline-none text-black resize-none"
      />

      <button
        onClick={() => {
          if (noteText.trim()) {
            addCard();
            toast.success("Task added suceessfully");
          } else {
            setNoteText("");
            setShowCard(false);
          }
        }}
        className="absolute bottom-3 right-3 bg-white text-black rounded-full p-2 shadow"
      >
        {noteText.trim() ? <Plus /> : <X />}
      </button>
    </section>
  );
};

export default AddTask;
