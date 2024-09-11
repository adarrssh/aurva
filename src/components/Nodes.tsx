import React from 'react';
import { NodeProps } from '@xyflow/react';
import globeIcon from '../assets/image.png'

// Define your custom node component
const CustomNode: React.FC<NodeProps> = () => {
  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fff', display: 'flex', alignItems: 'center' }}>
      <img src={globeIcon} alt="logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
      <span>Explore</span>
    </div>
  );
};

export default CustomNode;
