import { useFormik } from "formik";

const Taskform = () => {
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  // const [password, setPassword] = useState("");
  // // const handleOnSubmit = (e: any) => {
  // //   e.preventDefault();
  // //   console.log("form is submitted");
  // //   console.log(e.target.name.value);
  // // };

  // const handleTextOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   console.log(e.target.value);

  //   setPassword(e.target.value);
  // };
  return (
    <div>
      <div className="justify-center items-center text-center pt-40  text-primary ">
        To Do List
      </div>
      <div className=" flex justify-center mt-10 ml-14 items-center ">
        <form onSubmit={formik.handleSubmit} className="space-x-4">
          <input
            type="text"
            name="text"
            className="border-2 border-border px-8 py-10 "
            onChange={formik.handleChange}
            value={formik.values.text}
            placeholder="Enter your Task "
          />
          <button
            type="submit"
            className="border-2 border-border  px-2 py-1 rounded-2xl"
          >
            ADD
          </button>
        </form>
      </div>

      <div className="text-center mt-6 bg-surface w-8/12 mx-auto">
        {formik.values.text}
      </div>
    </div>
  );
};

export default Taskform;
