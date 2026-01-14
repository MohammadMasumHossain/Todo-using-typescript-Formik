import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type sortableCardtype = {
  id: number;
  children: React.ReactNode;
};

const SortableCard = ({ id, children }: sortableCardtype) => {
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: active ? "grabbing" : "grab",
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div {...listeners} style={{ touchAction: "none" }}>
        {children}
      </div>
    </div>
  );
};

export default SortableCard;
