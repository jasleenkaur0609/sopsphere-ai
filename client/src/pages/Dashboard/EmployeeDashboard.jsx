import React from "react";
import {
  FaMagic,
  FaRobot,
  FaCloudUploadAlt,
  FaFileAlt,
  FaBookOpen,
  FaTasks,
  FaGraduationCap,
  FaShieldAlt,
  FaBell,
  FaChartBar,
  FaCog,
  FaQuestionCircle,
  FaSearch,
  FaInfoCircle,
  FaArrowRight,
  FaChevronRight,
  FaChevronDown,
  FaSignOutAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaFileAlt as FaDocument,
} from "react-icons/fa";

import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  /* =========================================================
     USER
     ========================================================= */

  const storedUser = localStorage.getItem("user");

  let user = {
    name: "Jasleen Kaur",
    email: "jasleen@example.com",
    role: "Employee",
  };

  try {
    if (storedUser) {
      user = {
        ...user,
        ...JSON.parse(storedUser),
      };
    }
  } catch (error) {
    console.error("Unable to read user information", error);
  }

  const firstName = user.name
    ? user.name.split(" ")[0]
    : "Employee";

  /* =========================================================
     DATA
     ========================================================= */

  const quickActions = [
    {
      title: "Generate SOP",
      description: "Create with AI",
      icon: <FaMagic />,
      tooltip:
        "Generate a new Standard Operating Procedure using AI assistance.",
    },
    {
      title: "Ask AI",
      description: "Ask anything",
      icon: <FaRobot />,
      tooltip:
        "Ask the AI assistant questions about SOPs, policies and company knowledge.",
    },
    {
      title: "Upload Document",
      description: "Analyze file",
      icon: <FaCloudUploadAlt />,
      tooltip:
        "Upload a document and use AI to analyze and understand its contents.",
    },
    {
      title: "Find SOP",
      description: "Search library",
      icon: <FaDocument />,
      tooltip:
        "Search and access SOPs available in the organization's knowledge library.",
    },
  ];

  const kpis = [
    {
      title: "My SOPs",
      value: "24",
      change: "+3 this month",
      icon: <FaBookOpen />,
      description: "Assigned & accessible",
      tooltip:
        "Total number of SOPs currently assigned to you or available for your role.",
      positive: true,
    },
    {
      title: "Actions",
      value: "4",
      change: "2 due today",
      icon: <FaTasks />,
      description: "Require your attention",
      tooltip:
        "Tasks and actions currently assigned to you that may require your attention.",
      positive: false,
    },
    {
      title: "Training",
      value: "82%",
      change: "+8% this month",
      icon: <FaGraduationCap />,
      description: "Overall completion",
      tooltip:
        "Your overall completion percentage for assigned training programs.",
      positive: true,
    },
    {
      title: "Compliance",
      value: "94%",
      change: "+2.4%",
      icon: <FaShieldAlt />,
      description: "Current compliance score",
      tooltip:
        "Your current compliance score based on required SOPs, training and actions.",
      positive: true,
    },
    {
      title: "AI Queries",
      value: "37",
      change: "+12 this week",
      icon: <FaRobot />,
      description: "Questions asked",
      tooltip:
        "Number of questions you have asked the AI Knowledge Assistant.",
      positive: true,
    },
  ];

  const recentActions = [
    {
      icon: <FaCheckCircle />,
      title: "SOP Review Completed",
      description: "Information Security Policy",
      time: "Today",
    },
    {
      icon: <FaClock />,
      title: "Training Due",
      description: "Data Privacy & Security",
      time: "Tomorrow",
    },
    {
      icon: <FaDocument />,
      title: "Document Uploaded",
      description: "Process Guidelines.pdf",
      time: "2 days ago",
    },
  ];

  /* =========================================================
     HELPERS
     ========================================================= */

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  };

  const handleQuickAction = (title) => {
    console.log(`${title} clicked`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");

    window.location.href = "/login";
  };

  /* =========================================================
     JSX
     ========================================================= */

  return (
    <div className="employee-dashboard-page">

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside className="employee-sidebar">

        {/* Logo */}
        <div className="employee-sidebar-brand">

          <div className="employee-brand-icon">
            AI
          </div>

          <div className="employee-brand-text">
            <h2>SOP Intelligence</h2>
            <span>Employee Portal</span>
          </div>

        </div>


        {/* Navigation */}
        <nav className="employee-sidebar-navigation">

          <div className="employee-navigation-label">
            WORKSPACE
          </div>


          <button className="employee-nav-item active">
            <span className="employee-nav-icon">
              <FaBookOpen />
            </span>

            <span>Dashboard</span>
          </button>


          <button className="employee-nav-item">
            <span className="employee-nav-icon">
              <FaBookOpen />
            </span>

            <span>SOPs</span>

            <FaChevronRight className="employee-nav-arrow" />
          </button>


          <div className="employee-sub-navigation">

            <button>All SOPs</button>
            <button>My SOPs</button>
            <button>Generate SOP</button>
            <button>Drafts</button>

          </div>


          <button className="employee-nav-item">

            <span className="employee-nav-icon">
              <FaRobot />
            </span>

            <span>AI Assistant</span>

          </button>


          <button className="employee-nav-item">

            <span className="employee-nav-icon">
              <FaFileAlt />
            </span>

            <span>Documents</span>

            <FaChevronRight className="employee-nav-arrow" />

          </button>


          <div className="employee-sub-navigation">

            <button>Upload</button>
            <button>AI Analysis</button>

          </div>


          <button className="employee-nav-item">

            <span className="employee-nav-icon">
              <FaGraduationCap />
            </span>

            <span>Training</span>

          </button>


          <button className="employee-nav-item">

            <span className="employee-nav-icon">
              <FaShieldAlt />
            </span>

            <span>Compliance</span>

          </button>


          <button className="employee-nav-item">

            <span className="employee-nav-icon">
              <FaBell />
            </span>

            <span>Notifications</span>

          </button>


          <button className="employee-nav-item">

            <span className="employee-nav-icon">
              <FaChartBar />
            </span>

            <span>My Analytics</span>

          </button>


          <div className="employee-sidebar-divider" />


          <button className="employee-nav-item">

            <span className="employee-nav-icon">
              <FaCog />
            </span>

            <span>Settings</span>

          </button>


          <button className="employee-nav-item">

            <span className="employee-nav-icon">
              <FaQuestionCircle />
            </span>

            <span>Help & Support</span>

          </button>

        </nav>


        {/* Sidebar User */}
        <div className="employee-sidebar-user">

          <div className="employee-user-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <div className="employee-user-details">

            <strong>{user.name}</strong>

            <span>Employee</span>

          </div>

          <button
            className="employee-logout-button"
            onClick={handleLogout}
            title="Sign out"
          >
            <FaSignOutAlt />
          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="employee-dashboard-main">


        {/* ===================================================
            TOP BAR
            =================================================== */}

        <header className="employee-topbar">

          <div className="employee-topbar-left">

            <div className="employee-topbar-icon">
              <FaBookOpen />
            </div>

            <div>

              <span className="employee-workspace-label">
                EMPLOYEE WORKSPACE
              </span>

              <h1>Dashboard</h1>

            </div>

          </div>


          <div className="employee-topbar-right">

            <button
              className="employee-notification-button"
              title="Notifications"
            >

              <FaBell />

              <span className="employee-notification-dot" />

            </button>


            <button className="employee-profile-button">

              <span className="employee-profile-avatar">
                {firstName.charAt(0).toUpperCase()}
              </span>

              <span className="employee-profile-details">

                <strong>{user.name}</strong>

                <small>user</small>

              </span>

              <FaChevronDown />

            </button>

          </div>

        </header>


        {/* ===================================================
            PAGE CONTENT
            =================================================== */}

        <div className="employee-dashboard-content-wrapper">


          {/* =================================================
              WELCOME CARD
              ================================================= */}

          <section className="employee-welcome-card">

            <div className="employee-welcome-content">

              <span className="employee-section-eyebrow">
                PERSONALIZED WORKSPACE
              </span>

              <h2>
                {getGreeting()},{" "}
                <span>{user.name || "Employee"}</span>{" "}
                <span className="employee-wave">👋</span>
              </h2>

              <p>
                Here's your personalized SOP and compliance overview.
                Stay informed, complete your actions, and get instant
                answers with AI.
              </p>

            </div>


            <div className="employee-welcome-decoration">

              <FaRobot />

            </div>

          </section>


          {/* =================================================
              SEARCH
              ================================================= */}

          <div className="employee-search-wrapper">

            <FaSearch className="employee-search-icon" />

            <input
              type="text"
              placeholder="Search SOPs, documents, policies or ask AI..."
            />

            <span className="employee-search-shortcut">
              ⌘ K
            </span>

          </div>


          {/* =================================================
              QUICK ACTIONS
              ================================================= */}

          <section className="employee-section">

            <div className="employee-section-heading">

              <div>

                <span className="employee-section-eyebrow">
                  GET STARTED
                </span>

                <h3>Quick Actions</h3>

              </div>

            </div>


            <div className="employee-quick-actions">

              {quickActions.map((action) => (

                <button
                  key={action.title}
                  className="employee-quick-action-card"
                  onClick={() => handleQuickAction(action.title)}
                >

                  <div className="employee-quick-action-icon">
                    {action.icon}
                  </div>


                  <div className="employee-quick-action-content">

                    <strong>
                      {action.title}
                    </strong>

                    <span>
                      {action.description}
                    </span>

                  </div>


                  <div className="employee-card-info">

                    <FaInfoCircle />

                    <span>
                      {action.tooltip}
                    </span>

                  </div>


                  <FaArrowRight className="employee-action-arrow" />

                </button>

              ))}

            </div>

          </section>


          {/* =================================================
              KPI CARDS
              ================================================= */}

          <section className="employee-kpi-grid">

            {kpis.map((kpi) => (

              <article
                className="employee-kpi-card"
                key={kpi.title}
              >

                <div className="employee-kpi-top">

                  <div className="employee-kpi-icon">
                    {kpi.icon}
                  </div>


                  <div className="employee-card-info">

                    <FaInfoCircle />

                    <span>
                      {kpi.tooltip}
                    </span>

                  </div>

                </div>


                <p className="employee-kpi-label">
                  {kpi.title}
                </p>


                <h3 className="employee-kpi-value">
                  {kpi.value}
                </h3>


                <div className="employee-kpi-bottom">

                  <span
                    className={
                      kpi.positive
                        ? "employee-kpi-change positive"
                        : "employee-kpi-change warning"
                    }
                  >
                    {kpi.change}
                  </span>

                  <span className="employee-kpi-description">
                    {kpi.description}
                  </span>

                </div>


                <div className="employee-kpi-decoration" />

              </article>

            ))}

          </section>


          {/* =================================================
              LOWER CONTENT
              ================================================= */}

          <section className="employee-lower-grid">


            {/* AI ASSISTANT */}

            <div className="employee-large-card">

              <div className="employee-large-card-header">

                <div className="employee-large-card-title">

                  <div className="employee-large-card-icon">
                    <FaRobot />
                  </div>

                  <div>

                    <span className="employee-section-eyebrow">
                      INTELLIGENT KNOWLEDGE
                    </span>

                    <h3>
                      AI Knowledge Assistant
                    </h3>

                  </div>

                </div>


                <div className="employee-card-info">

                  <FaInfoCircle />

                  <span>
                    Use the AI assistant to ask questions about
                    SOPs, policies, documents and enterprise
                    knowledge.
                  </span>

                </div>

              </div>


              <div className="employee-ai-body">

                <p>
                  Get instant answers from your organization's
                  knowledge base.
                </p>

                <button className="employee-primary-button">

                  <FaRobot />

                  Ask AI

                  <FaArrowRight />

                </button>

              </div>

            </div>


            {/* MY ACTIONS */}

            <div className="employee-large-card">

              <div className="employee-large-card-header">

                <div>

                  <span className="employee-section-eyebrow">
                    YOUR WORK
                  </span>

                  <h3>
                    My Actions
                  </h3>

                </div>


                <button className="employee-view-all">
                  View All
                  <FaArrowRight />
                </button>

              </div>


              <div className="employee-actions-list">

                {recentActions.map((action) => (

                  <div
                    className="employee-recent-action"
                    key={action.title}
                  >

                    <div className="employee-recent-action-icon">
                      {action.icon}
                    </div>

                    <div className="employee-recent-action-content">

                      <strong>
                        {action.title}
                      </strong>

                      <span>
                        {action.description}
                      </span>

                    </div>

                    <small>
                      {action.time}
                    </small>

                  </div>

                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              FOOTER
              ================================================= */}

          <footer className="employee-dashboard-footer">

            <span>
              <FaShieldAlt />
              Secure enterprise workspace
            </span>

            <span>
              <FaCalendarAlt />
              Last updated today
            </span>

          </footer>

        </div>

      </main>

    </div>
  );
};

export default EmployeeDashboard;