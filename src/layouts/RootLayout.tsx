import LeftAside from "../components/homelayout/LeftAside";
import Taskform from "../components/Taskform";
import TaskHeader from "../components/TaskHeader";
import TaskList from "../components/TaskList";

const RootLayout = () => {
  return (
    <>
      <main className="bg-back grid grid-cols-12 h-screen">
        <aside className="left_side border-r border-r-gray-200 col-span-1 ">
          <LeftAside></LeftAside>
        </aside>

        <aside className="right_side col-span-11  ">
          <TaskList></TaskList>
          <Taskform></Taskform>
        </aside>
        {/* <Formikform></Formikform> */}
      </main>
    </>
  );
};

export default RootLayout;
