import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ children, role }) => {
  const user = useAuthStore((state) => state.user);

  //Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isNotAllowed = role ? user.role !== role : false;
  // Role restriction
  if (isNotAllowed) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
