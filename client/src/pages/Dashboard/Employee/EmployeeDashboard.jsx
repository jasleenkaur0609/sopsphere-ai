import React, {
  useMemo,
  useState,
} from "react";
import "../components/EmployeeDashboardComponents.css";

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
  FaTrophy,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaQuestion,
  FaPaperPlane,
  FaThumbsUp,
} from "react-icons/fa";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

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
    title: "Pending Actions",
    value: "4",
    change: "2 due today",
    icon: FaTasks,
    description:
      "Tasks, acknowledgements, reviews and other actions requiring your attention.",
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
      "Number of questions asked to the AI Knowledge Assistant.",
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
      "Ask questions about SOPs, policies, procedures and compliance.",
  },

  {
    id: "upload",
    title: "Upload Document",
    subtitle: "Analyze file",
    icon: FaCloudUploadAlt,
    description:
      "Upload documents for AI-powered analysis and extraction.",
  },

  {
    id: "find-sop",
    title: "Find SOP",
    subtitle: "Search library",
    icon: FaSearch,
    description:
      "Search the SOP library for relevant procedures and policies.",
  },

  {
    id: "training",
    title: "Start Training",
    subtitle: "Continue learning",
    icon: FaGraduationCap,
    description:
      "Continue your assigned learning and compliance courses.",
  },
];


/* =========================================================
   MOCK SOP DATA
   ========================================================= */

const mySOPs = [
  {
    id: 1,
    title: "Distributor Onboarding",
    version: "v3.2",
    status: "Approved",
    date: "14 Aug 2026",
  },

  {
    id: 2,
    title: "Invoice Processing",
    version: "v2.1",
    status: "Pending Review",
    date: "12 Aug 2026",
  },

  {
    id: 3,
    title: "Email Handling",
    version: "v4.0",
    status: "Approved",
    date: "10 Aug 2026",
  },

  {
    id: 4,
    title: "Data Privacy",
    version: "v2.5",
    status: "Approved",
    date: "08 Aug 2026",
  },

  {
    id: 5,
    title: "Escalation Process",
    version: "v1.3",
    status: "Under Review",
    date: "05 Aug 2026",
  },

  {
    id: 6,
    title: "Customer Complaint Handling",
    version: "v2.0",
    status: "Approved",
    date: "02 Aug 2026",
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
   RECOMMENDATIONS
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
        label: "Upload Documents",
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


  const user =
    storedUser || defaultUser;


  /* =======================================================
     SIDEBAR
     ======================================================= */

  const [sidebarOpen, setSidebarOpen] =
    useState(true);


  /* =======================================================
     ACTIVE SECTION
     ======================================================= */

  const [activeSection, setActiveSection] =
    useState("Dashboard");


  /* =======================================================
     SIDEBAR DROPDOWNS
     ======================================================= */

  const [openMenus, setOpenMenus] =
    useState({
      SOPs: false,
      Documents: false,
    });


  /* =======================================================
     PROFILE
     ======================================================= */

  const [profileOpen, setProfileOpen] =
    useState(false);


  /* =======================================================
     NOTIFICATIONS
     ======================================================= */

  const [notifications, setNotifications] =
    useState(initialNotifications);


  /* =======================================================
     SEARCH
     ======================================================= */

  const [searchValue, setSearchValue] =
    useState("");


  /* =======================================================
     AI
     ======================================================= */

  const [aiQuestion, setAIQuestion] =
    useState("");

  const [showAIResponse, setShowAIResponse] =
    useState(false);

  const [aiChatOpen, setAIChatOpen] =
    useState(true);


  /* =======================================================
     SOP COMPARISON
     ======================================================= */

  const [selectedSOP1, setSelectedSOP1] =
    useState("SOP v2.0");

  const [selectedSOP2, setSelectedSOP2] =
    useState("SOP v3.0");


  /* =======================================================
     UNREAD COUNT
     ======================================================= */

  const unreadNotifications =
    notifications.filter(
      (notification) =>
        notification.unread
    ).length;


  /* =======================================================
     NAVIGATION
     ======================================================= */

  const handleNavigation = (
    section
  ) => {

    setActiveSection(section);

    setProfileOpen(false);

    /*
     * Keep the dashboard closed-state
     * behaviour predictable.
     */

    if (
      section === "AI Assistant"
    ) {
      setAIChatOpen(true);
    }

  };


  /* =======================================================
     SIDEBAR DROPDOWN
     ======================================================= */

  const toggleMenu = (
    menuId
  ) => {

    /*
     * If sidebar is collapsed,
     * expand it first.
     */

    if (!sidebarOpen) {

      setSidebarOpen(true);

      /*
       * Do not immediately toggle the
       * submenu on the same click.
       * This prevents accidental overlap.
       */

      setOpenMenus((previous) => ({
        ...previous,
        [menuId]: true,
      }));

      return;

    }


    setOpenMenus((previous) => ({
      ...previous,

      [menuId]:
        !previous[menuId],
    }));

  };


  /* =======================================================
     SIDEBAR TOGGLE
     ======================================================= */

  const toggleSidebar = () => {

    setSidebarOpen(
      (previous) =>
        !previous
    );

  };


  /* =======================================================
     PROFILE TOGGLE
     ======================================================= */

  const toggleProfile = () => {

    setProfileOpen(
      (previous) =>
        !previous
    );

  };


  /* =======================================================
     CLOSE OVERLAYS
     ======================================================= */

  const closePanels = () => {

    setProfileOpen(false);

  };


  /* =======================================================
     LOGOUT
     ======================================================= */

  const handleLogout = () => {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "userRole"
    );

    window.location.href =
      "/login";

  };


  /* =======================================================
     NOTIFICATION CLICK
     ======================================================= */

  const handleNotificationClick = (
    notificationId
  ) => {

    setNotifications(
      (previous) =>
        previous.map(
          (notification) =>
            notification.id ===
            notificationId
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

  const handleSearch = (
    event
  ) => {

    event.preventDefault();

    if (
      !searchValue.trim()
    ) {
      return;
    }

    setActiveSection(
      "My SOPs"
    );

  };


  /* =======================================================
     AI QUESTION
     ======================================================= */

  const handleAIQuestion = () => {

    if (
      !aiQuestion.trim()
    ) {
      return;
    }

    setAIChatOpen(true);

    setShowAIResponse(
      true
    );

  };


  /* =======================================================
     QUICK ACTION
     ======================================================= */

  const handleQuickAction = (
    actionId
  ) => {

    switch (actionId) {

      case "generate":

        handleNavigation(
          "Generate SOP"
        );

        break;


      case "ask-ai":

        handleNavigation(
          "AI Assistant"
        );

        setAIChatOpen(true);

        break;


      case "upload":

        handleNavigation(
          "Upload Documents"
        );

        break;


      case "find-sop":

        handleNavigation(
          "My SOPs"
        );

        break;


      case "training":

        handleNavigation(
          "Training"
        );

        break;


      default:

        handleNavigation(
          "Dashboard"
        );

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
          ? "expanded"
          : "collapsed"
      }`}
    >

      {/* =================================================
          BRAND
      ================================================= */}

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


      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav
        className="sidebar-navigation"
      >

        {sidebarMenu.map(
          (item) => {

            const Icon =
              item.icon;

            const hasChildren =
              Array.isArray(
                item.children
              );

            const isOpen =
              Boolean(
                openMenus[
                  item.id
                ]
              );

            const isActive =
              activeSection ===
                item.id ||
              Boolean(
                item.children?.some(
                  (child) =>
                    child.id ===
                    activeSection
                )
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
                  } ${
                    hasChildren
                      ? "has-children"
                      : ""
                  }`}

                  onClick={() => {

                    if (
                      hasChildren
                    ) {

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
                      : undefined
                  }
                >

                  <span className="sidebar-item-icon-wrapper">

                    <Icon />

                    {item.id ===
                      "Notifications" &&
                      unreadNotifications >
                        0 && (

                        <span className="sidebar-notification-dot">
                          {unreadNotifications}
                        </span>

                      )}

                  </span>


                  {sidebarOpen && (

                    <span className="sidebar-item-label">
                      {item.label}
                    </span>

                  )}


                  {sidebarOpen &&
                    hasChildren && (

                      <span
                        className={`sidebar-chevron ${
                          isOpen
                            ? "open"
                            : ""
                        }`}
                      >

                        <FaChevronDown />

                      </span>

                    )}

                </button>


                {/* =================================================
                    SUBMENU
                ================================================= */}

                <AnimatePresence>

                  {sidebarOpen &&
                    hasChildren &&
                    isOpen && (

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

                        {item.children.map(
                          (child) => (

                            <button
                              type="button"

                              key={
                                child.id
                              }

                              className={`sidebar-submenu-item ${
                                activeSection ===
                                child.id
                                  ? "active"
                                  : ""
                              }`}

                              onClick={() =>
                                handleNavigation(
                                  child.id
                                )
                              }
                            >

                              <span className="sidebar-submenu-dot" />

                              <span>
                                {
                                  child.label
                                }
                              </span>

                            </button>

                          )
                        )}

                      </motion.div>

                    )}

                </AnimatePresence>

              </div>

            );

          }
        )}

      </nav>


      {/* =================================================
          SIDEBAR BOTTOM
      ================================================= */}

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
              : undefined
          }
        >

          <span className="sidebar-item-icon-wrapper">

            <FaCog />

          </span>

          {sidebarOpen && (

            <span className="sidebar-item-label">
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
              : undefined
          }
        >

          <span className="sidebar-item-icon-wrapper">

            <FaQuestionCircle />

          </span>

          {sidebarOpen && (

            <span className="sidebar-item-label">
              Help & Support
            </span>

          )}

        </button>


        {/* USER */}

        {sidebarOpen && (

          <button
            type="button"
            className="sidebar-user-card"
            onClick={
              toggleProfile
            }
          >

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


            <FaChevronRight />

          </button>

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

          onClick={
            toggleSidebar
          }

          title={
            sidebarOpen
              ? "Collapse sidebar"
              : "Expand sidebar"
          }
        >

          {sidebarOpen
            ? <FaTimes />
            : <FaBars />}

        </button>


        <div className="header-title">

          <span>
            EMPLOYEE WORKSPACE
          </span>

          <h1>
            {activeSection ===
              "Dashboard"
              ? "Dashboard"
              : activeSection}
          </h1>

        </div>

      </div>


      {/* GLOBAL SEARCH */}

      <form
        className="header-search"

        onSubmit={
          handleSearch
        }
      >

        <FaSearch />

        <input
          type="text"

          placeholder="Search SOPs, documents, policies or ask AI..."

          value={
            searchValue
          }

          onChange={(
            event
          ) =>
            setSearchValue(
              event.target.value
            )
          }
        />

        <kbd>
          Ctrl K
        </kbd>

      </form>


      {/* HEADER RIGHT */}

      <div className="header-right">

        <button
          type="button"

          className="header-icon-button"

          onClick={() =>
            handleNavigation(
              "Notifications"
            )
          }

          title="Notifications"
        >

          <FaBell />

          {unreadNotifications >
            0 && (

            <span className="header-notification-badge">
              {unreadNotifications}
            </span>

          )}

        </button>


        <button
          type="button"

          className="header-profile-button"

          onClick={
            toggleProfile
          }
        >

          <span className="header-profile-avatar">

            {user?.name
              ?.charAt(0)
              ?.toUpperCase() ||
              "U"}

          </span>


          <span className="header-profile-text">

            <strong>
              {user?.name ||
                "Employee"}
            </strong>

            <small>
              {user?.role ||
                "Employee"}
            </small>

          </span>


          <FaChevronDown
            className={
              profileOpen
                ? "profile-chevron-open"
                : ""
            }
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

              <button
                type="button"

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


              <div className="profile-dropdown-divider" />


              <button
                type="button"
                className="logout-item"

                onClick={
                  handleLogout
                }
              >

                <FaSignOutAlt />

                <span>
                  Logout
                </span>

              </button>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

    </header>

  );


  /* =======================================================
     KPI SECTION
     ======================================================= */

  const renderKPIs = () => (

    <section
      className="kpi-grid"
    >

      {kpis.map(
        (kpi) => {

          const Icon =
            kpi.icon;

          return (

            <motion.article
              key={kpi.id}

              className={`kpi-card ${
                kpi.type
              }`}

              whileHover={{
                y: -3,
              }}

              title={
                kpi.description
              }
            >

              <div className="kpi-card-top">

                <div className="kpi-icon">

                  <Icon />

                </div>


                <div
                  className="info-tooltip-wrapper"
                  title={
                    kpi.description
                  }
                >

                  <FaInfoCircle />

                </div>

              </div>


              <span className="kpi-title">
                {kpi.title}
              </span>


              <strong className="kpi-value">
                {kpi.value}
              </strong>


              <span
                className={`kpi-change ${
                  kpi.type
                }`}
              >

                {kpi.change}

              </span>

            </motion.article>

          );

        }
      )}

    </section>

  );


  /* =======================================================
     QUICK ACTIONS
     ======================================================= */

  const renderQuickActions = () => (

    <section
      className="quick-actions-section"
    >

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


      <div
        className="quick-actions-grid"
      >

        {quickActions.map(
          (action) => {

            const Icon =
              action.icon;

            return (

              <button
                type="button"

                className="quick-action-card"

                key={
                  action.id
                }

                onClick={() =>
                  handleQuickAction(
                    action.id
                  )
                }

                title={
                  action.description
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


                <FaArrowRight
                  className="quick-action-arrow"
                />

              </button>

            );

          }
        )}

      </div>

    </section>

  );


  /* =======================================================
     AI KNOWLEDGE ASSISTANT
     ======================================================= */

  const renderAIAssistant = () => (

    <section
      className={`dashboard-ai-layout ${
        aiChatOpen
          ? "ai-chat-open"
          : "ai-chat-closed"
      }`}
    >

      <div
        className="dashboard-panel ai-panel"
      >

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
            title="Ask questions about SOPs, policies, procedures and documents."
          >

            <FaInfoCircle />

          </div>

        </div>


        <p className="panel-description">

          Ask questions about your
          organization's SOPs, policies,
          procedures and compliance.

        </p>


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

          <button
            type="button"
            onClick={() =>
              setAIQuestion(
                "Explain an SOP"
              )
            }
          >

            <FaQuestion />

            Explain an SOP

          </button>


          <button
            type="button"
            onClick={() =>
              setAIQuestion(
                "Check my compliance"
              )
            }
          >

            <FaShieldAlt />

            Check compliance

          </button>


          <button
            type="button"
            onClick={() =>
              setAIQuestion(
                "Find my training"
              )
            }
          >

            <FaGraduationCap />

            Find training

          </button>

        </div>


        <div className="ai-search-box">

          <input
            type="text"

            placeholder="Ask about SOPs, policies or processes..."

            value={
              aiQuestion
            }

            onChange={(
              event
            ) =>
              setAIQuestion(
                event.target.value
              )
            }

            onKeyDown={(
              event
            ) => {

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

            <FaPaperPlane />

          </button>

        </div>


        {showAIResponse && (

          <div
            className="ai-response"
          >

            <div className="ai-response-icon">

              <FaRobot />

            </div>

            <div>

              <strong>
                AI Preview Response
              </strong>

              <p>
                Based on the available
                SOP knowledge, the requested
                process would normally be
                retrieved and summarized here.
                Backend integration will provide
                the live answer.
              </p>

            </div>

          </div>

        )}

      </div>


      {/* =================================================
          AI SIDE CHAT
      ================================================= */}

      <AnimatePresence>

        {aiChatOpen && (

          <motion.aside
            className="ai-chat-panel"

            initial={{
              opacity: 0,
              x: 30,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            exit={{
              opacity: 0,
              x: 30,
            }}
          >

            <div
              className="ai-chat-header"
            >

              <div>

                <div className="ai-chat-title">

                  <span className="ai-chat-icon">

                    <FaRobot />

                  </span>

                  <div>

                    <strong>
                      AI Knowledge Assistant
                    </strong>

                    <span>
                      <i />
                      Online
                    </span>

                  </div>

                </div>

              </div>


              {/* IMPORTANT:
                  X closes the chatbot only.
                  Dashboard expands automatically.
              */}

              <button
                type="button"

                className="ai-chat-close"

                onClick={() =>
                  setAIChatOpen(false)
                }

                title="Close AI Assistant"
              >

                <FaTimes />

              </button>

            </div>


            <div
              className="ai-chat-body"
            >

              <div className="ai-chat-welcome">

                <div className="ai-chat-bot-avatar">

                  <FaRobot />

                </div>

                <div>

                  <strong>
                    Hi {user?.name?.split(" ")[0] || "there"}! 👋
                  </strong>

                  <p>
                    I can help you with SOPs,
                    policies, processes, training
                    and compliance questions.
                  </p>

                </div>

              </div>


              <div className="ai-chat-prompts">

                <span>
                  Try asking:
                </span>


                <button
                  type="button"
                  onClick={() =>
                    setAIQuestion(
                      "How do I process a distributor request?"
                    )
                  }
                >
                  How do I process a distributor request?
                </button>


                <button
                  type="button"
                  onClick={() =>
                    setAIQuestion(
                      "Show me the latest finance SOP"
                    )
                  }
                >
                  Show me the latest finance SOP
                </button>


                <button
                  type="button"
                  onClick={() =>
                    setAIQuestion(
                      "Explain the approval workflow"
                    )
                  }
                >
                  Explain the approval workflow
                </button>


                <button
                  type="button"
                  onClick={() =>
                    setAIQuestion(
                      "Compare SOP versions"
                    )
                  }
                >
                  Compare SOP versions
                </button>

              </div>

            </div>


            <div
              className="ai-chat-input"
            >

              <input
                type="text"

                placeholder="Type your question..."

                value={
                  aiQuestion
                }

                onChange={(
                  event
                ) =>
                  setAIQuestion(
                    event.target.value
                  )
                }

                onKeyDown={(
                  event
                ) => {

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
              >

                <FaPaperPlane />

              </button>

            </div>

          </motion.aside>

        )}

      </AnimatePresence>

    </section>

  );


  /* =======================================================
     MY SOPs
     ======================================================= */

  const renderMySOPs = () => (

    <section
      className="dashboard-panel"
    >

      <div
        className="panel-title-row"
      >

        <div className="panel-title">

          <div className="panel-icon">
            <FaBook />
          </div>

          <div>

            <span>
              SOP LIBRARY
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


      <div
        className="sop-list"
      >

        {mySOPs
          .slice(0, 4)
          .map(
            (sop) => (

              <div
                className="sop-list-item"
                key={
                  sop.id
                }
              >

                <div className="sop-file-icon">

                  <FaFileAlt />

                </div>


                <div
                  className="sop-list-content"
                >

                  <strong>
                    {sop.title}
                  </strong>

                  <span>
                    {sop.version} • {sop.date}
                  </span>

                </div>


                <span
                  className={`status-badge ${
                    sop.status
                      .toLowerCase()
                      .replace(
                        /\s+/g,
                        "-"
                      )
                  }`}
                >
                  {sop.status}
                </span>


                <button
                  type="button"
                  className="small-action-button"

                  onClick={() =>
                    handleNavigation(
                      "My SOPs"
                    )
                  }
                >

                  View

                </button>

              </div>

            )
          )}

      </div>

    </section>

  );


  /* =======================================================
     SOP GENERATOR
     ======================================================= */

  const renderSOPGenerator = () => (

    <div
      className="dashboard-card-grid two-column"
    >

      <section
        className="dashboard-panel feature-panel"
      >

        <div className="feature-icon purple">

          <FaMagic />

        </div>

        <span>
          AI AUTOMATION
        </span>

        <h2>
          AI SOP Generator
        </h2>

        <p>
          Turn process knowledge into
          structured SOP drafts using AI.
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

          Start New SOP

          <FaArrowRight />

        </button>

      </section>


      <section
        className="dashboard-panel feature-panel"
      >

        <div className="feature-icon cyan">

          <FaFileAlt />

        </div>

        <span>
          DOCUMENT INTELLIGENCE
        </span>

        <h2>
          Document Intelligence
        </h2>

        <p>
          Upload documents for AI-powered
          analysis, extraction and summaries.
        </p>

        <button
          type="button"
          className="primary-action-button"

          onClick={() =>
            handleNavigation(
              "Upload Documents"
            )
          }
        >

          Upload Document

          <FaCloudUploadAlt />

        </button>

      </section>

    </div>

  );


  /* =======================================================
     SOP COMPARISON
     ======================================================= */

  const renderSOPComparison = () => (

    <section
      className="dashboard-panel comparison-panel"
    >

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

        <FaInfoCircle />

      </div>


      <p className="panel-description">

        Compare two SOP versions and
        identify changes.

      </p>


      <div className="comparison-controls">

        <select
          value={
            selectedSOP1
          }

          onChange={(
            event
          ) =>
            setSelectedSOP1(
              event.target.value
            )
          }
        >

          <option>
            SOP v2.0
          </option>

          <option>
            SOP v2.1
          </option>

          <option>
            SOP v3.0
          </option>

        </select>


        <FaExchangeAlt />


        <select
          value={
            selectedSOP2
          }

          onChange={(
            event
          ) =>
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
            SOP v4.0
          </option>

        </select>


        <button
          type="button"
          className="primary-action-button"
        >

          Compare

          <FaArrowRight />

        </button>

      </div>

    </section>

  );


  /* =======================================================
     TRAINING + COMPLIANCE
     ======================================================= */

  const renderTrainingCompliance = () => (

    <div
      className="dashboard-card-grid two-column"
    >

      <section
        className="dashboard-panel progress-panel"
      >

        <div className="panel-title-row">

          <div className="panel-title">

            <div className="panel-icon">

              <FaGraduationCap />

            </div>

            <div>

              <span>
                LEARNING
              </span>

              <h2>
                Training Progress
              </h2>

            </div>

          </div>


          <button
            type="button"
            className="panel-link-button"

            onClick={() =>
              handleNavigation(
                "Training"
              )
            }
          >

            View All

            <FaArrowRight />

          </button>

        </div>


        <div className="progress-item">

          <div>

            <strong>
              Data Privacy Training
            </strong>

            <span>
              100%
            </span>

          </div>

          <div className="progress-track">

            <span
              style={{
                width: "100%",
              }}
            />

          </div>

        </div>


        <div className="progress-item">

          <div>

            <strong>
              SOP Compliance Training
            </strong>

            <span>
              75%
            </span>

          </div>

          <div className="progress-track">

            <span
              style={{
                width: "75%",
              }}
            />

          </div>

        </div>


        <div className="progress-item">

          <div>

            <strong>
              Process Training
            </strong>

            <span>
              50%
            </span>

          </div>

          <div className="progress-track">

            <span
              style={{
                width: "50%",
              }}
            />

          </div>

        </div>


        <button
          type="button"
          className="secondary-action-button"

          onClick={() =>
            handleNavigation(
              "Training"
            )
          }
        >

          Continue Learning

          <FaArrowRight />

        </button>

      </section>


      <section
        className="dashboard-panel compliance-panel"
      >

        <div className="panel-title-row">

          <div className="panel-title">

            <div className="panel-icon">

              <FaShieldAlt />

            </div>

            <div>

              <span>
                COMPLIANCE
              </span>

              <h2>
                Compliance Score
              </h2>

            </div>

          </div>


          <div
            className="info-tooltip-wrapper"
            title="Your current compliance score across assigned SOPs, training and policies."
          >

            <FaInfoCircle />

          </div>

        </div>


        <div className="compliance-score">

          <div className="compliance-ring">

            <div>

              <strong>
                94%
              </strong>

              <span>
                Excellent
              </span>

            </div>

          </div>


          <div className="compliance-breakdown">

            <div>

              <span>
                SOP Acknowledgement
              </span>

              <strong>
                98%
              </strong>

            </div>

            <div>

              <span>
                Training Compliance
              </span>

              <strong>
                92%
              </strong>

            </div>

            <div>

              <span>
                Policy Compliance
              </span>

              <strong>
                95%
              </strong>

            </div>

            <div>

              <span>
                Certifications
              </span>

              <strong>
                91%
              </strong>

            </div>

          </div>

        </div>


        <button
          type="button"
          className="secondary-action-button"

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
     RECOMMENDATIONS
     ======================================================= */

  const renderRecommendations = () => (

    <section
      className="dashboard-panel"
    >

      <div
        className="panel-title-row"
      >

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

      </div>


      <div
        className="recommendation-grid"
      >

        {recommendations.map(
          (recommendation) => {

            const Icon =
              recommendation.icon;

            return (

              <article
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
                    {
                      recommendation.title
                    }
                  </strong>

                  <p>
                    {
                      recommendation.description
                    }
                  </p>


                  <button
                    type="button"
                    className="text-action"

                    onClick={() =>
                      handleNavigation(
                        "AI Assistant"
                      )
                    }
                  >

                    Explore

                    <FaArrowRight />

                  </button>

                </div>

              </article>

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

    <section
      className="dashboard-panel"
    >

      <div
        className="panel-title-row"
      >

        <div className="panel-title">

          <div className="panel-icon">

            <FaHistory />

          </div>

          <div>

            <span>
              WORKSPACE ACTIVITY
            </span>

            <h2>
              Recent Activity
            </h2>

          </div>

        </div>


        <FaInfoCircle />

      </div>


      <div className="activity-list">

        {recentActivity.map(
          (activity) => {

            const Icon =
              activity.icon;

            return (

              <div
                className="activity-item"
                key={
                  activity.id
                }
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
      className="dashboard-section-page"

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


        <div
          className="notification-summary"
        >

          <strong>
            {unreadNotifications}
          </strong>

          <span>
            Unread
          </span>

        </div>

      </div>


      <div
        className="employee-notifications-card"
      >

        {notifications.length > 0
          ? notifications.map(
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
          : (

            <div
              className="employee-no-notifications"
            >

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
     SOP LIBRARY PAGE
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

            value={
              searchValue
            }

            onChange={(
              event
            ) =>
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


        <div
          className="sop-library-grid"
        >

          {filteredSOPs.map(
            (sop) => (

              <article
                className="sop-library-card"
                key={
                  sop.id
                }
              >

                <div
                  className="sop-library-icon"
                >

                  <FaFileAlt />

                </div>


                <div>

                  <span>
                    {sop.version}
                  </span>

                  <h3>
                    {sop.title}
                  </h3>

                  <p>
                    Updated {sop.date}
                  </p>

                </div>


                <div
                  className="sop-card-footer"
                >

                  <span
                    className={`status-badge ${
                      sop.status
                        .toLowerCase()
                        .replace(
                          /\s+/g,
                          "-"
                        )
                    }`}
                  >
                    {sop.status}
                  </span>


                  <button
                    type="button"
                    className="small-action-button"
                  >
                    View SOP
                  </button>

                </div>

              </article>

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

      <div className="section-heading">

        <div>

          <span>
            AI WORKSPACE
          </span>

          <h2>
            AI Assistant
          </h2>

          <p>
            Ask questions and find answers
            from your organization's knowledge base.
          </p>

        </div>


        <button
          type="button"
          className="primary-action-button"

          onClick={() =>
            setAIChatOpen(true)
          }
        >

          Open AI Assistant

          <FaRobot />

        </button>

      </div>


      <section
        className="dashboard-panel"
      >

        <div className="ai-page-content">

          <div className="ai-page-icon">

            <FaRobot />

          </div>

          <h3>
            Knowledge Assistant
          </h3>

          <p>
            Ask about SOPs, policies,
            compliance, training and procedures.
          </p>


          <div className="ai-page-search">

            <input
              type="text"

              placeholder="Ask your question..."

              value={
                aiQuestion
              }

              onChange={(
                event
              ) =>
                setAIQuestion(
                  event.target.value
                )
              }

              onKeyDown={(
                event
              ) => {

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
            >

              <FaPaperPlane />

            </button>

          </div>

        </div>

      </section>

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
            Training
          </h2>

          <p>
            Continue your assigned learning
            and compliance courses.
          </p>

        </div>

      </div>


      <div className="training-page-grid">

        {[
          [
            "Data Privacy Certification",
            "100%",
            "Completed",
          ],
          [
            "SOP Compliance Training",
            "75%",
            "In Progress",
          ],
          [
            "Process Training",
            "50%",
            "In Progress",
          ],
        ].map(
          (
            course,
            index
          ) => (

            <article
              className="dashboard-panel course-card"
              key={index}
            >

              <div
                className="course-icon"
              >

                <FaGraduationCap />

              </div>


              <h3>
                {course[0]}
              </h3>

              <strong>
                {course[1]}
              </strong>

              <span>
                {course[2]}
              </span>


              <button
                type="button"
                className="secondary-action-button"
              >

                {course[1] ===
                "100%"
                  ? "Review"
                  : "Continue"}

                <FaArrowRight />

              </button>

            </article>

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
            COMPLIANCE CENTER
          </span>

          <h2>
            Compliance
          </h2>

          <p>
            Monitor your compliance status
            and assigned requirements.
          </p>

        </div>

      </div>


      <div
        className="dashboard-panel compliance-detail-panel"
      >

        <div
          className="large-compliance-score"
        >

          <div className="compliance-ring large">

            <div>

              <strong>
                94%
              </strong>

              <span>
                Excellent
              </span>

            </div>

          </div>

        </div>


        <div
          className="compliance-detail-list"
        >

          <div>

            <span>
              SOP Acknowledgement
            </span>

            <strong>
              98%
            </strong>

          </div>

          <div>

            <span>
              Training Compliance
            </span>

            <strong>
              92%
            </strong>

          </div>

          <div>

            <span>
              Policy Compliance
            </span>

            <strong>
              95%
            </strong>

          </div>

          <div>

            <span>
              Certifications
            </span>

            <strong>
              91%
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
            PERFORMANCE
          </span>

          <h2>
            My Analytics
          </h2>

          <p>
            Review your SOP, training,
            compliance and AI activity.
          </p>

        </div>

      </div>


      <div className="analytics-grid">

        <article
          className="dashboard-panel analytics-card"
        >

          <FaBook />

          <span>
            SOPs Accessed
          </span>

          <strong>
            24
          </strong>

          <small>
            +3 this month
          </small>

        </article>


        <article
          className="dashboard-panel analytics-card"
        >

          <FaRobot />

          <span>
            AI Queries
          </span>

          <strong>
            37
          </strong>

          <small>
            +12 this week
          </small>

        </article>


        <article
          className="dashboard-panel analytics-card"
        >

          <FaGraduationCap />

          <span>
            Training
          </span>

          <strong>
            82%
          </strong>

          <small>
            +8% this month
          </small>

        </article>


        <article
          className="dashboard-panel analytics-card"
        >

          <FaShieldAlt />

          <span>
            Compliance
          </span>

          <strong>
            94%
          </strong>

          <small>
            +2.4%
          </small>

        </article>

      </div>

    </motion.div>

  );


  /* =======================================================
     SIMPLE PAGE
     ======================================================= */

  const renderSimplePage = (
    title,
    eyebrow,
    description,
    Icon
  ) => (

    <motion.div
      className="dashboard-section-page"

      initial={{
        opacity: 0,
        y: 10,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}
    >

      <div className="simple-dashboard-page">

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
              connected yet. This workspace
              currently uses mock data and is
              ready for API integration.
            </p>

          </div>

        </div>


        <button
          type="button"
          className="primary-action-button"

          onClick={() =>
            handleNavigation(
              "Dashboard"
            )
          }
        >

          <FaArrowLeftSafe />

          Back to Dashboard

        </button>

      </div>

    </motion.div>

  );


  /* =======================================================
     FIXED SAFE BACK ICON
     ======================================================= */

  const FaArrowLeftSafe = () => (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      ←
    </span>
  );


  /* =======================================================
     DASHBOARD HOME
     ======================================================= */

  const renderDashboardHome = () => (

    <>

      {/* =================================================
          WELCOME
      ================================================= */}

      <section
        className="welcome-section"
      >

        <div>

          <span
            className="welcome-eyebrow"
          >
            PERSONALIZED WORKSPACE
          </span>


          <h1>

            {getGreeting()},{" "}

            <strong>
              {user?.name ||
                "Jasleen"}
            </strong>

            {" "}👋

          </h1>


          <p>
            Here's your personalized
            SOP, training and compliance overview.
          </p>

        </div>


        <div
          className="welcome-status"
        >

          <span className="status-dot" />

          Workspace Active

        </div>

      </section>


      {/* =================================================
          GLOBAL SEARCH
      ================================================= */}

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

          value={
            searchValue
          }

          onChange={(
            event
          ) =>
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


      {/* =================================================
          QUICK ACTIONS
      ================================================= */}

      {renderQuickActions()}


      {/* =================================================
          KPI
      ================================================= */}

      {renderKPIs()}


      {/* =================================================
          AI
      ================================================= */}

      {renderAIAssistant()}


      {/* =================================================
          SOPs
      ================================================= */}

      {renderMySOPs()}


      {/* =================================================
          GENERATOR
      ================================================= */}

      {renderSOPGenerator()}


      {/* =================================================
          COMPARISON
      ================================================= */}

      {renderSOPComparison()}


      {/* =================================================
          TRAINING / COMPLIANCE
      ================================================= */}

      {renderTrainingCompliance()}


      {/* =================================================
          RECOMMENDATIONS
      ================================================= */}

      {renderRecommendations()}


      {/* =================================================
          ACTIVITY
      ================================================= */}

      {renderRecentActivity()}

    </>

  );


  /* =======================================================
     CONTENT ROUTER
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

      case "SOPs":

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
      } ${
        aiChatOpen
          ? "with-ai-chat"
          : "without-ai-chat"
      }`}
      onClick={() => {

        /*
         * Only profile dropdown needs
         * outside-click behaviour.
         */

        if (profileOpen) {
          setProfileOpen(false);
        }

      }}
    >

      {renderSidebar()}


      <main
        className="employee-main"

        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {renderHeader()}


        <div
          className="employee-dashboard-content"
        >

          {renderContent()}

        </div>

      </main>


      {/* =================================================
          OVERLAY FOR PROFILE
      ================================================= */}

      {profileOpen && (

        <div
          className="dashboard-overlay"

          onClick={
            closePanels
          }
        />

      )}

    </div>

  );

};


export default EmployeeDashboard;