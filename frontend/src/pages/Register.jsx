import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate, Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { postRequest } from "../api/apiServices";
import { apiList } from "../api/api";
import Toast from "../utils/toast";

export default function Register() {
  const { storeUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await postRequest(apiList.register, { email, password });
      if (response?.data) {
        Toast(response?.message);
        const { user, token } = response.data;
        const userData = {
          id: user?._id,
          name: user?.name,
          email: user?.email,
          token: token,
        };
        storeUser(userData);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <AuthForm
        mode="register"
        onSubmit={handleRegister}
        loading={loading}
        error={error}
      />
      <Typography align="center" mt={2}>
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Box>
  );
}