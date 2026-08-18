import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaBook,
  FaFileAlt,
  FaMagic,
  FaRobot,
  FaFolderOpen,
  FaGraduationCap,
  FaShieldAlt,
  FaTasks,
  FaChartBar,
  FaBell,
  FaCog,
  FaQuestionCircle,
  FaCommentDots,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const EmployeeSidebar = ({
  collapsed = false,
  onToggle,
  mobileOpen = false,
  onMobileClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sopOpen, setSopOpen] = useState(
    location.pathname.includes("/sop-library") ||
      location.pathname.includes("/my-sops") ||
      location.pathname.includes("/generate-sop")
  );

  const navigationItems = [
    {
      label: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      label: "SOP Library",
      icon: <FaBook />,
      path: "/dashboard/sop-library",
      hasChildren: true,
    },
    {
      label: "My SOPs",
      icon: <FaFileAlt />,
      path: "/dashboard/my-sops",
    },
    {
      label: "Generate SOP",
      icon: <FaMagic />,
      path: "/dashboard/generate-sop",
    },
    {
      label: "AI Assistant",
      icon: <FaRobot />,
      path: "/dashboard/ai-assistant",
    },
    {
      label: "Document Intelligence",
      icon: <FaFolderOpen />,
      path: "/dashboard/documents",
    },
    {
      label: "Training & Learning",
      icon: <FaGraduationCap />,
      path: "/dashboard/training",
    },
    {
      label: "Compliance",
      icon: <FaShieldAlt />,
      path: "/dashboard/compliance",
    },
    {
      label: "My Tasks",
      icon: <FaTasks />,
      path: "/dashboard/tasks",
      badge: 4,
    },
    {
      label: "Analytics",
      icon: <FaChartBar />,
      path: "/dashboard/analytics",
    },
    {
      label: "Notifications",
      icon: <FaBell />,
      path: "/dashboard/notifications",
      badge: 6,
    },
  ];

  const footerItems = [
    {
      label: "Settings",
      icon: <FaCog />,
      path: "/dashboard/settings",
    },
    {
      label: "Help & Support",
      icon: <FaQuestionCircle />,
      path: "/dashboard/help",
    },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return location.pathname === path;
  };

  const isSOPSectionActive = () => {
    return (
      location.pathname.includes("/sop-library") ||
      location.pathname.includes("/my-sops") ||
      location.pathname.includes("/generate-sop")
    );
  };

  const handleNavigation = (item) => {
    if (item.hasChildren) {
      setSopOpen((previous) => !previous);

      /*
       * If the sidebar is expanded, clicking SOP Library
       * also takes the user to the main SOP Library page.
       */
      if (!collapsed) {
        navigate(item.path);
      }

      return;
    }

    navigate(item.path);

    if (mobileOpen && onMobileClose) {
      onMobileClose();
    }
  };

  const handleSubNavigation = (path) => {
    navigate(path);

    if (mobileOpen && onMobileClose) {
      onMobileClose();
    }
  };

  const handleFeedback = () => {
    alert("Feedback form will be connected here.");
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="employee-sidebar-overlay"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          "employee-sidebar",
          collapsed ? "employee-sidebar--collapsed" : "",
          mobileOpen ? "employee-sidebar--mobile-open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* =========================================
            BRAND
        ========================================= */}
        <div className="employee-sidebar__header">
          <button
            type="button"
            className="employee-sidebar__brand"
            onClick={() => navigate("/dashboard")}
            aria-label="Go to dashboard"
          >
            <span className="employee-sidebar__brand-icon">AI</span>

            <span className="employee-sidebar__brand-content">
              <span className="employee-sidebar__brand-name">
                SOP<span>Intelligence</span>
              </span>

              <span className="employee-sidebar__brand-tagline">
                Smarter Processes. Better Decisions.
              </span>
            </span>
          </button>

          <button
            type="button"
            className="employee-sidebar__collapse-btn"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>

          <button
            type="button"
            className="employee-sidebar__mobile-close"
            onClick={onMobileClose}
            aria-label="Close navigation"
          >
            <FaTimes />
          </button>
        </div>

        {/* =========================================
            NAVIGATION
        ========================================= */}
        <nav
          className="employee-sidebar__navigation"
          aria-label="Employee navigation"
        >
          {!collapsed && (
            <div className="employee-sidebar__section-title">
              WORKSPACE
            </div>
          )}

          {navigationItems.map((item) => (
            <React.Fragment key={item.label}>
              <button
                type="button"
                className={[
                  "employee-sidebar__nav-item",

                  isActive(item.path) ||
                  (item.hasChildren && isSOPSectionActive())
                    ? "employee-sidebar__nav-item--active"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleNavigation(item)}
                title={collapsed ? item.label : undefined}
              >
                <span className="employee-sidebar__nav-icon">
                  {item.icon}
                </span>

                <span className="employee-sidebar__nav-label">
                  {item.label}
                </span>

                {item.badge > 0 && (
                  <span className="employee-sidebar__badge">
                    {item.badge}
                  </span>
                )}

                {item.hasChildren && !collapsed && (
                  <span
                    className={[
                      "employee-sidebar__arrow",
                      sopOpen
                        ? "employee-sidebar__arrow--open"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <FaChevronDown />
                  </span>
                )}
              </button>

              {/* =====================================
                  SOP SUBMENU
              ===================================== */}
              {item.hasChildren && sopOpen && !collapsed && (
                <div className="employee-sidebar__submenu">
                  <button
                    type="button"
                    className={
                      location.pathname ===
                      "/dashboard/sop-library"
                        ? "employee-sidebar__submenu-item--active"
                        : ""
                    }
                    onClick={() =>
                      handleSubNavigation(
                        "/dashboard/sop-library"
                      )
                    }
                  >
                    <span>All SOPs</span>
                  </button>

                  <button
                    type="button"
                    className={
                      location.pathname ===
                      "/dashboard/my-sops"
                        ? "employee-sidebar__submenu-item--active"
                        : ""
                    }
                    onClick={() =>
                      handleSubNavigation(
                        "/dashboard/my-sops"
                      )
                    }
                  >
                    <span>My SOPs</span>
                  </button>

                  <button
                    type="button"
                    className={
                      location.pathname ===
                      "/dashboard/generate-sop"
                        ? "employee-sidebar__submenu-item--active"
                        : ""
                    }
                    onClick={() =>
                      handleSubNavigation(
                        "/dashboard/generate-sop"
                      )
                    }
                  >
                    <span>Generate SOP</span>
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* =========================================
            FOOTER NAVIGATION
        ========================================= */}
        <div className="employee-sidebar__footer">
          <div className="employee-sidebar__footer-divider" />

          {footerItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={[
                "employee-sidebar__nav-item",
                isActive(item.path)
                  ? "employee-sidebar__nav-item--active"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                navigate(item.path);

                if (mobileOpen && onMobileClose) {
                  onMobileClose();
                }
              }}
              title={collapsed ? item.label : undefined}
            >
              <span className="employee-sidebar__nav-icon">
                {item.icon}
              </span>

              <span className="employee-sidebar__nav-label">
                {item.label}
              </span>
            </button>
          ))}

          {/* =====================================
              FEEDBACK
          ===================================== */}
          <button
            type="button"
            className="employee-sidebar__nav-item"
            onClick={handleFeedback}
            title={collapsed ? "Give Feedback" : undefined}
          >
            <span className="employee-sidebar__nav-icon">
              <FaCommentDots />
            </span>

            <span className="employee-sidebar__nav-label">
              Give Feedback
            </span>
          </button>

          {/* =====================================
              USER
          ===================================== */}
          <button
            type="button"
            className="employee-sidebar__user"
            onClick={() => navigate("/dashboard/settings")}
            title={
              collapsed
                ? "Jasleen Kaur - Employee"
                : undefined
            }
          >
            <span className="employee-sidebar__user-avatar">
              JK
            </span>

            <span className="employee-sidebar__user-content">
              <span className="employee-sidebar__user-name">
                Jasleen Kaur
              </span>

              <span className="employee-sidebar__user-role">
                Employee
              </span>
            </span>

            {!collapsed && (
              <span className="employee-sidebar__user-arrow">
                <FaUser />
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default EmployeeSidebar;