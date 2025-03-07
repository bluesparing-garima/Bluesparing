import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface UpgradePlanPopupProps {
  open: boolean;
  onClose: () => void;
}

const UpgradePlanPopup: React.FC<UpgradePlanPopupProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upgrade Required</DialogTitle>
      <DialogContent>
        <p>You have reached your policy limit. Please upgrade your plan to create more policies.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={() => navigate("/update-plan")} color="primary" variant="contained">
          Upgrade Plan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpgradePlanPopup;
