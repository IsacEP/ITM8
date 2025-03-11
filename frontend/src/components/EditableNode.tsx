// EditableNode.tsx
import React, { useState } from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { Box, TextField } from "@mui/material";
import { EditableNodeType } from "../types/FlowTypes";

const EditableNode: React.FC<NodeProps<EditableNodeType>> = ({
  data,
  selected,
}) => {
  const [label, setLabel] = useState<string>(data.label || "New Node");

  return (
    <Box
      sx={{
        padding: "10px",
        border: "2px solid #6200ea",
        borderRadius: "5px",
        backgroundColor: "white",
        boxShadow: selected ? "0 0 10px rgba(0,0,0,0.2)" : "none",
        minWidth: "150px",
        textAlign: "center",
      }}
    >
      {selected ? (
        <TextField
          fullWidth
          variant="standard"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          autoFocus
        />
      ) : (
        <strong>{label}</strong>
      )}

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
};

export default EditableNode;
