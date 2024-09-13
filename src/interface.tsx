import { Node } from "@xyflow/react";

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Meals {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface CustomNode extends Node {
  idMeal?: string;
}

interface details {
  strArea: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  strMeal: string;
  strSource: string;
}

export interface GraphProps {
  setMealDetails: (details: details) => void;
  showDetailsPopup: boolean;
  setShowDetailsPopup: (show: boolean) => void;
}

export interface SidebarProps {
  mealDetails: details;
  setShowDetailsPopup: (show: boolean) => void;
}
