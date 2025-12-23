import Taskform from "../components/Taskform";
import TaskList from "../components/TaskList";

const RootLayout = () => {
  return (
    <>
      <div className="bg-back h-screen">
        <Taskform></Taskform>
        <TaskList></TaskList>
        {/* <Formikform></Formikform> */}
      </div>
    </>
  );
};

export default RootLayout;
