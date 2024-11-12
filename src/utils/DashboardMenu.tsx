import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
export default function DashboardMenu({ selectedCategory }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "white" }}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          {" "}
          <Link to="/payouts/month_payout" state={selectedCategory}>
            Monthly Payout
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/payouts/year_payout" state={selectedCategory}>
            Yearly Payout
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/payouts/month_payin" state={selectedCategory}>
            Monthly Pay In
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/payouts/year_payin" state={selectedCategory}>
            Yearly Pay In
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/payouts/year_netPremium" state={selectedCategory}>
            Total Net Premium
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/payouts/year_final_netPremium" state={selectedCategory}>
            Final Net Premium
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/payouts/month_netPremium" state={selectedCategory}>
            Monthly Net Premium
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/payouts/month_final_premium" state={selectedCategory}>
            Monthly Final Premium
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
