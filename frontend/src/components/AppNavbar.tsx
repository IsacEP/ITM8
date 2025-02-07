import React from "react";
import { Box, Tabs, Tab } from "@mui/material";

const AppNavbar: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="dashboard navigation"
      >
        <Tab label="Overview" />
        <Tab label="Reports" />
        <Tab label="Settings" />
      </Tabs>
    </Box>
  );
};

export default AppNavbar;
