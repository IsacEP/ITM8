// CustomShapes.tsx
import React from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { Box } from "@mui/material";
import { CircleNodeType, DiamondNodeType } from "../types/FlowTypes";

export const CircleNode: React.FC<NodeProps<CircleNodeType>> = ({ data }) => {
  const label = data.label || "No Label";

  return (
    <Box
      sx={{
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        backgroundColor: "lightblue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      {label}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </Box>
  );
};

export const DiamondNode: React.FC<NodeProps<DiamondNodeType>> = ({ data }) => {
  const label = data.label || "No Label";

  return (
    <Box
      sx={{
        width: "120px",
        height: "120px",
        backgroundColor: "lightcoral",
        transform: "rotate(45deg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      <div style={{ transform: "rotate(-45deg)" }}>{label}</div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </Box>
  );
};
