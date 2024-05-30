import { Node } from "reactflow";
import BackArrow from "../assets/Icons/BackArrow";

const SettingsPanel = ({
  selectedNode,
  setSelectedNode,
  updateNodeText,
}: {
  selectedNode: Node;
  setSelectedNode: (arg0: Node | null) => void;
  updateNodeText: (text: string) => void;
}) => {
  return (
    <div className="!w-[25%] bg-white border-l-[1px] border-black/20 ">
      <div className="flex  gap-4 items-center border-b-[1px] border-black/20 p-4">
        <div className="cursor-pointer " onClick={() => setSelectedNode(null)}>
          <BackArrow></BackArrow>
        </div>
        <h3 className="text-lg font-semibold ">Edit Message</h3>
      </div>
      <div className="p-4">
        <textarea
            className="border-[1px] border-black/40 w-full p-2 rounded-md outline-blue-800 "
          value={selectedNode.data.label}
          onChange={(e) => updateNodeText(e.target.value)}
          placeholder="Edit Text..."
          rows={5}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
