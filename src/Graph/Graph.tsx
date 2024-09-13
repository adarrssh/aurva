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

import defaultCustomNode from "../components/customNodes/DefaultNode";
import categoryCustomNode from "../components/customNodes/categoryNode";
import viewMealNode from "../components/customNodes/viewMealNode";
import { fetchCategory, fetchMealsByCategory, getAllDetailsOfMeals } from "../services/api";
import {
  addIngrdientsTagsAndDetailsNode,
  addIngredientsNode,
  addMealsofSingleCategory,
  addTagsNode,
  addViewMealsNode,
  convertCategoriesToNodes,
} from "../util/createNodes";
import {
  createCategoriesEdges,
  createIngredientEdge,
  createIngredientsTagsAndDetailsEdge,
  createMealsEdge,
  createTagsEdge,
  createViewMealsEdge,
} from "../util/createEdges";

import SingleViewMealNode from "../components/customNodes/singleMealNode";
import NotAvailablNode from "../components/customNodes/notAvailableNode";
import SingleIngridientNode from "../components/customNodes/singleIngredients";
import SingleTagNode from "../components/customNodes/singleTagNode";
import { GraphProps } from "../interface";
import { checkForViewDetailsNode } from "../util/util";

const nodeTypes: NodeTypes = {
  defaultCustomNode,
  categoryCustomNode,
  viewMealNode,
  singleViewMealNode: SingleViewMealNode,
  viewIngredientsNode: viewMealNode,
  viewTagsNode: viewMealNode,
  viewDetailsNode: viewMealNode,
  notAvailablNode: NotAvailablNode,
  singleIngridientNode: SingleIngridientNode,
  singleTagNode: SingleTagNode,
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


const Graph: React.FC<GraphProps> = ({setMealDetails , showDetailsPopup ,setShowDetailsPopup}) => {

  const [nodes, setNodes, onNodesChange] = useNodesState([defaultNode]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [additionalNodes, setAdditionalNodes] = useState<Node[]>([]);
  const [additionalEdges, setAdditionalEdges] = useState<Edge[]>([]);

  // @ts-ignore
  const [showAdditionalNodes, setShowAdditionalNodes] = useState<boolean>(false);

  const [showCategoryNode, setShowCategoryNode] = useState(false);
  const [clickedViewMealNode, setClickedViewMealNode] = useState(false)
  const [clickedOnShowIngridientsNoe, setClickedOnShowIngridientsNode] = useState(false)
  const [clickedOnShowTagNode, setClickedOnShowTagNode] = useState(false)
  

  // @ts-ignore
  const handleNodeClick = async (event: React.MouseEvent, node: Node) => {

    try {
      if (node.id === "0" && !showCategoryNode) {
        setNodes((nds) => [...nds, ...additionalNodes]);
        setEdges((nds) => [...nds, ...additionalEdges]);
        setShowAdditionalNodes(true);
        setShowCategoryNode(true);
      }

      if (node.type == "categoryCustomNode") {

        const type = nodes[nodes.length-1].type

        if(type == "viewMealNode"){

          const arrofNodes = nodes.slice(0,nodes.length-1)
          const arrofEdges = edges.slice(0,edges.length-1)
          const viewMealNode = addViewMealsNode(node, arrofNodes);
          const viewMealEdge = createViewMealsEdge(node, arrofNodes);
                 
          setNodes([...arrofNodes,viewMealNode]);
          setEdges([...arrofEdges, viewMealEdge]);
        }else if(!clickedViewMealNode){ 
          const viewMealNode = addViewMealsNode(node, nodes);
          const viewMealEdge = createViewMealsEdge(node, nodes);
          
          setNodes((nds) => [...nds, viewMealNode]);
          setEdges((nds) => [...nds, viewMealEdge]);
        }

      }

      if (node.type == "viewMealNode" && !clickedViewMealNode) {
        const { data } = node;
        const food: string = data.food as string;

        const res = await fetchMealsByCategory(food);
        const mealNodes = addMealsofSingleCategory(node, nodes, res.meals);
        const mealEdges = createMealsEdge(node, mealNodes);

        setNodes((nds) => [...nds, ...mealNodes]);
        setEdges((nds) => [...nds, ...mealEdges]);
        setClickedViewMealNode(true)
      }

      if (node.type == "singleViewMealNode") {

        const type = nodes[nodes.length-1].type

        // @ts-ignore
        const isViewDetailsPresent = checkForViewDetailsNode(nodes)

        if( !clickedOnShowIngridientsNoe && !clickedOnShowTagNode && type === "viewDetailsNode"){
          const arrofNodes = nodes.slice(0,nodes.length-3)
          const arrofEdges = edges.slice(0,edges.length-3)

          const getNodes = addIngrdientsTagsAndDetailsNode(node, arrofNodes);
          const getEdges = createIngredientsTagsAndDetailsEdge(node, arrofNodes);
                 
          setNodes([...arrofNodes,...getNodes]);
          setEdges([...arrofEdges, ...getEdges]);
        }else if(!isViewDetailsPresent){
          const getNodes = addIngrdientsTagsAndDetailsNode(node, nodes);
          const getEdges = createIngredientsTagsAndDetailsEdge(node, nodes);
          setNodes((nds) => [...nds, ...getNodes]);
          setEdges((nds) => [...nds, ...getEdges]);
        }
      }

      if (node.type == "viewIngredientsNode" && !clickedOnShowIngridientsNoe) {
        const result = await addIngredientsNode(node, nodes);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setNodes((prevNodes) => [...prevNodes, ...result]);
        }

        const getEdges = createIngredientEdge(node, nodes);
        setEdges((nds) => [...nds, ...getEdges]);
        setClickedOnShowIngridientsNode(true)
      }

      if (node.type == "viewTagsNode" && !clickedOnShowTagNode) {
        const result = await addTagsNode(node, nodes);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setNodes((prevNodes) => [...prevNodes, ...result]);
          const getEdges = createTagsEdge(node,nodes, result);
          setEdges((nds) => [...nds, ...getEdges]);
          setClickedOnShowTagNode(true)
        }


      }

      if(node.type == "viewDetailsNode" && !showDetailsPopup ){
        //@ts-ignore
        const response = await getAllDetailsOfMeals(node.idMeal);
        const mealDetails = response.data["meals"][0];
        const {strInstructions,strMealThumb,strCategory,strArea,strYoutube,strSource,strMeal} = mealDetails
        setMealDetails({
          strInstructions,
          strMealThumb,
          strCategory,
          strArea,
          strYoutube,
          strSource,
          strMeal
        })
        setShowDetailsPopup(true)
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

export default Graph;
