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

export interface GraphProps {
  setMealDetails: (details: any) => void;
  showDetailsPopup: boolean;
  setShowDetailsPopup: (show: boolean) => void;
}

export interface SidebarProps {
    mealDetails: any;
    setShowDetailsPopup: (show: boolean) => void;
}
