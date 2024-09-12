import { Edge, Node, Position } from "@xyflow/react";
import { Category, Meals } from "../interface";

const convertCategoriesToNodes = (categories: Category[]): Node[] => {
    return categories.slice(0, 5).map((category, index) => ({
        id: (index + 1).toString(),
        data: { label: category.strCategory },
        position: { x: 300, y: 100 + index * 100 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        type: 'categoryCustomNode',
    }));
};


const addViewMealsNode = (node: Node, nodesArr : Node[] ) : Node => {

    const n = nodesArr.length-1;
    const id = nodesArr[n].id
    const {position, data} = node;
    const {  x : xAxisPos ,  y : yAxisPos  } = position


    return {
        id: (Number(id) + 1).toString(),
        data : {label : 'view Meals', food:data.label},
        position : { x : xAxisPos + 200 , y: yAxisPos - 100 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        type: 'viewMealNode',
    }
}


const addMealsofSingleCategory =(node: Node, nodesArr : Node[], meals : Meals[] ) : Node[] => {

    const n = nodesArr.length-1;
    const newId = Number( nodesArr[n].id ) 
    const {position, data} = node;
    const {  x : xAxisPos ,  y : yAxisPos  } = position

    return meals.slice(0, 5).map((meal, index) => ({
        id: (newId + index + 1).toString(),
        data: { label: meal.strMeal },
        position : { x : xAxisPos + 300 , y: index * 100 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    }));
}



export  {convertCategoriesToNodes, addViewMealsNode,addMealsofSingleCategory}