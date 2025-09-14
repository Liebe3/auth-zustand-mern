import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="user">
              <UserProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
