import { section } from "framer-motion/client";
import { Search } from "lucide-react";

const TaskHeader = () => {
  return (
    <section className="p-10 border-b border-gray-200">
      <div className="flex flex-col gap-4  md:flex-row md:flex-wrap md:items-center lg:flex-nowrap lg:justify-between">
        <div className="flex  gap-2 w-full  md:w-[48%] lg:w-auto text-primary items-center">
          <Search />
          <p>Search</p>
          <input
            type="text"
            placeholder=" Search tasks..."
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default TaskHeader;
