import React, { useEffect, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, Node, Edge, Position, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import './App.css';

// Define types for nodes and edges
const initialNodes: Node[] = [
  { 
    id: '0', 
    data: { 
      label: 'Explore' 
    }, 
    position: { 
      x: 100, 
      y: 300 
    },
    sourcePosition: Position.Right, 
    targetPosition: Position.Left,  
  },
  { 
    id: '1', 
    data: { 
      label: 'Node 1' 
    }, 
    position: { 
      x: 300, 
      y: 100 
    },
    sourcePosition: Position.Right, 
    targetPosition: Position.Left,  
  },
  { 
    id: '2', 
    data: { 
      label: 'Node 2' 
    }, 
    position: { 
      x: 300, 
      y: 200 
    },
    sourcePosition: Position.Right, 
    targetPosition: Position.Left,  
  },
  { 
    id: '3', 
    data: { 
      label: 'Node 3' 
    }, 
    position: { 
      x: 300, 
      y: 300 
    },
    sourcePosition: Position.Right, 
    targetPosition: Position.Left,  
  },
  { 
    id: '4', 
    data: { 
      label: 'Node 4' 
    }, 
    position: { 
      x: 300, 
      y: 400 
    },
    sourcePosition: Position.Right, 
    targetPosition: Position.Left,  
  },
  { 
    id: '5', 
    data: { 
      label: 'Node 5' 
    }, 
    position: { 
      x: 300, 
      y: 500 
    },
    sourcePosition: Position.Right, 
    targetPosition: Position.Left,  
  },
];


const initialEdges: Edge[] = [
  { 
    id: 'e0-1', 
    source: '0', 
    target: '1', 
    sourceHandle: null, // Use default handle
    targetHandle: null, // Use default handle
  },
  { 
    id: 'e0-2', 
    source: '0', 
    target: '2', 
    sourceHandle: null, // Use default handle
    targetHandle: null, // Use default handle
  },
  { 
    id: 'e0-3', 
    source: '0', 
    target: '3', 
    sourceHandle: null, // Use default handle
    targetHandle: null, // Use default handle
  },
  { 
    id: 'e0-4', 
    source: '0', 
    target: '4', 
    sourceHandle: null, // Use default handle
    targetHandle: null, // Use default handle
  },
  { 
    id: 'e0-5', 
    source: '0', 
    target: '5', 
    sourceHandle: null, // Use default handle
    targetHandle: null, // Use default handle
  },
];

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [nodeName, setNodeName] = useState<string>('Node 1');
  const [nodeBg, setNodeBg] = useState<string>('#eee');
  const [nodeHidden, setNodeHidden] = useState<boolean>(false);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      defaultViewport={defaultViewport}
      minZoom={0.2}
      maxZoom={4}
      attributionPosition="bottom-left"
      fitView
      fitViewOptions={{ padding: 0.5 }}
    >
      <Background/>
    </ReactFlow>
  );
};

export default App;