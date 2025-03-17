import { Node } from "@xyflow/react";

export interface CustomNodeData extends Record<string, unknown> {
  label: string;
  onLabelChange?: (id: string, newLabel: string) => void;
  onDelete?: (id: string) => void;
}

export type EditableNodeType = Node<CustomNodeData, "editable">;
export type CircleNodeType = Node<CustomNodeData, "circle">;
export type DiamondNodeType = Node<CustomNodeData, "diamond">;

export type CustomNode = EditableNodeType | CircleNodeType | DiamondNodeType;

export interface Stakeholder {
  name: string;
  x: number;
  y: number;
}
