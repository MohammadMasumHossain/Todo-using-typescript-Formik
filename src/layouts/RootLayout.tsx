import AppToast from "../components/AppToast";
import LeftAside from "../components/homelayout/LeftAside";
import TaskList from "../components/TaskList";

const RootLayout = () => {
  return (
    <>
      <main className="bg-back grid grid-cols-12 h-screen overflow-hidden px-4 ">
        <aside className="left_side lg:border-r lg:border-r-gray-200 lg:col-span-1  ">
          <LeftAside></LeftAside>
        </aside>

        <aside className="right_side col-span-12 lg:col-span-11 h-screen flex flex-col overflow-hidden ">
          <TaskList></TaskList>

          <AppToast></AppToast>
          {/* <Taskform></Taskform> */}
        </aside>
        {/* <Formikform></Formikform> */}
      </main>
    </>
  );
};

export default RootLayout;
