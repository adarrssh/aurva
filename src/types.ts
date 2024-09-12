// src/types.ts

import { Node } from "@xyflow/react";

// Define the CustomNodeData type
export type CustomNodeData = {
  label: string;
};

// Optionally, you can define other types here as well
export type CustomNode = Node<CustomNodeData>;
