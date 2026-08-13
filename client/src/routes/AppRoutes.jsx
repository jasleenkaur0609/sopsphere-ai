import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";

import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import VerifyEmailOTP from "../pages/Authentication/VerifyEmailOTP";
import CompleteProfile from "../pages/Authentication/CompleteProfile";
import RegistrationSuccess from "../pages/Authentication/RegistrationSuccess";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import ResetPassword from "../pages/Authentication/ResetPassword";
//import Dashboard from "../pages/Dashboard/Dashboard";


function AppRoutes() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC ROUTES
          ===================================================== */}

      {/* Home */}
      <Route
        path="/"
        element={<Home />}
      />


      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />


      {/* Register */}
      <Route
        path="/register"
        element={<Register />}
      />


      {/* Email Verification */}
      <Route
        path="/verify-email"
        element={<VerifyEmailOTP />}
      />


      {/* Complete Profile */}
      <Route
        path="/complete-profile"
        element={<CompleteProfile />}
      />


      {/* Registration Success */}
      <Route
        path="/registration-success"
        element={<RegistrationSuccess />}
      />


      {/* =====================================================
          PASSWORD RECOVERY
          ===================================================== */}

      {/* Uncomment when Forgot Password is ready */}

      
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />
      


      {/* =====================================================
          PRIVATE ROUTES
          ===================================================== */}

      {/* Uncomment when Dashboard is ready */}

      {/*
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
      */}


      {/* =====================================================
          FALLBACK
          ===================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}


export default AppRoutes;