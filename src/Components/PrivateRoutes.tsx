import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../types/auth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  console.log("🔐 PrivateRoute - token:", token);
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
