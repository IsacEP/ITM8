import React from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

const CanvasPage: React.FC = () => {
  return (
    <div style={{ position: "fixed", inset: 0, marginTop: "80px" }}>
      <Tldraw persistenceKey="canvasPage" />
    </div>
  );
};

export default CanvasPage;
