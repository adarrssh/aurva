import React from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import globeIcon from "../assets/image.png";

// Define your custom node component
const CustomNode: React.FC<NodeProps> = () => {
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
          display:'flex',
          flex: "1",
          justifyContent:'center',
          alignItems:'center',
          alignContent:'center',
        }}
      >
      <img src={globeIcon} alt="img" height={'15px'} width={'15px'} />
      </div>
      <div         style={{
          display:'flex',
          flex: "2",
          justifyContent:'flex-start',
          alignItems:'center',
          alignContent:'center',
        }}>Explore</div>
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
