import { useFormik } from "formik";
import { useContext,} from "react";
import { FormContext } from "../contexts/FormContext";
import { FunnelIcon, Search } from "lucide-react";

interface FormValues {
  text: string;
}

const Taskform = () => {
  const formContext = useContext(FormContext);

  if (!formContext) return null;
  

  const formik = useFormik<FormValues>({
    initialValues: { text: "" },
    onSubmit: (values, { resetForm }) => {
      formContext?.addTask(values.text);
      resetForm();
    },
  });

 

  


  return (
    <section className="pt-10 w-11/12 md:w-8/12  mx-auto">
      <form
        onSubmit={formik.handleSubmit}
        className="text-center bg-surface   pt-20 "
      >
        <input
          type="text"
          name="text"
          onChange={formik.handleChange}
          value={formik.values.text}
          className="border text-primary  rounded-xl focus:bg-back px-8 py-2"
          placeholder="Enter your task"
        />
        <button
          type="submit"
          className="ml-3 border px-4 py-2 text-primary hover:text-secondary rounded-xl"
        >
          ADD
        </button>
      </form>
      <div className="bg-surface py-14 justify-between px-40 lg:gap-4 sm:space-y-4 lg:space-y-0 lg:flex">
        <div className="flex gap-2 text-primary items-center">
          <Search />
          <p>Search</p>
          <input
            type="text"
            className="bg-surface border focus:bg-back px-2 py-2 rounded-xl"
          />
        </div>
        {/* <div className="flex items-center gap-2">
          <FunnelIcon />
          <p>Filter</p>
          <input
            type="text"
            name=""
            id=""
            className=" rounded-xl bg-surface border focus:bg-back py-2"
          />
        </div> */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ">
            <div className="flex items-center gap-2 text-primary ">
              <FunnelIcon />
              <span>Filter</span>
            </div>

            <select
              // onChange={(e) => setFilteredStatus(e.target.value)}
              className="w-full sm:w-40 bg-surface border focus:bg-back  text-primary  
              px-3 py-2 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Taskform;
