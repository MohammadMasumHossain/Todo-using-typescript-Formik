import { CircleCheck, Hourglass, List, PinIcon } from "lucide-react";
import React from "react";

interface TabItem {
  id: "all" | "pinned" | "completed" | "pending";
  label: string;
  value: number;
  icon: React.ElementType;
}

const BottomNav: React.FC<{
  pending: number;
  Iscompleted: number;
  pinned: number;
  activeTab: "all" | "pinned" | "completed" | "pending";
  setActiveTab: (tab: "all" | "pinned" | "completed" | "pending") => void;
}> = ({ pending, Iscompleted, pinned, activeTab, setActiveTab }) => {
  const tabsData: TabItem[] = [
    { id: "all", label: "All", icon: List, value: pending + Iscompleted },
    { id: "pending", label: "Pending", icon: Hourglass, value: pending },
    {
      id: "completed",
      label: "Completed",
      icon: CircleCheck,
      value: Iscompleted,
    },
    { id: "pinned", label: "Pinned", icon: PinIcon, value: pinned },
  ];

  // const [activeTab, setActiveTab] = useState<TabItem["id"]>("completed");

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-18 bg-gray-50 border-t border-gray-200 md:hidden shadow-lg">
      {/* Tab Navigation Menu */}
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {tabsData.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col justify-center items-center gap-1
              px-2 py-2 text-base font-medium transition-colors duration-20
              ${
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }
              focus:outline-none
            `}
            >
              <div className="relative">
                <Icon />
                <div>
                  {tab.value > 0 && (
                    <span className="absolute -top-2 -right-2 ">
                      {tab.value}
                    </span>
                  )}
                </div>
              </div>
              <span className="">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
