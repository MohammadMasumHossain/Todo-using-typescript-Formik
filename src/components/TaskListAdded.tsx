// const TaskListAdded = () => {
//     return (
//       <div>
//         <DndContext
//           onDragEnd={handleDragEnd}
//           sensors={sensors}
//           collisionDetection={closestCenter}
//         >
//           <AnimatePresence mode="wait">
//             <SortableContext
//               items={sortedCard.map((card) => card.id)}
//               strategy={rectSortingStrategy}
//             >
//               {sortedCard
//                 .slice(pagesVisited, pagesVisited + itemsPerPage)
//                 .map((card) => (
//                   <SortableCard key={card.id} id={card.id}>
//                     <motion.div
//                       key={activeTab}
//                       layout
//                       initial={{ y: 200, scale: 0.9, opacity: 0 }}
//                       animate={{ y: 0, scale: 1, opacity: 1 }}
//                       exit={{ y: -200, scale: 0.9, opacity: 0 }}
//                       transition={{
//                         duration: 0.8,
//                         type: "spring",
//                         // ease: "linear",
//                         stiffness: 120,
//                         damping: 10,
//                       }}
//                       className={` relative h-60 group w-full  rounded-md shadow-md p-6 text-black font-semibold ${card.color}`}
//                     >
//                       {editingId === card.id ? (
//                         <textarea
//                           value={editingText}
//                           // autoFocus
//                           // ref={editTaskRef}
//                           ref={(el) => {
//                             if (el) {
//                               el.focus();
//                               const len = el.value.length;
//                               el.setSelectionRange(len, len);
//                             }
//                           }}
//                           onChange={(e) => setEditingText(e.target.value)}
//                           onBlur={() => {
//                             editCard(card.id, editingText);
//                             setEditingId(null);
//                           }}
//                           className="w-full h-32 p-2 rounded-md outline-none text-black resize-none"
//                         />
//                       ) : (
//                         <p>{card.text}</p>
//                       )}

//                       <button
//                         title="completed"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleComplete(card.id);
//                           toast.success(
//                             card.IsCompleted
//                               ? "Taskmarked  pending"
//                               : "Task Completed",
//                           );
//                         }}
//                         className={`absolute bottom-4 left-4 rounded-full p-2 shadow cursor-pointer
//                 ${
//                   card.IsCompleted
//                     ? "bg-black text-green-400"
//                     : "bg-white text-black hover:bg-black hover:text-white"
//                 }`}
//                       >
//                         <Check />
//                       </button>
//                       <div className="flex absolute bottom-4 right-4 space-x-2">
//                         <button
//                           title="Pin"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             togglePinCard(card.id);
//                             toast.success(
//                               card.IsPinned ? "Task unpinned " : "Task pinned",
//                             );
//                           }}
//                           className={` rounded-full p-2 shadow cursor-pointer
//                 ${
//                   card.IsPinned
//                     ? "opacity-100 bg-black text-yellow-300"
//                     : "opacity-0 bg-white text-black group-hover:opacity-100"
//                 }`}
//                         >
//                           <Star className="fill-[#FFD700]" />
//                         </button>
//                         <button
//                           title="delete"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDeleteClick(card.id);
//                           }}
//                           className="bg-white text-black hover:bg-black hover:text-white rounded-full p-2 shadow cursor-pointer"
//                         >
//                           <Trash2 className="hover:fill-red-500 " />
//                         </button>

//                         <button
//                           title="Edit"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setEditingId(card.id);
//                             setEditingText(card.text);
//                           }}
//                           className=" bg-white text-black hover:bg-black hover:text-blue-600 rounded-full p-2 shadow cursor-pointer"
//                         >
//                           {editingId === card.id ? <Save /> : <SquarePen />}
//                         </button>
//                       </div>
//                     </motion.div>
//                   </SortableCard>
//                 ))}
//             </SortableContext>
//           </AnimatePresence>
//         </DndContext>
//       </div>
//     );
// };

// export default TaskListAdded;
