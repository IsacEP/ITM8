import { Node } from "@xyflow/react";

export interface CustomNodeData extends Record<string, unknown> {
  label: string;
}

// Define each node with a specific type field.
export type EditableNodeType = Node<CustomNodeData, "editable">;
export type CircleNodeType = Node<CustomNodeData, "circle">;
export type DiamondNodeType = Node<CustomNodeData, "diamond">;

// Union type for all custom nodes.
export type CustomNode = EditableNodeType | CircleNodeType | DiamondNodeType;

export interface Stakeholder {
  name: string;
  x: number;
  y: number;
}
