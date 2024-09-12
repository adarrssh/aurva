import { Node, Position } from "@xyflow/react";
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

export  {convertCategoriesToNodes}