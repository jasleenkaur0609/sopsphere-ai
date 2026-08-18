import React from "react";

import DashboardLayout from "./components/DashboardLayout";

import EmployeeDashboard from "./Employee/EmployeeDashboard";
import ManagerDashboard from "./Manager/ManagerDashboard";
import TeamLeadDashboard from "./TeamLead/TeamLeadDashboard";
import AdministratorDashboard from "./Administrator/AdministratorDashboard";
import OtherDashboard from "./Other/OtherDashboard";

const Dashboard = () => {
  const storedUser = localStorage.getItem("user");

  let user = {};

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : {};
  } catch (error) {
    user = {};
  }

  const role =
    user.role ||
    localStorage.getItem("userRole") ||
    "Employee";

  const normalizedRole =
    role.toLowerCase().trim();

  const dashboardMap = {
    employee: {
      component: <EmployeeDashboard />,
      title: "Dashboard",
    },

    manager: {
      component: <ManagerDashboard />,
      title: "Dashboard",
    },

    "team lead": {
      component: <TeamLeadDashboard />,
      title: "Dashboard",
    },

    teamlead: {
      component: <TeamLeadDashboard />,
      title: "Dashboard",
    },

    administrator: {
      component: <AdministratorDashboard />,
      title: "Dashboard",
    },

    admin: {
      component: <AdministratorDashboard />,
      title: "Dashboard",
    },

    other: {
      component: <OtherDashboard />,
      title: "Dashboard",
    },
  };

  const selectedDashboard =
    dashboardMap[normalizedRole] ||
    dashboardMap.employee;

  return (
    <DashboardLayout
      role={role}
      pageTitle={selectedDashboard.title}
    >
      {selectedDashboard.component}
    </DashboardLayout>
  );
};

export default Dashboard;