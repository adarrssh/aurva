import React from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import ingredients from "../../assets/ingredients.png";

// Define your custom node component
const SingleIngridientNode: React.FC<NodeProps> = ({data}) => {
  return (
    <div
    className="flex flex-row w-[200px] rounded border border-black py-2"
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
      <img src={ingredients} alt="img" width={'20px'} height={'20px'} />
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

export default SingleIngridientNode;
