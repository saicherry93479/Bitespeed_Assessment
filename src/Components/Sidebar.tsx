import React from "react";
import Messageicon from "../assets/Icons/Messageicon";

const Sidebar = ({
  setCurrentNodeText,
  currentNodeText,
}: {
  setCurrentNodeText: (nodeText: string) => void;
  currentNodeText: string;
}) => {
  // Function to handle the drag start event, sets the type of node being dragged
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    // event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="!w-[25%] bg-white border-l-[1px] border-black/20 ">
      <h3 className="text-lg font-semibold mb-4 border-b-[1px] border-black/20 p-4">
        Add a new Node
      </h3>

      <div className="p-4 ">
        {/* This is the draggable node element for the Message Node */}
        <div
          className="flex flex-col gap-2 justify-center items-center w-[100%] min-h-[150px] border-blue-800 border-[1px] bg-white p-2 rounded-md cursor-pointer shadow-sm mb-2"
          draggable
          onDragStart={(e) => onDragStart(e)} // Specify the type of node here
        >
          <Messageicon></Messageicon>

          <input
            className="text-blue-800 text-center py-2 px-[1px] max-w-full"
            value={currentNodeText}
            onChange={(e) => setCurrentNodeText(e.target.value)}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
