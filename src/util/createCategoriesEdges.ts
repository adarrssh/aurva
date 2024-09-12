import { Edge, Node } from "@xyflow/react";
import { Category } from "../interface";

const createCategoriesEdges = (categories: Category[]) : Edge[]   => {
    return categories.slice(0, 5).map((_, index) => ({
        id: `e0-${index+1}`,
        source:'0',
        target:`${index+1}`
    }));
}

const createViewMealsEdge = (node: Node, nodesArr : Node[] ) : Edge=> {
    const sourceId = node.id
    const n = nodesArr.length-1;
    const id = nodesArr[n].id
    const newId = (Number(id) + 1).toString()

    console.log({newId})
    return {
        id: 'e' + `${sourceId}` + '-' + `${newId}`,
        source:`${sourceId}`,
        target:`${newId}`,
        type: 'step'
    }
} 



export {createCategoriesEdges, createViewMealsEdge}

