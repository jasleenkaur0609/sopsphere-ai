import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";

import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import VerifyEmailOTP from "../pages/Authentication/VerifyEmailOTP";
import CompleteProfile from "../pages/Authentication/CompleteProfile";
import RegistrationSuccess from "../pages/Authentication/RegistrationSuccess";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import ResetPassword from "../pages/Authentication/ResetPassword";

import Dashboard from "../pages/Dashboard/Dashboard";

/* =========================================================
   EMPLOYEE DASHBOARD PAGES
   ========================================================= */

import EmployeeMySOPs from "../pages/Dashboard/Employee/pages/EmployeeMySOPs";
import EmployeeSOPLibrary from "../pages/Dashboard/Employee/pages/EmployeeSOPLibrary";
import EmployeeGenerateSOP from "../pages/Dashboard/Employee/pages/EmployeeGenerateSOP";
import EmployeeTraining from "../pages/Dashboard/Employee/pages/EmployeeTraining";
import EmployeeCompliance from "../pages/Dashboard/Employee/pages/EmployeeCompliance";
import EmployeeDocuments from "../pages/Dashboard/Employee/pages/EmployeeDocuments";
import EmployeeTasks from "../pages/Dashboard/Employee/pages/EmployeeTasks";
import EmployeeAnalytics from "../pages/Dashboard/Employee/pages/EmployeeAnalytics";
import EmployeeNotifications from "../pages/Dashboard/Employee/pages/EmployeeNotifications";
import EmployeeSettings from "../pages/Dashboard/Employee/pages/EmployeeSettings";
import EmployeeHelp from "../pages/Dashboard/Employee/pages/EmployeeHelp";
import EmployeeAIAssistant from "../pages/Dashboard/Employee/pages/EmployeeAIAssistant";


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

      {/* Main Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />


      {/* =====================================================
          EMPLOYEE DASHBOARD ROUTES
          ===================================================== */}

      {/* Employee Dashboard Landing */}
      <Route
        path="/dashboard/employee"
        element={<Dashboard />}
      />


      {/* =====================================================
          SOP MANAGEMENT
          ===================================================== */}

      {/* My SOPs */}
      <Route
        path="/dashboard/employee/my-sops"
        element={<EmployeeMySOPs />}
      />


      {/* SOP Library */}
      <Route
        path="/dashboard/employee/sop-library"
        element={<EmployeeSOPLibrary />}
      />


      {/* Generate SOP */}
      <Route
        path="/dashboard/employee/generate-sop"
        element={<EmployeeGenerateSOP />}
      />


      {/* =====================================================
          LEARNING & COMPLIANCE
          ===================================================== */}

      {/* Training */}
      <Route
        path="/dashboard/employee/training"
        element={<EmployeeTraining />}
      />


      {/* Compliance */}
      <Route
        path="/dashboard/employee/compliance"
        element={<EmployeeCompliance />}
      />


      {/* =====================================================
          WORK MANAGEMENT
          ===================================================== */}

      {/* Documents */}
      <Route
        path="/dashboard/employee/documents"
        element={<EmployeeDocuments />}
      />


      {/* Tasks */}
      <Route
        path="/dashboard/employee/tasks"
        element={<EmployeeTasks />}
      />


      {/* Analytics */}
      <Route
        path="/dashboard/employee/analytics"
        element={<EmployeeAnalytics />}
      />


      {/* =====================================================
          AI
          ===================================================== */}

      {/* AI Assistant */}
      <Route
        path="/dashboard/employee/ai-assistant"
        element={<EmployeeAIAssistant />}
      />


      {/* =====================================================
          ACCOUNT & SUPPORT
          ===================================================== */}

      {/* Notifications */}
      <Route
        path="/dashboard/employee/notifications"
        element={<EmployeeNotifications />}
      />


      {/* Settings */}
      <Route
        path="/dashboard/employee/settings"
        element={<EmployeeSettings />}
      />


      {/* Help */}
      <Route
        path="/dashboard/employee/help"
        element={<EmployeeHelp />}
      />


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