import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Loader from "./components/Loader";
import ProtectedRoute from "./context/ProtectedRoute";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useAuth } from "./hooks/useAuth";
import { CssBaseline } from "@mui/material";

function App() {
  const { user, isLoading } = useAuth();

  const getDefaultRoute = () => {
    if (!user) return "/login";
    return "/dashboard";
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <CssBaseline/>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to={getDefaultRoute()} /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<ProtectedRoute isAllow={!!user} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;