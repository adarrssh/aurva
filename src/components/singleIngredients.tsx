import React from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import ingredients from "../assets/ingredients.png";

// Define your custom node component
const SingleIngridientNode: React.FC<NodeProps> = ({data}) => {
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "row",
      width: "200px", 
      borderRadius: "2px",
      border: "1px solid black",
      padding: "5px" 
    }}
  >
    <Handle
      type="source"
      position={Position.Right}
      id="sourceHandle"
      isConnectable={true}
    />
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <img src={ingredients} alt="img" width={'20px'} height={'20px'} />
    </div>
    <div
      style={{
        display: "flex",
        flex: "2",
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "center",
        wordBreak: "break-word",
        overflowWrap: "break-word", 
      }}
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
