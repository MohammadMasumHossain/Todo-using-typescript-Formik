import { useFormik } from "formik";
import { useContext, } from "react";
import { FormContext } from "../contexts/FormContext";
import { FunnelIcon, Search } from "lucide-react";


interface FormValues {
  text: string;
}

type FilterType = "all" | "completed" | "pending";

const Taskform = () => {
  const formContext = useContext(FormContext);

  if (!formContext) return null;

  const { filterStatus, setFilterStatus } = formContext;

  const formik = useFormik<FormValues>({
    initialValues: { text: "" },
    onSubmit: (values, { resetForm }) => {
      if (!values.text.trim()) return;
      formContext?.addTask(values.text);
      resetForm();
    },
  });

 
  return (
    <>
    <section className="pt-10 w-full max-w-5xl px-4  mx-auto">
      <form
        onSubmit={formik.handleSubmit}
        className=" bg-surface py-10  px-4 rounded-xl flex flex-col sm:flex-row items-center gap-4 justify-center "
      >
        <input
          type="text"
          name="text"
          onChange={formik.handleChange}
          value={formik.values.text}
          className="border w-full sm:w-96 text-primary  rounded-xl focus:bg-back px-4 py-2"
          placeholder="Enter your task"
        />
        <button
          type="submit"
          className="w-full sm:w-auto  border px-6 py-2 text-primary hover:text-secondary rounded-xl"
        >
          ADD
        </button>
        
      </form>
      <div className="bg-surface mt-6 py-6 px-4 rounded-xl mx-auto ">
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center lg:flex-nowrap lg:justify-between">
          <div className="flex  gap-2 w-full  md:w-[48%] lg:w-auto text-primary items-center">
          <Search />
          <p>Search</p>
          <input
            type="text"
            value={formContext.searchText}
            onChange={(e) => formContext.setSearchText(e.target.value)}
            className="w-full focus:ring-2 focus:ring-primary focus:outline-none bg-surface border px-3 py-2 rounded-xl"
          />
        </div>
       
        
          <div className="flex items-center gap-3 w-full md:w-[48%] lg:w-auto  ">
            <div className="flex items-center gap-2 text-primary ">
              <FunnelIcon />
              <span>Filter</span>
            </div>  

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterType)}
              className="w-full  bg-surface border focus:bg-back  text-primary  
              px-3 py-2 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        
        </div>
      </div>
      
    </section>
    
    
    </>
  );
};

export default Taskform;
