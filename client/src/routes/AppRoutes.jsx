import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Authentication/Login";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;