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
  Grid,
  Typography,
} from "@mui/material";
import getTeamDetailsService from "../../api/Team/GetTeamDetails/getTeamDetailsService";
import { SafeKaroUser, header, imagePath } from "../../context/constant";
import { ITeamsVM } from "../Admin/Team/ITeam";
import dayjs from "dayjs";
import editTeamService from "../../api/Team/EditTeam/editTeamService";

interface IEditProfileUiProps {
  open: boolean;
  handleClose: () => void;
  data: {
    id?: string;
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;

  useEffect(() => {
    if (open) {
      const formattedDOB = data.dateOfBirth ? dayjs(data.dateOfBirth).format("YYYY-MM-DD") : "";
      setFormData({ ...data, dateOfBirth: formattedDOB });
      setPreviewImage(data.profileImage?.startsWith("data:image") ? data.profileImage : `${imagePath}/${data.profileImage}`);
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
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData) return;

    const payload = new FormData();
    const { profileImage, ...otherFields } = formData;

    if (profileImage && profileImage.startsWith("data:image")) {
      const response = await fetch(profileImage);
      const blob = await response.blob();
      payload.append("profileImage", blob, "profileImage.png");
    }

    payload.append("team", JSON.stringify(otherFields));

    try {
      await editTeamService({ teamId: UserData.profileId, team: payload });
      window.location.reload();
      handleClose();
    } catch (error) {
      console.error("Error while saving and fetching team details:", error);
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
        Edit Profile
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          {/* Profile Image Upload */}
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Avatar
              src={previewImage || ""}
              alt="Profile"
              sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
            />
            <Button variant="outlined" component="label" sx={{ textTransform: "none" }}>
              Upload New Picture
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>
          </Grid>

          {/* Name */}
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12}>
            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth || ""}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>

          {/* Gender */}
          <Grid item xs={12}>
            <TextField
              label="Gender"
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              select
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3 }}>
        <Button onClick={handleClose} variant="outlined" fullWidth>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" fullWidth>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileUi;
