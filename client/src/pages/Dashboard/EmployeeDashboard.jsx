import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  CloudUpload,
  FileSearch,
  FileText,
  GraduationCap,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  User,
  X,
  Zap,
} from "lucide-react";

import "./Dashboard.css";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  /* =========================================================
     USER
     ========================================================= */

  const storedUser = localStorage.getItem("user");

  const user = useMemo(() => {
    try {
      return storedUser
        ? JSON.parse(storedUser)
        : {
            name: "Jasleen Kaur",
            email: "jasleen@example.com",
            role: "Employee",
          };
    } catch {
      return {
        name: "Jasleen Kaur",
        email: "jasleen@example.com",
        role: "Employee",
      };
    }
  }, [storedUser]);

  /* =========================================================
     STATE
     ========================================================= */

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [showAiResponse, setShowAiResponse] = useState(false);
  const [selectedSop, setSelectedSop] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState(null);

  /* =========================================================
     NAVIGATION
     ========================================================= */

  const navigationItems = [
    {
      label: "Dashboard",
      icon: Home,
    },
    {
      label: "SOPs",
      icon: BookOpen,
      children: [
        "All SOPs",
        "My SOPs",
        "Generate SOP",
        "Drafts",
      ],
    },
    {
      label: "AI Assistant",
      icon: Bot,
    },
    {
      label: "Documents",
      icon: FileText,
      children: ["Upload", "AI Analysis"],
    },
    {
      label: "Training",
      icon: GraduationCap,
    },
    {
      label: "Compliance",
      icon: ShieldCheck,
    },
    {
      label: "Notifications",
      icon: Bell,
    },
    {
      label: "My Analytics",
      icon: BarChart3,
    },
  ];

  const bottomNavigation = [
    {
      label: "Settings",
      icon: Settings,
    },
    {
      label: "Help & Support",
      icon: HelpCircle,
    },
  ];

  /* =========================================================
     KPI DATA
     ========================================================= */

  const kpis = [
    {
      label: "My SOPs",
      value: "24",
      description: "Assigned & accessible",
      icon: BookOpen,
      trend: "+3 this month",
    },
    {
      label: "Actions",
      value: "4",
      description: "Require your attention",
      icon: Clock3,
      trend: "2 due today",
    },
    {
      label: "Training",
      value: "82%",
      description: "Overall completion",
      icon: GraduationCap,
      trend: "+8% this month",
    },
    {
      label: "Compliance",
      value: "94%",
      description: "Current compliance score",
      icon: ShieldCheck,
      trend: "+2.4%",
    },
    {
      label: "AI Queries",
      value: "37",
      description: "Questions asked",
      icon: Bot,
      trend: "+12 this week",
    },
  ];

  /* =========================================================
     QUICK ACTIONS
     ========================================================= */

  const quickActions = [
    {
      title: "Generate SOP",
      description: "Create with AI",
      icon: Sparkles,
      action: "Generate SOP",
    },
    {
      title: "Ask AI",
      description: "Ask anything",
      icon: Bot,
      action: "AI Assistant",
    },
    {
      title: "Upload Document",
      description: "Analyze file",
      icon: CloudUpload,
      action: "Upload",
    },
    {
      title: "Find SOP",
      description: "Search library",
      icon: FileSearch,
      action: "All SOPs",
    },
  ];

  /* =========================================================
     MY ACTIONS
     ========================================================= */

  const myActions = [
    {
      id: 1,
      type: "Review SOP",
      title: "Distributor Onboarding",
      due: "Due Today",
      status: "urgent",
      icon: AlertCircle,
    },
    {
      id: 2,
      type: "Acknowledge SOP",
      title: "Invoice Processing",
      due: "Due Aug 16",
      status: "pending",
      icon: FileText,
    },
    {
      id: 3,
      type: "Complete Training",
      title: "Data Privacy",
      due: "Due Aug 18",
      status: "pending",
      icon: GraduationCap,
    },
    {
      id: 4,
      type: "Approval Completed",
      title: "Email Handling",
      due: "Completed",
      status: "completed",
      icon: CheckCircle2,
    },
  ];

  /* =========================================================
     SOP DATA
     ========================================================= */

  const sops = [
    {
      id: 1,
      title: "Distributor Onboarding",
      version: "v3.2",
      status: "Approved",
      updated: "Aug 12",
      owner: "Operations",
      pages: "14 pages",
    },
    {
      id: 2,
      title: "Invoice Processing",
      version: "v2.4",
      status: "Approved",
      updated: "Aug 10",
      owner: "Finance",
      pages: "9 pages",
    },
    {
      id: 3,
      title: "Email Handling",
      version: "v4.1",
      status: "Approved",
      updated: "Aug 08",
      owner: "Operations",
      pages: "11 pages",
    },
    {
      id: 4,
      title: "Customer Escalation",
      version: "v2.1",
      status: "Pending",
      updated: "Aug 06",
      owner: "Customer Success",
      pages: "8 pages",
    },
  ];

  /* =========================================================
     GENERATED SOPS
     ========================================================= */

  const generatedSops = [
    {
      title: "Distributor Onboarding",
      status: "Draft",
      date: "Aug 13",
    },
    {
      title: "Invoice Processing",
      status: "Pending Review",
      date: "Aug 12",
    },
    {
      title: "Email Handling",
      status: "Approved",
      date: "Aug 10",
    },
  ];

  /* =========================================================
     TRAINING
     ========================================================= */

  const trainingCourses = [
    {
      title: "Data Privacy Training",
      progress: 100,
      status: "Completed",
    },
    {
      title: "SOP Compliance",
      progress: 75,
      status: "In Progress",
    },
    {
      title: "Process Training",
      progress: 50,
      status: "In Progress",
    },
  ];

  /* =========================================================
     RECOMMENDATIONS
     ========================================================= */

  const recommendations = [
    {
      id: 1,
      icon: FileText,
      title: "SOP Updated",
      subtitle: "Distributor Onboarding v3.2",
      description:
        "This SOP was recently updated and affects your assigned process.",
      action: "Review Now",
    },
    {
      id: 2,
      icon: GraduationCap,
      title: "Training Recommended",
      subtitle: "Data Privacy Certification",
      description:
        "Your certification expires in 14 days.",
      action: "Start Training",
    },
  ];

  /* =========================================================
     RECENT UPDATES
     ========================================================= */

  const recentUpdates = [
    {
      title: "SOP v3.2 published",
      subtitle: "Distributor Onboarding",
      time: "2h ago",
      type: "sop",
    },
    {
      title: "New training assigned",
      subtitle: "Data Privacy",
      time: "5h ago",
      type: "training",
    },
    {
      title: "Policy updated",
      subtitle: "Information Security",
      time: "Yesterday",
      type: "policy",
    },
    {
      title: "SOP approval completed",
      subtitle: "Email Handling",
      time: "Yesterday",
      type: "approval",
    },
  ];

  /* =========================================================
     ACTIVITY
     ========================================================= */

  const activityData = [
    {
      label: "SOPs Created",
      value: 8,
    },
    {
      label: "SOPs Viewed",
      value: 42,
    },
    {
      label: "AI Questions",
      value: 37,
    },
    {
      label: "Training",
      value: 15,
    },
    {
      label: "Documents",
      value: 9,
    },
  ];

  /* =========================================================
     COMPLIANCE
     ========================================================= */

  const complianceData = [
    {
      label: "SOP Acknowledgement",
      value: 98,
    },
    {
      label: "Training Compliance",
      value: 92,
    },
    {
      label: "Policy Compliance",
      value: 95,
    },
    {
      label: "Certification",
      value: 91,
    },
  ];

  /* =========================================================
     NOTIFICATIONS
     ========================================================= */

  const notifications = [
    {
      title: "SOP v3.2 published",
      message: "Distributor Onboarding has been updated.",
      time: "2h ago",
    },
    {
      title: "Training assigned",
      message: "Data Privacy training is now available.",
      time: "5h ago",
    },
    {
      title: "Action due today",
      message: "Review Distributor Onboarding SOP.",
      time: "6h ago",
    },
  ];

  /* =========================================================
     HANDLERS
     ========================================================= */

  const handleNavigation = (label) => {
    setActiveMenu(label);
  };

  const handleQuickAction = (action) => {
    setActiveMenu(action);
    setShowQuickMenu(false);

    if (action === "AI Assistant") {
      document
        .getElementById("employee-ai-assistant")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }

    if (action === "Generate SOP") {
      document
        .getElementById("employee-ai-generator")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }

    if (action === "Upload") {
      document
        .getElementById("employee-document-intelligence")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }

    if (action === "All SOPs") {
      document
        .getElementById("employee-my-sops")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }
  };

  const handleAiSearch = () => {
    if (!aiQuery.trim()) return;

    setShowAiResponse(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");

    window.location.href = "/login";
  };

  const handleGlobalSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  /* =========================================================
     SEARCH FILTER
     ========================================================= */

  const filteredSops = sops.filter((sop) =>
    `${sop.title} ${sop.owner} ${sop.version}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  /* =========================================================
     ANIMATION
     ========================================================= */

  const pageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.45,
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  /* =========================================================
     RETURN
     ========================================================= */

  return (
    <div
      className={`dashboard-page employee-dashboard-page ${
        sidebarOpen
          ? "dashboard-sidebar-open"
          : "dashboard-sidebar-collapsed"
      }`}
    >
      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="dashboard-sidebar"
            initial={{
              x: -30,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: -30,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {/* BRAND */}

            <div className="dashboard-sidebar-brand">
              <div className="dashboard-brand-logo">
                ◈
              </div>

              <div>
                <strong>SOP INTELLIGENCE</strong>
                <span>Employee Portal</span>
              </div>
            </div>

            {/* NAVIGATION */}

            <div className="dashboard-sidebar-navigation">
              <div className="dashboard-sidebar-section-label">
                WORKSPACE
              </div>

              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.label;

                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      className={`dashboard-sidebar-item ${
                        isActive
                          ? "dashboard-sidebar-item-active"
                          : ""
                      }`}
                      onClick={() =>
                        handleNavigation(item.label)
                      }
                    >
                      <Icon size={18} />

                      <span>{item.label}</span>

                      {item.children && (
                        <ChevronDown
                          size={14}
                          className="dashboard-sidebar-chevron"
                        />
                      )}
                    </button>

                    {item.children && isActive && (
                      <motion.div
                        className="dashboard-sidebar-submenu"
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                      >
                        {item.children.map((child) => (
                          <button
                            type="button"
                            key={child}
                            onClick={() =>
                              handleNavigation(child)
                            }
                          >
                            {child}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* BOTTOM NAV */}

            <div className="dashboard-sidebar-bottom">
              {bottomNavigation.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    type="button"
                    className="dashboard-sidebar-item"
                    key={item.label}
                    onClick={() =>
                      handleNavigation(item.label)
                    }
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* USER */}

            <div className="dashboard-sidebar-user">
              <div className="dashboard-sidebar-user-avatar">
                {user.name?.charAt(0)?.toUpperCase() || "J"}
              </div>

              <div className="dashboard-sidebar-user-info">
                <strong>{user.name}</strong>
                <span>{user.role || "Employee"}</span>
              </div>

              <button
                type="button"
                className="employee-dashboard-logout"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="dashboard-main">
        {/* ===================================================
            TOP HEADER
            =================================================== */}

        <header className="dashboard-header">
          <div className="dashboard-header-left">
            <button
              type="button"
              className="dashboard-sidebar-toggle"
              onClick={() =>
                setSidebarOpen((previous) => !previous)
              }
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <PanelLeftClose size={20} />
              ) : (
                <PanelLeftOpen size={20} />
              )}
            </button>

            <div>
              <span className="dashboard-header-label">
                EMPLOYEE WORKSPACE
              </span>

              <h1>Dashboard</h1>
            </div>
          </div>

          <div className="dashboard-header-actions">
            {/* NOTIFICATIONS */}

            <div className="dashboard-header-dropdown">
              <button
                type="button"
                className="dashboard-header-icon-button"
                onClick={() =>
                  setShowNotifications(
                    (previous) => !previous
                  )
                }
              >
                <Bell size={18} />

                <span className="dashboard-notification-dot" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    className="dashboard-dropdown-panel"
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
                    <div className="dashboard-dropdown-header">
                      <strong>Notifications</strong>
                      <span>3 new</span>
                    </div>

                    {notifications.map(
                      (notification) => (
                        <div
                          className="dashboard-notification-item"
                          key={notification.title}
                        >
                          <div className="dashboard-notification-icon">
                            <Bell size={14} />
                          </div>

                          <div>
                            <strong>
                              {notification.title}
                            </strong>

                            <span>
                              {notification.message}
                            </span>

                            <small>
                              {notification.time}
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

            <div className="dashboard-header-dropdown">
              <button
                type="button"
                className="dashboard-profile-button"
                onClick={() =>
                  setShowProfile(
                    (previous) => !previous
                  )
                }
              >
                <div className="dashboard-profile-avatar">
                  {user.name?.charAt(0)?.toUpperCase() ||
                    "J"}
                </div>

                <div>
                  <strong>{user.name}</strong>
                  <span>{user.role || "Employee"}</span>
                </div>

                <ChevronDown size={14} />
              </button>

              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    className="dashboard-dropdown-panel dashboard-profile-dropdown"
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
                    <div className="dashboard-profile-dropdown-user">
                      <div className="dashboard-profile-avatar large">
                        {user.name
                          ?.charAt(0)
                          ?.toUpperCase() || "J"}
                      </div>

                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleNavigation("Profile")
                      }
                    >
                      <User size={15} />
                      Profile
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleNavigation("Settings")
                      }
                    >
                      <Settings size={15} />
                      Settings
                    </button>

                    <button
                      type="button"
                      className="dashboard-dropdown-danger"
                      onClick={handleLogout}
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* ===================================================
            CONTENT
            =================================================== */}

        <motion.div
          className="dashboard-content employee-dashboard-content"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          {/* =================================================
              WELCOME
              ================================================= */}

          <motion.section
            className="employee-dashboard-welcome dashboard-card"
            variants={itemVariants}
          >
            <div className="employee-dashboard-welcome-content">
              <div>
                <span className="employee-dashboard-eyebrow">
                  PERSONALIZED WORKSPACE
                </span>

                <h2>
                  Good Morning,{" "}
                  <span>
                    {user.name?.split(" ")[0] ||
                      "Jasleen"}
                  </span>{" "}
                  👋
                </h2>

                <p>
                  Here's your personalized SOP &
                  compliance overview. Stay informed,
                  complete your actions, and get instant
                  answers with AI.
                </p>
              </div>

              <div className="employee-dashboard-welcome-icon">
                <BrainCircuit size={34} />
              </div>
            </div>
          </motion.section>

          {/* =================================================
              GLOBAL SEARCH
              ================================================= */}

          <motion.section
            className="employee-dashboard-search-section"
            variants={itemVariants}
          >
            <div className="employee-dashboard-global-search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search SOPs, documents, policies or ask AI..."
                value={searchQuery}
                onChange={handleGlobalSearch}
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={16} />
                </button>
              )}

              <kbd>⌘ K</kbd>
            </div>
          </motion.section>

          {/* =================================================
              QUICK ACTIONS
              ================================================= */}

          <motion.section
            className="employee-dashboard-quick-section"
            variants={itemVariants}
          >
            <div className="dashboard-section-heading">
              <div>
                <span>GET STARTED</span>
                <h3>Quick Actions</h3>
              </div>
            </div>

            <div className="employee-dashboard-quick-grid">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <motion.button
                    type="button"
                    className="employee-dashboard-quick-card"
                    key={action.title}
                    whileHover={{
                      y: -3,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() =>
                      handleQuickAction(action.action)
                    }
                  >
                    <div className="employee-dashboard-quick-icon">
                      <Icon size={19} />
                    </div>

                    <div>
                      <strong>{action.title}</strong>
                      <span>{action.description}</span>
                    </div>

                    <ArrowRight size={16} />
                  </motion.button>
                );
              })}
            </div>
          </motion.section>

          {/* =================================================
              KPI
              ================================================= */}

          <motion.section
            className="employee-dashboard-kpi-grid"
            variants={itemVariants}
          >
            {kpis.map((kpi) => {
              const Icon = kpi.icon;

              return (
                <motion.div
                  className="dashboard-stat-card employee-dashboard-stat-card"
                  key={kpi.label}
                  whileHover={{
                    y: -3,
                  }}
                >
                  <div className="dashboard-stat-card-top">
                    <div className="dashboard-stat-icon">
                      <Icon size={19} />
                    </div>

                    <span className="dashboard-stat-trend">
                      {kpi.trend}
                    </span>
                  </div>

                  <strong className="dashboard-stat-value">
                    {kpi.value}
                  </strong>

                  <span className="dashboard-stat-label">
                    {kpi.label}
                  </span>

                  <small className="dashboard-stat-description">
                    {kpi.description}
                  </small>
                </motion.div>
              );
            })}
          </motion.section>

          {/* =================================================
              AI ASSISTANT + MY ACTIONS
              ================================================= */}

          <motion.section
            className="employee-dashboard-two-column"
            variants={itemVariants}
          >
            {/* AI ASSISTANT */}

            <div
              id="employee-ai-assistant"
              className="dashboard-card employee-dashboard-ai-card"
            >
              <div className="dashboard-card-heading">
                <div className="dashboard-card-heading-icon ai">
                  <Bot size={19} />
                </div>

                <div>
                  <span>INTELLIGENT KNOWLEDGE</span>
                  <h3>AI Knowledge Assistant</h3>
                </div>

                <Sparkles
                  size={17}
                  className="dashboard-card-heading-spark"
                />
              </div>

              <p className="employee-dashboard-ai-description">
                Ask questions about your company's SOPs,
                policies and processes.
              </p>

              <div className="employee-dashboard-ai-input">
                <input
                  type="text"
                  placeholder="What would you like to know?"
                  value={aiQuery}
                  onChange={(event) =>
                    setAiQuery(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleAiSearch();
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={handleAiSearch}
                >
                  <Search size={17} />
                </button>
              </div>

              <div className="employee-dashboard-suggestions">
                <span>Suggested</span>

                {[
                  "Explain an SOP",
                  "Find a Process",
                  "Compare SOPs",
                  "Show Escalation Matrix",
                ].map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => {
                      setAiQuery(suggestion);
                      setShowAiResponse(true);
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {showAiResponse && (
                  <motion.div
                    className="employee-dashboard-ai-response"
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                  >
                    <div className="employee-dashboard-ai-response-icon">
                      <Bot size={16} />
                    </div>

                    <div>
                      <strong>AI Preview</strong>

                      <p>
                        Based on the available enterprise
                        knowledge, I would retrieve the
                        relevant SOPs and provide a
                        step-by-step answer here.
                      </p>

                      <small>
                        Mock response — backend integration
                        pending.
                      </small>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* MY ACTIONS */}

            <div className="dashboard-card">
              <div className="dashboard-card-heading simple">
                <div>
                  <span>YOUR WORK</span>
                  <h3>My Actions</h3>
                </div>

                <button
                  type="button"
                  className="dashboard-text-button"
                  onClick={() =>
                    setActiveMenu("My Actions")
                  }
                >
                  View All
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="employee-dashboard-actions-list">
                {myActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <motion.button
                      type="button"
                      className="employee-dashboard-action-item"
                      key={action.id}
                      whileHover={{
                        x: 2,
                      }}
                      onClick={() =>
                        setSelectedAction(action)
                      }
                    >
                      <div
                        className={`employee-dashboard-action-icon ${action.status}`}
                      >
                        <Icon size={16} />
                      </div>

                      <div>
                        <span>{action.type}</span>
                        <strong>{action.title}</strong>
                      </div>

                      <small className={action.status}>
                        {action.due}
                      </small>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.section>

          {/* =================================================
              MY SOPS
              ================================================= */}

          <motion.section
            id="employee-my-sops"
            className="dashboard-card"
            variants={itemVariants}
          >
            <div className="dashboard-card-heading simple">
              <div>
                <span>KNOWLEDGE LIBRARY</span>
                <h3>My SOPs</h3>
              </div>

              <button
                type="button"
                className="dashboard-text-button"
                onClick={() =>
                  setActiveMenu("My SOPs")
                }
              >
                View All
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="employee-dashboard-sop-grid">
              {filteredSops.map((sop) => (
                <motion.div
                  className="employee-dashboard-sop-card"
                  key={sop.id}
                  whileHover={{
                    y: -3,
                  }}
                >
                  <div className="employee-dashboard-sop-top">
                    <div className="employee-dashboard-sop-file">
                      <FileText size={18} />
                    </div>

                    <button
                      type="button"
                      className="employee-dashboard-more-button"
                    >
                      <MoreHorizontal size={17} />
                    </button>
                  </div>

                  <h4>{sop.title}</h4>

                  <div className="employee-dashboard-sop-meta">
                    <span>{sop.version}</span>
                    <span>•</span>
                    <span
                      className={`dashboard-status ${
                        sop.status === "Approved"
                          ? "success"
                          : "warning"
                      }`}
                    >
                      {sop.status}
                    </span>
                  </div>

                  <div className="employee-dashboard-sop-details">
                    <span>Updated {sop.updated}</span>
                    <span>{sop.owner}</span>
                    <span>{sop.pages}</span>
                  </div>

                  <button
                    type="button"
                    className="employee-dashboard-sop-view"
                    onClick={() => setSelectedSop(sop)}
                  >
                    View SOP
                    <ArrowRight size={14} />
                  </button>
                </motion.div>
              ))}
            </div>

            {filteredSops.length === 0 && (
              <div className="employee-dashboard-empty">
                <Search size={24} />
                <strong>No SOPs found</strong>
                <span>
                  Try searching with another keyword.
                </span>
              </div>
            )}
          </motion.section>

          {/* =================================================
              AI GENERATOR + DOCUMENT INTELLIGENCE
              ================================================= */}

          <motion.section
            className="employee-dashboard-two-column"
            variants={itemVariants}
          >
            {/* AI GENERATOR */}

            <div
              id="employee-ai-generator"
              className="dashboard-card"
            >
              <div className="dashboard-card-heading simple">
                <div>
                  <span>CREATE WITH AI</span>
                  <h3>AI SOP Generation</h3>
                </div>

                <Sparkles size={18} />
              </div>

              <p className="employee-dashboard-card-description">
                Turn your process knowledge into a
                structured SOP.
              </p>

              <button
                type="button"
                className="employee-dashboard-primary-button"
                onClick={() =>
                  setActiveMenu("Generate SOP")
                }
              >
                <Sparkles size={16} />
                Start New SOP
                <ArrowRight size={15} />
              </button>

              <div className="employee-dashboard-generated-list">
                <div className="employee-dashboard-subheading">
                  Recently Generated
                </div>

                {generatedSops.map((sop) => (
                  <div
                    className="employee-dashboard-generated-item"
                    key={sop.title}
                  >
                    <div>
                      <FileText size={15} />

                      <div>
                        <strong>{sop.title}</strong>
                        <span>{sop.date}</span>
                      </div>
                    </div>

                    <span className="employee-dashboard-generated-status">
                      {sop.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* DOCUMENT INTELLIGENCE */}

            <div
              id="employee-document-intelligence"
              className="dashboard-card"
            >
              <div className="dashboard-card-heading simple">
                <div>
                  <span>AI DOCUMENT PROCESSING</span>
                  <h3>Document Intelligence</h3>
                </div>

                <FileSearch size={18} />
              </div>

              <p className="employee-dashboard-card-description">
                Upload a document and let AI analyze it.
              </p>

              <button
                type="button"
                className="employee-dashboard-upload-area"
                onClick={() =>
                  setActiveMenu("Upload")
                }
              >
                <div>
                  <Upload size={23} />
                </div>

                <strong>Upload a document</strong>

                <span>
                  Drag & Drop or click to upload
                </span>

                <small>PDF • DOCX • XLSX</small>
              </button>

              <div className="employee-dashboard-ai-tools">
                <span>OCR</span>
                <span>Summarize</span>
                <span>Extract Steps</span>
                <span>Classify</span>
                <span>Detect Issues</span>
              </div>
            </div>
          </motion.section>

          {/* =================================================
              SOP COMPARISON + TRAINING
              ================================================= */}

          <motion.section
            className="employee-dashboard-two-column"
            variants={itemVariants}
          >
            {/* COMPARISON */}

            <div className="dashboard-card">
              <div className="dashboard-card-heading simple">
                <div>
                  <span>VERSION CONTROL</span>
                  <h3>Compare SOP Versions</h3>
                </div>

                <FileSearch size={18} />
              </div>

              <p className="employee-dashboard-card-description">
                Compare two SOP versions and identify
                changes with AI.
              </p>

              <div className="employee-dashboard-comparison">
                <button type="button">
                  SOP v2.0
                  <ChevronDown size={14} />
                </button>

                <ArrowRight size={17} />

                <button type="button">
                  SOP v3.0
                  <ChevronDown size={14} />
                </button>
              </div>

              <button
                type="button"
                className="employee-dashboard-primary-button"
                onClick={() =>
                  setActiveMenu("Compare SOPs")
                }
              >
                <FileSearch size={16} />
                Compare Versions
              </button>

              <div className="employee-dashboard-comparison-legend">
                <span className="added">
                  <i /> Added
                </span>

                <span className="removed">
                  <i /> Removed
                </span>

                <span className="modified">
                  <i /> Modified
                </span>
              </div>
            </div>

            {/* TRAINING */}

            <div className="dashboard-card">
              <div className="dashboard-card-heading simple">
                <div>
                  <span>LEARNING CENTER</span>
                  <h3>Training & Learning</h3>
                </div>

                <button
                  type="button"
                  className="dashboard-text-button"
                  onClick={() =>
                    setActiveMenu("Training")
                  }
                >
                  View All
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="employee-dashboard-training-list">
                {trainingCourses.map((course) => (
                  <div
                    className="employee-dashboard-training-item"
                    key={course.title}
                  >
                    <div className="employee-dashboard-training-header">
                      <div>
                        <strong>{course.title}</strong>
                        <span>{course.status}</span>
                      </div>

                      <b>{course.progress}%</b>
                    </div>

                    <div className="employee-dashboard-progress">
                      <span
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="employee-dashboard-training-footer">
                <span>2 courses pending</span>

                <button
                  type="button"
                  onClick={() =>
                    setActiveMenu("Training")
                  }
                >
                  Continue Learning
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.section>

          {/* =================================================
              COMPLIANCE + RECOMMENDATIONS
              ================================================= */}

          <motion.section
            className="employee-dashboard-two-column"
            variants={itemVariants}
          >
            {/* COMPLIANCE */}

            <div className="dashboard-card employee-dashboard-compliance-card">
              <div className="dashboard-card-heading simple">
                <div>
                  <span>YOUR STATUS</span>
                  <h3>Compliance</h3>
                </div>

                <ShieldCheck size={18} />
              </div>

              <div className="employee-dashboard-compliance-score">
                <div className="employee-dashboard-score-circle">
                  <strong>94%</strong>
                  <span>Compliance</span>
                </div>

                <div className="employee-dashboard-compliance-bars">
                  {complianceData.map((item) => (
                    <div
                      className="employee-dashboard-compliance-item"
                      key={item.label}
                    >
                      <div>
                        <span>{item.label}</span>
                        <b>{item.value}%</b>
                      </div>

                      <div className="employee-dashboard-progress">
                        <span
                          style={{
                            width: `${item.value}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="employee-dashboard-secondary-button"
                onClick={() =>
                  setActiveMenu(
                    "Compliance Details"
                  )
                }
              >
                View Compliance Details
                <ArrowRight size={14} />
              </button>
            </div>

            {/* RECOMMENDATIONS */}

            <div className="dashboard-card">
              <div className="dashboard-card-heading simple">
                <div>
                  <span>PERSONALIZED INSIGHTS</span>
                  <h3>AI Recommendations</h3>
                </div>

                <Sparkles size={18} />
              </div>

              <div className="employee-dashboard-recommendations">
                {recommendations.map(
                  (recommendation) => {
                    const Icon = recommendation.icon;

                    return (
                      <motion.button
                        type="button"
                        className="employee-dashboard-recommendation"
                        key={recommendation.id}
                        whileHover={{
                          y: -2,
                        }}
                        onClick={() =>
                          setSelectedRecommendation(
                            recommendation
                          )
                        }
                      >
                        <div className="employee-dashboard-recommendation-icon">
                          <Icon size={18} />
                        </div>

                        <div>
                          <span>
                            {recommendation.title}
                          </span>

                          <strong>
                            {recommendation.subtitle}
                          </strong>

                          <p>
                            {recommendation.description}
                          </p>

                          <b>
                            {recommendation.action}
                            <ArrowRight size={13} />
                          </b>
                        </div>
                      </motion.button>
                    );
                  }
                )}
              </div>
            </div>
          </motion.section>

          {/* =================================================
              RECENT UPDATES + MY ACTIVITY
              ================================================= */}

          <motion.section
            className="employee-dashboard-two-column"
            variants={itemVariants}
          >
            {/* RECENT UPDATES */}

            <div className="dashboard-card">
              <div className="dashboard-card-heading simple">
                <div>
                  <span>WHAT'S NEW</span>
                  <h3>Recent Updates</h3>
                </div>

                <Bell size={18} />
              </div>

              <div className="employee-dashboard-updates">
                {recentUpdates.map((update) => (
                  <div
                    className="employee-dashboard-update"
                    key={`${update.title}-${update.time}`}
                  >
                    <div className="employee-dashboard-update-dot" />

                    <div>
                      <strong>{update.title}</strong>
                      <span>{update.subtitle}</span>
                    </div>

                    <time>{update.time}</time>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIVITY */}

            <div className="dashboard-card">
              <div className="dashboard-card-heading simple">
                <div>
                  <span>YOUR ACTIVITY</span>
                  <h3>My Activity</h3>
                </div>

                <Activity size={18} />
              </div>

              <div className="employee-dashboard-activity-chart">
                {activityData.map((item) => (
                  <div
                    className="employee-dashboard-chart-column"
                    key={item.label}
                  >
                    <div className="employee-dashboard-chart-value">
                      {item.value}
                    </div>

                    <div className="employee-dashboard-chart-track">
                      <motion.div
                        className="employee-dashboard-chart-bar"
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: `${Math.min(
                            item.value * 2,
                            100
                          )}%`,
                        }}
                        transition={{
                          duration: 0.7,
                          ease: "easeOut",
                        }}
                      />
                    </div>

                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* =================================================
              FOOTER
              ================================================= */}

          <motion.footer
            className="employee-dashboard-footer"
            variants={itemVariants}
          >
            <div>
              <strong>SOP Intelligence</strong>
              <span>
                Employee Knowledge & Compliance Portal
              </span>
            </div>

            <span>
              © 2026 Enterprise Knowledge Platform
            </span>
          </motion.footer>
        </motion.div>
      </main>

      {/* =====================================================
          MOBILE MENU
          ===================================================== */}

      {!sidebarOpen && (
        <button
          type="button"
          className="employee-dashboard-mobile-menu"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      )}

      {/* =====================================================
          SOP MODAL
          ===================================================== */}

      <AnimatePresence>
        {selectedSop && (
          <motion.div
            className="employee-dashboard-modal-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setSelectedSop(null)}
          >
            <motion.div
              className="employee-dashboard-modal"
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 12,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 12,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <button
                type="button"
                className="employee-dashboard-modal-close"
                onClick={() => setSelectedSop(null)}
              >
                <X size={18} />
              </button>

              <div className="employee-dashboard-modal-icon">
                <FileText size={22} />
              </div>

              <span className="employee-dashboard-modal-label">
                SOP DOCUMENT
              </span>

              <h3>{selectedSop.title}</h3>

              <p>
                {selectedSop.version} •{" "}
                {selectedSop.status}
              </p>

              <div className="employee-dashboard-modal-details">
                <span>
                  Updated {selectedSop.updated}
                </span>

                <span>
                  Owner: {selectedSop.owner}
                </span>

                <span>{selectedSop.pages}</span>
              </div>

              <button
                type="button"
                className="employee-dashboard-primary-button"
                onClick={() => setSelectedSop(null)}
              >
                Open SOP
                <ArrowRight size={15} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          ACTION MODAL
          ===================================================== */}

      <AnimatePresence>
        {selectedAction && (
          <motion.div
            className="employee-dashboard-modal-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setSelectedAction(null)}
          >
            <motion.div
              className="employee-dashboard-modal"
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <button
                type="button"
                className="employee-dashboard-modal-close"
                onClick={() => setSelectedAction(null)}
              >
                <X size={18} />
              </button>

              <div className="employee-dashboard-modal-icon">
                <CheckCircle2 size={22} />
              </div>

              <span className="employee-dashboard-modal-label">
                ACTION
              </span>

              <h3>{selectedAction.type}</h3>

              <p>{selectedAction.title}</p>

              <div className="employee-dashboard-modal-details">
                <span>
                  Status: {selectedAction.status}
                </span>

                <span>
                  {selectedAction.due}
                </span>
              </div>

              <button
                type="button"
                className="employee-dashboard-primary-button"
                onClick={() => setSelectedAction(null)}
              >
                Continue
                <ArrowRight size={15} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          RECOMMENDATION MODAL
          ===================================================== */}

      <AnimatePresence>
        {selectedRecommendation && (
          <motion.div
            className="employee-dashboard-modal-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setSelectedRecommendation(null)
            }
          >
            <motion.div
              className="employee-dashboard-modal"
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <button
                type="button"
                className="employee-dashboard-modal-close"
                onClick={() =>
                  setSelectedRecommendation(null)
                }
              >
                <X size={18} />
              </button>

              <div className="employee-dashboard-modal-icon">
                <Sparkles size={22} />
              </div>

              <span className="employee-dashboard-modal-label">
                AI RECOMMENDATION
              </span>

              <h3>
                {selectedRecommendation.title}
              </h3>

              <p>
                {selectedRecommendation.description}
              </p>

              <button
                type="button"
                className="employee-dashboard-primary-button"
                onClick={() =>
                  setSelectedRecommendation(null)
                }
              >
                {selectedRecommendation.action}
                <ArrowRight size={15} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployeeDashboard;