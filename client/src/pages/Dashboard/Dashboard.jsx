import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProfile } from "../../context/ProfileContext";

import EmployeeDashboard from "./Employee/EmployeeDashboard";
import ManagerDashboard from "./Manager/ManagerDashboard";
import TeamLeadDashboard from "./TeamLead/TeamLeadDashboard";
import AdministratorDashboard from "./Administrator/AdministratorDashboard";
import OtherDashboard from "./Other/OtherDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { profile: contextProfile } = useProfile();

  /*
   * ============================================================
   * PROFILE SOURCE
   * ============================================================
   *
   * RegistrationSuccess passes the completed profile through:
   *
   * navigate("/dashboard", {
   *   state: {
   *     profile: profile,
   *     user: profile,
   *     email: registeredEmail
   *   }
   * });
   *
   * Therefore, we first check the navigation state.
   *
   * ProfileContext is also supported because the application
   * already has ProfileContext and other parts of the app may
   * populate it.
   */

  const navigationProfile =
    location.state?.profile ||
    location.state?.user ||
    null;

  const profile =
    navigationProfile ||
    contextProfile ||
    null;

  /*
   * ============================================================
   * INVALID PROFILE HANDLING
   * ============================================================
   *
   * We do NOT automatically open Employee Dashboard.
   *
   * If there is no completed profile, redirect the user to Login.
   */

  useEffect(() => {
    if (!profile) {
      const timer = setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [profile, navigate]);

  /*
   * ============================================================
   * LOADING / REDIRECT SCREEN
   * ============================================================
   */

  if (!profile) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-loading-card">
          <div className="dashboard-loading-spinner" />

          <h2>
            Preparing Your Dashboard
          </h2>

          <p>
            We couldn't find your completed profile.
            Redirecting you to Sign In...
          </p>
        </div>
      </div>
    );
  }

  /*
   * ============================================================
   * ROLE
   * ============================================================
   *
   * IMPORTANT:
   * We intentionally DO NOT use:
   *
   * profile.role || "Employee"
   *
   * because an empty role must NOT become Employee.
   */

  const role = String(
    profile.role || ""
  )
    .toLowerCase()
    .trim();

  /*
   * ============================================================
   * ROLE NORMALIZATION
   * ============================================================
   *
   * This allows slightly different role values to map to the
   * correct dashboard.
   */

  let normalizedRole = role;

  if (
    role === "teamlead" ||
    role === "team_lead" ||
    role === "team-lead"
  ) {
    normalizedRole = "team lead";
  }

  if (
    role === "admin"
  ) {
    normalizedRole = "administrator";
  }

  /*
   * ============================================================
   * ROLE VALIDATION
   * ============================================================
   */

  const validRoles = [
    "employee",
    "manager",
    "team lead",
    "administrator",
    "other",
  ];

  /*
   * No role or invalid role:
   *
   * DO NOT show Employee Dashboard.
   *
   * Send the user back to Login.
   */

  useEffect(() => {
    if (
      profile &&
      !validRoles.includes(normalizedRole)
    ) {
      const timer = setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [
    profile,
    normalizedRole,
    navigate,
  ]);

  /*
   * ============================================================
   * INVALID ROLE SCREEN
   * ============================================================
   */

  if (
    !validRoles.includes(normalizedRole)
  ) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-loading-card">
          <div className="dashboard-loading-spinner" />

          <h2>
            Profile Setup Required
          </h2>

          <p>
            Your profile does not contain a valid
            dashboard role. Redirecting you to
            Sign In...
          </p>
        </div>
      </div>
    );
  }

  /*
   * ============================================================
   * EMPLOYEE
   * ============================================================
   */

  if (normalizedRole === "employee") {
    return (
      <EmployeeDashboard
        profile={profile}
      />
    );
  }

  /*
   * ============================================================
   * MANAGER
   * ============================================================
   */

  if (normalizedRole === "manager") {
    return (
      <ManagerDashboard
        profile={profile}
      />
    );
  }

  /*
   * ============================================================
   * TEAM LEAD
   * ============================================================
   */

  if (normalizedRole === "team lead") {
    return (
      <TeamLeadDashboard
        profile={profile}
      />
    );
  }

  /*
   * ============================================================
   * ADMINISTRATOR
   * ============================================================
   */

  if (normalizedRole === "administrator") {
    return (
      <AdministratorDashboard
        profile={profile}
      />
    );
  }

  /*
   * ============================================================
   * OTHER
   * ============================================================
   */

  if (normalizedRole === "other") {
    return (
      <OtherDashboard
        profile={profile}
      />
    );
  }

  /*
   * ============================================================
   * FINAL SAFETY FALLBACK
   * ============================================================
   *
   * This should technically never be reached because of the
   * validRoles check above.
   *
   * We still redirect to Login rather than opening Employee.
   */

  navigate("/login", {
    replace: true,
  });

  return null;
};

export default Dashboard;