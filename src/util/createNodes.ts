import { Node, Position } from "@xyflow/react";
import { Category, CustomNode, Meals } from "../interface";
import { getAllDetailsOfMeals } from "../services/api";

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
    position: { x: xAxisPos + 400, y: yAxisPos - 100 },
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
  const { position } = node;
  const { x: xAxisPos } = position;

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
      type: "viewIngredientsNode",
    },
    {
      id: (newId + 2).toString(),
      idMeal,
      data: { label: "View Tags" },
      position: { x: xAxisPos + 300, y: yAxisPos },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      type: "ViewTagsNode",
    },
    {
      id: (newId + 3).toString(),
      idMeal,
      data: { label: "View Details" },
      position: { x: xAxisPos + 300, y: yAxisPos + 100 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      type: "viewDetailsNode",
    },
  ];
};

const addIngredientsNode = async (
  node: CustomNode,
  nodesArr: Node[]
): Promise<CustomNode[] | Error> => {
  const idMeal = node.idMeal as string;
  const { position } = node;
  const { x: xAxisPos, y: yAxisPos } = position;
  const n = nodesArr.length - 1;
  const newId = Number(nodesArr[n].id);

  try {
    const response = await getAllDetailsOfMeals(idMeal);
    const mealDetails = response.data["meals"][0];

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = mealDetails[`strIngredient${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(ingredient);
      }
    }

    return ingredients.slice(0, 5).map((ingredient, index) => ({
      id: (newId + index + 1).toString(),
      idMeal,
      data: { label: ingredient },
      position: { x: xAxisPos + 300, y: yAxisPos - index * 100 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      type:'singleIngridientNode'
    }));
  } catch (error) {
    console.error("Error fetching meal details:", error);
    return new Error("Failed to fetch meal details");
  }
};

const addTagsNode = async (
  node: CustomNode,
  nodesArr: Node[]
): Promise<CustomNode[] | Error> => {
  const idMeal = node.idMeal as string;
  const { position } = node;
  const { x: xAxisPos, y: yAxisPos } = position;
  const n = nodesArr.length - 1;
  const newId = Number(nodesArr[n].id);

  try {
    const response = await getAllDetailsOfMeals(idMeal);
    const mealDetails = response.data["meals"][0];
    const tags = mealDetails.strTags;

    if (!tags) {
      return [{
        id: (newId +1).toString(),
        idMeal,
        data: { label: 'NA' },
        position: { x: xAxisPos + 300, y: yAxisPos + 1 * 100 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        type:'notAvailablNode'
      }];
    }

    // Split tags by comma and filter out any empty strings
    const ingredients = tags
      .split(",")
      .map((tag: any) => tag.trim())
      .filter((tag: any) => tag.length > 0);

    return ingredients.slice(0, 5).map((ingredient: string, index: number) => ({
      id: (newId + index + 1).toString(),
      idMeal,
      data: { label: ingredient },
      position: { x: xAxisPos + 300, y: yAxisPos + index * 100 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      type: "ViewTagsNode",
    }));
  } catch (error) {
    console.error("Error fetching tag details:", error);
    return new Error("Failed to tag  details");
  }
};

export {
  convertCategoriesToNodes,
  addViewMealsNode,
  addMealsofSingleCategory,
  addIngrdientsTagsAndDetailsNode,
  addIngredientsNode,
  addTagsNode,
};
