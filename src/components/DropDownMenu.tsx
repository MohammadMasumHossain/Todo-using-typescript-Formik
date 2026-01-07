import { ChevronDown } from "lucide-react";
import { useState } from "react";

const DropDownMenu = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const options = [
    { label: "All", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
  ];

  return (
    <div className="relative px-4 w-48">
      <div
        onClick={() => setOpen(!open)}
        className="border flex py-3 rounded-md items-center justify-center gap-3 cursor-pointer bg-transparent"
      >
        <span className="text-lg">{value || "select"}</span>
        <ChevronDown className="w-5 h-5" />
      </div>

      {/* Dropdown card */}
      {open && (
        <div className=" absolute  bg-transparent w-40 rounded-md shadow-lg top-full mt-2  ">
          {options.map((item) => (
            <div
              key={item.value}
              onClick={() => {
                setValue(item.value);
                setOpen(false);
              }}
              className="px-5 py-3 hover:bg-gray-200 rounded-md text-lg cursor-pointer"
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
