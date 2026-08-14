import React, { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  User,
  X,
} from "lucide-react";

import "./Dashboard.css";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  const user = useMemo(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : {};
    } catch {
      return {};
    }
  }, []);

  const userName =
    user?.name ||
    user?.fullName ||
    user?.firstName ||
    "Employee";

  const userEmail =
    user?.email ||
    "employee@company.com";

  const getInitials = (name) => {
    if (!name) return "E";

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const handleNavigation = (item) => {
    setActiveNav(item);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");

    window.location.href = "/login";
  };

  const navigationItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My SOPs",
      icon: FileText,
    },
    {
      label: "My Tasks",
      icon: ClipboardCheck,
    },
    {
      label: "Training",
      icon: BookOpen,
    },
    {
      label: "Activity",
      icon: Clock3,
    },
  ];

  const secondaryItems = [
    {
      label: "Profile",
      icon: User,
    },
    {
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="dashboard-page employee-dashboard-page">

      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className="dashboard-background">

        <div
          className="
            dashboard-background-orb
            dashboard-background-orb-one
          "
        />

        <div
          className="
            dashboard-background-orb
            dashboard-background-orb-two
          "
        />

        <div className="dashboard-background-grid" />

      </div>


      {/* =====================================================
          MOBILE OVERLAY
          ===================================================== */}

      <div
        className={`dashboard-overlay ${
          isSidebarOpen ? "visible" : ""
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />


      {/* =====================================================
          LAYOUT
          ===================================================== */}

      <div className="dashboard-layout">


        {/* ===================================================
            SIDEBAR
            =================================================== */}

        <aside
          className={`dashboard-sidebar ${
            isSidebarOpen ? "mobile-open" : ""
          }`}
        >

          {/* Brand */}

          <div className="dashboard-brand">

            <div className="dashboard-brand-logo">
              AI
            </div>

            <div className="dashboard-brand-content">

              <h1>
                AI SOP Portal
              </h1>

              <span>
                Enterprise Knowledge Platform
              </span>

            </div>

          </div>


          {/* Navigation */}

          <nav className="dashboard-navigation">

            <div className="dashboard-navigation-label">
              Workspace
            </div>

            {navigationItems.map((item) => {

              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  className={`dashboard-nav-item ${
                    activeNav === item.label
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleNavigation(item.label)
                  }
                >
                  <Icon
                    size={17}
                    strokeWidth={1.9}
                  />

                  <span>
                    {item.label}
                  </span>
                </button>
              );

            })}


            <div className="dashboard-navigation-label">
              Account
            </div>

            {secondaryItems.map((item) => {

              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  className={`dashboard-nav-item ${
                    activeNav === item.label
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleNavigation(item.label)
                  }
                >
                  <Icon
                    size={17}
                    strokeWidth={1.9}
                  />

                  <span>
                    {item.label}
                  </span>
                </button>
              );

            })}

          </nav>


          {/* Sidebar Footer */}

          <div className="dashboard-sidebar-footer">

            <div className="dashboard-user-profile">

              <div className="dashboard-user-avatar">
                {getInitials(userName)}
              </div>

              <div className="dashboard-user-info">

                <span className="dashboard-user-name">
                  {userName}
                </span>

                <span className="dashboard-user-role">
                  Employee
                </span>

              </div>

              <button
                type="button"
                className="employee-dashboard-logout"
                onClick={handleLogout}
                title="Sign out"
              >
                <LogOut
                  size={15}
                  strokeWidth={1.9}
                />
              </button>

            </div>

          </div>

        </aside>


        {/* ===================================================
            MAIN
            =================================================== */}

        <main className="dashboard-main">


          {/* =================================================
              HEADER
              ================================================= */}

          <header className="dashboard-header">


            {/* Header Left */}

            <div className="dashboard-header-left">

              <button
                type="button"
                className="dashboard-mobile-menu"
                onClick={() =>
                  setIsSidebarOpen(true)
                }
                aria-label="Open navigation"
              >
                <Menu
                  size={19}
                  strokeWidth={2}
                />
              </button>

              <div className="dashboard-page-title">

                <h1>
                  Employee Dashboard
                </h1>

                <p>
                  Welcome back, {userName}. Here's your
                  workspace overview.
                </p>

              </div>

            </div>


            {/* Header Actions */}

            <div className="dashboard-header-actions">

              <button
                type="button"
                className="dashboard-header-action"
                title="Search"
              >
                <Search
                  size={17}
                  strokeWidth={1.9}
                />
              </button>


              <button
                type="button"
                className="dashboard-header-action"
                title="Notifications"
              >
                <Bell
                  size={17}
                  strokeWidth={1.9}
                />

                <span className="dashboard-notification-dot" />

              </button>


              <button
                type="button"
                className="dashboard-header-action"
                title="Profile"
                onClick={() =>
                  handleNavigation("Profile")
                }
              >
                <User
                  size={17}
                  strokeWidth={1.9}
                />
              </button>

            </div>

          </header>


          {/* =================================================
              CONTENT
              ================================================= */}

          <div className="dashboard-content">


            {/* =================================================
                WELCOME SECTION
                ================================================= */}

            <section className="dashboard-section employee-dashboard-welcome">

              <div className="employee-dashboard-welcome-content">

                <div>

                  <span className="employee-dashboard-eyebrow">
                    EMPLOYEE WORKSPACE
                  </span>

                  <h2>
                    Good to see you,
                    <span> {userName}</span>
                  </h2>

                  <p>
                    Keep track of your SOPs, assigned tasks,
                    training progress, and recent activity
                    from one place.
                  </p>

                </div>

                <div className="employee-dashboard-welcome-icon">

                  <ShieldCheck
                    size={34}
                    strokeWidth={1.6}
                  />

                </div>

              </div>

            </section>


            {/* =================================================
                STATISTICS
                ================================================= */}

            <section className="dashboard-section">

              <div className="dashboard-section-header">

                <div className="dashboard-section-heading">

                  <h2>
                    My Overview
                  </h2>

                  <p>
                    Your current workspace activity
                  </p>

                </div>

              </div>


              <div className="dashboard-stats-grid">


                {/* SOPs */}

                <div className="dashboard-card dashboard-stat-card">

                  <div className="dashboard-stat-header">

                    <span className="dashboard-stat-label">
                      Assigned SOPs
                    </span>

                    <div className="dashboard-stat-icon">

                      <FileText
                        size={17}
                        strokeWidth={1.9}
                      />

                    </div>

                  </div>

                  <div className="dashboard-stat-value">
                    12
                  </div>

                  <div className="dashboard-stat-change positive">

                    <CheckCircle2
                      size={11}
                    />

                    <span>
                      8 completed
                    </span>

                  </div>

                </div>


                {/* Tasks */}

                <div className="dashboard-card dashboard-stat-card">

                  <div className="dashboard-stat-header">

                    <span className="dashboard-stat-label">
                      Pending Tasks
                    </span>

                    <div className="dashboard-stat-icon">

                      <ClipboardCheck
                        size={17}
                        strokeWidth={1.9}
                      />

                    </div>

                  </div>

                  <div className="dashboard-stat-value">
                    5
                  </div>

                  <div className="dashboard-stat-change warning">

                    <Clock3
                      size={11}
                    />

                    <span>
                      2 due this week
                    </span>

                  </div>

                </div>


                {/* Training */}

                <div className="dashboard-card dashboard-stat-card">

                  <div className="dashboard-stat-header">

                    <span className="dashboard-stat-label">
                      Training
                    </span>

                    <div className="dashboard-stat-icon">

                      <BookOpen
                        size={17}
                        strokeWidth={1.9}
                      />

                    </div>

                  </div>

                  <div className="dashboard-stat-value">
                    78%
                  </div>

                  <div className="dashboard-stat-change positive">

                    <CheckCircle2
                      size={11}
                    />

                    <span>
                      On track
                    </span>

                  </div>

                </div>


                {/* Compliance */}

                <div className="dashboard-card dashboard-stat-card">

                  <div className="dashboard-stat-header">

                    <span className="dashboard-stat-label">
                      Compliance
                    </span>

                    <div className="dashboard-stat-icon">

                      <ShieldCheck
                        size={17}
                        strokeWidth={1.9}
                      />

                    </div>

                  </div>

                  <div className="dashboard-stat-value">
                    96%
                  </div>

                  <div className="dashboard-stat-change positive">

                    <CheckCircle2
                      size={11}
                    />

                    <span>
                      Excellent
                    </span>

                  </div>

                </div>

              </div>

            </section>


            {/* =================================================
                LOWER CONTENT
                ================================================= */}

            <div className="dashboard-grid">


              {/* =================================================
                  RECENT SOPs
                  ================================================= */}

              <section className="dashboard-card dashboard-grid-two-third employee-dashboard-panel">

                <div className="employee-dashboard-panel-header">

                  <div className="dashboard-section-heading">

                    <h2>
                      Recent SOPs
                    </h2>

                    <p>
                      SOPs recently assigned to you
                    </p>

                  </div>

                  <button
                    type="button"
                    className="dashboard-button dashboard-button-secondary"
                    onClick={() =>
                      handleNavigation("My SOPs")
                    }
                  >
                    View All
                  </button>

                </div>


                <div className="dashboard-table-wrapper">

                  <table className="dashboard-table">

                    <thead>

                      <tr>
                        <th>
                          SOP
                        </th>

                        <th>
                          Department
                        </th>

                        <th>
                          Status
                        </th>

                        <th>
                          Updated
                        </th>
                      </tr>

                    </thead>

                    <tbody>

                      <tr>

                        <td>
                          Customer Onboarding Process
                        </td>

                        <td>
                          Operations
                        </td>

                        <td>
                          <span className="dashboard-status success">
                            Completed
                          </span>
                        </td>

                        <td>
                          Today
                        </td>

                      </tr>

                      <tr>

                        <td>
                          Data Security Guidelines
                        </td>

                        <td>
                          IT
                        </td>

                        <td>
                          <span className="dashboard-status warning">
                            In Progress
                          </span>
                        </td>

                        <td>
                          Yesterday
                        </td>

                      </tr>

                      <tr>

                        <td>
                          Quality Compliance SOP
                        </td>

                        <td>
                          Quality
                        </td>

                        <td>
                          <span className="dashboard-status info">
                            Assigned
                          </span>
                        </td>

                        <td>
                          2 days ago
                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </section>


              {/* =================================================
                  QUICK ACTIONS
                  ================================================= */}

              <section className="dashboard-card dashboard-grid-third employee-dashboard-panel">

                <div className="employee-dashboard-panel-header">

                  <div className="dashboard-section-heading">

                    <h2>
                      Quick Actions
                    </h2>

                    <p>
                      Frequently used areas
                    </p>

                  </div>

                </div>


                <div className="employee-dashboard-quick-actions">

                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation("My SOPs")
                    }
                  >

                    <div>
                      <FileText
                        size={17}
                        strokeWidth={1.9}
                      />
                    </div>

                    <span>
                      View My SOPs
                    </span>

                    <ChevronDown
                      size={15}
                      className="employee-dashboard-action-arrow"
                    />

                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation("My Tasks")
                    }
                  >

                    <div>
                      <ClipboardCheck
                        size={17}
                        strokeWidth={1.9}
                      />
                    </div>

                    <span>
                      Check My Tasks
                    </span>

                    <ChevronDown
                      size={15}
                      className="employee-dashboard-action-arrow"
                    />

                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation("Training")
                    }
                  >

                    <div>
                      <BookOpen
                        size={17}
                        strokeWidth={1.9}
                      />
                    </div>

                    <span>
                      Continue Training
                    </span>

                    <ChevronDown
                      size={15}
                      className="employee-dashboard-action-arrow"
                    />

                  </button>

                </div>

              </section>


              {/* =================================================
                  RECENT ACTIVITY
                  ================================================= */}

              <section className="dashboard-card dashboard-grid-full employee-dashboard-panel">

                <div className="employee-dashboard-panel-header">

                  <div className="dashboard-section-heading">

                    <h2>
                      Recent Activity
                    </h2>

                    <p>
                      Your latest activity on the platform
                    </p>

                  </div>

                </div>


                <div className="employee-dashboard-activity-list">


                  <div className="employee-dashboard-activity-item">

                    <div className="employee-dashboard-activity-icon success">
                      <CheckCircle2
                        size={16}
                        strokeWidth={1.9}
                      />
                    </div>

                    <div className="employee-dashboard-activity-content">

                      <strong>
                        SOP completed
                      </strong>

                      <span>
                        Customer Onboarding Process
                      </span>

                    </div>

                    <time>
                      2 hours ago
                    </time>

                  </div>


                  <div className="employee-dashboard-activity-item">

                    <div className="employee-dashboard-activity-icon info">
                      <BookOpen
                        size={16}
                        strokeWidth={1.9}
                      />
                    </div>

                    <div className="employee-dashboard-activity-content">

                      <strong>
                        Training resumed
                      </strong>

                      <span>
                        Data Security Awareness
                      </span>

                    </div>

                    <time>
                      Yesterday
                    </time>

                  </div>


                  <div className="employee-dashboard-activity-item">

                    <div className="employee-dashboard-activity-icon warning">
                      <ClipboardCheck
                        size={16}
                        strokeWidth={1.9}
                      />
                    </div>

                    <div className="employee-dashboard-activity-content">

                      <strong>
                        New task assigned
                      </strong>

                      <span>
                        Complete Quality Compliance Review
                      </span>

                    </div>

                    <time>
                      2 days ago
                    </time>

                  </div>

                </div>

              </section>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default EmployeeDashboard;