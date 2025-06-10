import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate()
  return (
     <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography>Dashboard Page</Typography>
        <Typography variant="h5">Welcome, {user?.email}</Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
