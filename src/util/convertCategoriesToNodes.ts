import { Edge, Node, Position } from "@xyflow/react";
import { Category } from "../interface";

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

    console.log(data.label)

    return {
        id: (Number(id) + 1).toString(),
        data : {label : 'view Meals', food:data.label},
        position : { x : xAxisPos + 200 , y: yAxisPos - 100 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        type: 'viewMealNode',

    }
    
}



export  {convertCategoriesToNodes, addViewMealsNode}