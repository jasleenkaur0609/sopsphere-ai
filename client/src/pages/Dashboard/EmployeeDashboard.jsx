import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaHome,
  FaBook,
  FaRobot,
  FaFileAlt,
  FaGraduationCap,
  FaShieldAlt,
  FaBell,
  FaChartBar,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
  FaSearch,
  FaMagic,
  FaCloudUploadAlt,
  FaFilePdf,
  FaTasks,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaArrowRight,
  FaPlus,
  FaComments,
  FaTimes,
  FaBars,
  FaUserCircle,
  FaEye,
  FaCalendarAlt,
  FaClipboardCheck,
  FaChartLine,
  FaFileSignature,
  FaHistory,
  FaExternalLinkAlt,
  FaLightbulb,
  FaQuestion,
} from "react-icons/fa";

import "./EmployeeDashboard.css";


/* =========================================================
   SAMPLE DATA
   Replace with API / Redux / backend data later
========================================================= */

const sampleUser = {
  id: "TEST001",
  name: "Jasleen Kaur",
  email: "jasleen@example.com",
  role: "Employee",
};

const quickActions = [
  {
    id: "generate",
    title: "Generate SOP",
    subtitle: "Create with AI",
    icon: FaMagic,
    description:
      "Generate a new Standard Operating Procedure using AI assistance.",
  },
  {
    id: "ask-ai",
    title: "Ask AI",
    subtitle: "Ask anything",
    icon: FaRobot,
    description:
      "Ask questions about SOPs, policies, procedures, documents and compliance.",
  },
  {
    id: "upload",
    title: "Upload Document",
    subtitle: "Analyze file",
    icon: FaCloudUploadAlt,
    description:
      "Upload a document for AI-powered analysis, extraction and classification.",
  },
  {
    id: "find-sop",
    title: "Find SOP",
    subtitle: "Search library",
    icon: FaFileAlt,
    description:
      "Search and access SOPs available in the enterprise knowledge library.",
  },
];

const kpis = [
  {
    id: "sops",
    title: "My SOPs",
    value: "24",
    change: "+3 this month",
    icon: FaBook,
    description:
      "Number of SOPs currently assigned to you or available to you.",
    type: "positive",
  },
  {
    id: "actions",
    title: "Actions",
    value: "4",
    change: "2 due today",
    icon: FaTasks,
    description:
      "Tasks and actions currently requiring your attention.",
    type: "warning",
  },
  {
    id: "training",
    title: "Training",
    value: "82%",
    change: "+8% this month",
    icon: FaGraduationCap,
    description:
      "Your overall training completion percentage.",
    type: "positive",
  },
  {
    id: "compliance",
    title: "Compliance",
    value: "94%",
    change: "+2.4%",
    icon: FaShieldAlt,
    description:
      "Your current compliance score based on assigned requirements.",
    type: "positive",
  },
  {
    id: "queries",
    title: "AI Queries",
    value: "37",
    change: "+12 this week",
    icon: FaRobot,
    description:
      "Number of questions you have asked the AI Knowledge Assistant.",
    type: "positive",
  },
];

const myActions = [
  {
    id: 1,
    title: "Review Data Security SOP",
    category: "SOP Review",
    due: "Today",
    status: "Due Today",
    priority: "High",
  },
  {
    id: 2,
    title: "Complete Compliance Training",
    category: "Training",
    due: "Tomorrow",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Acknowledge Updated HR Policy",
    category: "Policy",
    due: "18 Aug 2026",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: 4,
    title: "Review Process Change",
    category: "SOP",
    due: "20 Aug 2026",
    status: "Pending",
    priority: "Low",
  },
];

const upcomingTraining = [
  {
    id: 1,
    title: "Information Security Awareness",
    date: "20 Aug 2026",
    progress: 75,
  },
  {
    id: 2,
    title: "Workplace Compliance",
    date: "27 Aug 2026",
    progress: 45,
  },
  {
    id: 3,
    title: "Data Privacy Essentials",
    date: "02 Sep 2026",
    progress: 20,
  },
];

const recentSops = [
  {
    id: 1,
    title: "Information Security SOP",
    version: "v3.2",
    status: "Approved",
    viewed: "2 hours ago",
  },
  {
    id: 2,
    title: "Employee Leave Process",
    version: "v2.1",
    status: "Approved",
    viewed: "Yesterday",
  },
  {
    id: 3,
    title: "Incident Management SOP",
    version: "v1.4",
    status: "Updated",
    viewed: "2 days ago",
  },
];

const notifications = [
  {
    id: 1,
    title: "SOP requires your review",
    message: "Data Security SOP has been updated.",
    time: "10 min ago",
    unread: true,
    type: "sop",
  },
  {
    id: 2,
    title: "Training reminder",
    message: "Your compliance training is due tomorrow.",
    time: "1 hour ago",
    unread: true,
    type: "training",
  },
  {
    id: 3,
    title: "Compliance update",
    message: "Your compliance score increased by 2.4%.",
    time: "Yesterday",
    unread: false,
    type: "compliance",
  },
];


/* =========================================================
   COMPONENT
========================================================= */

const EmployeeDashboard = () => {

  /* -------------------------------------------------------
     USER
  ------------------------------------------------------- */

  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : sampleUser;


  /* -------------------------------------------------------
     STATE
  ------------------------------------------------------- */

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [profileOpen, setProfileOpen] = useState(false);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [activeSection, setActiveSection] =
    useState("Dashboard");

  const [openMenus, setOpenMenus] = useState({
    sops: false,
    documents: false,
  });

  const [showAllActions, setShowAllActions] =
    useState(false);

  const [showAllSops, setShowAllSops] =
    useState(false);


  /* -------------------------------------------------------
     GREETING
  ------------------------------------------------------- */

  const getGreeting = () => {

    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";

    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  };


  /* -------------------------------------------------------
     SIDEBAR MENU
  ------------------------------------------------------- */

  const toggleMenu = (menu) => {

    setOpenMenus((previous) => ({
      ...previous,
      [menu]: !previous[menu],
    }));
  };


  const handleNavigation = (section) => {

    setActiveSection(section);

    setProfileOpen(false);

    setNotificationOpen(false);

  };


  /* -------------------------------------------------------
     QUICK ACTION
  ------------------------------------------------------- */

  const handleQuickAction = (actionId) => {

    switch (actionId) {

      case "generate":
        handleNavigation("Generate SOP");
        break;

      case "ask-ai":
        handleNavigation("AI Assistant");
        break;

      case "upload":
        handleNavigation("Upload Document");
        break;

      case "find-sop":
        handleNavigation("All SOPs");
        break;

      default:
        break;
    }
  };


  /* -------------------------------------------------------
     SEARCH
  ------------------------------------------------------- */

  const filteredSops = useMemo(() => {

    if (!searchQuery.trim()) {
      return recentSops;
    }

    return recentSops.filter((sop) =>
      sop.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

  }, [searchQuery]);


  /* -------------------------------------------------------
     LOGOUT
  ------------------------------------------------------- */

  const handleLogout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("userRole");

    window.location.href = "/login";
  };


  /* -------------------------------------------------------
     CLOSE OVERLAYS
  ------------------------------------------------------- */

  const closePanels = () => {

    setProfileOpen(false);

    setNotificationOpen(false);

  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <div
      className={`employee-dashboard ${
        sidebarOpen ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
    >

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="employee-sidebar">

        {/* BRAND */}
        <div className="sidebar-brand">

          <div className="brand-logo">
            AI
          </div>

          {sidebarOpen && (

            <div className="brand-content">

              <h2>
                SOP Intelligence
              </h2>

              <span>
                Employee Portal
              </span>

            </div>

          )}

          <button
            className="sidebar-toggle"
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            title={
              sidebarOpen
                ? "Collapse sidebar"
                : "Expand sidebar"
            }
          >

            {sidebarOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}

          </button>

        </div>


        {/* WORKSPACE */}
        {sidebarOpen && (
          <div className="sidebar-section-title">
            WORKSPACE
          </div>
        )}


        {/* DASHBOARD */}
        <button
          className={`sidebar-item ${
            activeSection === "Dashboard"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleNavigation("Dashboard")
          }
          title="Dashboard"
        >

          <FaHome />

          {sidebarOpen && (
            <span>
              Dashboard
            </span>
          )}

        </button>


        {/* =================================================
            SOP DROPDOWN
        ================================================= */}

        <div className="sidebar-dropdown">

          <button
            className={`sidebar-item ${
              activeSection.includes("SOP")
                ? "active-parent"
                : ""
            }`}
            onClick={() =>
              toggleMenu("sops")
            }
            title="SOPs"
          >

            <FaBook />

            {sidebarOpen && (
              <>

                <span>
                  SOPs
                </span>

                <FaChevronDown
                  className={`dropdown-arrow ${
                    openMenus.sops
                      ? "rotated"
                      : ""
                  }`}
                />

              </>
            )}

          </button>


          <AnimatePresence>

            {sidebarOpen && openMenus.sops && (

              <motion.div
                className="sidebar-submenu"
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
              >

                <button
                  onClick={() =>
                    handleNavigation("All SOPs")
                  }
                  className={
                    activeSection === "All SOPs"
                      ? "submenu-active"
                      : ""
                  }
                >
                  <FaFileAlt />
                  All SOPs
                </button>


                <button
                  onClick={() =>
                    handleNavigation("My SOPs")
                  }
                  className={
                    activeSection === "My SOPs"
                      ? "submenu-active"
                      : ""
                  }
                >
                  <FaBook />
                  My SOPs
                </button>


                <button
                  onClick={() =>
                    handleNavigation("Generate SOP")
                  }
                  className={
                    activeSection === "Generate SOP"
                      ? "submenu-active"
                      : ""
                  }
                >
                  <FaMagic />
                  Generate SOP
                </button>


                <button
                  onClick={() =>
                    handleNavigation("Drafts")
                  }
                  className={
                    activeSection === "Drafts"
                      ? "submenu-active"
                      : ""
                  }
                >
                  <FaFileSignature />
                  Drafts
                </button>

              </motion.div>

            )}

          </AnimatePresence>

        </div>


        {/* AI ASSISTANT */}
        <button
          className={`sidebar-item ${
            activeSection === "AI Assistant"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleNavigation("AI Assistant")
          }
          title="AI Assistant"
        >

          <FaRobot />

          {sidebarOpen && (
            <span>
              AI Assistant
            </span>
          )}

        </button>


        {/* =================================================
            DOCUMENTS DROPDOWN
        ================================================= */}

        <div className="sidebar-dropdown">

          <button
            className={`sidebar-item ${
              activeSection.includes("Document")
                ? "active-parent"
                : ""
            }`}
            onClick={() =>
              toggleMenu("documents")
            }
            title="Documents"
          >

            <FaFileAlt />

            {sidebarOpen && (
              <>

                <span>
                  Documents
                </span>

                <FaChevronDown
                  className={`dropdown-arrow ${
                    openMenus.documents
                      ? "rotated"
                      : ""
                  }`}
                />

              </>
            )}

          </button>


          <AnimatePresence>

            {sidebarOpen &&
              openMenus.documents && (

                <motion.div
                  className="sidebar-submenu"
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                >

                  <button
                    onClick={() =>
                      handleNavigation(
                        "All Documents"
                      )
                    }
                  >
                    <FaFileAlt />
                    All Documents
                  </button>


                  <button
                    onClick={() =>
                      handleNavigation(
                        "Upload Document"
                      )
                    }
                  >
                    <FaCloudUploadAlt />
                    Upload & Analyze
                  </button>

                </motion.div>

              )}

          </AnimatePresence>

        </div>


        {/* TRAINING */}
        <button
          className={`sidebar-item ${
            activeSection === "Training"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleNavigation("Training")
          }
          title="Training"
        >

          <FaGraduationCap />

          {sidebarOpen && (
            <span>
              Training
            </span>
          )}

        </button>


        {/* COMPLIANCE */}
        <button
          className={`sidebar-item ${
            activeSection === "Compliance"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleNavigation("Compliance")
          }
          title="Compliance"
        >

          <FaShieldAlt />

          {sidebarOpen && (
            <span>
              Compliance
            </span>
          )}

        </button>


        {/* NOTIFICATIONS */}
        <button
          className={`sidebar-item ${
            activeSection === "Notifications"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleNavigation("Notifications")
          }
          title="Notifications"
        >

          <div className="sidebar-icon-with-badge">

            <FaBell />

            <span className="sidebar-notification-dot" />

          </div>

          {sidebarOpen && (
            <span>
              Notifications
            </span>
          )}

        </button>


        {/* ANALYTICS */}
        <button
          className={`sidebar-item ${
            activeSection === "My Analytics"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleNavigation("My Analytics")
          }
          title="My Analytics"
        >

          <FaChartBar />

          {sidebarOpen && (
            <span>
              My Analytics
            </span>
          )}

        </button>


        <div className="sidebar-divider" />


        {/* SETTINGS */}
        <button
          className={`sidebar-item ${
            activeSection === "Settings"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleNavigation("Settings")
          }
          title="Settings"
        >

          <FaCog />

          {sidebarOpen && (
            <span>
              Settings
            </span>
          )}

        </button>


        {/* HELP */}
        <button
          className={`sidebar-item ${
            activeSection === "Help & Support"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleNavigation("Help & Support")
          }
          title="Help & Support"
        >

          <FaQuestionCircle />

          {sidebarOpen && (
            <span>
              Help & Support
            </span>
          )}

        </button>


        {/* =================================================
            SIDEBAR USER
        ================================================= */}

        <div className="sidebar-user">

          <div className="sidebar-user-avatar">
            {user.name?.charAt(0)?.toUpperCase()}
          </div>

          {sidebarOpen && (

            <div className="sidebar-user-info">

              <strong>
                {user.name}
              </strong>

              <span>
                {user.role || "Employee"}
              </span>

            </div>

          )}

          {sidebarOpen && (

            <button
              className="sidebar-logout"
              onClick={handleLogout}
              title="Sign out"
            >
              <FaSignOutAlt />
            </button>

          )}

        </div>

      </aside>


      {/* =================================================
          MAIN AREA
      ================================================= */}

      <main className="employee-main">

        {/* =================================================
            TOP HEADER
        ================================================= */}

        <header className="employee-header">

          <div className="header-title">

            <div className="header-eyebrow">
              EMPLOYEE WORKSPACE
            </div>

            <h1>
              {activeSection}
            </h1>

          </div>


          <div className="header-actions">

            {/* NOTIFICATION */}
            <div className="header-dropdown-wrapper">

              <button
                className="header-icon-button"
                onClick={() => {

                  setNotificationOpen(
                    !notificationOpen
                  );

                  setProfileOpen(false);

                }}
                title="Notifications"
              >

                <FaBell />

                <span className="notification-badge">
                  2
                </span>

              </button>


              <AnimatePresence>

                {notificationOpen && (

                  <motion.div
                    className="notification-panel"
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                  >

                    <div className="panel-header">

                      <strong>
                        Notifications
                      </strong>

                      <span>
                        2 unread
                      </span>

                    </div>


                    {notifications.map(
                      (notification) => (

                        <div
                          className={`notification-item ${
                            notification.unread
                              ? "unread"
                              : ""
                          }`}
                          key={
                            notification.id
                          }
                        >

                          <div className="notification-icon">
                            {notification.type ===
                              "training" ? (
                              <FaGraduationCap />
                            ) : notification.type ===
                              "compliance" ? (
                              <FaShieldAlt />
                            ) : (
                              <FaBook />
                            )}
                          </div>


                          <div>

                            <strong>
                              {
                                notification.title
                              }
                            </strong>

                            <p>
                              {
                                notification.message
                              }
                            </p>

                            <small>
                              {
                                notification.time
                              }
                            </small>

                          </div>

                        </div>

                      )
                    )}

                  </motion.div>

                )}

              </AnimatePresence>

            </div>


            {/* PROFILE */}
            <div className="header-profile-wrapper">

              <button
                className="header-profile"
                onClick={() => {

                  setProfileOpen(
                    !profileOpen
                  );

                  setNotificationOpen(false);

                }}
              >

                <div className="header-avatar">
                  {user.name
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

                <div className="header-user-details">

                  <strong>
                    {user.name}
                  </strong>

                  <span>
                    {user.role || "Employee"}
                  </span>

                </div>

                <FaChevronDown
                  className={
                    profileOpen
                      ? "profile-arrow rotated"
                      : "profile-arrow"
                  }
                />

              </button>


              <AnimatePresence>

                {profileOpen && (

                  <motion.div
                    className="profile-dropdown"
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                  >

                    <div className="profile-dropdown-header">

                      <div className="profile-large-avatar">
                        {user.name
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </div>

                      <div>

                        <strong>
                          {user.name}
                        </strong>

                        <span>
                          {user.email}
                        </span>

                      </div>

                    </div>


                    <button
                      onClick={() =>
                        handleNavigation(
                          "Settings"
                        )
                      }
                    >
                      <FaCog />
                      Account Settings
                    </button>


                    <button
                      onClick={() =>
                        handleNavigation(
                          "My Analytics"
                        )
                      }
                    >
                      <FaChartBar />
                      My Activity
                    </button>


                    <button
                      className="profile-logout"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt />
                      Sign Out
                    </button>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          </div>

        </header>


        {/* =================================================
            DASHBOARD CONTENT
        ================================================= */}

        {activeSection === "Dashboard" && (

          <div className="employee-content">

            {/* =================================================
                WELCOME CARD
            ================================================= */}

            <motion.section
              className="welcome-card"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >

              <div className="welcome-content">

                <div className="welcome-eyebrow">
                  PERSONALIZED WORKSPACE
                </div>

                <h2>
                  {getGreeting()},{" "}
                  <span>
                    {user.name}
                  </span>{" "}
                  👋
                </h2>

                <p>
                  Here's your personalized SOP
                  and compliance overview. Stay
                  informed, complete your actions,
                  and get instant answers with AI.
                </p>

              </div>


              <div className="welcome-decoration">

                <FaRobot />

              </div>

            </motion.section>


            {/* =================================================
                SEARCH
            ================================================= */}

            <section className="dashboard-search">

              <FaSearch />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value
                  )
                }
                placeholder="Search SOPs, documents, policies or ask AI..."
              />

              <span className="search-shortcut">
                ⌘ K
              </span>

            </section>


            {/* =================================================
                QUICK ACTIONS
            ================================================= */}

            <section className="dashboard-section">

              <div className="section-heading">

                <div>

                  <span>
                    GET STARTED
                  </span>

                  <h2>
                    Quick Actions
                  </h2>

                </div>

              </div>


              <div className="quick-actions-grid">

                {quickActions.map((action) => {

                  const Icon = action.icon;

                  return (

                    <motion.button
                      key={action.id}
                      className="quick-action-card"
                      onClick={() =>
                        handleQuickAction(
                          action.id
                        )
                      }
                      whileHover={{
                        y: -3,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                    >

                      <div className="quick-action-icon">
                        <Icon />
                      </div>


                      <div className="quick-action-content">

                        <strong>
                          {action.title}
                        </strong>

                        <span>
                          {action.subtitle}
                        </span>

                      </div>


                      <div
                        className="info-tooltip-wrapper"
                        title={
                          action.description
                        }
                      >

                        <FaInfoCircle />

                        <div className="info-tooltip">
                          {action.description}
                        </div>

                      </div>


                      <FaArrowRight className="quick-action-arrow" />

                    </motion.button>

                  );

                })}

              </div>

            </section>


            {/* =================================================
                KPI CARDS
            ================================================= */}

            <section className="kpi-grid">

              {kpis.map((kpi) => {

                const Icon = kpi.icon;

                return (

                  <motion.div
                    className="kpi-card"
                    key={kpi.id}
                    whileHover={{
                      y: -3,
                    }}
                  >

                    <div className="kpi-top">

                      <div className="kpi-icon">
                        <Icon />
                      </div>


                      <div
                        className="info-tooltip-wrapper"
                        title={kpi.description}
                      >

                        <FaInfoCircle />

                        <div className="info-tooltip">
                          {kpi.description}
                        </div>

                      </div>

                    </div>


                    <div className="kpi-label">
                      {kpi.title}
                    </div>

                    <div className="kpi-value">
                      {kpi.value}
                    </div>

                    <div
                      className={`kpi-change ${kpi.type}`}
                    >
                      {kpi.change}
                    </div>


                    <div className="kpi-decoration" />

                  </motion.div>

                );

              })}

            </section>


            {/* =================================================
                LOWER DASHBOARD GRID
            ================================================= */}

            <div className="dashboard-two-column">


              {/* =================================================
                  AI KNOWLEDGE ASSISTANT
              ================================================= */}

              <section className="dashboard-panel ai-panel">

                <div className="panel-title-row">

                  <div className="panel-title">

                    <div className="panel-icon ai">
                      <FaRobot />
                    </div>

                    <div>

                      <span>
                        INTELLIGENT KNOWLEDGE
                      </span>

                      <h2>
                        AI Knowledge Assistant
                      </h2>

                    </div>

                  </div>


                  <div
                    className="info-tooltip-wrapper"
                    title="Use AI to ask questions about SOPs, policies, documents and procedures."
                  >

                    <FaInfoCircle />

                    <div className="info-tooltip">
                      Ask questions about your
                      organization's knowledge base.
                    </div>

                  </div>

                </div>


                <div className="ai-content">

                  <div className="ai-message">

                    <div className="ai-avatar">
                      <FaRobot />
                    </div>

                    <div>

                      <strong>
                        How can I help you?
                      </strong>

                      <p>
                        Ask me about SOPs,
                        policies, compliance,
                        training or procedures.
                      </p>

                    </div>

                  </div>


                  <div className="ai-suggestions">

                    <button>
                      <FaQuestion />
                      Explain an SOP
                    </button>

                    <button>
                      <FaShieldAlt />
                      Check compliance
                    </button>

                    <button>
                      <FaGraduationCap />
                      Find training
                    </button>

                  </div>


                  <button
                    className="ai-start-button"
                    onClick={() =>
                      handleNavigation(
                        "AI Assistant"
                      )
                    }
                  >

                    <FaComments />

                    Ask AI a question

                    <FaArrowRight />

                  </button>

                </div>

              </section>


              {/* =================================================
                  MY ACTIONS
              ================================================= */}

              <section className="dashboard-panel">

                <div className="panel-title-row">

                  <div className="panel-title">

                    <div className="panel-icon">
                      <FaTasks />
                    </div>

                    <div>

                      <span>
                        YOUR WORK
                      </span>

                      <h2>
                        My Actions
                      </h2>

                    </div>

                  </div>


                  <button
                    className="view-all-button"
                    onClick={() =>
                      setShowAllActions(
                        !showAllActions
                      )
                    }
                  >

                    {showAllActions
                      ? "Show Less"
                      : "View All"}

                    <FaArrowRight />

                  </button>

                </div>


                <div className="actions-list">

                  {(showAllActions
                    ? myActions
                    : myActions.slice(0, 3)
                  ).map((action) => (

                    <div
                      className="action-item"
                      key={action.id}
                    >

                      <div className="action-status-icon">

                        {action.priority ===
                        "High" ? (
                          <FaExclamationTriangle />
                        ) : (
                          <FaClipboardCheck />
                        )}

                      </div>


                      <div className="action-details">

                        <strong>
                          {action.title}
                        </strong>

                        <span>
                          {action.category}
                        </span>

                      </div>


                      <div className="action-due">

                        <FaClock />

                        <span>
                          {action.due}
                        </span>

                      </div>


                      <div
                        className={`priority-badge ${action.priority.toLowerCase()}`}
                      >
                        {action.priority}
                      </div>


                      <div
                        className="info-tooltip-wrapper"
                        title="Action information"
                      >

                        <FaInfoCircle />

                        <div className="info-tooltip">
                          {action.status}. Priority:
                          {" "}
                          {action.priority}.
                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </section>

            </div>


            {/* =================================================
                TRAINING + COMPLIANCE
            ================================================= */}

            <div className="dashboard-two-column">


              {/* TRAINING */}
              <section className="dashboard-panel">

                <div className="panel-title-row">

                  <div className="panel-title">

                    <div className="panel-icon">
                      <FaGraduationCap />
                    </div>

                    <div>

                      <span>
                        DEVELOPMENT
                      </span>

                      <h2>
                        Upcoming Training
                      </h2>

                    </div>

                  </div>


                  <div
                    className="info-tooltip-wrapper"
                    title="Training assigned to you and your current completion progress."
                  >

                    <FaInfoCircle />

                    <div className="info-tooltip">
                      Track assigned training and
                      completion progress.
                    </div>

                  </div>

                </div>


                <div className="training-list">

                  {upcomingTraining.map(
                    (training) => (

                      <div
                        className="training-item"
                        key={training.id}
                      >

                        <div className="training-icon">
                          <FaGraduationCap />
                        </div>


                        <div className="training-details">

                          <strong>
                            {training.title}
                          </strong>

                          <span>
                            <FaCalendarAlt />
                            {training.date}
                          </span>


                          <div className="progress-bar">

                            <div
                              className="progress-fill"
                              style={{
                                width: `${training.progress}%`,
                              }}
                            />

                          </div>

                        </div>


                        <strong className="training-percentage">
                          {training.progress}%
                        </strong>

                      </div>

                    )
                  )}

                </div>


                <button
                  className="panel-footer-button"
                  onClick={() =>
                    handleNavigation(
                      "Training"
                    )
                  }
                >

                  View Training

                  <FaArrowRight />

                </button>

              </section>


              {/* COMPLIANCE */}
              <section className="dashboard-panel compliance-panel">

                <div className="panel-title-row">

                  <div className="panel-title">

                    <div className="panel-icon">
                      <FaShieldAlt />
                    </div>

                    <div>

                      <span>
                        RISK & GOVERNANCE
                      </span>

                      <h2>
                        Compliance Overview
                      </h2>

                    </div>

                  </div>


                  <div
                    className="info-tooltip-wrapper"
                    title="Overview of your current compliance status."
                  >

                    <FaInfoCircle />

                    <div className="info-tooltip">
                      Your current compliance
                      score and outstanding
                      requirements.
                    </div>

                  </div>

                </div>


                <div className="compliance-score">

                  <div className="score-circle">

                    <strong>
                      94%
                    </strong>

                    <span>
                      Compliant
                    </span>

                  </div>


                  <div className="compliance-details">

                    <div>
                      <FaCheckCircle />
                      SOP Acknowledgements
                      <strong>
                        100%
                      </strong>
                    </div>

                    <div>
                      <FaCheckCircle />
                      Required Training
                      <strong>
                        88%
                      </strong>
                    </div>

                    <div>
                      <FaExclamationTriangle />
                      Pending Actions
                      <strong>
                        2
                      </strong>
                    </div>

                  </div>

                </div>


                <button
                  className="panel-footer-button"
                  onClick={() =>
                    handleNavigation(
                      "Compliance"
                    )
                  }
                >

                  View Compliance

                  <FaArrowRight />

                </button>

              </section>

            </div>


            {/* =================================================
                RECENT SOP ACTIVITY
            ================================================= */}

            <section className="dashboard-panel recent-sop-panel">

              <div className="panel-title-row">

                <div className="panel-title">

                  <div className="panel-icon">
                    <FaHistory />
                  </div>

                  <div>

                    <span>
                      KNOWLEDGE ACTIVITY
                    </span>

                    <h2>
                      Recent SOP Activity
                    </h2>

                  </div>

                </div>


                <button
                  className="view-all-button"
                  onClick={() =>
                    setShowAllSops(
                      !showAllSops
                    )
                  }
                >

                  {showAllSops
                    ? "Show Less"
                    : "View All"}

                  <FaArrowRight />

                </button>

              </div>


              <div className="recent-sop-table">

                <div className="sop-table-header">

                  <span>
                    SOP
                  </span>

                  <span>
                    VERSION
                  </span>

                  <span>
                    STATUS
                  </span>

                  <span>
                    LAST VIEWED
                  </span>

                  <span>
                    ACTION
                  </span>

                </div>


                {(showAllSops
                  ? filteredSops
                  : filteredSops.slice(0, 3)
                ).map((sop) => (

                  <div
                    className="sop-table-row"
                    key={sop.id}
                  >

                    <div className="sop-name">

                      <div className="sop-file-icon">
                        <FaFilePdf />
                      </div>

                      <strong>
                        {sop.title}
                      </strong>

                    </div>


                    <span>
                      {sop.version}
                    </span>


                    <span
                      className={`sop-status ${
                        sop.status.toLowerCase()
                      }`}
                    >

                      <FaCheckCircle />

                      {sop.status}

                    </span>


                    <span>
                      {sop.viewed}
                    </span>


                    <button
                      className="sop-view-button"
                      title="Open SOP"
                      onClick={() =>
                        handleNavigation(
                          "All SOPs"
                        )
                      }
                    >

                      <FaEye />

                    </button>

                  </div>

                ))}


                {filteredSops.length === 0 && (

                  <div className="no-results">

                    <FaSearch />

                    <p>
                      No SOPs found for "
                      {searchQuery}"
                    </p>

                  </div>

                )}

              </div>

            </section>


            {/* =================================================
                QUICK LINKS
            ================================================= */}

            <section className="dashboard-section">

              <div className="section-heading">

                <div>

                  <span>
                    EXPLORE
                  </span>

                  <h2>
                    Your Workspace
                  </h2>

                </div>

              </div>


              <div className="workspace-links">

                <button
                  onClick={() =>
                    handleNavigation(
                      "My Analytics"
                    )
                  }
                >

                  <div>
                    <FaChartLine />
                  </div>

                  <span>
                    My Analytics
                  </span>

                  <FaArrowRight />

                </button>


                <button
                  onClick={() =>
                    handleNavigation(
                      "Notifications"
                    )
                  }
                >

                  <div>
                    <FaBell />
                  </div>

                  <span>
                    Notifications
                  </span>

                  <FaArrowRight />

                </button>


                <button
                  onClick={() =>
                    handleNavigation(
                      "Documents"
                    )
                  }
                >

                  <div>
                    <FaFileAlt />
                  </div>

                  <span>
                    Document Library
                  </span>

                  <FaArrowRight />

                </button>


                <button
                  onClick={() =>
                    handleNavigation(
                      "Help & Support"
                    )
                  }
                >

                  <div>
                    <FaQuestionCircle />
                  </div>

                  <span>
                    Help & Support
                  </span>

                  <FaArrowRight />

                </button>

              </div>

            </section>


            {/* =================================================
                FOOTER
            ================================================= */}

            <footer className="employee-dashboard-footer">

              <div>

                <FaShieldAlt />

                <span>
                  Protected enterprise workspace
                </span>

              </div>

              <span>
                SOP Intelligence Portal
              </span>

            </footer>

          </div>

        )}


        {/* =================================================
            PLACEHOLDER FOR OTHER SECTIONS
        ================================================= */}

        {activeSection !== "Dashboard" && (

          <div className="section-placeholder">

            <div className="placeholder-icon">

              {activeSection === "AI Assistant" && (
                <FaRobot />
              )}

              {activeSection.includes("SOP") && (
                <FaBook />
              )}

              {activeSection.includes(
                "Document"
              ) && <FaFileAlt />}

              {activeSection === "Training" && (
                <FaGraduationCap />
              )}

              {activeSection ===
                "Compliance" && (
                <FaShieldAlt />
              )}

              {activeSection ===
                "Notifications" && (
                <FaBell />
              )}

              {activeSection ===
                "My Analytics" && (
                <FaChartBar />
              )}

              {activeSection ===
                "Settings" && <FaCog />}

              {activeSection ===
                "Help & Support" && (
                <FaQuestionCircle />
              )}

              {activeSection ===
                "Generate SOP" && (
                <FaMagic />
              )}

              {activeSection ===
                "Upload Document" && (
                <FaCloudUploadAlt />
              )}

            </div>


            <span>
              {activeSection.toUpperCase()}
            </span>


            <h2>
              {activeSection}
            </h2>


            <p>
              This workspace is ready for
              integration with the backend.
              The dashboard navigation is
              already configured for this
              section.
            </p>


            <button
              onClick={() =>
                handleNavigation(
                  "Dashboard"
                )
              }
            >

              <FaArrowRight />

              Back to Dashboard

            </button>

          </div>

        )}

      </main>


      {/* =================================================
          CLICK OUTSIDE OVERLAY
      ================================================= */}

      {(profileOpen ||
        notificationOpen) && (

        <div
          className="dashboard-overlay"
          onClick={closePanels}
        />

      )}

    </div>

  );

};

export default EmployeeDashboard;