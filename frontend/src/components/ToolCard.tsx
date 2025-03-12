import React from "react";
import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Tool {
  title: string;
  path: string;
  description: string;
}

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      className="
        p-6 
        transition-all 
        duration-300 
        hover:shadow-xl 
        hover:scale-105 
        flex 
        flex-col 
        justify-between
        bg-white
        rounded-2xl
      "
    >
      <div>
        <Typography
          variant="h6"
          gutterBottom
          className="font-bold text-[rgb(95,37,159)]"
        >
          {tool.title}
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-700 leading-relaxed mb-4"
        >
          {tool.description}
        </Typography>
      </div>
      <button
        className="
          bg-[rgb(95,37,159)] 
          hover:bg-purple-800 
          text-white 
          font-semibold 
          py-2 
          px-4 
          rounded-lg
          transition-colors
        "
        onClick={() => navigate(tool.path)}
      >
        Go to {tool.title}
      </button>
    </Paper>
  );
};

export default ToolCard;
