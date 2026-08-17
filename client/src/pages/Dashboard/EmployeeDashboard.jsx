import React, { useMemo, useState } from "react";
import {
  FaHome,
  FaBook,
  FaRobot,
  FaFileAlt,
  FaGraduationCap,
  FaShieldAlt,
  FaTasks,
  FaChartBar,
  FaBell,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaPlus,
  FaSearch,
  FaArrowRight,
  FaChevronDown,
  FaChevronRight,
  FaChevronLeft,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaUpload,
  FaMagic,
  FaBalanceScale,
  FaBars,
  FaSignOutAlt,
  FaInfoCircle,
  FaRocket,
  FaPaperPlane,
  FaCircle,
  FaCheck,
  FaEye,
  FaPlay,
  FaBookOpen,
  FaLightbulb,
  FaFileUpload,
  FaSyncAlt,
  FaComments,
  FaTimesCircle,
  FaTrophy,
} from "react-icons/fa";

import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  /* =========================================================
     STATE
     ========================================================= */

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [openMenus, setOpenMenus] = useState({
    sop: false,
    documents: false,
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [aiMessage, setAiMessage] = useState("");

  const [selectedActionFilter, setSelectedActionFilter] = useState("All");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "SOP Updated",
      message: "Distributor Onboarding v3.2 was updated.",
      time: "10 min ago",
      type: "sop",
      unread: true,
    },
    {
      id: 2,
      title: "Training Reminder",
      message: "Data Privacy Certification is pending.",
      time: "1 hour ago",
      type: "training",
      unread: true,
    },
    {
      id: 3,
      title: "New Team Update",
      message: "Malaysia Invoice Processing SOP published.",
      time: "2 hours ago",
      type: "team",
      unread: true,
    },
    {
      id: 4,
      title: "Compliance Update",
      message: "Your compliance score has increased to 94%.",
      time: "Yesterday",
      type: "compliance",
      unread: false,
    },
  ]);

  /* =========================================================
     DATA
     ========================================================= */

  const actions = [
    {
      id: 1,
      title: "Review updated SOP",
      subtitle: "Distributor Onboarding v3.2",
      priority: "High",
      due: "Due Today",
      status: "Review",
      type: "SOP",
      icon: <FaExclamationCircle />,
    },
    {
      id: 2,
      title: "Acknowledge SOP",
      subtitle: "Invoice Processing",
      priority: "Medium",
      due: "Due Aug 16",
      status: "View",
      type: "SOP",
      icon: <FaClock />,
    },
    {
      id: 3,
      title: "Complete Training",
      subtitle: "Data Privacy Certification",
      priority: "Medium",
      due: "Due Aug 18",
      status: "Start",
      type: "Training",
      icon: <FaGraduationCap />,
    },
    {
      id: 4,
      title: "Training Completed",
      subtitle: "Email Handling Process",
      priority: "Completed",
      due: "Aug 12",
      status: "View",
      type: "Compliance",
      icon: <FaCheckCircle />,
    },
  ];

  const learningData = [
    {
      title: "Data Privacy Training",
      progress: 100,
    },
    {
      title: "SOP Compliance",
      progress: 75,
    },
    {
      title: "Process Training",
      progress: 50,
    },
  ];

  const recentSops = [
    {
      title: "Distributor Onboarding",
      version: "v3.2",
      status: "Approved",
      viewed: "Last viewed 2 hours ago",
    },
    {
      title: "Invoice Processing",
      version: "v2.1",
      status: "Under Review",
      viewed: "Last updated Aug 12",
    },
    {
      title: "Email Handling",
      version: "v4.0",
      status: "Approved",
      viewed: "Last viewed Yesterday",
    },
  ];

  const recentActivity = [
    {
      text: 'Submitted "Malaysia Distributor SOP"',
      time: "10 minutes ago",
      icon: <FaClock />,
    },
    {
      text: "Completed Data Privacy training",
      time: "Yesterday",
      icon: <FaCheckCircle />,
    },
    {
      text: "Viewed Invoice Processing SOP",
      time: "Yesterday",
      icon: <FaEye />,
    },
    {
      text: "Asked AI about escalation process",
      time: "Aug 12",
      icon: <FaRobot />,
    },
  ];

  const teamUpdates = [
    {
      title: "New SOP published",
      subtitle: "Malaysia Invoice Processing",
      time: "2h ago",
      icon: <FaBookOpen />,
    },
    {
      title: "Policy updated",
      subtitle: "Information Security Guidelines",
      time: "5h ago",
      icon: <FaShieldAlt />,
    },
    {
      title: "Training assigned",
      subtitle: "Data Privacy",
      time: "Yesterday",
      icon: <FaGraduationCap />,
    },
    {
      title: "SOP approval completed",
      subtitle: "Email Handling",
      time: "Yesterday",
      icon: <FaCheckCircle />,
    },
  ];

  const recommendations = [
    {
      type: "SOP Updated",
      title: "Distributor Onboarding v3.2",
      description:
        "This SOP was recently updated and affects your assigned process.",
      action: "Review Now",
      icon: <FaFileAlt />,
      className: "recommendation-blue",
    },
    {
      type: "Training Recommended",
      title: "Data Privacy Certification",
      description: "Expires in 14 days.",
      action: "Start Training",
      icon: <FaGraduationCap />,
      className: "recommendation-cyan",
    },
    {
      type: "Related SOP",
      title: "Invoice Processing",
      description: "Often viewed by people in your role.",
      action: "View SOP",
      icon: <FaBook />,
      className: "recommendation-purple",
    },
  ];

  const filteredActions = useMemo(() => {
    if (selectedActionFilter === "All") {
      return actions;
    }

    return actions.filter(
      (action) => action.type === selectedActionFilter
    );
  }, [selectedActionFilter]);

  /* =========================================================
     HELPERS
     ========================================================= */

  const toggleMenu = (menu) => {
    setOpenMenus((previous) => ({
      ...previous,
      [menu]: !previous[menu],
    }));
  };

  const unreadNotifications = notifications.filter(
    (item) => item.unread
  ).length;

  const markNotificationsRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  const sendAiMessage = () => {
    if (!aiMessage.trim()) return;

    setAiMessage("");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";

    return "Good Evening";
  };

  /* =========================================================
     SIDEBAR
     ========================================================= */

  const Sidebar = () => (
    <aside
      className={`employee-sidebar ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <div className="sidebar-brand">
        <div className="sidebar-brand-logo">
          <FaRobot />
        </div>

        {!sidebarCollapsed && (
          <div className="sidebar-brand-text">
            <strong>SOP<span>Intelligence</span></strong>
            <small>Smarter Processes. Better Decisions.</small>
          </div>
        )}

        <button
          className="sidebar-collapse-button"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      <nav className="sidebar-navigation">

        <div className="sidebar-section-title">
          {!sidebarCollapsed && "WORKSPACE"}
        </div>

        <button className="sidebar-item active">
          <FaHome />
          {!sidebarCollapsed && <span>Dashboard</span>}
        </button>

        {/* SOP MENU */}

        <button
          className={`sidebar-item sidebar-parent ${
            openMenus.sop ? "menu-open" : ""
          }`}
          onClick={() => toggleMenu("sop")}
        >
          <FaBook />

          {!sidebarCollapsed && (
            <>
              <span>SOPs</span>
              <FaChevronDown className="sidebar-arrow" />
            </>
          )}
        </button>

        {!sidebarCollapsed && openMenus.sop && (
          <div className="sidebar-submenu">
            <button className="sidebar-subitem">
              <FaBookOpen />
              <span>All SOPs</span>
            </button>

            <button className="sidebar-subitem">
              <FaBook />
              <span>My SOPs</span>
            </button>

            <button className="sidebar-subitem">
              <FaMagic />
              <span>Generate SOP</span>
            </button>

            <button className="sidebar-subitem">
              <FaFileAlt />
              <span>Drafts</span>
            </button>
          </div>
        )}

        <button className="sidebar-item">
          <FaMagic />
          {!sidebarCollapsed && <span>Generate SOP</span>}
        </button>

        <button className="sidebar-item">
          <FaRobot />
          {!sidebarCollapsed && <span>AI Assistant</span>}
        </button>

        {/* DOCUMENT MENU */}

        <button
          className={`sidebar-item sidebar-parent ${
            openMenus.documents ? "menu-open" : ""
          }`}
          onClick={() => toggleMenu("documents")}
        >
          <FaFileAlt />

          {!sidebarCollapsed && (
            <>
              <span>Documents</span>
              <FaChevronDown className="sidebar-arrow" />
            </>
          )}
        </button>

        {!sidebarCollapsed && openMenus.documents && (
          <div className="sidebar-submenu">
            <button className="sidebar-subitem">
              <FaFileAlt />
              <span>My Documents</span>
            </button>

            <button className="sidebar-subitem">
              <FaUpload />
              <span>Upload Document</span>
            </button>

            <button className="sidebar-subitem">
              <FaRobot />
              <span>AI Analysis</span>
            </button>
          </div>
        )}

        <button className="sidebar-item">
          <FaBalanceScale />
          {!sidebarCollapsed && <span>SOP Comparison</span>}
        </button>

        <button className="sidebar-item">
          <FaGraduationCap />
          {!sidebarCollapsed && <span>Training & Learning</span>}
        </button>

        <button className="sidebar-item">
          <FaShieldAlt />
          {!sidebarCollapsed && <span>Compliance</span>}
        </button>

        <button className="sidebar-item">
          <FaTasks />

          {!sidebarCollapsed && (
            <>
              <span>My Tasks</span>

              <span className="sidebar-count">
                4
              </span>
            </>
          )}
        </button>

        <button className="sidebar-item">
          <FaChartBar />
          {!sidebarCollapsed && <span>Analytics</span>}
        </button>

        {/* NOTIFICATIONS ONLY IN SIDEBAR */}

        <button
          className="sidebar-item notification-sidebar-item"
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowProfile(false);
            markNotificationsRead();
          }}
        >
          <span className="sidebar-notification-icon">
            <FaBell />

            {unreadNotifications > 0 && (
              <span className="sidebar-notification-dot">
                {unreadNotifications}
              </span>
            )}
          </span>

          {!sidebarCollapsed && (
            <>
              <span>Notifications</span>

              {unreadNotifications > 0 && (
                <span className="sidebar-count notification-count">
                  {unreadNotifications}
                </span>
              )}
            </>
          )}
        </button>

        <div className="sidebar-divider" />

        <div className="sidebar-section-title">
          {!sidebarCollapsed && "ACCOUNT"}
        </div>

        <button className="sidebar-item">
          <FaUser />
          {!sidebarCollapsed && <span>Profile</span>}
        </button>

        <button className="sidebar-item">
          <FaCog />
          {!sidebarCollapsed && <span>Settings</span>}
        </button>

        <button className="sidebar-item">
          <FaQuestionCircle />
          {!sidebarCollapsed && <span>Help & Support</span>}
        </button>

        {!sidebarCollapsed && (
          <button className="feedback-button">
            <FaComments />
            <span>Give Feedback</span>
          </button>
        )}
      </nav>

      {/* USER */}

      <div className="sidebar-user">
        <div className="sidebar-user-avatar">
          J
        </div>

        {!sidebarCollapsed && (
          <>
            <div className="sidebar-user-details">
              <strong>Jasleen Kaur</strong>
              <span>Senior Executive</span>
            </div>

            <button
              className="sidebar-user-menu"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
            >
              <FaChevronDown />
            </button>
          </>
        )}
      </div>

      {/* PROFILE DROPDOWN */}

      {showProfile && !sidebarCollapsed && (
        <div className="sidebar-profile-menu">
          <button>
            <FaUser />
            My Profile
          </button>

          <button>
            <FaCog />
            Account Settings
          </button>

          <div className="profile-menu-divider" />

          <button className="logout-option">
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      )}
    </aside>
  );

  /* =========================================================
     NOTIFICATION PANEL
     ========================================================= */

  const NotificationPanel = () => {
    if (!showNotifications) return null;

    return (
      <div className="notification-panel">

        <div className="notification-panel-header">
          <div>
            <h3>Notifications</h3>
            <span>
              {unreadNotifications} unread notification
              {unreadNotifications !== 1 ? "s" : ""}
            </span>
          </div>

          <button
            onClick={() => setShowNotifications(false)}
            className="notification-close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="notification-list">
          {notifications.map((notification) => (
            <div
              className={`notification-item ${
                notification.unread ? "unread" : ""
              }`}
              key={notification.id}
            >
              <div className="notification-icon">
                {notification.type === "training" ? (
                  <FaGraduationCap />
                ) : notification.type === "compliance" ? (
                  <FaShieldAlt />
                ) : (
                  <FaFileAlt />
                )}
              </div>

              <div className="notification-content">
                <strong>{notification.title}</strong>

                <p>{notification.message}</p>

                <span>{notification.time}</span>
              </div>

              {notification.unread && (
                <span className="notification-unread-dot" />
              )}
            </div>
          ))}
        </div>

        <button className="notification-view-all">
          View All Notifications
          <FaArrowRight />
        </button>
      </div>
    );
  };

  /* =========================================================
     AI ASSISTANT
     ========================================================= */

  const AiAssistant = () => (
    <aside className={`ai-assistant ${showAiAssistant ? "" : "hidden"}`}>

      <div className="ai-assistant-header">

        <div className="ai-assistant-title">
          <div className="ai-avatar">
            <FaRobot />
          </div>

          <div>
            <strong>AI Knowledge Assistant</strong>

            <span>
              <FaCircle />
              Online
            </span>
          </div>
        </div>

        <div className="ai-assistant-actions">
          <button title="Expand">
            <FaArrowRight />
          </button>

          <button
            title="Close"
            onClick={() => setShowAiAssistant(false)}
          >
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="ai-chat-area">

        <div className="ai-message">
          <div className="ai-message-icon">
            <FaRobot />
          </div>

          <div className="ai-message-bubble">
            Hi Jasleen! 👋
            <br />
            I can help you with SOPs, policies, processes and answer any
            work-related questions.
          </div>
        </div>

        <div className="ai-suggestions">

          <span>Try asking:</span>

          <button
            onClick={() =>
              setAiMessage("How do I process a distributor request?")
            }
          >
            "How do I process a distributor request?"
          </button>

          <button
            onClick={() =>
              setAiMessage("Show me the latest finance SOP")
            }
          >
            Show me the latest finance SOP
          </button>

          <button
            onClick={() =>
              setAiMessage("Explain the approval workflow")
            }
          >
            Explain the approval workflow
          </button>

          <button
            onClick={() =>
              setAiMessage("Compare SOP versions")
            }
          >
            Compare SOP versions
          </button>
        </div>

      </div>

      <div className="ai-input-area">

        <input
          type="text"
          placeholder="Type your question..."
          value={aiMessage}
          onChange={(event) => setAiMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendAiMessage();
            }
          }}
        />

        <button
          className="ai-send-button"
          onClick={sendAiMessage}
        >
          <FaPaperPlane />
        </button>
      </div>
    </aside>
  );

  /* =========================================================
     MAIN DASHBOARD
     ========================================================= */

  return (
    <div
      className={`employee-dashboard ${
        sidebarCollapsed ? "sidebar-is-collapsed" : ""
      }`}
    >

      <Sidebar />

      <main className="employee-main">

        {/* =====================================================
            TOP HEADER
        ===================================================== */}

        <header className="employee-header">

          <div className="mobile-menu-button">
            <button
              onClick={() =>
                setSidebarCollapsed(!sidebarCollapsed)
              }
            >
              <FaBars />
            </button>
          </div>

          <div className="global-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search SOPs, documents, policies or ask AI..."
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
            />

            <span className="search-shortcut">
              ⌘ K
            </span>
          </div>

          <div className="header-actions">

            <button
              className="header-icon-button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
                markNotificationsRead();
              }}
              title="Notifications"
            >
              <FaBell />

              {unreadNotifications > 0 && (
                <span className="header-notification-badge">
                  {unreadNotifications}
                </span>
              )}
            </button>

            <div className="header-profile-wrapper">

              <button
                className="header-profile-button"
                onClick={() =>
                  setShowProfile(!showProfile)
                }
              >
                <div className="header-avatar">
                  J
                </div>

                <div className="header-profile-text">
                  <strong>Jasleen Kaur</strong>
                  <span>Senior Executive</span>
                </div>

                <FaChevronDown />
              </button>

              {showProfile && (
                <div className="header-profile-dropdown">

                  <button>
                    <FaUser />
                    My Profile
                  </button>

                  <button>
                    <FaCog />
                    Settings
                  </button>

                  <button>
                    <FaQuestionCircle />
                    Help & Support
                  </button>

                  <div />

                  <button className="logout-option">
                    <FaSignOutAlt />
                    Sign Out
                  </button>

                </div>
              )}
            </div>

          </div>
        </header>

        <NotificationPanel />

        {/* =====================================================
            DASHBOARD CONTENT
        ===================================================== */}

        <div className="employee-content">

          {/* ===================================================
              WELCOME
          =================================================== */}

          <section className="employee-welcome-card">

            <div className="welcome-main">

              <span className="welcome-date">
                14 Aug 2025, Thursday
              </span>

              <h1>
                {getGreeting()}, Jasleen! 👋
              </h1>

              <p>
                Here's your personalized overview for SOPs,
                training and compliance.
              </p>

            </div>

            <div className="welcome-ai-decoration">
              <FaRobot />
            </div>

          </section>

          {/* ===================================================
              QUICK ACTIONS
          =================================================== */}

          <section className="quick-actions">

            <button className="quick-action">

              <div className="quick-action-icon">
                <FaPlus />
              </div>

              <div className="quick-action-content">
                <strong>Generate SOP</strong>
                <span>Create with AI</span>
              </div>

              <FaArrowRight />

            </button>

            <button className="quick-action">

              <div className="quick-action-icon purple">
                <FaRobot />
              </div>

              <div className="quick-action-content">
                <strong>Ask AI</strong>
                <span>Get instant answers</span>
              </div>

              <FaArrowRight />

            </button>

            <button className="quick-action">

              <div className="quick-action-icon blue">
                <FaFileUpload />
              </div>

              <div className="quick-action-content">
                <strong>Upload Document</strong>
                <span>AI analysis & summary</span>
              </div>

              <FaArrowRight />

            </button>

            <button className="quick-action">

              <div className="quick-action-icon cyan">
                <FaSearch />
              </div>

              <div className="quick-action-content">
                <strong>Find SOP</strong>
                <span>Search library</span>
              </div>

              <FaArrowRight />

            </button>

            <button className="quick-action">

              <div className="quick-action-icon green">
                <FaGraduationCap />
              </div>

              <div className="quick-action-content">
                <strong>Start Training</strong>
                <span>Continue learning</span>
              </div>

              <FaArrowRight />

            </button>

          </section>

          {/* ===================================================
              KPI
          =================================================== */}

          <section className="kpi-grid">

            <div className="kpi-card">

              <div className="kpi-header">
                <span>My SOPs</span>
                <div className="kpi-icon blue">
                  <FaBook />
                </div>
              </div>

              <strong className="kpi-value">24</strong>

              <span className="kpi-status positive">
                ↗ +3 this month
              </span>

            </div>

            <div className="kpi-card">

              <div className="kpi-header">
                <span>Pending Actions</span>
                <div className="kpi-icon orange">
                  <FaClock />
                </div>
              </div>

              <strong className="kpi-value">4</strong>

              <span className="kpi-status warning">
                Needs your attention
              </span>

            </div>

            <div className="kpi-card">

              <div className="kpi-header">
                <span>Training Progress</span>
                <div className="kpi-icon purple">
                  <FaGraduationCap />
                </div>
              </div>

              <strong className="kpi-value">82%</strong>

              <span className="kpi-status warning">
                2 courses pending
              </span>

            </div>

            <div className="kpi-card">

              <div className="kpi-header">
                <span>Compliance Score</span>
                <div className="kpi-icon green">
                  <FaShieldAlt />
                </div>
              </div>

              <strong className="kpi-value">94%</strong>

              <span className="kpi-status positive">
                Excellent
              </span>

            </div>

            <div className="kpi-card">

              <div className="kpi-header">
                <span>AI Queries</span>
                <div className="kpi-icon purple">
                  <FaRobot />
                </div>
              </div>

              <strong className="kpi-value">37</strong>

              <span className="kpi-status positive">
                ↗ +12 this week
              </span>

            </div>

          </section>

          {/* ===================================================
              THREE COLUMN MAIN AREA
          =================================================== */}

          <section className="dashboard-three-column">

            {/* MY ACTIONS */}

            <div className="dashboard-panel actions-panel">

              <div className="panel-header">

                <div>
                  <h2>My Actions</h2>
                </div>

                <button>
                  View All <FaArrowRight />
                </button>

              </div>

              <div className="action-filters">

                {["All", "SOP", "Training", "Compliance"].map(
                  (filter) => (
                    <button
                      key={filter}
                      className={
                        selectedActionFilter === filter
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setSelectedActionFilter(filter)
                      }
                    >
                      {filter}
                      {filter === "All" && " 4"}
                    </button>
                  )
                )}

              </div>

              <div className="action-list">

                {filteredActions.map((action) => (
                  <div
                    className="action-row"
                    key={action.id}
                  >

                    <div className="action-status-icon">
                      {action.icon}
                    </div>

                    <div className="action-details">

                      <strong>{action.title}</strong>

                      <span>{action.subtitle}</span>

                    </div>

                    <span
                      className={`priority ${
                        action.priority
                          .toLowerCase()
                          .replace(" ", "-")
                      }`}
                    >
                      {action.priority}
                    </span>

                    <span className="action-due">
                      {action.due}
                    </span>

                    <button className="action-button">
                      {action.status}
                    </button>

                  </div>
                ))}

              </div>

            </div>

            {/* MY LEARNING */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <h2>My Learning</h2>

                <button>
                  View All <FaArrowRight />
                </button>

              </div>

              <div className="learning-list">

                {learningData.map((item) => (
                  <div
                    className="learning-item"
                    key={item.title}
                  >

                    <div className="learning-header">
                      <span>{item.title}</span>
                      <strong>{item.progress}%</strong>
                    </div>

                    <div className="learning-progress">
                      <span
                        style={{
                          width: `${item.progress}%`,
                        }}
                      />
                    </div>

                  </div>
                ))}

              </div>

              <div className="pending-learning">
                <FaTrophy />
                2 courses pending
              </div>

              <button className="continue-button">
                Continue Learning
                <FaArrowRight />
              </button>

            </div>

            {/* MY COMPLIANCE */}

            <div className="dashboard-panel compliance-panel">

              <div className="panel-header">

                <h2>My Compliance</h2>

                <button className="info-button">
                  <FaInfoCircle />
                </button>

              </div>

              <div className="compliance-circle">

                <div>
                  <strong>94%</strong>
                  <span>Compliance Score</span>
                </div>

              </div>

              <div className="compliance-list">

                <div>
                  <span>SOP Acknowledgement</span>
                  <strong>98%</strong>
                </div>

                <div>
                  <span>Training Compliance</span>
                  <strong>92%</strong>
                </div>

                <div>
                  <span>Policy Compliance</span>
                  <strong>95%</strong>
                </div>

                <div>
                  <span>Certifications</span>
                  <strong>91%</strong>
                </div>

              </div>

              <button className="outline-button">
                View Details <FaArrowRight />
              </button>

            </div>

          </section>

          {/* ===================================================
              FEATURE CARDS
          =================================================== */}

          <section className="feature-grid">

            <div className="feature-card">

              <div className="feature-icon orange">
                <FaMagic />
              </div>

              <h3>AI SOP Generator</h3>

              <p>
                Turn your process knowledge into a structured SOP.
              </p>

              <button>
                <FaPlus />
                Start New SOP
              </button>

            </div>

            <div className="feature-card">

              <div className="feature-icon cyan">
                <FaFileAlt />
              </div>

              <h3>Document Intelligence</h3>

              <p>
                Upload documents for AI analysis and extract process
                information.
              </p>

              <button>
                <FaUpload />
                Upload Document
              </button>

            </div>

            <div className="feature-card">

              <div className="feature-icon green">
                <FaBalanceScale />
              </div>

              <h3>SOP Comparison</h3>

              <p>
                Compare versions and identify changes with AI.
              </p>

              <button>
                <FaBalanceScale />
                Compare SOPs
              </button>

            </div>

            <div className="feature-card">

              <div className="feature-icon blue">
                <FaBook />
              </div>

              <h3>SOP Library</h3>

              <p>
                Explore 500+ SOPs across departments.
              </p>

              <button>
                Browse Library
              </button>

            </div>

          </section>

          {/* ===================================================
              LOWER CONTENT
          =================================================== */}

          <section className="dashboard-bottom-grid">

            {/* RECENT SOP */}

            <div className="dashboard-panel recent-sop-panel">

              <div className="panel-header">

                <h2>Recently Accessed SOPs</h2>

                <div className="panel-navigation">

                  <button>
                    View All
                  </button>

                  <button>
                    <FaChevronLeft />
                  </button>

                  <button>
                    <FaChevronRight />
                  </button>

                </div>

              </div>

              <div className="recent-sop-grid">

                {recentSops.map((sop) => (
                  <div
                    className="recent-sop-card"
                    key={sop.title}
                  >

                    <h3>{sop.title}</h3>

                    <div className="sop-meta">

                      <span>{sop.version}</span>

                      <span
                        className={
                          sop.status === "Approved"
                            ? "status-approved"
                            : "status-review"
                        }
                      >
                        {sop.status}
                      </span>

                    </div>

                    <p>{sop.viewed}</p>

                    <button>
                      View SOP
                      <FaArrowRight />
                    </button>

                  </div>
                ))}

              </div>

            </div>

            {/* RECENT ACTIVITY */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <h2>Recent Activity</h2>

                <button>
                  View All <FaArrowRight />
                </button>

              </div>

              <div className="activity-list">

                {recentActivity.map((activity, index) => (
                  <div
                    className="activity-item"
                    key={index}
                  >

                    <div className="activity-icon">
                      {activity.icon}
                    </div>

                    <div>
                      <strong>{activity.text}</strong>
                      <span>{activity.time}</span>
                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* TEAM UPDATES */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <h2>Team Updates</h2>

                <button>
                  View All <FaArrowRight />
                </button>

              </div>

              <div className="team-update-list">

                {teamUpdates.map((update, index) => (
                  <div
                    className="team-update"
                    key={index}
                  >

                    <div className="team-update-icon">
                      {update.icon}
                    </div>

                    <div className="team-update-content">

                      <strong>{update.title}</strong>

                      <span>{update.subtitle}</span>

                    </div>

                    <small>{update.time}</small>

                  </div>
                ))}

              </div>

            </div>

          </section>

          {/* ===================================================
              AI BANNER
          =================================================== */}

          <section className="ai-banner">

            <div className="ai-banner-icon">
              <FaRocket />
            </div>

            <div className="ai-banner-content">

              <h2>Make your work smarter with AI</h2>

              <p>
                Create SOPs faster, find information quicker and stay
                compliant with AI-powered insights.
              </p>

            </div>

            <button>
              Explore AI Features
              <FaArrowRight />
            </button>

          </section>

        </div>
      </main>

      {/* =======================================================
          RIGHT AI SIDEBAR
      ======================================================= */}

      {showAiAssistant && (
        <div className="employee-right-column">

          <AiAssistant />

          <section className="recommendations-panel">

            <div className="recommendations-header">

              <h2>
                <FaLightbulb />
                Recommended for You
              </h2>

              <button>
                View All <FaArrowRight />
              </button>

            </div>

            <div className="recommendation-list">

              {recommendations.map((item, index) => (
                <div
                  className={`recommendation-card ${item.className}`}
                  key={index}
                >

                  <div className="recommendation-top">

                    <div className="recommendation-icon">
                      {item.icon}
                    </div>

                    <span>{item.type}</span>

                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <button>
                    {item.action}
                    <FaArrowRight />
                  </button>

                </div>
              ))}

            </div>

          </section>

        </div>
      )}

    </div>
  );
};

export default EmployeeDashboard;