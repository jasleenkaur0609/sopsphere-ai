// import React from "react";

// import EmployeeDashboard from "./EmployeeDashboard";
// import ManagerDashboard from "./ManagerDashboard";
// import TeamLeadDashboard from "./TeamLeadDashboard";
// import AdministratorDashboard from "./AdministratorDashboard";
// import OtherDashboard from "./OtherDashboard";

// import "./Dashboard.css";

// /**
//  * Main Dashboard Controller
//  *
//  * This component determines which dashboard should be displayed
//  * based on the authenticated user's role.
//  *
//  * Supported roles:
//  * - Employee
//  * - Manager
//  * - Team Lead
//  * - Administrator
//  * - Other
//  */

// const Dashboard = () => {
//   /*
//    * ---------------------------------------------------------
//    * USER ROLE
//    * ---------------------------------------------------------
//    *
//    * For now, the role is read from localStorage so that the
//    * dashboard can be tested before the backend authentication
//    * and user profile APIs are connected.
//    *
//    * Later this will be replaced with the authenticated user's
//    * role from the application's authentication/context system.
//    */

//   const storedUser = localStorage.getItem("user");

//   let user = null;

//   try {
//     user = storedUser ? JSON.parse(storedUser) : null;
//   } catch (error) {
//     console.error("Unable to read stored user:", error);
//   }

//   /*
//    * ---------------------------------------------------------
//    * ROLE
//    * ---------------------------------------------------------
//    */

//   const userRole = (
//     user?.role ||
//     localStorage.getItem("userRole") ||
//     "Other"
//   )
//     .toString()
//     .trim()
//     .toLowerCase();

//   /*
//    * ---------------------------------------------------------
//    * ROLE NORMALIZATION
//    * ---------------------------------------------------------
//    *
//    * This allows small differences in role values to still
//    * point to the correct dashboard.
//    *
//    * Example:
//    *
//    * "team lead"
//    * "Team Lead"
//    * "team_lead"
//    *
//    * will all be treated as Team Lead.
//    */

//   const normalizedRole = userRole.replace(/[_-]/g, " ");

//   /*
//    * ---------------------------------------------------------
//    * DASHBOARD RENDERING
//    * ---------------------------------------------------------
//    */

//   switch (normalizedRole) {
//     case "employee":
//       return <EmployeeDashboard />;

//     case "manager":
//       return <ManagerDashboard />;

//     case "team lead":
//       return <TeamLeadDashboard />;

//     case "administrator":
//     case "admin":
//       return <AdministratorDashboard />;

//     case "other":
//     default:
//       return <OtherDashboard />;
//   }
// };

// export default Dashboard;
import React from "react";

import EmployeeDashboard from "./EmployeeDashboard";

const Dashboard = () => {
  const role = localStorage.getItem("userRole");

  if (role === "Employee") {
    return <EmployeeDashboard />;
  }

  return <EmployeeDashboard />;
};

export default Dashboard;