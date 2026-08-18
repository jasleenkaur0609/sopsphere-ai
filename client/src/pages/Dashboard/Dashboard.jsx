import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import EmployeeDashboard from "./Employee/EmployeeDashboard";
import ManagerDashboard from "./Manager/ManagerDashboard";
import TeamLeadDashboard from "./TeamLead/TeamLeadDashboard";
import AdministratorDashboard from "./Administrator/AdministratorDashboard";
import OtherDashboard from "./Other/OtherDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /*
   * ============================================================
   * GET PROFILE
   * ============================================================
   *
   * The completed profile should be passed from the
   * Registration Success page when the user clicks
   * "Go to Dashboard".
   *
   * Expected:
   *
   * navigate("/dashboard", {
   *   state: {
   *     profile: profile
   *   }
   * });
   */

  const profile =
    location.state?.profile ||
    location.state?.user ||
    null;

  /*
   * ============================================================
   * NO PROFILE
   * ============================================================
   *
   * We DO NOT automatically open Employee Dashboard.
   *
   * If the user reaches /dashboard without completing
   * the profile flow, send them back to Login.
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
            Your completed profile could not be found.
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
   *
   * We do NOT do:
   *
   * profile.role || "Employee"
   *
   * because an empty role must never automatically
   * become Employee.
   */

  const role = String(
    profile.role || ""
  )
    .toLowerCase()
    .trim();

  /*
   * ============================================================
   * NORMALIZE ROLE
   * ============================================================
   */

  let normalizedRole = role;

  if (
    role === "teamlead" ||
    role === "team_lead" ||
    role === "team-lead"
  ) {
    normalizedRole = "team lead";
  }

  if (role === "admin") {
    normalizedRole = "administrator";
  }

  /*
   * ============================================================
   * VALID ROLES
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
   * ============================================================
   * INVALID ROLE
   * ============================================================
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
   * Never open Employee Dashboard as a fallback.
   */

  return null;
};

export default Dashboard;