import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "../contexts/FormContext";
import { toast } from "react-toastify";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  Check,
  Plus,
  Save,
  Search,
  SquarePen,
  Star,
  Trash2,
  X,
} from "lucide-react";

import ReactPaginate from "react-paginate";
import NavigationTabs from "./NavigationTabs";
import DeleteModal from "./DeleteModal";
import { rectSwappingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableCard from "./SortableCard";
import BottomNav from "./BottomNav";

const TaskList = () => {
  const formContext = useContext(FormContext);
  if (!formContext) return null;

  const {
    togglePinCard,
    toggleComplete,
    searchText,
    setSearchText,
    selectedColor,
    cards,
    noteText,
    setNoteText,
    showCard,
    setShowCard,
    addCard,
    editCard,
    setEditingId,
    editingId,
    setEditingText,
    editingText,
    deleteCard,

    reorderCards,
  } = formContext!;

  const addTaskRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (showCard && addTaskRef.current) {
      addTaskRef.current.focus();

      const length = addTaskRef.current.value.length;
      addTaskRef.current.setSelectionRange(length, length);
    }
  }, [showCard]);

  const Iscompleted = formContext.cards.filter((e) => e.IsCompleted).length;
  const pending = formContext.cards.length - Iscompleted;
  const pinned = formContext.cards.filter((e) => e.IsPinned).length;

  const [activeTab, setActiveTab] = useState<
    "all" | "pinned" | "completed" | "pending"
  >("pending");

  const filteredCards = cards.filter((card) => {
    if (activeTab === "completed") return card.IsCompleted;

    if (activeTab === "pending") return !card.IsCompleted;
    if (activeTab === "pinned") return card.IsPinned;
    // if (card.IsPinned) return false;
    if (
      searchText &&
      !card.text.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // const sortedCard = [...filteredCards].sort(
  //   (a, b) => Number(b.IsPinned) - Number(a.IsPinned)
  // );
  const sortedCard = filteredCards;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      deleteCard(itemToDelete);
      toast.success("Task Deleted Successfully!");
      setItemToDelete(null);
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const itemsPerPage = 12;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(sortedCard.length / itemsPerPage);
  const handlePageClick = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    setPageNumber(0);
  }, [searchText, activeTab]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(active, over);
    if (!over || active.id === over.id) return;
    reorderCards(active.id as number, over.id as number);
  };

  return (
    <>
      <section className="pt-10  justify-center lg:justify-between flex ml-12 mr-12">
        <div className="hidden lg:block">
          <h1 className="text-3xl  font-bold">TaskList</h1>
        </div>
        <div className="flex  space-x-4">
          <div className="bg-white border  w-full px-8 md:pr-20 lg:pr-40  py-3 rounded-lg flex lg:justify-center lg:items-center">
            <Search className=" mr-3" />
            <input
              className="bg-transparent w-full outline-none font-medium"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search notes..."
            />
          </div>
        </div>
      </section>
      <BottomNav
        pending={pending}
        pinned={pinned}
        Iscompleted={Iscompleted}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      ></BottomNav>
      <section className="hidden md:block">
        <div className="ml-4">
          <NavigationTabs
            pending={pending}
            pinned={pinned}
            Iscompleted={Iscompleted}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          ></NavigationTabs>
        </div>
      </section>

      <section className="grid grid-cols-1 justify-self-center self-center md:justify-items-stretch md:grid-cols-2 lg:grid-cols-4 gap-4 md:ml-12 md:mr-12 mt-10 ">
        {showCard && (
          <div
            className={`relative h-60 w-full max-w-sm rounded-md shadow-md p-6 font-semibold ${selectedColor}`}
          >
            <textarea
              value={noteText}
              ref={addTaskRef}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full p-2  rounded-md outline-none text-black"
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
          </div>
        )}
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={closestCenter}
        >
          <SortableContext
            items={sortedCard.map((card) => card.id)}
            strategy={rectSwappingStrategy}
          >
            {sortedCard
              .slice(pagesVisited, pagesVisited + itemsPerPage)
              .map((card) => (
                <SortableCard key={card.id} id={card.id}>
                  <div
                    key={card.id}
                    className={` relative h-60 group w-full max-w-sm rounded-md shadow-md p-6 text-black font-semibold ${card.color}`}
                  >
                    {editingId === card.id ? (
                      <textarea
                        value={editingText}
                        // autoFocus
                        // ref={editTaskRef}
                        ref={(el) => {
                          if (el) {
                            el.focus();
                            const len = el.value.length;
                            el.setSelectionRange(len, len);
                          }
                        }}
                        onChange={(e) => setEditingText(e.target.value)}
                        onBlur={() => {
                          editCard(card.id, editingText);
                          setEditingId(null);
                        }}
                        className="w-full h-32 p-2 rounded-md outline-none text-black resize-none"
                      />
                    ) : (
                      <p>{card.text}</p>
                    )}

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComplete(card.id);
                        toast.success(
                          card.IsCompleted
                            ? "Taskmarked  pending"
                            : "Task Completed"
                        );
                      }}
                      className={`absolute bottom-4 left-4 rounded-full p-2 shadow cursor-pointer
                ${
                  card.IsCompleted
                    ? "bg-black text-green-400"
                    : "bg-white text-black"
                }`}
                    >
                      <Check />
                    </div>
                    <div className="flex absolute bottom-4 right-4 space-x-2">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePinCard(card.id);
                          toast.success(
                            card.IsPinned ? "Task unpinned " : "Task pinned"
                          );
                        }}
                        className={` rounded-full p-2 shadow cursor-pointer
                ${
                  card.IsPinned
                    ? "opacity-100 bg-black text-green-400 "
                    : "opacity-0 bg-white text-black group-hover:opacity-100"
                }`}
                      >
                        <Star />
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(card.id);
                        }}
                        className=" bg-white text-black rounded-full p-2 shadow cursor-pointer"
                      >
                        <Trash2 />
                      </div>

                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(card.id);
                          setEditingText(card.text);
                        }}
                        className=" bg-white text-black rounded-full p-2 shadow cursor-pointer"
                      >
                        {editingId === card.id ? <Save /> : <SquarePen />}
                      </div>
                    </div>
                  </div>
                </SortableCard>
              ))}
          </SortableContext>
        </DndContext>
      </section>
      <div className="items-center pb-10 justify-center ">
        {sortedCard.length > itemsPerPage && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={12}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center gap-4   mt-2 md:mt-6 lg:mt-8"
            pageClassName="px-3 py-1 border rounded"
            activeClassName="bg-primary text-white"
            previousClassName="px-3 py-1 border rounded"
            nextClassName="px-3 py-1 border rounded"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        )}
      </div>
      <div>
        <DeleteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          itemName={itemToDelete !== null ? itemToDelete : "card.id"}
        ></DeleteModal>
      </div>
    </>
  );
};

export default TaskList;
