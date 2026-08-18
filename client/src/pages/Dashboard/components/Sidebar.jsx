import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
} from "react-icons/fa";

const Sidebar = ({
  role = "Employee",
  collapsed,
  mobileOpen,
  onToggle,
  onMobileClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sopOpen, setSopOpen] = React.useState(false);

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
      badge: role === "Employee" ? 4 : 0,
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

  const handleNavigation = (item) => {
    if (item.hasChildren) {
      setSopOpen((previous) => !previous);

      if (!collapsed) {
        navigate(item.path);
      }

      return;
    }

    navigate(item.path);

    if (onMobileClose) {
      onMobileClose();
    }
  };

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-mobile-overlay"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`dashboard-sidebar ${
          collapsed ? "collapsed" : ""
        } ${mobileOpen ? "mobile-open" : ""}`}
      >
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-brand-icon">
              AI
            </div>

            <div className="sidebar-brand-content">
              <div className="sidebar-brand-title">
                SOP<span>Intelligence</span>
              </div>

              <div className="sidebar-brand-subtitle">
                Smarter Processes. Better Decisions.
              </div>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-collapse-btn"
            onClick={onToggle}
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            {collapsed ? (
              <FaChevronRight />
            ) : (
              <FaChevronLeft />
            )}
          </button>
        </div>

        <nav className="sidebar-navigation">
          <div className="sidebar-section-title">
            Workspace
          </div>

          {navigationItems.map((item) => (
            <React.Fragment key={item.label}>
              <button
                type="button"
                className={`sidebar-nav-item ${
                  isActive(item.path) ? "active" : ""
                }`}
                onClick={() => handleNavigation(item)}
                title={collapsed ? item.label : ""}
              >
                <span className="sidebar-nav-icon">
                  {item.icon}
                </span>

                <span className="sidebar-nav-label">
                  {item.label}
                </span>

                {item.badge > 0 && (
                  <span className="sidebar-badge">
                    {item.badge}
                  </span>
                )}

                {item.hasChildren && !collapsed && (
                  <span
                    className="sidebar-nav-arrow"
                    style={{
                      transform: sopOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    <FaChevronDown />
                  </span>
                )}
              </button>

              {item.hasChildren &&
                sopOpen &&
                !collapsed && (
                  <div className="sidebar-submenu">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          "/dashboard/sop-library"
                        )
                      }
                    >
                      All SOPs
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          "/dashboard/my-sops"
                        )
                      }
                    >
                      My SOPs
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          "/dashboard/generate-sop"
                        )
                      }
                    >
                      Generate SOP
                    </button>
                  </div>
                )}
            </React.Fragment>
          )}
        </nav>

        <div className="sidebar-footer">
          {footerItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`sidebar-nav-item ${
                isActive(item.path) ? "active" : ""
              }`}
              onClick={() => {
                navigate(item.path);

                if (onMobileClose) {
                  onMobileClose();
                }
              }}
              title={collapsed ? item.label : ""}
            >
              <span className="sidebar-nav-icon">
                {item.icon}
              </span>

              <span className="sidebar-nav-label">
                {item.label}
              </span>
            </button>
          ))}

          <button
            type="button"
            className="sidebar-nav-item"
            onClick={() =>
              alert("Feedback form will be connected here.")
            }
            title={collapsed ? "Give Feedback" : ""}
          >
            <span className="sidebar-nav-icon">
              <FaCommentDots />
            </span>

            <span className="sidebar-nav-label">
              Give Feedback
            </span>
          </button>

          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              JK
            </div>

            <div className="sidebar-user-info">
              <div className="sidebar-user-name">
                Jasleen Kaur
              </div>

              <div className="sidebar-user-role">
                {role}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;