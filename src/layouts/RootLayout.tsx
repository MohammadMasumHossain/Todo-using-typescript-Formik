import Formikform from "../components/Formikform";
import Taskform from "../components/Taskform";

const RootLayout = () => {
  return (
    <>
      <div className="bg-back h-screen">
        <Taskform></Taskform>
        {/* <Formikform></Formikform> */}
      </div>
    </>
  );
};

export default RootLayout;
