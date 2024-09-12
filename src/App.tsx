import React, { useEffect, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, Node, Edge, Position, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import './App.css';
import defaultCustomNode from './components/DefaultNode';
import categoryCustomNode from './components/categoryNode';
import fetchMealCategory from './services/fetchMealCategory';
import { convertCategoriesToNodes } from './util/convertCategoriesToNodes';
import { CustomNodeData } from './types';

const nodeTypes = {
  defaultCustomNode,
  categoryCustomNode
};


const defaultNode: Node = {
  id: '0',
  data: { label: 'Explore' },
  position: { x: 100, y: 300 },
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  type: 'defaultCustomNode'
};



const initialEdges: Edge[] = [
  { id: 'e0-1', source: '0', target: '1' },
  { id: 'e0-2', source: '0', target: '2' },
  { id: 'e0-3', source: '0', target: '3' },
  { id: 'e0-4', source: '0', target: '4' },
  { id: 'e0-5', source: '0', target: '5' },
];

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const App: React.FC = () => {

  
  const [nodes, setNodes, onNodesChange] = useNodesState([defaultNode]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [additionalNodes, setAdditionalNodes] = useState<Node<CustomNodeData>[]>([])
  const [showAdditionalNodes, setShowAdditionalNodes] = useState<boolean>(false);



  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    console.log(additionalNodes)
    if (node.id === '0') {
      setNodes((nds) => [...nds, ...additionalNodes]);
      setShowAdditionalNodes(true);
    }
  };

  useEffect(()=>{
    let additionalNodes = []
    async function getMeals(){
      try {
        const {categories} = await fetchMealCategory()
        additionalNodes = convertCategoriesToNodes(categories)
        setAdditionalNodes(additionalNodes)
      } catch (error) {
        console.error(error)
        alert('something went wrong')
      }
    }

    getMeals()

  },[])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      defaultViewport={defaultViewport}
      minZoom={0.2}
      maxZoom={4}
      attributionPosition="bottom-left"
      fitView
      fitViewOptions={{ padding: 0.5 }}
      onNodeClick={handleNodeClick}
    >
      <Background />
    </ReactFlow>
  );
};

export default App;