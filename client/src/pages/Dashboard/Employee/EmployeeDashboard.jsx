import React, { useState } from "react";

import "./EmployeeDashboard.css";

//import EmployeeSidebar from "./components/EmployeeSidebar";
// import EmployeeHeader from "./components/EmployeeHeader";
// import EmployeeKPI from "./components/EmployeeKPI";
// import EmployeeQuickActions from "./components/EmployeeQuickActions";
// import EmployeeFeatureCards from "./components/EmployeeFeatureCards";
// import EmployeeRecentSOPs from "./components/EmployeeRecentSOPs";
// import EmployeeRecentActivity from "./components/EmployeeRecentActivity";
// import EmployeeLearning from "./components/EmployeeLearning";
// import EmployeeCompliance from "./components/EmployeeCompliance";
// import EmployeeRecommendations from "./components/EmployeeRecommendations";
// import EmployeeTeamUpdates from "./components/EmployeeTeamUpdates";
// import EmployeeNotifications from "./components/EmployeeNotifications";
// import EmployeeAIChat from "./components/EmployeeAIChat";
// import EmployeeAIPromotion from "./components/EmployeeAIPromotion";
// import EmployeeActions from "./components/EmployeeActions";
// import EmployeeProfileMenu from "./components/EmployeeProfileMenu";

const EmployeeDashboard = ({ profile }) => {
  /*
   * ============================================================
   * SIDEBAR STATE
   * ============================================================
   */

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  /*
   * ============================================================
   * AI CHAT STATE
   * ============================================================
   */

  const [aiChatOpen, setAiChatOpen] =
    useState(false);

  /*
   * ============================================================
   * PROFILE MENU STATE
   * ============================================================
   */

  const [profileMenuOpen, setProfileMenuOpen] =
    useState(false);

  /*
   * ============================================================
   * NOTIFICATION STATE
   * ============================================================
   */

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  /*
   * ============================================================
   * SIDEBAR TOGGLE
   * ============================================================
   */

  const handleSidebarToggle = () => {
    setSidebarCollapsed(
      (previous) => !previous
    );
  };

  /*
   * ============================================================
   * MOBILE SIDEBAR
   * ============================================================
   */

  const handleMobileSidebarOpen = () => {
    setMobileSidebarOpen(true);
  };

  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  /*
   * ============================================================
   * AI ASSISTANT
   * ============================================================
   */

  const handleOpenAIChat = () => {
    setAiChatOpen(true);
  };

  const handleCloseAIChat = () => {
    setAiChatOpen(false);
  };

  /*
   * ============================================================
   * PROFILE MENU
   * ============================================================
   */

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen(
      (previous) => !previous
    );
  };

  const handleProfileMenuClose = () => {
    setProfileMenuOpen(false);
  };

  /*
   * ============================================================
   * NOTIFICATIONS
   * ============================================================
   */

  const handleNotificationsToggle = () => {
    setNotificationsOpen(
      (previous) => !previous
    );
  };

  const handleNotificationsClose = () => {
    setNotificationsOpen(false);
  };

  /*
   * ============================================================
   * DASHBOARD DATA
   * ============================================================
   *
   * This is mock data for the dashboard UI.
   *
   * Once the backend/API is connected, these values can be
   * replaced without changing the dashboard layout.
   */

  const dashboardData = {
    kpis: {
      assignedSOPs: 18,
      completedSOPs: 14,
      pendingTasks: 4,
      learningProgress: 76,
      complianceScore: 94,
      certificates: 8,
    },

    notifications: [
      {
        id: 1,
        title: "New SOP assigned",
        message:
          "A new Finance Process SOP has been assigned to you.",
        time: "10 min ago",
        type: "sop",
        unread: true,
      },
      {
        id: 2,
        title: "Training reminder",
        message:
          "Your Compliance Training is due tomorrow.",
        time: "1 hour ago",
        type: "training",
        unread: true,
      },
      {
        id: 3,
        title: "SOP approval completed",
        message:
          "Your submitted SOP has been approved.",
        time: "3 hours ago",
        type: "success",
        unread: true,
      },
      {
        id: 4,
        title: "Team update",
        message:
          "Your team has shared a new process update.",
        time: "Yesterday",
        type: "team",
        unread: false,
      },
    ],

    recentSOPs: [
      {
        id: 1,
        title: "Invoice Processing Procedure",
        category: "Finance",
        status: "Completed",
        updated: "Today",
      },
      {
        id: 2,
        title: "Employee Onboarding Process",
        category: "Human Resources",
        status: "In Progress",
        updated: "Yesterday",
      },
      {
        id: 3,
        title: "Customer Escalation Procedure",
        category: "Operations",
        status: "Pending Review",
        updated: "2 days ago",
      },
      {
        id: 4,
        title: "Data Security Guidelines",
        category: "Compliance",
        status: "Completed",
        updated: "4 days ago",
      },
    ],

    recentActivity: [
      {
        id: 1,
        title: "Completed Invoice Processing SOP",
        time: "Today, 10:30 AM",
        type: "completed",
      },
      {
        id: 2,
        title: "Started Employee Onboarding Training",
        time: "Yesterday, 3:15 PM",
        type: "training",
      },
      {
        id: 3,
        title: "Submitted Customer Escalation SOP",
        time: "Yesterday, 11:20 AM",
        type: "submitted",
      },
      {
        id: 4,
        title: "Viewed Data Security Guidelines",
        time: "2 days ago",
        type: "viewed",
      },
    ],

    learning: {
      currentCourse:
        "Enterprise Compliance & Security",
      progress: 76,
      completedModules: 8,
      totalModules: 10,
      dueDate: "Aug 25, 2026",
    },

    compliance: {
      score: 94,
      completed: 16,
      total: 17,
      pending: 1,
      lastUpdated: "Today",
    },

    recommendations: [
      {
        id: 1,
        title: "Data Privacy & Security",
        description:
          "Recommended based on your current role.",
        type: "Training",
        duration: "25 min",
      },
      {
        id: 2,
        title: "Advanced SOP Management",
        description:
          "Improve your SOP documentation skills.",
        type: "Learning",
        duration: "35 min",
      },
      {
        id: 3,
        title: "Process Automation Basics",
        description:
          "Learn how to identify automation opportunities.",
        type: "Course",
        duration: "45 min",
      },
    ],

    teamUpdates: [
      {
        id: 1,
        title: "New process documentation standard",
        author: "Team Lead",
        time: "Today",
      },
      {
        id: 2,
        title: "Monthly SOP review completed",
        author: "Operations Team",
        time: "Yesterday",
      },
      {
        id: 3,
        title: "Upcoming compliance assessment",
        author: "Compliance Team",
        time: "2 days ago",
      },
    ],
  };

  /*
   * ============================================================
   * PROFILE DISPLAY DATA
   * ============================================================
   */

  const employeeProfile = {
    name:
      profile?.name ||
      profile?.fullName ||
      "Jasleen Kaur",

    role:
      profile?.jobTitle ||
      "Employee",

    department:
      profile?.department ||
      "Technology",

    organization:
      profile?.organization ||
      "AI SOP Portal",

    employeeId:
      profile?.employeeId ||
      "EMP-001",

    location:
      profile?.location ||
      "India",

    email:
      profile?.email ||
      "employee@example.com",
  };

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <div
      className={`employee-dashboard ${
        sidebarCollapsed
          ? "employee-dashboard-sidebar-collapsed"
          : ""
      } ${
        mobileSidebarOpen
          ? "employee-dashboard-mobile-open"
          : ""
      }`}
    >
      {/* ======================================================
          SIDEBAR
          ====================================================== */}

      <EmployeeSidebar
        profile={employeeProfile}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onToggle={handleSidebarToggle}
        onMobileClose={handleMobileSidebarClose}
        notificationCount={
          dashboardData.notifications.filter(
            (notification) =>
              notification.unread
          ).length
        }
      />

      {/* ======================================================
          MAIN AREA
          ====================================================== */}

      <div className="employee-dashboard-main">
        {/* ====================================================
            HEADER
            ==================================================== */}

        <EmployeeHeader
          profile={employeeProfile}
          onMenuClick={
            handleMobileSidebarOpen
          }
          onNotificationsClick={
            handleNotificationsToggle
          }
          onProfileClick={
            handleProfileMenuToggle
          }
        />

        {/* ====================================================
            PROFILE MENU
            ==================================================== */}

        {profileMenuOpen && (
          <EmployeeProfileMenu
            profile={employeeProfile}
            onClose={
              handleProfileMenuClose
            }
          />
        )}

        {/* ====================================================
            NOTIFICATIONS
            ==================================================== */}

        {notificationsOpen && (
          <EmployeeNotifications
            notifications={
              dashboardData.notifications
            }
            onClose={
              handleNotificationsClose
            }
          />
        )}

        {/* ====================================================
            CONTENT
            ==================================================== */}

        <main className="employee-dashboard-content">
          {/* ==================================================
              WELCOME SECTION
              ================================================== */}

          <section className="employee-dashboard-welcome">
            <div className="employee-dashboard-welcome-content">
              <span className="employee-dashboard-eyebrow">
                Employee Workspace
              </span>

              <h1>
                Welcome back,{" "}
                <strong>
                  {employeeProfile.name}
                </strong>
              </h1>

              <p>
                Manage your SOPs, training,
                compliance and daily tasks
                from one workspace.
              </p>
            </div>

            <EmployeeActions
              onOpenAIChat={
                handleOpenAIChat
              }
            />
          </section>

          {/* ==================================================
              KPI SECTION
              ================================================== */}

          <section className="employee-dashboard-section">
            <EmployeeKPI
              data={
                dashboardData.kpis
              }
            />
          </section>

          {/* ==================================================
              QUICK ACTIONS
              ================================================== */}

          <section className="employee-dashboard-section">
            <div className="employee-dashboard-section-heading">
              <div>
                <span className="employee-dashboard-section-eyebrow">
                  Workspace
                </span>

                <h2>
                  Quick Actions
                </h2>
              </div>
            </div>

            <EmployeeQuickActions
              onOpenAIChat={
                handleOpenAIChat
              }
            />
          </section>

          {/* ==================================================
              FEATURE CARDS
              ================================================== */}

          <section className="employee-dashboard-section">
            <EmployeeFeatureCards />
          </section>

          {/* ==================================================
              AI PROMOTION
              ================================================== */}

          <section className="employee-dashboard-section">
            <EmployeeAIPromotion
              onOpenAIChat={
                handleOpenAIChat
              }
            />
          </section>

          {/* ==================================================
              MAIN TWO COLUMN AREA
              ================================================== */}

          <section className="employee-dashboard-grid employee-dashboard-grid-primary">
            <div className="employee-dashboard-grid-main">
              <EmployeeRecentSOPs
                sops={
                  dashboardData.recentSOPs
                }
              />

              <EmployeeRecentActivity
                activities={
                  dashboardData.recentActivity
                }
              />
            </div>

            <div className="employee-dashboard-grid-side">
              <EmployeeCompliance
                data={
                  dashboardData.compliance
                }
              />

              <EmployeeLearning
                data={
                  dashboardData.learning
                }
              />
            </div>
          </section>

          {/* ==================================================
              RECOMMENDATIONS
              ================================================== */}

          <section className="employee-dashboard-section">
            <EmployeeRecommendations
              recommendations={
                dashboardData.recommendations
              }
            />
          </section>

          {/* ==================================================
              TEAM + NOTIFICATION AREA
              ================================================== */}

          <section className="employee-dashboard-grid employee-dashboard-grid-secondary">
            <div className="employee-dashboard-grid-main">
              <EmployeeTeamUpdates
                updates={
                  dashboardData.teamUpdates
                }
              />
            </div>

            <div className="employee-dashboard-grid-side">
              <EmployeeNotifications
                notifications={
                  dashboardData.notifications
                }
                embedded
              />
            </div>
          </section>
        </main>
      </div>

      {/* ======================================================
          AI CHAT
          ====================================================== */}

      {aiChatOpen && (
        <EmployeeAIChat
          profile={employeeProfile}
          onClose={handleCloseAIChat}
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;