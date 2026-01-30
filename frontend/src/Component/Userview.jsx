import { useEffect, useState } from "react";
import { getUserById } from "../Service/userservice";
import { Box, Typography, Grid, Paper } from "@mui/material";

function UserView({ id, user: propUser }) {
  const [user, setUser] = useState(propUser || {});
  const [loading, setLoading] = useState(!propUser && id);

  useEffect(() => {
    if (propUser) {
      setUser(propUser);
      return;
    }
    if (!id) return;
    
    let mounted = true;
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        if (mounted) {
          setUser(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
        if (mounted) setLoading(false);
      }
    };
    
    fetchUser();
    return () => (mounted = false);
  }, [id, propUser]);

 
  return (
  <Box sx={{ width: "100%", px: { xs: 2, md: 4 }, py: 2 }}>
    <Typography
      variant="h5"
      sx={{ fontWeight: 600, mb: 3, color: "black" }}
    >
      User Information
    </Typography>

    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
      columnGap={6}
      rowGap={3}
    >
      {[
        ["First Name", user.firstName],
        ["Last Name", user.lastName],
        ["Email", user.email],
        ["Mobile", user.mobile],
        ["Gender", user.gender],
        ["Status", user.status],
        ["Location", user.location]
      ].map(([label, value]) => (
        <Box key={label}>
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "#6b6b6b",
              fontWeight: 600,
              mb: 0.5,
              textTransform: "uppercase"
            }}
          >
            {label}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#1f1f1f"
            }}
          >
            {value || "N/A"}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);
}
export default UserView;
