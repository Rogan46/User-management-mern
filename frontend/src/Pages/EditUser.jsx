import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  CircularProgress,
  Alert
} from "@mui/material";
import { getUserById, updateUser } from "../Service/userservice";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        setUser(res.data);
        setError(null);
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id]);

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
    try {
      await updateUser(id, user);
      navigate("/");
    } catch (err) {
      setError('Failed to update user');
      console.error(err);
    }
  };

  if (loading) return <CircularProgress sx={{ m: 3 }} />;

  return (
    <Box>
      <Box 
        sx={{ 
          backgroundColor: '#1a1a1a', 
          color: 'white', 
          py: 2, 
          px: 3,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1rem',
          mb: 0
        }}
      >
        MERN stack developer practical task
      </Box>
      <Box p={3} display="flex" justifyContent="center" bgcolor="#f5f5f5" minHeight="calc(100vh - 56px)">
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: { xs: '100%', sm: '90%', md: '100%', lg: '90%' }, mt: 2, mb: 4 }}>
            <Card>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                  <Avatar 
                    sx={{ width: 80, height: 80, mb: 2, bgcolor: '#ccc' }}
                  >
                    {user.firstName ? user.firstName[0].toUpperCase() : '👤'}
                  </Avatar>
                  <Typography variant="h5">Edit User</Typography>
                </Box>
                
                <Divider sx={{ mb: 3 }} />

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <GridContainer />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  function GridContainer() {
    return (
      <Box component="form" display="grid" gap={2}>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
          <TextField 
            name="firstName" 
            label="First name" 
            value={user.firstName || ""}
            onChange={handleChange}
            placeholder="Enter FirstName"
            fullWidth 
          />
          <TextField 
            name="lastName" 
            label="Last Name" 
            value={user.lastName || ""}
            onChange={handleChange}
            placeholder="Enter LastName"
            fullWidth 
          />
        </Box>

        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
          <TextField 
            name="email" 
            label="Email address" 
            value={user.email || ""}
            onChange={handleChange}
            placeholder="Enter Email"
            fullWidth 
          />
          <TextField 
            name="mobile" 
            label="Mobile" 
            value={user.mobile || ""}
            onChange={handleChange}
            placeholder="Enter Mobile"
            fullWidth 
          />
        </Box>

        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Your Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={user.gender || ""}
              onChange={handleChange}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="status-label">Select Your Status</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              label="Select Your Status"
              value={user.status || "active"}
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
          <TextField 
            name="location" 
            label="Enter Your Location" 
            value={user.location || ""}
            onChange={handleChange}
            placeholder="Enter Your Location"
            fullWidth 
          />
          <FormControl>
            <FormLabel>Profile Image</FormLabel>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
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
        </Box>

        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            sx={{ minWidth: 150 }}
          >
            UPDATE
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate("/")}
            sx={{ minWidth: 150 }}
          >
            CANCEL
          </Button>
        </Box>
      </Box>
    );
  }
}

export default EditUser;
