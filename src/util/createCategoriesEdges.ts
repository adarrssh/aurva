import { Edge } from "@xyflow/react";
import { Category } from "../interface";

const createCategoriesEdges = (categories: Category[]) : Edge[]   => {
    return categories.slice(0, 5).map((_, index) => ({
        id: `e0-${index+1}`,
        source:'0',
        target:`${index+1}`
    }));
}


export {createCategoriesEdges}

