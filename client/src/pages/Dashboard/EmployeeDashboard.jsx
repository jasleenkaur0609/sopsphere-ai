import React, { useMemo, useState } from "react";

import {
  FaBars,
  FaTimes,
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
  FaChevronDown,
  FaChevronRight,
  FaArrowRight,
  FaSearch,
  FaCloudUploadAlt,
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaInfoCircle,
  FaCalendarAlt,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaMagic,
  FaExchangeAlt,
  FaLightbulb,
  FaHistory,
  FaUser,
  FaSignOutAlt,
  FaEnvelope,
  FaExclamationTriangle,
  FaCheck,
  FaTimesCircle,
  FaChartLine,
  FaLock,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

import "./EmployeeDashboard.css";


/* =========================================================
   MOCK USER
   ========================================================= */

const defaultUser = {
  id: "TEST001",
  name: "Jasleen Kaur",
  email: "jasleen@example.com",
  role: "Employee",
};


/* =========================================================
   MOCK KPI DATA
   ========================================================= */

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


/* =========================================================
   QUICK ACTIONS
   ========================================================= */

const quickActions = [
  {
    id: "generate",
    title: "Generate SOP",
    subtitle: "Create with AI",
    icon: FaMagic,
    description:
      "Create a structured SOP from your process knowledge using AI.",
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


/* =========================================================
   MY ACTIONS
   ========================================================= */

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


/* =========================================================
   MY SOPS
   ========================================================= */

const mySOPs = [
  {
    id: 1,
    title: "Distributor Onboarding",
    version: "v3.2",
    status: "Approved",
    updated: "12 Aug 2026",
    owner: "Operations",
    pages: 14,
  },

  {
    id: 2,
    title: "Invoice Processing",
    version: "v2.4",
    status: "Approved",
    updated: "10 Aug 2026",
    owner: "Finance",
    pages: 11,
  },

  {
    id: 3,
    title: "Email Handling",
    version: "v4.1",
    status: "Approved",
    updated: "08 Aug 2026",
    owner: "Customer Operations",
    pages: 9,
  },

  {
    id: 4,
    title: "Customer Escalation",
    version: "v2.1",
    status: "Under Review",
    updated: "06 Aug 2026",
    owner: "Customer Experience",
    pages: 16,
  },
];


/* =========================================================
   TRAINING
   ========================================================= */

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


/* =========================================================
   GENERATED SOPs
   ========================================================= */

const generatedSOPs = [
  {
    id: 1,
    title: "Distributor Onboarding",
    status: "Draft",
    date: "13 Aug 2026",
  },

  {
    id: 2,
    title: "Invoice Processing",
    status: "Pending Review",
    date: "12 Aug 2026",
  },

  {
    id: 3,
    title: "Email Handling",
    status: "Approved",
    date: "10 Aug 2026",
  },
];


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

const initialNotifications = [
  {
    id: 1,
    title: "SOP Assigned",
    message:
      "A new SOP has been assigned to you for review.",
    time: "10 minutes ago",
    type: "sop",
    unread: true,
  },

  {
    id: 2,
    title: "Training Reminder",
    message:
      "Your mandatory compliance training is due soon.",
    time: "1 hour ago",
    type: "training",
    unread: true,
  },

  {
    id: 3,
    title: "SOP Approved",
    message:
      "Your submitted SOP has been approved.",
    time: "Yesterday",
    type: "sop",
    unread: false,
  },

  {
    id: 4,
    title: "Compliance Update",
    message:
      "Your compliance status has been updated.",
    time: "2 days ago",
    type: "compliance",
    unread: false,
  },

  {
    id: 5,
    title: "New Document Available",
    message:
      "A new process document is available in the knowledge library.",
    time: "3 days ago",
    type: "document",
    unread: false,
  },
];


/* =========================================================
   RECENT ACTIVITY
   ========================================================= */

const recentActivity = [
  {
    id: 1,
    title: "Completed Data Privacy Training",
    time: "Today, 10:42 AM",
    icon: FaGraduationCap,
  },

  {
    id: 2,
    title: "Viewed Distributor Onboarding SOP",
    time: "Yesterday, 4:20 PM",
    icon: FaBook,
  },

  {
    id: 3,
    title: "Asked AI about escalation process",
    time: "Yesterday, 1:35 PM",
    icon: FaRobot,
  },

  {
    id: 4,
    title: "Uploaded Invoice Processing document",
    time: "12 Aug 2026",
    icon: FaFileAlt,
  },
];


/* =========================================================
   AI RECOMMENDATIONS
   ========================================================= */

const recommendations = [
  {
    id: 1,
    title: "Review Data Security SOP",
    description:
      "This SOP was recently updated and requires your acknowledgement.",
    icon: FaShieldAlt,
  },

  {
    id: 2,
    title: "Complete Data Privacy Training",
    description:
      "Your current training progress is below the recommended completion level.",
    icon: FaGraduationCap,
  },

  {
    id: 3,
    title: "Review Process Changes",
    description:
      "AI detected recent changes in one of your frequently used processes.",
    icon: FaLightbulb,
  },
];


/* =========================================================
   SIDEBAR MENU
   ========================================================= */

const sidebarMenu = [
  {
    id: "Dashboard",
    label: "Dashboard",
    icon: FaHome,
  },

  {
    id: "SOPs",
    label: "SOPs",
    icon: FaBook,
    children: [
      {
        id: "All SOPs",
        label: "All SOPs",
      },

      {
        id: "My SOPs",
        label: "My SOPs",
      },

      {
        id: "Generate SOP",
        label: "Generate SOP",
      },

      {
        id: "Drafts",
        label: "Drafts",
      },
    ],
  },

  {
    id: "AI Assistant",
    label: "AI Assistant",
    icon: FaRobot,
  },

  {
    id: "Documents",
    label: "Documents",
    icon: FaFileAlt,
    children: [
      {
        id: "Upload Documents",
        label: "Upload",
      },

      {
        id: "AI Analysis",
        label: "AI Analysis",
      },
    ],
  },

  {
    id: "Training",
    label: "Training",
    icon: FaGraduationCap,
  },

  {
    id: "Compliance",
    label: "Compliance",
    icon: FaShieldAlt,
  },

  {
    id: "Notifications",
    label: "Notifications",
    icon: FaBell,
  },

  {
    id: "My Analytics",
    label: "My Analytics",
    icon: FaChartBar,
  },
];


/* =========================================================
   EMPLOYEE DASHBOARD
   ========================================================= */

const EmployeeDashboard = () => {

  /* =======================================================
     USER
  ======================================================= */

  const storedUser = useMemo(() => {

    try {

      const savedUser =
        localStorage.getItem("user");

      return savedUser
        ? JSON.parse(savedUser)
        : defaultUser;

    } catch {

      return defaultUser;

    }

  }, []);


  const user = storedUser || defaultUser;


  /* =======================================================
     STATE
  ======================================================= */

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [activeSection, setActiveSection] =
    useState("Dashboard");

  const [openMenus, setOpenMenus] =
    useState({
      SOPs: true,
      Documents: true,
    });

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [searchValue, setSearchValue] =
    useState("");

  const [aiQuestion, setAIQuestion] =
    useState("");

  const [selectedSOP1, setSelectedSOP1] =
    useState("SOP v2.0");

  const [selectedSOP2, setSelectedSOP2] =
    useState("SOP v3.0");

  const [showAIResponse, setShowAIResponse] =
    useState(false);


  /* =======================================================
     UNREAD NOTIFICATIONS
  ======================================================= */

  const unreadNotifications =
    notifications.filter(
      (notification) =>
        notification.unread
    ).length;


  /* =======================================================
     NAVIGATION
  ======================================================= */

  const handleNavigation = (section) => {

    setActiveSection(section);

    setProfileOpen(false);

  };


  /* =======================================================
     SIDEBAR DROPDOWN
  ======================================================= */

  const toggleMenu = (menuId) => {

    setOpenMenus((previous) => ({
      ...previous,
      [menuId]:
        !previous[menuId],
    }));

  };


  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("userRole");

    window.location.href = "/login";

  };


  /* =======================================================
     NOTIFICATION CLICK
  ======================================================= */

  const handleNotificationClick = (
    notificationId
  ) => {

    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              unread: false,
            }
          : notification
      )
    );

  };


  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = (event) => {

    event.preventDefault();

    if (!searchValue.trim()) {
      return;
    }

    setActiveSection("My SOPs");

  };


  /* =======================================================
     AI SEARCH
  ======================================================= */

  const handleAIQuestion = () => {

    if (!aiQuestion.trim()) {
      return;
    }

    setShowAIResponse(true);

  };


  /* =======================================================
     QUICK ACTION
  ======================================================= */

  const handleQuickAction = (actionId) => {

    switch (actionId) {

      case "generate":
        setActiveSection("Generate SOP");
        break;

      case "ask-ai":
        setActiveSection("AI Assistant");
        break;

      case "upload":
        setActiveSection("Upload Documents");
        break;

      case "find-sop":
        setActiveSection("My SOPs");
        break;

      default:
        setActiveSection("Dashboard");

    }

  };


  /* =======================================================
     GREETING
  ======================================================= */

  const getGreeting = () => {

    const hour =
      new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    }

    if (hour < 18) {
      return "Good Afternoon";
    }

    return "Good Evening";

  };


  /* =======================================================
     SIDEBAR
  ======================================================= */

  const renderSidebar = () => (

    <aside
      className={`employee-sidebar ${
        sidebarOpen
          ? ""
          : "collapsed"
      }`}
    >

      {/* BRAND */}

      <div className="sidebar-brand">

        <div className="sidebar-brand-mark">
          <FaBook />
        </div>

        {sidebarOpen && (
          <div className="sidebar-brand-text">

            <strong>
              SOP INTELLIGENCE
            </strong>

            <span>
              Employee Portal
            </span>

          </div>
        )}

      </div>


      {/* SIDEBAR NAVIGATION */}

      <nav className="sidebar-navigation">

        {sidebarMenu.map((item) => {

          const Icon =
            item.icon;

          const hasChildren =
            Array.isArray(
              item.children
            );

          const isOpen =
            openMenus[item.id];

          const isActive =
            activeSection ===
              item.id ||
            item.children?.some(
              (child) =>
                child.id ===
                activeSection
            );

          return (

            <div
              className="sidebar-menu-group"
              key={item.id}
            >

              <button
                type="button"
                className={`sidebar-item ${
                  isActive
                    ? "active"
                    : ""
                }`}
                onClick={() => {

                  if (hasChildren) {

                    if (
                      !sidebarOpen
                    ) {

                      setSidebarOpen(
                        true
                      );

                    }

                    toggleMenu(
                      item.id
                    );

                  } else {

                    handleNavigation(
                      item.id
                    );

                  }

                }}
                title={
                  !sidebarOpen
                    ? item.label
                    : ""
                }
              >

                <div className="sidebar-item-icon-wrapper">

                  <Icon />

                  {item.id ===
                    "Notifications" &&
                    unreadNotifications >
                      0 && (
                      <span className="sidebar-notification-dot" />
                    )}

                </div>


                {sidebarOpen && (
                  <span className="sidebar-item-label">
                    {item.label}
                  </span>
                )}


                {sidebarOpen &&
                  hasChildren && (

                    <FaChevronDown
                      className={`sidebar-chevron ${
                        isOpen
                          ? "open"
                          : ""
                      }`}
                    />

                  )}

              </button>


              {/* CHILDREN */}

              {sidebarOpen &&
                hasChildren &&
                isOpen && (

                  <div className="sidebar-submenu">

                    {item.children.map(
                      (child) => (

                        <button
                          type="button"
                          className={`sidebar-submenu-item ${
                            activeSection ===
                            child.id
                              ? "active"
                              : ""
                          }`}
                          key={
                            child.id
                          }
                          onClick={() =>
                            handleNavigation(
                              child.id
                            )
                          }
                        >

                          <span className="sidebar-submenu-dot" />

                          <span>
                            {child.label}
                          </span>

                        </button>

                      )
                    )}

                  </div>

                )}

            </div>

          );

        })}

      </nav>


      {/* SIDEBAR BOTTOM */}

      <div className="sidebar-bottom">

        <button
          type="button"
          className={`sidebar-item ${
            activeSection ===
            "Settings"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleNavigation(
              "Settings"
            )
          }
          title={
            !sidebarOpen
              ? "Settings"
              : ""
          }
        >

          <div className="sidebar-item-icon-wrapper">
            <FaCog />
          </div>

          {sidebarOpen && (
            <span>
              Settings
            </span>
          )}

        </button>


        <button
          type="button"
          className={`sidebar-item ${
            activeSection ===
            "Help & Support"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleNavigation(
              "Help & Support"
            )
          }
          title={
            !sidebarOpen
              ? "Help & Support"
              : ""
          }
        >

          <div className="sidebar-item-icon-wrapper">
            <FaQuestionCircle />
          </div>

          {sidebarOpen && (
            <span>
              Help & Support
            </span>
          )}

        </button>


        {/* USER */}

        {sidebarOpen && (

          <div className="sidebar-user-card">

            <div className="sidebar-user-avatar">

              {user?.name
                ?.charAt(0)
                ?.toUpperCase() ||
                "U"}

            </div>

            <div className="sidebar-user-details">

              <strong>
                {user?.name ||
                  "Employee"}
              </strong>

              <span>
                {user?.role ||
                  "Employee"}
              </span>

            </div>

          </div>

        )}

      </div>

    </aside>

  );


  /* =======================================================
     HEADER
  ======================================================= */

  const renderHeader = () => (

    <header className="employee-header">

      <div className="header-left">

        <button
          type="button"
          className="sidebar-toggle-button"
          onClick={() =>
            setSidebarOpen(
              !sidebarOpen
            )
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


        <div className="header-title">

          <span>
            EMPLOYEE WORKSPACE
          </span>

          <h1>
            {activeSection}
          </h1>

        </div>

      </div>


      {/* HEADER RIGHT */}

      <div className="header-actions">

        {/* PROFILE ONLY — NO TOP NOTIFICATION */}

        <div className="header-profile-wrapper">

          <button
            type="button"
            className="header-profile-button"
            onClick={() => {

              setProfileOpen(
                !profileOpen
              );

            }}
          >

            <div className="header-profile-avatar">

              {user?.name
                ?.charAt(0)
                ?.toUpperCase() ||
                "U"}

            </div>


            <div className="header-profile-info">

              <strong>
                {user?.name ||
                  "Employee"}
              </strong>

              <span>
                {user?.role ||
                  "Employee"}
              </span>

            </div>


            <FaChevronDown
              className={`profile-chevron ${
                profileOpen
                  ? "open"
                  : ""
              }`}
            />

          </button>


          {/* PROFILE DROPDOWN */}

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

                <div className="profile-dropdown-user">

                  <div className="profile-large-avatar">

                    {user?.name
                      ?.charAt(0)
                      ?.toUpperCase() ||
                      "U"}

                  </div>


                  <div>

                    <strong>
                      {user?.name ||
                        "Employee"}
                    </strong>

                    <span>
                      {user?.email ||
                        "employee@example.com"}
                    </span>

                  </div>

                </div>


                <div className="profile-divider" />


                <button
                  type="button"
                  className="profile-menu-item"
                  onClick={() =>
                    handleNavigation(
                      "My Profile"
                    )
                  }
                >

                  <FaUser />

                  <span>
                    My Profile
                  </span>

                </button>


                <button
                  type="button"
                  className="profile-menu-item"
                  onClick={() =>
                    handleNavigation(
                      "Settings"
                    )
                  }
                >

                  <FaCog />

                  <span>
                    Settings
                  </span>

                </button>


                <div className="profile-divider" />


                <button
                  type="button"
                  className="profile-menu-item logout"
                  onClick={
                    handleLogout
                  }
                >

                  <FaSignOutAlt />

                  <span>
                    Sign Out
                  </span>

                </button>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </div>

    </header>

  );


  /* =======================================================
     KPI CARDS
  ======================================================= */

  const renderKPIs = () => (

    <div className="kpi-grid">

      {kpis.map((kpi) => {

        const Icon =
          kpi.icon;

        return (

          <motion.div
            className="kpi-card"
            key={kpi.id}
            whileHover={{
              y: -4,
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


            <div className="kpi-title">
              {kpi.title}
            </div>


            <div className="kpi-value">
              {kpi.value}
            </div>


            <div
              className={`kpi-change ${
                kpi.type
              }`}
            >
              {kpi.change}
            </div>

          </motion.div>

        );

      })}

    </div>

  );


  /* =======================================================
     QUICK ACTIONS
  ======================================================= */

  const renderQuickActions = () => (

    <section className="quick-actions-section">

      <div className="section-heading">

        <div>

          <span>
            QUICK ACTIONS
          </span>

          <h2>
            Get Things Done Faster
          </h2>

        </div>

      </div>


      <div className="quick-actions-grid">

        {quickActions.map(
          (action) => {

            const Icon =
              action.icon;

            return (

              <button
                type="button"
                className="quick-action-card"
                key={action.id}
                onClick={() =>
                  handleQuickAction(
                    action.id
                  )
                }
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


                <FaArrowRight className="quick-action-arrow" />

              </button>

            );

          }
        )}

      </div>

    </section>

  );


  /* =======================================================
     AI ASSISTANT
  ======================================================= */

  const renderAIAssistant = () => (

    <section className="dashboard-two-column">

      <div className="dashboard-panel ai-panel">

        <div className="panel-title-row">

          <div className="panel-title">

            <div className="panel-icon">
              <FaRobot />
            </div>

            <div>

              <span>
                KNOWLEDGE ASSISTANT
              </span>

              <h2>
                AI Knowledge Assistant
              </h2>

            </div>

          </div>


          <div
            className="info-tooltip-wrapper"
            title="Ask questions about company SOPs, policies, procedures and documents."
          >

            <FaInfoCircle />

            <div className="info-tooltip">
              Ask questions about SOPs,
              policies and processes.
            </div>

          </div>

        </div>


        <p className="panel-description">
          Ask questions about your company's
          SOPs, policies and processes.
        </p>


        <div className="ai-search-box">

          <input
            type="text"
            placeholder="How do I process a distributor request?"
            value={aiQuestion}
            onChange={(event) =>
              setAIQuestion(
                event.target.value
              )
            }
            onKeyDown={(event) => {

              if (
                event.key ===
                "Enter"
              ) {
                handleAIQuestion();
              }

            }}
          />


          <button
            type="button"
            onClick={
              handleAIQuestion
            }
            title="Ask AI"
          >

            <FaSearch />

          </button>

        </div>


        <div className="suggested-questions">

          <span>
            Suggested
          </span>

          <button
            type="button"
            onClick={() =>
              setAIQuestion(
                "Explain an SOP"
              )
            }
          >
            Explain an SOP
          </button>

          <button
            type="button"
            onClick={() =>
              setAIQuestion(
                "Find a process"
              )
            }
          >
            Find a Process
          </button>

          <button
            type="button"
            onClick={() =>
              setAIQuestion(
                "Compare SOPs"
              )
            }
          >
            Compare SOPs
          </button>

          <button
            type="button"
            onClick={() =>
              setAIQuestion(
                "Show escalation matrix"
              )
            }
          >
            Escalation Matrix
          </button>

        </div>


        {showAIResponse && (

          <div className="ai-response">

            <div className="ai-response-icon">
              <FaRobot />
            </div>

            <div>

              <strong>
                AI Preview Response
              </strong>

              <p>
                Based on the available SOP
                knowledge, the requested
                process would normally be
                retrieved and summarized here.
                Backend integration will provide
                the live answer.
              </p>

            </div>

          </div>

        )}

      </div>


      {/* MY ACTIONS */}

      <section className="dashboard-panel actions-panel">

        <div className="panel-title-row">

          <div className="panel-title">

            <div className="panel-icon">
              <FaTasks />
            </div>

            <div>

              <span>
                ATTENTION REQUIRED
              </span>

              <h2>
                My Actions
              </h2>

            </div>

          </div>


          <button
            type="button"
            className="panel-link-button"
            onClick={() =>
              handleNavigation(
                "Actions"
              )
            }
          >

            View All

            <FaArrowRight />

          </button>

        </div>


        <div className="actions-list">

          {myActions.map(
            (action) => (

              <div
                className="action-item"
                key={action.id}
              >

                <div
                  className={`priority-indicator ${
                    action.priority
                      .toLowerCase()
                  }`}
                />

                <div className="action-content">

                  <strong>
                    {action.title}
                  </strong>

                  <span>
                    {action.category}
                  </span>

                </div>


                <div className="action-due">

                  <small>
                    {action.due}
                  </small>

                  <span
                    className={`action-status ${
                      action.status
                        .toLowerCase()
                        .replace(
                          /\s/g,
                          "-"
                        )
                    }`}
                  >
                    {action.status}
                  </span>

                </div>

              </div>

            )
          )}

        </div>

      </section>

    </section>

  );


  /* =======================================================
     MY SOPS
  ======================================================= */

  const renderMySOPs = () => (

    <section className="dashboard-panel">

      <div className="panel-title-row">

        <div className="panel-title">

          <div className="panel-icon">
            <FaBook />
          </div>

          <div>

            <span>
              KNOWLEDGE LIBRARY
            </span>

            <h2>
              My SOPs
            </h2>

          </div>

        </div>


        <button
          type="button"
          className="panel-link-button"
          onClick={() =>
            handleNavigation(
              "My SOPs"
            )
          }
        >

          View All

          <FaArrowRight />

        </button>

      </div>


      <div className="sop-grid">

        {mySOPs.map(
          (sop) => (

            <div
              className="sop-card"
              key={sop.id}
            >

              <div className="sop-card-top">

                <div className="sop-file-icon">
                  <FaFileAlt />
                </div>

                <button
                  type="button"
                  className="sop-more-button"
                  title="More options"
                >
                  •••
                </button>

              </div>


              <h3>
                {sop.title}
              </h3>


              <div className="sop-meta">

                <span>
                  {sop.version}
                </span>

                <span>
                  {sop.status}
                </span>

              </div>


              <div className="sop-details">

                <span>
                  Updated:{" "}
                  {sop.updated}
                </span>

                <span>
                  Owner: {sop.owner}
                </span>

                <span>
                  {sop.pages} pages
                </span>

              </div>


              <button
                type="button"
                className="secondary-action-button"
                onClick={() =>
                  handleNavigation(
                    "My SOPs"
                  )
                }
              >

                View SOP

                <FaArrowRight />

              </button>

            </div>

          )
        )}

      </div>

    </section>

  );


  /* =======================================================
     AI SOP GENERATOR
  ======================================================= */

  const renderSOPGenerator = () => (

    <section className="dashboard-two-column">

      <div className="dashboard-panel generator-panel">

        <div className="panel-title-row">

          <div className="panel-title">

            <div className="panel-icon">
              <FaMagic />
            </div>

            <div>

              <span>
                AI AUTOMATION
              </span>

              <h2>
                AI SOP Generator
              </h2>

            </div>

          </div>


          <div
            className="info-tooltip-wrapper"
            title="Generate structured SOP drafts using AI."
          >

            <FaInfoCircle />

            <div className="info-tooltip">
              Turn process knowledge into
              structured SOP documents.
            </div>

          </div>

        </div>


        <p className="panel-description">
          Turn your process knowledge into
          a structured SOP using AI.
        </p>


        <button
          type="button"
          className="primary-action-button"
          onClick={() =>
            handleNavigation(
              "Generate SOP"
            )
          }
        >

          <FaMagic />

          Start New SOP

        </button>


        <div className="generated-sop-list">

          <h3>
            Recently Generated
          </h3>

          {generatedSOPs.map(
            (sop) => (

              <div
                className="generated-sop-item"
                key={sop.id}
              >

                <div>

                  <strong>
                    {sop.title}
                  </strong>

                  <span>
                    {sop.status}
                  </span>

                </div>

                <small>
                  {sop.date}
                </small>

              </div>

            )
          )}

        </div>

      </div>


      {/* DOCUMENT INTELLIGENCE */}

      <div className="dashboard-panel document-panel">

        <div className="panel-title-row">

          <div className="panel-title">

            <div className="panel-icon">
              <FaFileAlt />
            </div>

            <div>

              <span>
                DOCUMENT INTELLIGENCE
              </span>

              <h2>
                AI Document Analysis
              </h2>

            </div>

          </div>


          <div
            className="info-tooltip-wrapper"
            title="Upload documents for OCR, classification, summarization and extraction."
          >

            <FaInfoCircle />

            <div className="info-tooltip">
              AI-powered document analysis.
            </div>

          </div>

        </div>


        <div className="document-upload-box">

          <FaCloudUploadAlt />

          <strong>
            Upload a Document
          </strong>

          <span>
            PDF • DOCX • XLSX
          </span>

          <button
            type="button"
            className="secondary-action-button"
            onClick={() =>
              handleNavigation(
                "Upload Documents"
              )
            }
          >

            Upload Document

            <FaArrowRight />

          </button>

        </div>


        <div className="document-capabilities">

          <span>
            OCR
          </span>

          <span>
            Summarize
          </span>

          <span>
            Extract Steps
          </span>

          <span>
            Classify
          </span>

          <span>
            Detect Issues
          </span>

        </div>

      </div>

    </section>

  );


  /* =======================================================
     SOP COMPARISON
  ======================================================= */

  const renderSOPComparison = () => (

    <section className="dashboard-panel comparison-panel">

      <div className="panel-title-row">

        <div className="panel-title">

          <div className="panel-icon">
            <FaExchangeAlt />
          </div>

          <div>

            <span>
              VERSION CONTROL
            </span>

            <h2>
              SOP Comparison
            </h2>

          </div>

        </div>


        <div
          className="info-tooltip-wrapper"
          title="Compare two SOP versions and identify changes."
        >

          <FaInfoCircle />

          <div className="info-tooltip">
            Identify added, removed and
            modified content between SOP versions.
          </div>

        </div>

      </div>


      <p className="panel-description">
        Compare two SOP versions and let AI
        identify the differences.
      </p>


      <div className="comparison-controls">

        <select
          value={selectedSOP1}
          onChange={(event) =>
            setSelectedSOP1(
              event.target.value
            )
          }
        >

          <option>
            SOP v2.0
          </option>

          <option>
            SOP v2.5
          </option>

          <option>
            SOP v3.0
          </option>

        </select>


        <FaExchangeAlt />


        <select
          value={selectedSOP2}
          onChange={(event) =>
            setSelectedSOP2(
              event.target.value
            )
          }
        >

          <option>
            SOP v3.0
          </option>

          <option>
            SOP v3.1
          </option>

          <option>
            SOP v3.2
          </option>

        </select>


        <button
          type="button"
          className="primary-action-button"
          onClick={() =>
            setActiveSection(
              "SOP Comparison"
            )
          }
        >

          <FaExchangeAlt />

          Compare

        </button>

      </div>


      <div className="comparison-legend">

        <span className="added">
          <FaCheck />
          Added
        </span>

        <span className="removed">
          <FaTimesCircle />
          Removed
        </span>

        <span className="modified">
          <FaExclamationTriangle />
          Modified
        </span>

      </div>

    </section>

  );


  /* =======================================================
     TRAINING + COMPLIANCE
  ======================================================= */

  const renderTrainingCompliance = () => (

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
              Track assigned training
              and completion progress.
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
          type="button"
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
              Current compliance score
              and outstanding requirements.
            </div>

          </div>

        </div>


        <div className="compliance-score">

          <div className="compliance-circle">

            <span>
              94%
            </span>

            <small>
              Score
            </small>

          </div>


          <div className="compliance-summary">

            <strong>
              Good Standing
            </strong>

            <p>
              You are currently meeting
              most compliance requirements.
            </p>

            <div className="compliance-progress">

              <div
                style={{
                  width: "94%",
                }}
              />

            </div>

            <span>
              94 of 100 requirements completed
            </span>

          </div>

        </div>


        <div className="compliance-items">

          <div>
            <FaCheckCircle />
            Mandatory SOP acknowledgement
          </div>

          <div>
            <FaCheckCircle />
            Security training
          </div>

          <div>
            <FaClock />
            1 requirement due soon
          </div>

        </div>


        <button
          type="button"
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

  );


  /* =======================================================
     AI RECOMMENDATIONS
  ======================================================= */

  const renderRecommendations = () => (

    <section className="dashboard-panel">

      <div className="panel-title-row">

        <div className="panel-title">

          <div className="panel-icon">
            <FaLightbulb />
          </div>

          <div>

            <span>
              INTELLIGENT INSIGHTS
            </span>

            <h2>
              AI Recommendations
            </h2>

          </div>

        </div>


        <div
          className="info-tooltip-wrapper"
          title="AI-generated recommendations based on your activity and assigned requirements."
        >

          <FaInfoCircle />

          <div className="info-tooltip">
            Personalized recommendations
            based on your workspace activity.
          </div>

        </div>

      </div>


      <div className="recommendation-grid">

        {recommendations.map(
          (recommendation) => {

            const Icon =
              recommendation.icon;

            return (

              <div
                className="recommendation-card"
                key={
                  recommendation.id
                }
              >

                <div className="recommendation-icon">
                  <Icon />
                </div>


                <div>

                  <strong>
                    {recommendation.title}
                  </strong>

                  <p>
                    {recommendation.description}
                  </p>


                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation(
                        "My Analytics"
                      )
                    }
                  >

                    Review

                    <FaArrowRight />

                  </button>

                </div>

              </div>

            );

          }
        )}

      </div>

    </section>

  );


  /* =======================================================
     RECENT ACTIVITY
  ======================================================= */

  const renderRecentActivity = () => (

    <section className="dashboard-panel">

      <div className="panel-title-row">

        <div className="panel-title">

          <div className="panel-icon">
            <FaHistory />
          </div>

          <div>

            <span>
              WORKSPACE ACTIVITY
            </span>

            <h2>
              Recent Updates
            </h2>

          </div>

        </div>


        <div
          className="info-tooltip-wrapper"
          title="Your recent activity across SOPs, training and AI."
        >

          <FaInfoCircle />

          <div className="info-tooltip">
            Recent actions performed
            in your employee workspace.
          </div>

        </div>

      </div>


      <div className="activity-list">

        {recentActivity.map(
          (activity) => {

            const Icon =
              activity.icon;

            return (

              <div
                className="activity-item"
                key={activity.id}
              >

                <div className="activity-icon">
                  <Icon />
                </div>


                <div>

                  <strong>
                    {activity.title}
                  </strong>

                  <span>
                    {activity.time}
                  </span>

                </div>

              </div>

            );

          }
        )}

      </div>

    </section>

  );


  /* =======================================================
     NOTIFICATIONS PAGE
  ======================================================= */

  const renderNotifications = () => (

    <motion.div
      className="employee-notifications-page"
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >

      <div className="section-heading">

        <div>

          <span>
            ACTIVITY CENTER
          </span>

          <h2>
            Notifications
          </h2>

          <p>
            Stay updated with your SOPs,
            training, compliance and workspace activity.
          </p>

        </div>


        <div className="notification-summary">

          <span className="notification-summary-number">
            {unreadNotifications}
          </span>

          <span>
            Unread
          </span>

        </div>

      </div>


      <div className="employee-notifications-card">

        {notifications.length > 0 ? (

          notifications.map(
            (notification) => {

              let NotificationIcon =
                FaBell;

              if (
                notification.type ===
                "training"
              ) {
                NotificationIcon =
                  FaGraduationCap;
              }

              if (
                notification.type ===
                "compliance"
              ) {
                NotificationIcon =
                  FaShieldAlt;
              }

              if (
                notification.type ===
                "document"
              ) {
                NotificationIcon =
                  FaFileAlt;
              }

              return (

                <button
                  type="button"
                  key={
                    notification.id
                  }
                  className={`employee-full-notification ${
                    notification.unread
                      ? "unread"
                      : ""
                  }`}
                  onClick={() =>
                    handleNotificationClick(
                      notification.id
                    )
                  }
                >

                  <div className="employee-full-notification-icon">

                    <NotificationIcon />

                  </div>


                  <div className="employee-full-notification-content">

                    <div className="employee-full-notification-top">

                      <strong>
                        {
                          notification.title
                        }
                      </strong>

                      {notification.unread && (

                        <span className="notification-unread-label">
                          NEW
                        </span>

                      )}

                    </div>


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


                  <FaChevronRight />

                </button>

              );

            }
          )

        ) : (

          <div className="employee-no-notifications">

            <FaBell />

            <h3>
              You're all caught up
            </h3>

            <p>
              You don't have any new notifications.
            </p>

          </div>

        )}

      </div>

    </motion.div>

  );


  /* =======================================================
     SEARCH / MY SOPs PAGE
  ======================================================= */

  const renderSOPLibrary = () => {

    const filteredSOPs =
      mySOPs.filter(
        (sop) =>
          sop.title
            .toLowerCase()
            .includes(
              searchValue
                .toLowerCase()
            )
      );

    return (

      <motion.div
        className="dashboard-section-page"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >

        <div className="section-heading">

          <div>

            <span>
              SOP LIBRARY
            </span>

            <h2>
              My SOPs
            </h2>

            <p>
              Search and access SOPs available
              to you.
            </p>

          </div>

        </div>


        <form
          className="global-search-form"
          onSubmit={
            handleSearch
          }
        >

          <FaSearch />

          <input
            type="text"
            placeholder="Search SOPs..."
            value={searchValue}
            onChange={(event) =>
              setSearchValue(
                event.target.value
              )
            }
          />

          <button
            type="submit"
            className="primary-action-button"
          >
            Search
          </button>

        </form>


        <div className="sop-grid">

          {filteredSOPs.map(
            (sop) => (

              <div
                className="sop-card"
                key={sop.id}
              >

                <div className="sop-card-top">

                  <div className="sop-file-icon">
                    <FaFileAlt />
                  </div>

                </div>

                <h3>
                  {sop.title}
                </h3>

                <div className="sop-meta">

                  <span>
                    {sop.version}
                  </span>

                  <span>
                    {sop.status}
                  </span>

                </div>

                <div className="sop-details">

                  <span>
                    Updated: {sop.updated}
                  </span>

                  <span>
                    Owner: {sop.owner}
                  </span>

                  <span>
                    {sop.pages} pages
                  </span>

                </div>

                <button
                  type="button"
                  className="secondary-action-button"
                >
                  Open SOP
                  <FaExternalLinkAlt />
                </button>

              </div>

            )
          )}

        </div>

      </motion.div>

    );

  };


  /* =======================================================
     AI ASSISTANT PAGE
  ======================================================= */

  const renderAIAssistantPage = () => (

    <motion.div
      className="dashboard-section-page"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >

      {renderAIAssistant()}

    </motion.div>

  );


  /* =======================================================
     TRAINING PAGE
  ======================================================= */

  const renderTrainingPage = () => (

    <motion.div
      className="dashboard-section-page"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >

      <div className="section-heading">

        <div>

          <span>
            LEARNING CENTER
          </span>

          <h2>
            My Training
          </h2>

          <p>
            Track your learning progress
            and upcoming courses.
          </p>

        </div>

      </div>


      <div className="training-page-grid">

        {upcomingTraining.map(
          (training) => (

            <div
              className="training-page-card"
              key={training.id}
            >

              <div className="training-icon">
                <FaGraduationCap />
              </div>

              <h3>
                {training.title}
              </h3>

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


              <strong>
                {training.progress}%
                Complete
              </strong>


              <button
                type="button"
                className="primary-action-button"
              >
                Continue Learning
                <FaArrowRight />
              </button>

            </div>

          )
        )}

      </div>

    </motion.div>

  );


  /* =======================================================
     COMPLIANCE PAGE
  ======================================================= */

  const renderCompliancePage = () => (

    <motion.div
      className="dashboard-section-page"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >

      <div className="section-heading">

        <div>

          <span>
            RISK & GOVERNANCE
          </span>

          <h2>
            Compliance
          </h2>

          <p>
            Monitor your compliance
            requirements and status.
          </p>

        </div>

      </div>


      <div className="compliance-page-card">

        <div className="compliance-score-large">

          <strong>
            94%
          </strong>

          <span>
            Overall Compliance
          </span>

        </div>


        <div className="compliance-page-items">

          <div>
            <FaCheckCircle />
            <span>
              SOP Acknowledgements
            </span>
            <strong>
              100%
            </strong>
          </div>

          <div>
            <FaCheckCircle />
            <span>
              Mandatory Training
            </span>
            <strong>
              82%
            </strong>
          </div>

          <div>
            <FaCheckCircle />
            <span>
              Policy Compliance
            </span>
            <strong>
              96%
            </strong>
          </div>

          <div>
            <FaClock />
            <span>
              Pending Requirements
            </span>
            <strong>
              1
            </strong>
          </div>

        </div>

      </div>

    </motion.div>

  );


  /* =======================================================
     ANALYTICS PAGE
  ======================================================= */

  const renderAnalyticsPage = () => (

    <motion.div
      className="dashboard-section-page"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >

      <div className="section-heading">

        <div>

          <span>
            PERFORMANCE INSIGHTS
          </span>

          <h2>
            My Analytics
          </h2>

          <p>
            Understand your SOP, training,
            compliance and AI activity.
          </p>

        </div>

      </div>


      <div className="analytics-grid">

        <div className="analytics-card">

          <FaBook />

          <span>
            SOP Engagement
          </span>

          <strong>
            86%
          </strong>

          <small>
            +9% this month
          </small>

        </div>


        <div className="analytics-card">

          <FaRobot />

          <span>
            AI Usage
          </span>

          <strong>
            37
          </strong>

          <small>
            Queries this month
          </small>

        </div>


        <div className="analytics-card">

          <FaGraduationCap />

          <span>
            Training
          </span>

          <strong>
            82%
          </strong>

          <small>
            Overall completion
          </small>

        </div>


        <div className="analytics-card">

          <FaChartLine />

          <span>
            Compliance
          </span>

          <strong>
            94%
          </strong>

          <small>
            +2.4% improvement
          </small>

        </div>

      </div>

    </motion.div>

  );


  /* =======================================================
     SIMPLE PLACEHOLDER PAGES
  ======================================================= */

  const renderSimplePage = (
    title,
    eyebrow,
    description,
    icon
  ) => {

    const Icon =
      icon || FaFileAlt;

    return (

      <motion.div
        className="dashboard-section-page simple-page"
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >

        <div className="simple-page-icon">
          <Icon />
        </div>

        <span>
          {eyebrow}
        </span>

        <h2>
          {title}
        </h2>

        <p>
          {description}
        </p>


        <div className="mock-backend-notice">

          <FaInfoCircle />

          <div>

            <strong>
              UI Preview Mode
            </strong>

            <p>
              Backend integration is not
              connected yet. This area is
              currently using mock data and
              is ready for API integration.
            </p>

          </div>

        </div>

      </motion.div>

    );

  };


  /* =======================================================
     DASHBOARD HOME
  ======================================================= */

  const renderDashboardHome = () => (

    <>

      {/* WELCOME */}

      <section className="welcome-section">

        <div>

          <span className="welcome-eyebrow">
            YOUR WORKSPACE
          </span>

          <h1>
            {getGreeting()}, {" "}
            {user?.name ||
              "Jasleen"} 👋
          </h1>

          <p>
            Here's your personalized
            SOP & compliance overview.
          </p>

        </div>


        <div className="welcome-status">

          <div className="status-dot" />

          <span>
            Workspace Active
          </span>

        </div>

      </section>


      {/* GLOBAL SEARCH */}

      <form
        className="global-search-form"
        onSubmit={
          handleSearch
        }
      >

        <FaSearch />

        <input
          type="text"
          placeholder="Search SOPs, documents, policies or ask AI..."
          value={searchValue}
          onChange={(event) =>
            setSearchValue(
              event.target.value
            )
          }
        />

        <button
          type="submit"
          className="primary-action-button"
        >
          Search
        </button>

      </form>


      {/* QUICK ACTIONS */}

      {renderQuickActions()}


      {/* KPIs */}

      {renderKPIs()}


      {/* AI + ACTIONS */}

      {renderAIAssistant()}


      {/* MY SOPS */}

      {renderMySOPs()}


      {/* GENERATOR + DOCUMENT */}

      {renderSOPGenerator()}


      {/* COMPARISON */}

      {renderSOPComparison()}


      {/* TRAINING + COMPLIANCE */}

      {renderTrainingCompliance()}


      {/* AI RECOMMENDATIONS */}

      {renderRecommendations()}


      {/* RECENT ACTIVITY */}

      {renderRecentActivity()}

    </>

  );


  /* =======================================================
     ACTIVE CONTENT
  ======================================================= */

  const renderContent = () => {

    switch (
      activeSection
    ) {

      case "Dashboard":
        return renderDashboardHome();


      case "Notifications":
        return renderNotifications();


      case "My SOPs":
      case "All SOPs":
        return renderSOPLibrary();


      case "AI Assistant":
        return renderAIAssistantPage();


      case "Training":
        return renderTrainingPage();


      case "Compliance":
        return renderCompliancePage();


      case "My Analytics":
        return renderAnalyticsPage();


      case "Generate SOP":
        return renderSimplePage(
          "AI SOP Generator",
          "AI AUTOMATION",
          "Create structured SOP drafts using AI-powered process generation.",
          FaMagic
        );


      case "Drafts":
        return renderSimplePage(
          "SOP Drafts",
          "DOCUMENT WORKSPACE",
          "Review, edit and manage your SOP drafts before submission.",
          FaFileAlt
        );


      case "Upload Documents":
        return renderSimplePage(
          "Upload Documents",
          "DOCUMENT INTELLIGENCE",
          "Upload PDF, DOCX or XLSX documents for AI-powered analysis.",
          FaCloudUploadAlt
        );


      case "AI Analysis":
        return renderSimplePage(
          "AI Document Analysis",
          "AI DOCUMENT INTELLIGENCE",
          "Analyze uploaded documents using OCR, summarization, classification and extraction.",
          FaRobot
        );


      case "SOP Comparison":
        return renderSimplePage(
          "SOP Comparison",
          "VERSION CONTROL",
          `Compare ${selectedSOP1} and ${selectedSOP2} to identify changes.`,
          FaExchangeAlt
        );


      case "Actions":
        return renderSimplePage(
          "My Actions",
          "ATTENTION REQUIRED",
          "View and manage tasks, acknowledgements, reviews and pending actions.",
          FaTasks
        );


      case "My Profile":
        return renderSimplePage(
          "My Profile",
          "ACCOUNT",
          "View and manage your employee profile information.",
          FaUser
        );


      case "Settings":
        return renderSimplePage(
          "Settings",
          "PREFERENCES",
          "Manage your account preferences and workspace settings.",
          FaCog
        );


      case "Help & Support":
        return renderSimplePage(
          "Help & Support",
          "SUPPORT CENTER",
          "Find help, documentation and support resources for the employee portal.",
          FaQuestionCircle
        );


      case "SOPs":
        return renderSOPLibrary();


      case "Documents":
        return renderSimplePage(
          "Documents",
          "DOCUMENT LIBRARY",
          "Manage your uploaded documents and AI analysis.",
          FaFileAlt
        );


      default:
        return renderDashboardHome();

    }

  };


  /* =======================================================
     FINAL RETURN
  ======================================================= */

  return (

    <div
      className={`employee-dashboard ${
        sidebarOpen
          ? "sidebar-expanded"
          : "sidebar-collapsed"
      }`}
    >

      {renderSidebar()}


      <main className="employee-main">

        {renderHeader()}


        <div className="employee-dashboard-content">

          {renderContent()}

        </div>

      </main>

    </div>

  );

};


export default EmployeeDashboard;