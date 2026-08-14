import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaBars,
    FaBell,
    FaBookOpen,
    FaBrain,
    FaChartLine,
    FaCheckCircle,
    FaChevronRight,
    FaClock,
    FaCloudUploadAlt,
    FaCog,
    FaComments,
    FaExchangeAlt,
    FaFileAlt,
    FaGraduationCap,
    FaHome,
    FaInfoCircle,
    FaLightbulb,
    FaLock,
    FaQuestionCircle,
    FaRobot,
    FaSearch,
    FaShieldAlt,
    FaSignOutAlt,
    FaTasks,
    FaTimes,
    FaUpload,
    FaUser,
    FaUsers,
    FaMagic,
} from "react-icons/fa";

import "./dashboard.css";
import "./EmployeeDashboard.css";


/* =========================================================
   MOCK DATA
   Replace this with API/database data later
   ========================================================= */

const employeeData = {
    name: "Jasleen Kaur",
    role: "Employee",
    email: "jasleen@example.com",
};


/* =========================================================
   KPI DATA
   ========================================================= */

const kpiData = [
    {
        label: "My SOPs",
        value: "24",
        change: "+3 this month",
        changeType: "positive",
        icon: <FaBookOpen />,
        description:
            "Total number of SOPs currently assigned to you or available to you based on your employee access.",
    },

    {
        label: "Actions",
        value: "4",
        change: "2 due today",
        changeType: "warning",
        icon: <FaTasks />,
        description:
            "Tasks, approvals, acknowledgements and other actions currently requiring your attention.",
    },

    {
        label: "Training",
        value: "82%",
        change: "+8% this month",
        changeType: "positive",
        icon: <FaGraduationCap />,
        description:
            "Your overall training completion percentage across assigned learning and certification activities.",
    },

    {
        label: "Compliance",
        value: "94%",
        change: "+2.4%",
        changeType: "positive",
        icon: <FaShieldAlt />,
        description:
            "Your current compliance score based on SOP acknowledgements, required training and assigned compliance activities.",
    },

    {
        label: "AI Queries",
        value: "37",
        change: "+12 this week",
        changeType: "positive",
        icon: <FaRobot />,
        description:
            "Number of questions you have asked the AI Knowledge Assistant during the current tracking period.",
    },
];


/* =========================================================
   QUICK ACTIONS
   ========================================================= */

const quickActions = [
    {
        title: "Generate SOP",
        description: "Create with AI",
        icon: <FaMagic />,
        info:
            "Use AI to create a structured Standard Operating Procedure from your requirements.",
    },

    {
        title: "Ask AI",
        description: "Ask anything",
        icon: <FaRobot />,
        info:
            "Ask questions about SOPs, policies, documents and enterprise knowledge.",
    },

    {
        title: "Upload Document",
        description: "Analyze file",
        icon: <FaCloudUploadAlt />,
        info:
            "Upload a document for document intelligence, extraction and AI-powered analysis.",
    },

    {
        title: "Find SOP",
        description: "Search library",
        icon: <FaFileAlt />,
        info:
            "Search the organization's SOP library and find procedures relevant to your work.",
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
        type: "info",
    },

    {
        title: "New training assigned",
        subtitle: "Data Privacy",
        time: "5h ago",
        type: "warning",
    },

    {
        title: "Policy updated",
        subtitle: "Information Security",
        time: "Yesterday",
        type: "success",
    },

    {
        title: "SOP acknowledgement completed",
        subtitle: "Email Handling",
        time: "Yesterday",
        type: "success",
    },
];


/* =========================================================
   RECOMMENDATIONS
   ========================================================= */

const recommendations = [
    {
        title: "SOP Updated",
        item: "Distributor Onboarding v3.2",
        description:
            "This SOP was recently updated and affects your assigned process.",
        action: "Review Now",
        icon: <FaFileAlt />,
        info:
            "AI recommendations highlight important changes and activities that may require your attention.",
    },

    {
        title: "Training Recommended",
        item: "Data Privacy Certification",
        description:
            "Your certification expires in 14 days.",
        action: "Start Training",
        icon: <FaGraduationCap />,
        info:
            "Training recommendations are based on your assigned learning requirements and upcoming deadlines.",
    },
];


/* =========================================================
   ACTIVITY
   ========================================================= */

const activityData = [
    {
        label: "SOPs Created",
        value: "8",
        icon: <FaFileAlt />,
    },

    {
        label: "SOPs Viewed",
        value: "42",
        icon: <FaBookOpen />,
    },

    {
        label: "AI Questions",
        value: "37",
        icon: <FaComments />,
    },

    {
        label: "Training",
        value: "15",
        icon: <FaGraduationCap />,
    },

    {
        label: "Documents",
        value: "9",
        icon: <FaFileAlt />,
    },
];


/* =========================================================
   SIDEBAR ITEMS
   ========================================================= */

const sidebarItems = [
    {
        label: "Dashboard",
        icon: <FaHome />,
        path: "/dashboard",
    },

    {
        label: "SOPs",
        icon: <FaBookOpen />,
        children: [
            "All SOPs",
            "My SOPs",
            "Generate SOP",
            "Drafts",
        ],
    },

    {
        label: "AI Assistant",
        icon: <FaRobot />,
        path: "/ai-assistant",
    },

    {
        label: "Documents",
        icon: <FaFileAlt />,
        children: [
            "Upload",
            "AI Analysis",
        ],
    },

    {
        label: "Training",
        icon: <FaGraduationCap />,
        path: "/training",
    },

    {
        label: "Compliance",
        icon: <FaShieldAlt />,
        path: "/compliance",
    },

    {
        label: "Notifications",
        icon: <FaBell />,
        path: "/notifications",
    },

    {
        label: "My Analytics",
        icon: <FaChartLine />,
        path: "/analytics",
    },
];


/* =========================================================
   COMPONENT
   ========================================================= */

export default function EmployeeDashboard() {

    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] =
        useState(false);

    const [searchQuery, setSearchQuery] =
        useState("");

    const [notificationsOpen, setNotificationsOpen] =
        useState(false);


    /* =====================================================
       USER
       ===================================================== */

    const user = useMemo(() => {

        try {

            const storedUser =
                localStorage.getItem("user");

            if (storedUser) {

                return {
                    ...employeeData,
                    ...JSON.parse(storedUser),
                };

            }

        } catch (error) {

            console.error(
                "Unable to read user data:",
                error
            );

        }

        return employeeData;

    }, []);


    /* =====================================================
       GREETING
       ===================================================== */

    const greeting = useMemo(() => {

        const hour =
            new Date().getHours();

        if (hour < 12) {
            return "Good Morning";
        }

        if (hour < 17) {
            return "Good Afternoon";
        }

        return "Good Evening";

    }, []);


    /* =====================================================
       NAVIGATION
       ===================================================== */

    const handleNavigation = (path) => {

        if (!path) {
            return;
        }

        setMobileMenuOpen(false);

        navigate(path);

    };


    /* =====================================================
       LOGOUT
       ===================================================== */

    const handleLogout = () => {

        localStorage.removeItem("user");

        localStorage.removeItem("userRole");

        navigate("/login");

    };


    /* =====================================================
       SEARCH
       ===================================================== */

    const handleSearch = (e) => {

        e.preventDefault();

        if (!searchQuery.trim()) {
            return;
        }

        console.log(
            "Dashboard search:",
            searchQuery
        );

        /*
         * Later:
         * connect this to global SOP / AI search.
         */

    };


    return (

        <div className="dashboard-page employee-dashboard-page">


            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div
                className="dashboard-background"
                aria-hidden="true"
            >

                <div
                    className="dashboard-background-orb dashboard-background-orb-one"
                />

                <div
                    className="dashboard-background-orb dashboard-background-orb-two"
                />

                <div
                    className="dashboard-background-grid"
                />

            </div>


            {/* =================================================
                MOBILE OVERLAY
            ================================================= */}

            <div
                className={`dashboard-overlay ${
                    mobileMenuOpen
                        ? "visible"
                        : ""
                }`}
                onClick={() =>
                    setMobileMenuOpen(false)
                }
            />


            <div className="dashboard-layout">


                {/* =================================================
                    SIDEBAR
                ================================================= */}

                <aside
                    className={`dashboard-sidebar ${
                        mobileMenuOpen
                            ? "mobile-open"
                            : ""
                    }`}
                >


                    {/* BRAND */}

                    <div className="dashboard-brand">

                        <div className="dashboard-brand-logo">
                            AI
                        </div>

                        <div className="dashboard-brand-content">

                            <strong>
                                SOP Intelligence
                            </strong>

                            <span>
                                Employee Portal
                            </span>

                        </div>

                        <button
                            type="button"
                            className="employee-sidebar-close"
                            onClick={() =>
                                setMobileMenuOpen(false)
                            }
                            aria-label="Close menu"
                        >
                            <FaTimes />
                        </button>

                    </div>


                    {/* NAVIGATION */}

                    <nav className="dashboard-nav">


                        <div className="dashboard-nav-label">
                            WORKSPACE
                        </div>


                        {sidebarItems.map(
                            (item, index) => (

                                <div
                                    key={item.label}
                                    className="employee-nav-group"
                                >

                                    <button
                                        type="button"
                                        className={`dashboard-nav-item ${
                                            index === 0
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() => {

                                            if (
                                                item.path
                                            ) {
                                                handleNavigation(
                                                    item.path
                                                );
                                            }

                                        }}
                                    >

                                        <span className="dashboard-nav-icon">
                                            {item.icon}
                                        </span>

                                        <span className="dashboard-nav-text">
                                            {item.label}
                                        </span>

                                        {item.children && (
                                            <span className="employee-nav-arrow">
                                                <FaChevronRight />
                                            </span>
                                        )}

                                    </button>


                                    {item.children && (

                                        <div className="employee-nav-submenu">

                                            {item.children.map(
                                                (child) => (

                                                    <button
                                                        key={child}
                                                        type="button"
                                                        className="employee-nav-subitem"
                                                        onClick={() =>
                                                            console.log(
                                                                child
                                                            )
                                                        }
                                                    >
                                                        {child}
                                                    </button>

                                                )
                                            )}

                                        </div>

                                    )}

                                </div>

                            )
                        )}

                    </nav>


                    {/* SIDEBAR FOOTER */}

                    <div className="dashboard-sidebar-footer">

                        <button
                            type="button"
                            className="dashboard-nav-item"
                            onClick={() =>
                                console.log(
                                    "Settings"
                                )
                            }
                        >

                            <span className="dashboard-nav-icon">
                                <FaCog />
                            </span>

                            <span className="dashboard-nav-text">
                                Settings
                            </span>

                        </button>


                        <button
                            type="button"
                            className="dashboard-nav-item"
                            onClick={() =>
                                console.log(
                                    "Help"
                                )
                            }
                        >

                            <span className="dashboard-nav-icon">
                                <FaQuestionCircle />
                            </span>

                            <span className="dashboard-nav-text">
                                Help & Support
                            </span>

                        </button>


                        {/* USER */}

                        <div className="dashboard-user">

                            <div className="dashboard-user-avatar">
                                {user.name
                                    ?.charAt(0)
                                    ?.toUpperCase() || "U"}
                            </div>

                            <div className="dashboard-user-info">

                                <span className="dashboard-user-name">
                                    {user.name}
                                </span>

                                <span className="dashboard-user-role">
                                    {user.role}
                                </span>

                            </div>

                            <button
                                type="button"
                                className="employee-logout-button"
                                onClick={
                                    handleLogout
                                }
                                title="Sign out"
                                aria-label="Sign out"
                            >
                                <FaSignOutAlt />
                            </button>

                        </div>

                    </div>

                </aside>


                {/* =================================================
                    MAIN
                ================================================= */}

                <main className="dashboard-main">


                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <header className="dashboard-header">


                        <div className="dashboard-header-left">


                            <button
                                type="button"
                                className="dashboard-mobile-menu"
                                onClick={() =>
                                    setMobileMenuOpen(
                                        true
                                    )
                                }
                                aria-label="Open menu"
                            >
                                <FaBars />
                            </button>


                            <div className="dashboard-page-title">

                                <span className="employee-header-eyebrow">
                                    EMPLOYEE WORKSPACE
                                </span>

                                <h1>
                                    Dashboard
                                </h1>

                            </div>

                        </div>


                        {/* HEADER ACTIONS */}

                        <div className="dashboard-header-actions">


                            <div className="employee-notification-wrapper">

                                <button
                                    type="button"
                                    className="dashboard-header-action"
                                    onClick={() =>
                                        setNotificationsOpen(
                                            !notificationsOpen
                                        )
                                    }
                                    title="Notifications"
                                    aria-label="Notifications"
                                >

                                    <FaBell />

                                    <span className="dashboard-notification-dot" />

                                </button>


                                {notificationsOpen && (

                                    <div className="employee-notification-panel">

                                        <div className="employee-notification-header">

                                            <strong>
                                                Notifications
                                            </strong>

                                            <span>
                                                4 new
                                            </span>

                                        </div>


                                        {recentUpdates
                                            .slice(0, 3)
                                            .map(
                                                (
                                                    notification
                                                ) => (

                                                    <div
                                                        key={
                                                            notification.title
                                                        }
                                                        className="employee-notification-item"
                                                    >

                                                        <span className="employee-notification-icon">
                                                            <FaBell />
                                                        </span>

                                                        <div>

                                                            <strong>
                                                                {
                                                                    notification.title
                                                                }
                                                            </strong>

                                                            <span>
                                                                {
                                                                    notification.time
                                                                }
                                                            </span>

                                                        </div>

                                                    </div>

                                                )
                                            )}

                                    </div>

                                )}

                            </div>


                            {/* PROFILE */}

                            <button
                                type="button"
                                className="employee-header-profile"
                                onClick={() =>
                                    console.log(
                                        "Profile"
                                    )
                                }
                            >

                                <span className="employee-header-avatar">
                                    {user.name
                                        ?.charAt(0)
                                        ?.toUpperCase() ||
                                        "U"}
                                </span>

                                <span className="employee-header-profile-info">

                                    <strong>
                                        {user.name}
                                    </strong>

                                    <small>
                                        {user.role}
                                    </small>

                                </span>

                                <span>
                                    <FaChevronRight />
                                </span>

                            </button>

                        </div>

                    </header>


                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="dashboard-content">


                        {/* =================================================
                            WELCOME
                        ================================================= */}

                        <section className="dashboard-section">

                            <div className="employee-welcome-card dashboard-card">


                                <div className="employee-welcome-content">

                                    <span className="employee-section-eyebrow">
                                        PERSONALIZED WORKSPACE
                                    </span>

                                    <h2>

                                        {greeting},{" "}

                                        <span>
                                            {user.name}
                                        </span>

                                        <span className="employee-wave">
                                            👋
                                        </span>

                                    </h2>

                                    <p>
                                        Here's your personalized
                                        SOP and compliance overview.
                                        Stay informed, complete your
                                        actions, and get instant
                                        answers with AI.
                                    </p>

                                </div>


                                <div
                                    className="employee-welcome-icon"
                                    title="Your AI-powered enterprise workspace"
                                >
                                    <FaBrain />
                                </div>

                            </div>

                        </section>


                        {/* =================================================
                            SEARCH
                        ================================================= */}

                        <section className="dashboard-section">

                            <form
                                className="employee-search-wrapper"
                                onSubmit={
                                    handleSearch
                                }
                            >

                                <div className="dashboard-search">

                                    <FaSearch className="employee-search-icon" />

                                    <input
                                        type="text"
                                        value={
                                            searchQuery
                                        }
                                        onChange={(e) =>
                                            setSearchQuery(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Search SOPs, documents, policies or ask AI..."
                                        aria-label="Search SOPs, documents, policies or ask AI"
                                    />

                                    <span className="employee-search-shortcut">
                                        ⌘ K
                                    </span>

                                </div>

                            </form>

                        </section>


                        {/* =================================================
                            QUICK ACTIONS
                        ================================================= */}

                        <section className="dashboard-section">


                            <div className="dashboard-section-header">

                                <div className="dashboard-section-heading">

                                    <span className="employee-section-eyebrow">
                                        GET STARTED
                                    </span>

                                    <h2>
                                        Quick Actions
                                    </h2>

                                </div>

                            </div>


                            <div className="employee-quick-actions-grid">

                                {quickActions.map(
                                    (action) => (

                                        <button
                                            type="button"
                                            key={
                                                action.title
                                            }
                                            className="employee-quick-action dashboard-card"
                                            title={
                                                action.info
                                            }
                                            onClick={() =>
                                                console.log(
                                                    action.title
                                                )
                                            }
                                        >

                                            <span className="employee-action-icon">
                                                {
                                                    action.icon
                                                }
                                            </span>

                                            <span className="employee-action-content">

                                                <strong>
                                                    {
                                                        action.title
                                                    }
                                                </strong>

                                                <small>
                                                    {
                                                        action.description
                                                    }
                                                </small>

                                            </span>

                                            <span className="employee-info-icon">
                                                <FaInfoCircle />
                                            </span>

                                            <FaChevronRight className="employee-action-arrow" />

                                        </button>

                                    )
                                )}

                            </div>

                        </section>


                        {/* =================================================
                            KPI
                        ================================================= */}

                        <section className="dashboard-section">


                            <div className="dashboard-stats-grid">

                                {kpiData.map(
                                    (kpi) => (

                                        <div
                                            key={
                                                kpi.label
                                            }
                                            className="dashboard-card dashboard-stat-card employee-kpi-card"
                                            title={
                                                kpi.description
                                            }
                                        >

                                            <div className="dashboard-stat-header">

                                                <div className="dashboard-stat-icon">
                                                    {
                                                        kpi.icon
                                                    }
                                                </div>

                                                <span
                                                    className="employee-kpi-info"
                                                    title={
                                                        kpi.description
                                                    }
                                                >
                                                    <FaInfoCircle />
                                                </span>

                                            </div>

                                            <div className="dashboard-stat-label">
                                                {
                                                    kpi.label
                                                }
                                            </div>

                                            <div className="dashboard-stat-value">
                                                {
                                                    kpi.value
                                                }
                                            </div>

                                            <div
                                                className={`dashboard-stat-change ${kpi.changeType}`}
                                            >

                                                {
                                                    kpi.change
                                                }

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </section>


                        {/* =================================================
                            AI ASSISTANT + MY ACTIONS
                        ================================================= */}

                        <section className="dashboard-section">


                            <div className="dashboard-grid">


                                {/* AI ASSISTANT */}

                                <div className="dashboard-grid-two-third">

                                    <div
                                        className="dashboard-card employee-ai-card"
                                        title="AI Knowledge Assistant helps you search and understand enterprise knowledge using natural language."
                                    >

                                        <div className="employee-card-header">

                                            <div>

                                                <span className="employee-section-eyebrow">
                                                    INTELLIGENT KNOWLEDGE
                                                </span>

                                                <h2>
                                                    <FaRobot />
                                                    AI Knowledge Assistant
                                                </h2>

                                            </div>

                                            <span
                                                className="employee-info-icon large"
                                                title="Ask questions about SOPs, policies, documents and enterprise knowledge."
                                            >
                                                <FaInfoCircle />
                                            </span>

                                        </div>


                                        <div className="employee-ai-content">

                                            <div className="employee-ai-icon">
                                                <FaBrain />
                                            </div>

                                            <div>

                                                <h3>
                                                    Ask anything about your workplace knowledge
                                                </h3>

                                                <p>
                                                    Search SOPs,
                                                    understand
                                                    policies,
                                                    summarize
                                                    documents and
                                                    get intelligent
                                                    answers from
                                                    your enterprise
                                                    knowledge base.
                                                </p>

                                                <button
                                                    type="button"
                                                    className="dashboard-button dashboard-button-primary"
                                                    onClick={() =>
                                                        handleNavigation(
                                                            "/ai-assistant"
                                                        )
                                                    }
                                                >

                                                    Ask AI

                                                    <FaChevronRight />

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* MY ACTIONS */}

                                <div className="dashboard-grid-half">

                                    <div
                                        className="dashboard-card employee-actions-card"
                                        title="Shows tasks and activities that currently require your attention."
                                    >

                                        <div className="employee-card-header">

                                            <div>

                                                <span className="employee-section-eyebrow">
                                                    YOUR WORK
                                                </span>

                                                <h2>
                                                    My Actions
                                                </h2>

                                            </div>

                                            <span
                                                className="employee-info-icon large"
                                                title="Tasks, acknowledgements, approvals and activities assigned to you."
                                            >
                                                <FaInfoCircle />
                                            </span>

                                        </div>


                                        <div className="employee-action-list">


                                            <div className="employee-action-row">

                                                <span className="employee-action-status warning">
                                                    <FaClock />
                                                </span>

                                                <div>

                                                    <strong>
                                                        Review updated SOP
                                                    </strong>

                                                    <small>
                                                        Due today
                                                    </small>

                                                </div>

                                                <FaChevronRight />

                                            </div>


                                            <div className="employee-action-row">

                                                <span className="employee-action-status info">
                                                    <FaGraduationCap />
                                                </span>

                                                <div>

                                                    <strong>
                                                        Complete training
                                                    </strong>

                                                    <small>
                                                        2 days remaining
                                                    </small>

                                                </div>

                                                <FaChevronRight />

                                            </div>


                                            <div className="employee-action-row">

                                                <span className="employee-action-status success">
                                                    <FaCheckCircle />
                                                </span>

                                                <div>

                                                    <strong>
                                                        SOP acknowledgement
                                                    </strong>

                                                    <small>
                                                        Completed
                                                    </small>

                                                </div>

                                                <FaChevronRight />

                                            </div>

                                        </div>


                                        <button
                                            type="button"
                                            className="employee-view-all"
                                            onClick={() =>
                                                console.log(
                                                    "View all actions"
                                                )
                                            }
                                        >
                                            View All
                                            <FaChevronRight />
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </section>


                        {/* =================================================
                            MY SOPs + FEATURES
                        ================================================= */}

                        <section className="dashboard-section">


                            <div className="dashboard-section-header">

                                <div className="dashboard-section-heading">

                                    <span className="employee-section-eyebrow">
                                        KNOWLEDGE & PRODUCTIVITY
                                    </span>

                                    <h2>
                                        My Workspace
                                    </h2>

                                </div>

                            </div>


                            <div className="employee-feature-grid">


                                {/* MY SOPs */}

                                <div
                                    className="dashboard-card employee-feature-card"
                                    title="View SOPs assigned to you or available through your employee permissions."
                                >

                                    <div className="employee-feature-icon">
                                        <FaBookOpen />
                                    </div>

                                    <div className="employee-feature-title">

                                        <h3>
                                            My SOPs
                                        </h3>

                                        <span
                                            className="employee-info-icon"
                                        >
                                            <FaInfoCircle />
                                        </span>

                                    </div>

                                    <p>
                                        View assigned and
                                        accessible standard
                                        operating procedures.
                                    </p>

                                    <button
                                        type="button"
                                        className="employee-feature-link"
                                    >
                                        View SOPs
                                        <FaChevronRight />
                                    </button>

                                </div>


                                {/* GENERATOR */}

                                <div
                                    className="dashboard-card employee-feature-card"
                                    title="Generate structured SOP drafts using AI."
                                >

                                    <div className="employee-feature-icon">
                                        <FaMagic />
                                    </div>

                                    <div className="employee-feature-title">

                                        <h3>
                                            AI SOP Generator
                                        </h3>

                                        <span
                                            className="employee-info-icon"
                                        >
                                            <FaInfoCircle />
                                        </span>

                                    </div>

                                    <p>
                                        Create structured SOP
                                        drafts faster using
                                        AI-powered generation.
                                    </p>

                                    <button
                                        type="button"
                                        className="employee-feature-link"
                                    >
                                        Generate
                                        <FaChevronRight />
                                    </button>

                                </div>


                                {/* DOCUMENT INTELLIGENCE */}

                                <div
                                    className="dashboard-card employee-feature-card"
                                    title="Upload documents and use AI to extract, analyze and understand their content."
                                >

                                    <div className="employee-feature-icon">
                                        <FaFileAlt />
                                    </div>

                                    <div className="employee-feature-title">

                                        <h3>
                                            Document Intelligence
                                        </h3>

                                        <span
                                            className="employee-info-icon"
                                        >
                                            <FaInfoCircle />
                                        </span>

                                    </div>

                                    <p>
                                        Analyze documents,
                                        extract information
                                        and understand
                                        uploaded files.
                                    </p>

                                    <button
                                        type="button"
                                        className="employee-feature-link"
                                    >
                                        Analyze
                                        <FaChevronRight />
                                    </button>

                                </div>


                                {/* COMPARISON */}

                                <div
                                    className="dashboard-card employee-feature-card"
                                    title="Compare SOP versions or documents to identify important differences."
                                >

                                    <div className="employee-feature-icon">
                                        <FaExchangeAlt />
                                    </div>

                                    <div className="employee-feature-title">

                                        <h3>
                                            SOP Comparison
                                        </h3>

                                        <span
                                            className="employee-info-icon"
                                        >
                                            <FaInfoCircle />
                                        </span>

                                    </div>

                                    <p>
                                        Compare documents
                                        and SOP versions
                                        to identify changes.
                                    </p>

                                    <button
                                        type="button"
                                        className="employee-feature-link"
                                    >
                                        Compare
                                        <FaChevronRight />
                                    </button>

                                </div>


                                {/* TRAINING */}

                                <div
                                    className="dashboard-card employee-feature-card"
                                    title="Track your assigned training, completion and certification status."
                                >

                                    <div className="employee-feature-icon">
                                        <FaGraduationCap />
                                    </div>

                                    <div className="employee-feature-title">

                                        <h3>
                                            Training
                                        </h3>

                                        <span
                                            className="employee-info-icon"
                                        >
                                            <FaInfoCircle />
                                        </span>

                                    </div>

                                    <p>
                                        Track training,
                                        certifications and
                                        upcoming learning
                                        requirements.
                                    </p>

                                    <button
                                        type="button"
                                        className="employee-feature-link"
                                    >
                                        View Training
                                        <FaChevronRight />
                                    </button>

                                </div>


                                {/* COMPLIANCE */}

                                <div
                                    className="dashboard-card employee-feature-card"
                                    title="Monitor your compliance score, required acknowledgements and compliance activities."
                                >

                                    <div className="employee-feature-icon">
                                        <FaShieldAlt />
                                    </div>

                                    <div className="employee-feature-title">

                                        <h3>
                                            Compliance
                                        </h3>

                                        <span
                                            className="employee-info-icon"
                                        >
                                            <FaInfoCircle />
                                        </span>

                                    </div>

                                    <p>
                                        Monitor your
                                        compliance score
                                        and required
                                        activities.
                                    </p>

                                    <button
                                        type="button"
                                        className="employee-feature-link"
                                    >
                                        View Compliance
                                        <FaChevronRight />
                                    </button>

                                </div>

                            </div>

                        </section>


                        {/* =================================================
                            RECOMMENDATIONS + RECENT UPDATES
                        ================================================= */}

                        <section className="dashboard-section">


                            <div className="dashboard-grid">


                                {/* RECOMMENDATIONS */}

                                <div className="dashboard-grid-half">

                                    <div className="dashboard-card employee-recommendations-card">

                                        <div className="employee-card-header">

                                            <div>

                                                <span className="employee-section-eyebrow">
                                                    AI INSIGHTS
                                                </span>

                                                <h2>
                                                    <FaLightbulb />
                                                    Recommended for You
                                                </h2>

                                            </div>

                                            <span
                                                className="employee-info-icon large"
                                                title="AI-generated recommendations based on your assigned work, SOP changes and learning requirements."
                                            >
                                                <FaInfoCircle />
                                            </span>

                                        </div>


                                        <div className="employee-recommendation-list">

                                            {recommendations.map(
                                                (
                                                    recommendation
                                                ) => (

                                                    <div
                                                        key={
                                                            recommendation.title
                                                        }
                                                        className="employee-recommendation"
                                                    >

                                                        <div className="employee-recommendation-icon">
                                                            {
                                                                recommendation.icon
                                                            }
                                                        </div>

                                                        <div className="employee-recommendation-content">

                                                            <span>
                                                                {
                                                                    recommendation.title
                                                                }
                                                            </span>

                                                            <strong>
                                                                {
                                                                    recommendation.item
                                                                }
                                                            </strong>

                                                            <p>
                                                                {
                                                                    recommendation.description
                                                                }
                                                            </p>

                                                            <button
                                                                type="button"
                                                                className="employee-feature-link"
                                                            >
                                                                {
                                                                    recommendation.action
                                                                }
                                                                <FaChevronRight />
                                                            </button>

                                                        </div>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    </div>

                                </div>


                                {/* RECENT UPDATES */}

                                <div className="dashboard-grid-half">

                                    <div className="dashboard-card employee-updates-card">

                                        <div className="employee-card-header">

                                            <div>

                                                <span className="employee-section-eyebrow">
                                                    ACTIVITY
                                                </span>

                                                <h2>
                                                    Recent Updates
                                                </h2>

                                            </div>

                                            <span
                                                className="employee-info-icon large"
                                                title="Recent changes and events relevant to your workspace."
                                            >
                                                <FaInfoCircle />
                                            </span>

                                        </div>


                                        <div className="employee-updates-list">

                                            {recentUpdates.map(
                                                (
                                                    update
                                                ) => (

                                                    <div
                                                        key={
                                                            update.title
                                                        }
                                                        className="employee-update-row"
                                                    >

                                                        <span
                                                            className={`employee-update-dot ${update.type}`}
                                                        />

                                                        <div>

                                                            <strong>
                                                                {
                                                                    update.title
                                                                }
                                                            </strong>

                                                            <span>
                                                                {
                                                                    update.subtitle
                                                                }
                                                            </span>

                                                        </div>

                                                        <small>
                                                            {
                                                                update.time
                                                            }
                                                        </small>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </section>


                        {/* =================================================
                            MY ACTIVITY
                        ================================================= */}

                        <section className="dashboard-section">


                            <div className="dashboard-card employee-activity-card">


                                <div className="employee-card-header">

                                    <div>

                                        <span className="employee-section-eyebrow">
                                            YOUR ACTIVITY
                                        </span>

                                        <h2>
                                            My Activity
                                        </h2>

                                    </div>

                                    <span
                                        className="employee-info-icon large"
                                        title="Summary of your activity across SOPs, AI, training and documents."
                                    >
                                        <FaInfoCircle />
                                    </span>

                                </div>


                                <div className="employee-activity-grid">

                                    {activityData.map(
                                        (activity) => (

                                            <div
                                                key={
                                                    activity.label
                                                }
                                                className="employee-activity-item"
                                                title={`Shows your activity for ${activity.label}.`}
                                            >

                                                <span className="employee-activity-icon">
                                                    {
                                                        activity.icon
                                                    }
                                                </span>

                                                <strong>
                                                    {
                                                        activity.value
                                                    }
                                                </strong>

                                                <span>
                                                    {
                                                        activity.label
                                                    }
                                                </span>

                                                <FaInfoCircle className="employee-activity-info" />

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                        </section>


                        {/* =================================================
                            SECURITY FOOTER
                        ================================================= */}

                        <div className="employee-dashboard-security">

                            <FaLock />

                            <span>
                                Your employee workspace is protected
                                by role-based enterprise access.
                            </span>

                        </div>


                    </div>

                </main>

            </div>

        </div>
    );
}