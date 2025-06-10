import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAllow, children }) => {
  if (!isAllow) {
    return <Navigate to="/login" replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;