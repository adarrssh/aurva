import { Node, Position } from "@xyflow/react";
import { Category, CustomNode, Meals } from "../interface";



const convertCategoriesToNodes = (categories: Category[]): Node[] => {
  return categories.slice(0, 5).map((category, index) => ({
    id: (index + 1).toString(),
    data: { label: category.strCategory },
    position: { x: 300, y: 100 + index * 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    type: "categoryCustomNode",
  }));
};

const addViewMealsNode = (node: Node, nodesArr: Node[]): Node => {
  const n = nodesArr.length - 1;
  const id = nodesArr[n].id;
  const { position, data } = node;
  const { x: xAxisPos, y: yAxisPos } = position;

  return {
    id: (Number(id) + 1).toString(),
    data: { label: "view Meals", food: data.label },
    position: { x: xAxisPos + 200, y: yAxisPos - 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    type: "viewMealNode",
  };
};

const addMealsofSingleCategory = (
  node: Node,
  nodesArr: Node[],
  meals: Meals[]
): Node[] => {
  const n = nodesArr.length - 1;
  const newId = Number(nodesArr[n].id);
  const { position, data } = node;
  const { x: xAxisPos, y: yAxisPos } = position;

  return meals.slice(0, 5).map((meal, index) => ({
    id: (newId + index + 1).toString(),
    idMeal: meal.idMeal,
    data: { label: meal.strMeal },
    position: { x: xAxisPos + 300, y: index * 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    type: "SingleViewMealNode",
  }));
};

const addIngrdientsTagsAndDetailsNode = (
  node: CustomNode,
  nodesArr: Node[]
): CustomNode[] => {
  const n = nodesArr.length - 1;
  const newId = Number(nodesArr[n].id);
  const { position, idMeal } = node;
  const { x: xAxisPos, y: yAxisPos } = position;

  return [
    {
      id: (newId + 1).toString(),
      idMeal,
      data: { label: "View Ingredients" },
      position: { x: xAxisPos + 300, y: yAxisPos - 100 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      // type:'viewIngredients'
    },
    {
      id: (newId + 2).toString(),
      idMeal,
      data: { label: "View Tags" },
      position: { x: xAxisPos + 300, y: yAxisPos },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      // type:'viewTags'
    },
    {
      id: (newId + 3).toString(),
      idMeal,
      data: { label: "View Details" },
      position: { x: xAxisPos + 300, y: yAxisPos + 100 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      // type:'viewDetails'
    },
  ];
};

export {
  convertCategoriesToNodes,
  addViewMealsNode,
  addMealsofSingleCategory,
  addIngrdientsTagsAndDetailsNode,
};
