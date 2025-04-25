import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Avatar,
  Box,
} from "@mui/material";
import getTeamDetailsService from "../../api/Team/GetTeamDetails/getTeamDetailsService";
import { SafeKaroUser, header } from "../../context/constant";
import { ITeamsVM } from "../Admin/Team/ITeam";
import dayjs from "dayjs";

interface IEditProfileUiProps {
  open: boolean;
  handleClose: () => void;
  data: {
    profileImage?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    gender?: string;
  };
}


const EditProfileUi: React.FC<IEditProfileUiProps> = ({ open, handleClose, data }) => {
  const [formData, setFormData] = useState<ITeamsVM | null>(null);

  useEffect(() => {
    console.log("Data:", data);
    if (open) {
      setFormData({
        ...data,
        dateOfBirth: data.dateOfBirth ? dayjs(data.dateOfBirth).format("YYYY-MM-DD") : "",
      });
    }
  }, [open, data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && formData) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Updated Data:", formData);
    handleClose();
  };

  if (!formData) {
    return null; // Render nothing until data is loaded
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 1,
          alignItems: "center",
        }}
      >
        {/* Profile Picture Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            src={formData.profileImage}
            alt="Profile Picture"
            sx={{ width: 80, height: 80 }}
          />
          <Button
            variant="outlined"
            component="label"
            sx={{ textTransform: "none" }}
          >
            Upload Picture
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Button>
        </Box>

        {/* Form Fields */}
        <TextField
          label="Name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber || ""}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth || ""}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Gender"
          name="gender"
          value={formData.gender || ""}
          onChange={handleChange}
          select
          fullWidth
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileUi;