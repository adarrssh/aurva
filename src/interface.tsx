import { Node } from "@xyflow/react";

export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export interface Meals {
    idMeal : string,
    strMeal : string,
    strMealThumb : string
}

export interface CustomNode extends Node {
    idMeal?: string;
  }