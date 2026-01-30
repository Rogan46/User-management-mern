import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Component/Header";
import { addUser } from "../Service/userservice";
import { blue } from "@mui/material/colors";

function AddUser() {
  const [user, setUser] = useState({ status: "active" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profile: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    await addUser(user);
    navigate("/");
  };

  return (
  <Box sx={{ backgroundColor: "#f4f4f4", minHeight: "100vh", width: "100vw" }}>
    <Header />

    <Box sx={{ width: "100%", px: { xs: 2, md: 4 }, py: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={3} color="black">
        Register Your Details
      </Typography>

      <Box component="form" display="grid" gap={3}>
        {/* NAME */}
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2}>
          <TextField
            name="firstName"
            label="First name"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="lastName"
            label="Last Name"
            onChange={handleChange}
            fullWidth
          />
        </Box>

        {/* EMAIL + MOBILE */}
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2}>
          <TextField
            name="email"
            label="Email address"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="mobile"
            label="Mobile"
            onChange={handleChange}
            fullWidth
          />
        </Box>

        {/* GENDER + STATUS */}
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2}>
          <FormControl>
            <Typography sx={{ fontSize: "0.75rem", mb: 1, color: "#6b6b6b" }}>
              Gender
            </Typography>
            <RadioGroup
              row
              name="gender"
              value={user.gender || ""}
              onChange={handleChange}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" sx={{ "& .MuiFormControlLabel-label": { color: "black" } }} />
              <FormControlLabel value="Female" control={<Radio />} label="Female" sx={{ "& .MuiFormControlLabel-label": { color: "black" } }} />
            </RadioGroup>
          </FormControl> 

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={user.status || "active"}
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* PROFILE + LOCATION */}
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2}>
          <FormControl>
            <Typography sx={{ fontSize: "0.75rem", mb: 1, color: "#6b6b6b" }}>
              Profile Image
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {user.profile && (
                <Avatar 
                  src={user.profile} 
                  sx={{ width: 50, height: 50 }}
                />
              )}
              <input 
                type="file" 
                name="profile" 
                onChange={handleFileChange}
                accept="image/*"
              />
            </Box>
          </FormControl>

          <TextField
            name="location"
            label="Location"
            onChange={handleChange}
            fullWidth
          />
        </Box>

        {/* ACTION */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ backgroundColor: "#8b2b2b", px: 4 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  </Box>
);
}

export default AddUser;
