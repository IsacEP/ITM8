// Flow.tsx
import React, { useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from "@xyflow/react";
import { Button, Box, Menu, MenuItem } from "@mui/material";
import "@xyflow/react/dist/style.css";
import EditableNode from "../components/EditableNode";
import { CircleNode, DiamondNode } from "../components/CustomShapes";
import { CustomNode } from "../types/FlowTypes";

const getId = () => `node_${+new Date()}`;

const nodeTypes = {
  editable: EditableNode,
  circle: CircleNode,
  diamond: DiamondNode,
};

const Flow: React.FC = () => {
  const loadFromStorage = (key: string, defaultValue: any) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  // Use the union type for nodes.
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(
    loadFromStorage("nodes", [])
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    loadFromStorage("edges", [])
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
  }, [nodes, edges]);

  const addNode = (type: keyof typeof nodeTypes) => {
    const newNode: CustomNode = {
      id: getId(),
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      data: { label: "New Node" },
      type, // this must match one of the discriminants ("editable", "circle", "diamond")
    };
    setNodes((nds) => [...nds, newNode]);
    setAnchorEl(null);
  };

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Box sx={{ height: "90vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", gap: 2, p: 2, backgroundColor: "#f5f5f5" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          Add Node
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => addNode("editable")}>Editable Box</MenuItem>
          <MenuItem onClick={() => addNode("circle")}>Circle</MenuItem>
          <MenuItem onClick={() => addNode("diamond")}>Decision Node</MenuItem>
        </Menu>
      </Box>

      <Box sx={{ flex: 1 }}>
        <ReactFlow<CustomNode, Edge>
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </Box>
    </Box>
  );
};

export default Flow;
