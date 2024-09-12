import React from "react";
import { Handle, type NodeProps, Position } from "@xyflow/react";
import categoryIcon from "../../assets/category.png";

const CustomNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="flex flex-row w-[180px] rounded border border-black py-2">
      <Handle
        type="source"
        position={Position.Right}
        id="sourceHandle"
        isConnectable={true}
      />
      <div className="flex flex-2 justify-center items-center  px-4">
        <img src={categoryIcon} alt="img" className="h-[15px] w-[15px]" />
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

export default CustomNode;
