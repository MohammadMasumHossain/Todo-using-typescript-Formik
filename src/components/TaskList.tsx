import { useContext, useState } from "react";
import { FormContext } from "../contexts/FormContext";
// import Delete_button from "./ui/Delete_button";

import { Pin, SquarePen, Trash } from "lucide-react";
import Swal from "sweetalert2"; 
import ReactPaginate from "react-paginate";


const TaskList = () => {
  const formContext = useContext(FormContext);
  if (!formContext) return null;

  const { deleteTask, editTask, togglePin, toggleComplete, tasks, filterStatus, searchText } =
    formContext!;

  const filteredTasks = tasks.filter((task) => {
    
    if (filterStatus === "completed") return task.IsCompleted;
    if (filterStatus === "pending") return !task.IsCompleted;

    if (searchText && !task.text.toLowerCase().includes(searchText.toLowerCase()))
      return false;
    return true;
  });


  //   const [completed, setCompleted] = useState(0);
  //   const [pending, setPending] = useState(5);
  const Iscompleted = formContext.tasks.filter((e) => e.IsCompleted).length;
  const pending = formContext.tasks.length - Iscompleted;

  const sortedTasks = [...filteredTasks].sort(
    (a, b) => Number(b.IsPinned) - Number(a.IsPinned)
  );

  //   const handleCompleted = (e: any) => {
  //     if (e.target.checked) {
  //       setCompleted((prev) => prev + 1);
  //       setPending((prev) => prev - 1);
  //     } else {
  //       setCompleted((prev) => prev - 1);
  //       setPending((prev) => prev + 1);
  //     }
  //   };

  const handleDelete = (index: number) => {
    Swal.fire({
      title: "Are you sure?",

      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(index);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handleEdit = (index: number, currentTask: string) => {
    Swal.fire({
      title: "Edit Task",
      input: "text",
      inputValue: currentTask,
      inputPlaceholder: "Update your task",
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      inputValidator: (value) => {
        if (!value) {
          return "Task cannot be empty!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        editTask(index, result.value);

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Task updated successfully",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

    const itemsPerPage =5;
    const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(sortedTasks.length / itemsPerPage);
   const handlePageClick =({selected}:{selected:number})=>{
        setPageNumber(selected);
   }
  return (
    <section className="pt-10 w-full max-w-5xl px-4  mx-auto">
      <div className="flex justify-between font-semibold text-primary my-8">
        <div>
          <h5>Task Item list </h5>
        </div>
        <div className="flex gap-4">
          <p>Pending:{pending}</p>
          <p>Completed:{Iscompleted}</p>
        </div>
      </div>
      <div>
        {sortedTasks.
        slice(pagesVisited  , pagesVisited+itemsPerPage)
        .map((task) => {
           
            const originalIndex = tasks.findIndex((t) => t === task);

            return (
              <div
                key={originalIndex}
                className={`flex justify-between p-4 mb-2 rounded ${
                  task.IsPinned ? "bg-[#9BB4C0]" : "bg-surface"
                }`}
              >
            <div className="flex  gap-2">
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    // onChange={handleCompleted}
                    checked={task.IsCompleted}
                    onChange={() => toggleComplete(originalIndex)}
                    // onChange={() => formContext.toggleComplete(index)}
                    className="accent-pink-500 h-5 w-5 rounded"
                  />
                  <span className="text-gray-900"></span>
                </label>
              </div>
              <div className={`${task.IsCompleted ? "line-through" : ""}`}>
                {task.text}
              </div>
            </div>
            <div className="flex gap-1 md:gap-4">
              <div
                onClick={() => togglePin(originalIndex)}
                className={`flex px-2 py-1 items-center gap-1 rounded-xl cursor-pointer
                  ${task.IsPinned ? "bg-[#EA2C62]" : "md:bg-[#8CA9FF]"}`}
              >
                <Pin />
                <p className="hidden sm:block text-white">
                  {task.IsPinned ? "pinned" : "pin"}
                </p>
              </div>
              <div
                onClick={() => handleEdit(originalIndex, task.text)}
                className="flex gap-1 items-center md:bg-[#405D72] rounded-xl  px-2 py-1"
              >
                <SquarePen />
                <p className="text-white hidden sm:block">Edit</p>
              </div>

              <div
                onClick={() => handleDelete(originalIndex)}
                className="flex text-white items-center text-center  px-2 py-1 gap-1   rounded-xl md:bg-red-600"
              >
                <Trash />
                <p className="hidden sm:block">Delete</p>
              </div>
            </div>
          </div>
            );
})}
      </div>
    {(sortedTasks.length > itemsPerPage)
    &&
    (
       <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center gap-4  mt-2 md:mt-6 lg:mt-8"
        pageClassName="px-3 py-1 border rounded"
        activeClassName="bg-primary text-white"
        previousClassName="px-3 py-1 border rounded"
        nextClassName="px-3 py-1 border rounded"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    )}
      
    </section>
  );
};

export default TaskList;
