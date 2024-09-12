import React from "react";
import { Handle, type NodeProps, Position } from "@xyflow/react";
import categoryIcon from "../assets/category.png";


const CustomNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "120px",
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
        <img src={categoryIcon} alt="img" height={"15px"} width={"15px"} />
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

export default CustomNode;
