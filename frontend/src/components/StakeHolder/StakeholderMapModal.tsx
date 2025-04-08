// In StakeholderMapModal.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface StakeholderMapModalProps {
  name: string;
  setName: (name: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const StakeholderMapModal: React.FC<StakeholderMapModalProps> = ({
  name,
  setName,
  onClose,
  onSave,
}) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>New Stakeholder Map</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Map Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StakeholderMapModal;
