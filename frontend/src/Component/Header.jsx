import { Box } from "@mui/material";
function Header() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#000",
        color: "white",
        py: 2,
        textAlign: "center",
        fontWeight: 600
      }}
    >
      MERN stack developer practical task
    </Box>
  );
}

export default Header;
