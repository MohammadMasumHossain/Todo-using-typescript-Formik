import { useContext } from "react";
import { FormContext } from "../contexts/FormContext";
import { Search } from "lucide-react";

const PageTop = () => {
  const formContext = useContext(FormContext);
  if (!formContext) return null;
  const { searchText, setSearchText } = formContext;
  return (
    <section className="pt-10 flex flex-col gap-4 lg:flex-row lg:justify-between mx-4 lg:mx-12 scroll-smooth">
      <div className="hidden lg:block">
        <h1 className="text-3xl font-bold">TaskList</h1>
      </div>
      <div className="flex  space-x-4">
        <div className="bg-white border  w-full px-4 md:pr-20 lg:pr-40  py-3 rounded-lg flex lg:justify-center lg:items-center">
          <Search className=" mr-2" />
          <input
            className="bg-transparent w-full outline-none font-medium"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search notes..."
          />
        </div>
      </div>
      <div className="lg:hidden ml-4 mb-2 mt-2 ">
        <h1 className="text-3xl  font-bold">TaskList</h1>
      </div>
    </section>
  );
};

export default PageTop;
