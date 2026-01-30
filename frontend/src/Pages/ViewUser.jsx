import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Alert
} from "@mui/material";
import Header from "../Component/Header";
import Userview from "../Component/Userview";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `$BASE_URL/users/${id}`
        );
        setUser(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch user details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f4f4"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
   <Box sx={{ backgroundColor: "#f4f4f4", minHeight: "100vh", width: "100%", boxSizing: "border-box" }}>
  <Header />

  <Box sx={{ width: "100%", px: { xs: 2, md: 4 }, py: 4, boxSizing: "border-box" }}>
    {/* TOP BAR */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4
      }}
    >
      <Box sx={{ fontSize: "1.6rem", fontWeight: 600, color: "black" }}>
        User Details
      </Box>

      <Box display="flex" gap={1.5}>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Back
        </Button>
        {user && (
          <Button
            variant="contained"
            sx={{ backgroundColor: "#8b2b2b" }}
            onClick={() => navigate(`/edit/${user.id}`)}
          >
            Edit
          </Button>
        )}
      </Box>
    </Box>

    {error && <Alert severity="error">{error}</Alert>}

    {user && <Userview id={id} />}
  </Box>
</Box>

  );
};

export default ViewUser;
