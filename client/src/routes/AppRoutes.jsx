import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import VerifyEmailOTP from "../pages/Authentication/VerifyEmailOTP";
import CompleteProfile from "../pages/Authentication/CompleteProfile";
// import VerifyMobileOTP from "../pages/Authentication/VerifyMobileOTP";

// import ForgotPassword from "../pages/Authentication/ForgotPassword";
// import Dashboard from "../pages/Dashboard/Dashboard";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/verify-email"
        element={<VerifyEmailOTP />}
      />

      <Route
        path="/complete-profile"
        element={<CompleteProfile />}
      />

       {/*<Route
        path="/verify-mobile"
        element={<VerifyMobileOTP />} 
      />*/}

      {/* Uncomment when ready */}

      {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

      {/* Private Routes */}

      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

      {/* Fallback */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;