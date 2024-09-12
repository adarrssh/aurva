import React from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import mealIcon from "../../assets/arrow.png";

// Define your custom node component
const ViewTagsNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="flex flex-row w-[150px] h-[40px] rounded border border-black py-2">
      <Handle
        type="source"
        position={Position.Right}
        id="sourceHandle"
        isConnectable={true}
      />
      <div className="flex flex-2 justify-center items-center  px-4">
        <img src={mealIcon} alt="img" />
      </div>
      <div className="flex flex-1 justify-start items-center break-words overflow-clip">
        {(data as any).label}
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id="targetHandle"
        isConnectable={true}
      />
    </div>
  );
};

export default ViewTagsNode;
