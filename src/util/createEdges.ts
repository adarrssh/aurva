import { Edge, Node } from "@xyflow/react";
import { Category, CustomNode } from "../interface";

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

    return {
        id: 'e' + `${sourceId}` + '-' + `${newId}`,
        source:`${sourceId}`,
        target:`${newId}`,
        type: 'step'
    }
} 

const createMealsEdge = (node: Node, nodesArr : Node[] ) : Edge[] => {
    
    const sourceId = Number(node.id)


    return nodesArr.slice(0, 5).map((_, index) => ({
        id: 'e' + `${sourceId}` + '-' + `${sourceId + index + 1}`,
        source:`${sourceId}`,
        target:`${sourceId + index+1}`
    }));
}

const createIngredientsTagsAndDetailsEdge = (node:Node, nodesArr: Node[]) : Edge[] => {
    const index = Number( nodesArr[nodesArr.length-1].id )
    const sourceId = Number(node.id)

    return [

        {
            id: 'e' + `${sourceId}` + '-' + `${index + 1}`,
            source:`${sourceId}`,
            target:`${index+1}`
        },
        {
            id: 'e' + `${sourceId}` + '-' + `${index + 2}`,
            source:`${sourceId}`,
            target:`${index+2}`
        },
        {
            id: 'e' + `${sourceId}` + '-' + `${index + 3}`,
            source:`${sourceId}`,
            target:`${index+3}`
        }
    ]
}

const createIngredientEdge = (node: Node, nodesArr: Node[]) : Edge[] => {
    const sourceId = Number(node.id)
    const  n = nodesArr.length
    const id = Number(nodesArr[n-1].id)

    return nodesArr.slice(0, 5).map((_, index) => ({
        id: 'e' + `${sourceId}` + '-' + `${id + 1+  index }`,
        source:`${sourceId}`,
        target:`${id + 1 + index}`
    }));
}

const createTagsEdge = (node: Node, nodesArr: Node[], result : CustomNode[]) : Edge[] => {
    const sourceId = Number(node.id)
    const  n = nodesArr.length
    const id = Number(nodesArr[n-1].id)

    return result.slice(0, 5).map((_, index) => ({
        id: 'e' + `${sourceId}` + '-' + `${id+index+1}`,
        source:`${sourceId}`,
        target:`${id+index+1}`
    }));
}



export {createCategoriesEdges, createViewMealsEdge, createMealsEdge, createIngredientsTagsAndDetailsEdge, createIngredientEdge, createTagsEdge}

