import { useContext } from "react";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css"; // Ensure React Flow styles are imported
import { CurrentNodeContext } from "../App";

export const CustomNode = ({ data }: any) => {
  const providerData = useContext(CurrentNodeContext);

  return (
    <>
      <div
        className={`shadow-xl min-w-[150px]  ${
          providerData?.selectedNode?.id === data.value
            ? "border-[0.5px] border-blue-500"
            : ""
        } `}
      >
        <div className="bg-[#B2F0E3] !text-[9px] font-bold px-2">
          <p>Send Message</p>
        </div>
        <div className="bg-white px-4 py-2">
          <p className="!text-[12px] font-light">{data?.label}</p>
          {/* <p>{data.value}</p> */}
        </div>
      </div>

      <Handle
        style={{ backgroundColor: "green" }}
        type="source"
        position={Position.Right}
      />
      <Handle
        style={{ backgroundColor: "red" }}
        type="target"
        position={Position.Left}
      />
    </>
  );
};
