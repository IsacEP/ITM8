import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CompanySelector: React.FC = () => {
  const [companies, setCompanies] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");

  useEffect(() => {
    // Load from localStorage
    const storedCompanies = localStorage.getItem("companies");
    if (storedCompanies) {
      const parsed = JSON.parse(storedCompanies);
      setCompanies(parsed);
      // Optionally set a default selected company
      if (parsed.length > 0) {
        setSelectedCompany(parsed[0]);
      }
    }
  }, []);

  const handleSelect = (event: any) => {
    setSelectedCompany(event.target.value);
    localStorage.setItem("selectedCompany", event.target.value);
  };

  const handleAddCompany = () => {
    if (!newCompanyName.trim()) return;
    const updated = [...companies, newCompanyName.trim()];
    setCompanies(updated);
    setSelectedCompany(newCompanyName.trim());
    localStorage.setItem("companies", JSON.stringify(updated));
    localStorage.setItem("selectedCompany", newCompanyName.trim());
    setNewCompanyName("");
    setOpenAddDialog(false);
  };

  const handleDelete = (company: string) => {
    if (!window.confirm(`Are you sure you want to delete ${company}?`)) return;
    const updated = companies.filter((c) => c !== company);
    setCompanies(updated);
    localStorage.setItem("companies", JSON.stringify(updated));
    // Also remove the localStorage data for that company if you want:
    // localStorage.removeItem(`pipelineData_${company}`);
    if (company === selectedCompany && updated.length > 0) {
      setSelectedCompany(updated[0]);
    } else if (updated.length === 0) {
      setSelectedCompany("");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Select
        value={selectedCompany}
        onChange={handleSelect}
        displayEmpty
        sx={{ minWidth: 150, mr: 2 }}
      >
        {companies.map((company) => (
          <MenuItem key={company} value={company}>
            {company}
            {/* If you want the delete icon inline: */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(company);
              }}
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </MenuItem>
        ))}
        <MenuItem value="" onClick={() => setOpenAddDialog(true)}>
          + Add New
        </MenuItem>
      </Select>

      {/* Dialog to add new company */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <Box sx={{ p: 3 }}>
          <TextField
            label="New Company"
            value={newCompanyName}
            onChange={(e) => setNewCompanyName(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleAddCompany} sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CompanySelector;
