import React, { useEffect, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Position,
  Background,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import "./App.css";
import defaultCustomNode from "./components/DefaultNode";
import categoryCustomNode from "./components/categoryNode";
import viewMealNode from "./components/viewMealNode";
import { fetchCategory, fetchMealsByCategory } from "./services/api";
import {
  addIngrdientsTagsAndDetailsNode,
  addIngredientsNode,
  addMealsofSingleCategory,
  addTagsNode,
  addViewMealsNode,
  convertCategoriesToNodes,
} from "./util/createNodes";
import {
  createCategoriesEdges,
  createIngredientEdge,
  createIngredientsTagsAndDetailsEdge,
  createMealsEdge,
  createTagsEdge,
  createViewMealsEdge,
} from "./util/createEdges";
import SingleViewMealNode from "./components/singleMealNode";
import NotAvailablNode from "./components/notAvailableNode";
import SingleIngridientNode from "./components/singleIngredients";


const nodeTypes: NodeTypes = {
  defaultCustomNode,
  categoryCustomNode,
  viewMealNode,
  SingleViewMealNode,
  viewIngredientsNode : viewMealNode,
  ViewTagsNode : viewMealNode,
  viewDetailsNode : viewMealNode,
  notAvailablNode:NotAvailablNode,
  singleIngridientNode:SingleIngridientNode
};

const defaultNode: Node = {
  id: "0",
  data: { label: "Explore" },
  position: { x: 100, y: 300 },
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  type: "defaultCustomNode",
};

const initialEdges: Edge[] = [];

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([defaultNode]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [additionalNodes, setAdditionalNodes] = useState<Node[]>([]);
  const [additionalEdges, setAdditionalEdges] = useState<Edge[]>([]);
// @ts-ignore
  const [showAdditionalNodes, setShowAdditionalNodes] =
    useState<boolean>(false);

  const [showCategoryNode, setShowCategoryNode] = useState(false);
  const [showMealsNode, setShowMealsNode] = useState(false);
// @ts-ignore
  const handleNodeClick = async (event: React.MouseEvent, node: Node) => {
    try {

      console.log(node);
      if (node.id === "0" && !showCategoryNode) {
        setNodes((nds) => [...nds, ...additionalNodes]);
        setEdges((nds) => [...nds, ...additionalEdges]);
        setShowAdditionalNodes(true);
        setShowCategoryNode(true);
      }

      if (node.type == "categoryCustomNode" && !showMealsNode) {
        setShowMealsNode(true);
        const viewMealNode = addViewMealsNode(node, nodes);
        const viewMealEdge = createViewMealsEdge(node, nodes);
        setNodes((nds) => [...nds, viewMealNode]);

        setEdges((nds) => [...nds, viewMealEdge]);
      }

      if (node.type == "viewMealNode") {
        const { data } = node;
        const food: string = data.food as string;

        const res = await fetchMealsByCategory(food);
        const mealNodes = addMealsofSingleCategory(node, nodes, res.meals);
        const mealEdges = createMealsEdge(node, mealNodes);

        setNodes((nds) => [...nds, ...mealNodes]);
        setEdges((nds) => [...nds, ...mealEdges]);
      }

      if (node.type == "SingleViewMealNode") {
        const getNodes = addIngrdientsTagsAndDetailsNode(node, nodes);
        const getEdges = createIngredientsTagsAndDetailsEdge(node, nodes);
        setNodes((nds) => [...nds, ...getNodes]);
        setEdges((nds) => [...nds, ...getEdges]);
      }

      if (node.type == "viewIngredientsNode") {
        const result = await addIngredientsNode(node, nodes);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setNodes((prevNodes) => [...prevNodes, ...result]);
        }

        const getEdges = createIngredientEdge(node,nodes)
        setEdges((nds)=>[...nds, ...getEdges])
      }

      if(node.type == "ViewTagsNode"){
        console.log(node)
        const result = await addTagsNode(node,nodes)
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setNodes((prevNodes) => [...prevNodes, ...result]);
        }

        const getEdges = createTagsEdge(node,nodes);
        setEdges((nds)=>[...nds, ...getEdges])
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        alert("Error: " + error.message);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    let additionalNodes = [];
    let additionalEdges = [];
    async function getMeals() {
      try {
        const { categories } = await fetchCategory();
        additionalNodes = convertCategoriesToNodes(categories);
        additionalEdges = createCategoriesEdges(categories);
        setAdditionalNodes(additionalNodes);
        setAdditionalEdges(additionalEdges);
      } catch (error) {
        console.error(error);
        alert("something went wrong");
      }
    }

    getMeals();
  }, []);

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
