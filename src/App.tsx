import React, { useEffect, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, Node, Edge, Position, Background, type NodeTypes,  } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import './App.css';
import defaultCustomNode from './components/DefaultNode';
import categoryCustomNode from './components/categoryNode';
import fetchMealCategory from './services/fetchMealCategory';
import { addViewMealsEdge, addViewMealsNode, convertCategoriesToNodes } from './util/convertCategoriesToNodes';
import { createCategoriesEdges } from './util/createCategoriesEdges';

const nodeTypes : NodeTypes = {
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



const initialEdges: Edge[] = [];

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const App: React.FC = () => {

  
  const [nodes, setNodes, onNodesChange] = useNodesState([defaultNode]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [additionalNodes, setAdditionalNodes] = useState<Node[]>([])
  const [additionalEdges, setAdditionalEdges] = useState<Edge[]>([])
  const [showAdditionalNodes, setShowAdditionalNodes] = useState<boolean>(false);

  const [showCategoryNode , setShowCategoryNode] = useState(false)
  const [showMealsNode, setShowMealsNode] = useState(false)



  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    if (node.id === '0' && !showCategoryNode) {
      setNodes((nds) => [...nds, ...additionalNodes]);
      setEdges((nds)=> [...nds , ...additionalEdges])
      setShowAdditionalNodes(true);
      setShowCategoryNode(true)
    }

    if(node.type == "categoryCustomNode" && !showMealsNode ){
      setShowMealsNode(true)
      const viewMealNode = addViewMealsNode(node, nodes)
      const viewMealEdge = addViewMealsEdge(node, nodes)
      setNodes((nds) => [...nds, viewMealNode]);
      // console.log([...nodes,viewMealNode])
      console.log([...edges,viewMealEdge])

      setEdges((nds)=> [...nds,viewMealEdge])
    }
  };

  useEffect(()=>{
    let additionalNodes = []
    let additionalEdges = []
    async function getMeals(){
      try {
        const {categories} = await fetchMealCategory()
        additionalNodes = convertCategoriesToNodes(categories)
        additionalEdges = createCategoriesEdges(categories)
        setAdditionalNodes(additionalNodes)
        setAdditionalEdges(additionalEdges)
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