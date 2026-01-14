import React from "react";

interface TabItem {
  id: "all" | "pinned" | "completed" | "pending";
  label: string;
  value: number;
}

const NavigationTabs: React.FC<{
  pending: number;
  Iscompleted: number;
  pinned: number;
  activeTab: "all" | "pinned" | "completed" | "pending";
  setActiveTab: (tab: "all" | "pinned" | "completed" | "pending") => void;
}> = ({ pending, Iscompleted, pinned, activeTab, setActiveTab }) => {
  const tabsData: TabItem[] = [
    { id: "all", label: "All", value: pending + Iscompleted },
    { id: "pending", label: "Pending", value: pending },
    { id: "completed", label: "Completed", value: Iscompleted },
    { id: "pinned", label: "Pinned", value: pinned },
  ];

  // const [activeTab, setActiveTab] = useState<TabItem["id"]>("completed");

  return (
    <div className="p-4">
      {/* Tab Navigation Menu */}
      <div className="flex border-b border-gray-200">
        {tabsData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-6 py-3 text-base font-medium transition-colors duration-20
              ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500   text-blue-600"
                  : "text-gray-500 hover:text-gray-700 cursor-pointer"
              }
              focus:outline-none
            `}
          >
            {/* Display label and value */}
            {tab.label}
            <span
              className={`ml-2 px-2 py-0.5 text-base font-semibold rounded-full ${
                activeTab === tab.id
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab.value}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;
