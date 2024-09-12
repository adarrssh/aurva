import React from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import globeIcon from "../assets/image.png";

// Define your custom node component
const CustomNode: React.FC<NodeProps> = () => {
  return (
    <div className="flex flex-row w-[120px] h-[40px] rounded border border-black">
      <Handle
        type="source"
        position={Position.Right}
        id="sourceHandle"
        isConnectable={true}
      />
      <div className="flex flex-2 justify-center items-center  px-4">
        <img src={globeIcon} alt="img" className="h-[15px] w-[15px]" />
      </div>
      <div className="flex flex-1 justify-start items-center break-words overflow-clip">
        Explore
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

export default CustomNode;
