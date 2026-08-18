import React from "react";
import { useProfile } from "../../context/ProfileContext";

import EmployeeDashboard from "./Employee/EmployeeDashboard";
import ManagerDashboard from "./Manager/ManagerDashboard";
import TeamLeadDashboard from "./TeamLead/TeamLeadDashboard";
import AdministratorDashboard from "./Administrator/AdministratorDashboard";
import OtherDashboard from "./Other/OtherDashboard";

const Dashboard = () => {
  const { profile } = useProfile();

  /*
   * Profile is created when the user completes
   * the Complete Profile page.
   *
   * Registration Success only navigates to /dashboard.
   */

  if (!profile) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-loading-card">
          <div className="dashboard-loading-spinner" />
          <h2>Loading Dashboard</h2>
          <p>
            We're preparing your personalized workspace.
          </p>
        </div>
      </div>
    );
  }

  const role = (profile.role || "Employee")
    .toLowerCase()
    .trim();

  /*
   * Role from Complete Profile decides
   * which dashboard should be displayed.
   */

  if (role === "employee") {
    return (
      <EmployeeDashboard
        profile={profile}
      />
    );
  }

  if (role === "manager") {
    return (
      <ManagerDashboard
        profile={profile}
      />
    );
  }

  if (
    role === "team lead" ||
    role === "teamlead" ||
    role === "team_lead"
  ) {
    return (
      <TeamLeadDashboard
        profile={profile}
      />
    );
  }

  if (
    role === "administrator" ||
    role === "admin"
  ) {
    return (
      <AdministratorDashboard
        profile={profile}
      />
    );
  }

  if (role === "other") {
    return (
      <OtherDashboard
        profile={profile}
      />
    );
  }

  /*
   * Fallback:
   * If the role is empty or doesn't match,
   * show Employee Dashboard.
   */

  return (
    <EmployeeDashboard
      profile={profile}
    />
  );
};

export default Dashboard;