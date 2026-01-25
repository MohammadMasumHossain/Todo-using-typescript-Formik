import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "../contexts/FormContext";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

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

import { Check, Plus, Save, SquarePen, Star, Trash2, X } from "lucide-react";

import ReactPaginate from "react-paginate";
import NavigationTabs from "./NavigationTabs";
import DeleteModal from "./DeleteModal";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableCard from "./SortableCard";
import BottomNav from "./BottomNav";

import PageTop from "./PageTop";

const TaskList = () => {
  const formContext = useContext(FormContext);
  if (!formContext) return null;

  const {
    togglePinCard,
    toggleComplete,
    searchText,
    selectedColor,
    cards,
    showCard,
    editCard,
    setEditingId,
    editingId,
    setEditingText,
    editingText,
    deleteCard,
    noteText,
    setNoteText,
    addCard,
    setShowCard,

    reorderCards,
  } = formContext!;

  const addTaskRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showCard && addTaskRef.current) {
      addTaskRef.current.focus();
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });

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

    if (
      searchText &&
      !card.text.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

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
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(active, over);
    if (!over || active.id === over.id) return;
    reorderCards(active.id as number, over.id as number);
  };

  // const [hideDock, setHideDock] = useState(false);
  // const [lastScrollY, setLastScrollY] = useState(0);
  // const bottomNav = () => {
  //   if (window.scrollY > lastScrollY) {
  //     setHideDock(true);
  //   } else {
  //     setHideDock(false);
  //   }
  //   setLastScrollY(window.scrollY);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", bottomNav);

  //   return () => {
  //     window.removeEventListener("scroll", bottomNav);
  //   };
  // }, [lastScrollY]);

  const [hideDock, setHideDock] = useState(false);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const current = el.scrollTop;

      if (current > lastScrollY.current) {
        setHideDock(true);
      } else {
        setHideDock(false);
      }

      lastScrollY.current = current;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="h-full min-h-0 flex flex-col">
        <div className="sticky top-0">
          <PageTop />
          <section className="hidden md:block">
            <div className="ml-4">
              <NavigationTabs
                pending={pending}
                pinned={pinned}
                Iscompleted={Iscompleted}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
          </section>
        </div>
        <AnimatePresence>
          {!hideDock && (
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeIn",
              }}
              className="fixed bottom-0 left-0 w-full z-50"
            >
              <BottomNav
                pending={pending}
                pinned={pinned}
                Iscompleted={Iscompleted}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={scrollRef} className=" flex-1 overflow-y-auto min-h-0 ">
          <section className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl-grid-cols-4 gap-4 lg:gap-8 mx-4 items-start lg:mx-12 mt-10 ">
            {showCard && (
              <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -200, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className={`relative h-60 w-full rounded-md shadow-md p-6 font-semibold ${selectedColor}`}
              >
                {/* <AddTask /> */}
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
              </motion.div>
            )}

            <DndContext
              onDragEnd={handleDragEnd}
              sensors={sensors}
              collisionDetection={closestCenter}
            >
              <AnimatePresence mode="wait">
                <SortableContext
                  items={sortedCard.map((card) => card.id)}
                  strategy={rectSortingStrategy}
                >
                  {sortedCard
                    .slice(pagesVisited, pagesVisited + itemsPerPage)
                    .map((card) => (
                      <SortableCard key={card.id} id={card.id}>
                        <motion.div
                          key={activeTab}
                          layout
                          initial={{ y: 200, scale: 0.9, opacity: 0 }}
                          animate={{ y: 0, scale: 1, opacity: 1 }}
                          exit={{ y: -200, scale: 0.9, opacity: 0 }}
                          transition={{
                            duration: 0.8,
                            type: "spring",
                            stiffness: 120,
                            damping: 10,
                          }}
                          className={` relative h-60 group w-full  rounded-md shadow-md p-6 text-black font-semibold ${card.color}`}
                        >
                          {editingId === card.id ? (
                            <textarea
                              value={editingText}
                              ref={(el) => {
                                if (el) {
                                  el.focus();
                                  const len = el.value.length;
                                  el.setSelectionRange(len, len);
                                }
                              }}
                              onChange={(e) => setEditingText(e.target.value)}
                              // onBlur={() => {
                              //   editCard(card.id, editingText);
                              //   setEditingId(null);
                              // }}
                              className="w-full h-32 p-2 rounded-md outline-none text-black resize-none"
                            />
                          ) : (
                            <p>{card.text}</p>
                          )}

                          <button
                            title="completed"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleComplete(card.id);
                              toast.success(
                                card.IsCompleted
                                  ? "Taskmarked  pending"
                                  : "Task Completed",
                              );
                            }}
                            className={`absolute bottom-4 left-4 rounded-full p-2 shadow cursor-pointer
                ${
                  card.IsCompleted
                    ? "bg-black text-green-400"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`}
                          >
                            <Check />
                          </button>
                          <div className="flex absolute bottom-4 right-4 space-x-2">
                            <button
                              title="Pin"
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePinCard(card.id);
                                toast.success(
                                  card.IsPinned
                                    ? "Task unpinned "
                                    : "Task pinned",
                                );
                              }}
                              className={` rounded-full p-2 shadow cursor-pointer
                ${
                  card.IsPinned
                    ? "opacity-100 bg-black text-yellow-300"
                    : "opacity-0 bg-white text-black group-hover:opacity-100"
                }`}
                            >
                              <Star className="fill-[#FFD700]" />
                            </button>
                            <button
                              title="delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(card.id);
                              }}
                              className="bg-white text-black hover:bg-black hover:text-white rounded-full p-2 shadow cursor-pointer"
                            >
                              <Trash2 className="hover:fill-red-500 " />
                            </button>

                            {/* <button
                              title="Edit"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingId(card.id);
                                setEditingText(card.text);
                              }}
                              className=" bg-white text-black hover:bg-black hover:text-blue-600 rounded-full p-2 shadow cursor-pointer"
                            >
                              {editingId === card.id ? <Save /> : <SquarePen />}
                            </button> */}

                            <button
                              title={editingId === card.id ? "Save" : "Edit"}
                              onClick={(e) => {
                                e.stopPropagation();

                                if (editingId === card.id) {
                                  editCard(card.id, editingText);
                                  setEditingId(null);
                                  toast.success("Task updated");
                                } else {
                                  setEditingId(card.id);
                                  setEditingText(card.text);
                                }
                              }}
                              className="bg-white text-black hover:bg-black hover:text-blue-600 rounded-full p-2 shadow cursor-pointer"
                            >
                              {editingId === card.id ? <Save /> : <SquarePen />}
                            </button>
                          </div>
                        </motion.div>
                      </SortableCard>
                    ))}
                </SortableContext>
              </AnimatePresence>
            </DndContext>
          </section>
          {sortedCard.length === 0 && !showCard && (
            <p className="text-center text-gray-400 mt-20">
              No tasks yet. Click + to add one.
            </p>
          )}
          <div className="items-center pb-20 md:pb-6 lg:pb-10 justify-center ">
            {sortedCard.length > itemsPerPage && (
              <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={12}
                user-select:none
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                containerClassName="flex justify-center gap-4 mt-2 md:mt-6 lg:mt-8 select-none"
                pageClassName=" border rounded"
                pageLinkClassName="px-3 py-1 block cursor-pointer"
                activeClassName="bg-primary text-white"
                previousClassName=" border rounded"
                previousLinkClassName="px-3 py-1 block cursor-pointer"
                nextClassName=" border rounded"
                nextLinkClassName="px-3 py-1 block cursor-pointer"
                disabledClassName="opacity-60 cursor-not-allowed"
              />
            )}
          </div>
        </div>
        <div>
          <DeleteModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
            itemName={itemToDelete !== null ? itemToDelete : "card.id"}
          ></DeleteModal>
        </div>
      </div>
    </>
  );
};

export default TaskList;
