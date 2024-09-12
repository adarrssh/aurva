import React from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import mealIcon from "../assets/arrow.png";

const ViewMealNode: React.FC<NodeProps> = ({data}) => {
  return (
    <div
      className="flex flex-row w-[200px] h-[40px] rounded border border-black"
    >
      <Handle
        type="source"
        position={Position.Right}
        id="sourceHandle"
        isConnectable={true}
      />
      <div
        className="flex flex-2 justify-center items-center  px-4"
      >
        <img src={mealIcon} alt="img" width={'40px'} height={'40px'}  />
      </div>
      <div
       className="flex flex-1 justify-start items-center break-words overflow-clip"
      >
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

export default ViewMealNode;
