import React from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import mealIcon from "../assets/arrow.png";

// Define your custom node component
const ViewTagsNode: React.FC<NodeProps> = ({data}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "150px",
        height: "40px",
        borderRadius: "2px",
        border: "1px solid black",
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
        <img src={mealIcon} alt="img"  />
      </div>
      <div
        style={{
          display: "flex",
          flex: "2",
          justifyContent: "flex-start",
          alignItems: "center",
          alignContent: "center",
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

export default ViewTagsNode;
