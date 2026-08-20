import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaBook,
  FaFolderOpen,
  FaRobot,
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
} from "react-icons/fa";

import "./EmployeeSidebar.css";

const EmployeeSidebar = ({
  profile,
  collapsed = false,
  mobileOpen = false,
  onToggle,
  onMobileClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sopOpen, setSopOpen] = useState(false);

  /*
   * ============================================================
   * PROFILE DATA
   * ============================================================
   */

  const employeeName =
    profile?.firstName ||
    profile?.first_name ||
    profile?.name ||
    "Employee";

  const employeeRole =
    profile?.role ||
    "Employee";


  /*
   * ============================================================
   * NAVIGATION ITEMS
   * ============================================================
   *
   * All paths are aligned with AppRoutes.jsx:
   *
   * /dashboard/employee
   * /dashboard/employee/sop-library
   * /dashboard/employee/ai-assistant
   * /dashboard/employee/documents
   * /dashboard/employee/training
   * /dashboard/employee/compliance
   * /dashboard/employee/tasks
   * /dashboard/employee/analytics
   * /dashboard/employee/notifications
   */

  const navigationItems = [
    {
      label: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },

    {
      label: "SOP Library",
      icon: <FaBook />,
      path: "/dashboard/employee/sop-library",
      hasChildren: true,
    },

    {
      label: "AI Assistant",
      icon: <FaRobot />,
      path: "/dashboard/employee/ai-assistant",
    },

    {
      label: "Document Intelligence",
      icon: <FaFolderOpen />,
      path: "/dashboard/employee/documents",
    },

    {
      label: "Training & Learning",
      icon: <FaGraduationCap />,
      path: "/dashboard/employee/training",
    },

    {
      label: "Compliance",
      icon: <FaShieldAlt />,
      path: "/dashboard/employee/compliance",
    },

    {
      label: "My Tasks",
      icon: <FaTasks />,
      path: "/dashboard/employee/tasks",
      badge: 4,
    },

    {
      label: "Analytics",
      icon: <FaChartBar />,
      path: "/dashboard/employee/analytics",
    },

    {
      label: "Notifications",
      icon: <FaBell />,
      path: "/dashboard/employee/notifications",
      badge: 6,
    },
  ];


  /*
   * ============================================================
   * FOOTER ITEMS
   * ============================================================
   */

  const footerItems = [
    {
      label: "Settings",
      icon: <FaCog />,
      path: "/dashboard/employee/settings",
    },

    {
      label: "Help & Support",
      icon: <FaQuestionCircle />,
      path: "/dashboard/employee/help",
    },
  ];


  /*
   * ============================================================
   * ACTIVE ROUTE
   * ============================================================
   */

  const isActive = (path) => {
    if (path === "/dashboard/employee") {
      return location.pathname === "/dashboard/employee";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };


  /*
   * ============================================================
   * SOP SECTION
   * ============================================================
   */

  const isSopSectionActive =
    location.pathname.startsWith(
      "/dashboard/employee/sop-library"
    ) ||
    location.pathname.startsWith(
      "/dashboard/employee/my-sops"
    ) ||
    location.pathname.startsWith(
      "/dashboard/employee/generate-sop"
    );


  /*
   * ============================================================
   * OPEN SOP DROPDOWN AUTOMATICALLY
   * ============================================================
   */

  useEffect(() => {
    if (isSopSectionActive) {
      setSopOpen(true);
    }
  }, [location.pathname, isSopSectionActive]);


  /*
   * ============================================================
   * NAVIGATION
   * ============================================================
   */

  const handleNavigation = (item) => {
    /*
     * SOP Library acts as a dropdown parent.
     */

    if (item.hasChildren) {
      if (!collapsed) {
        setSopOpen((previous) => !previous);
      }

      /*
       * When sidebar is collapsed,
       * clicking SOP Library opens the main SOP Library page.
       */

      if (collapsed) {
        navigate(item.path);

        if (onMobileClose) {
          onMobileClose();
        }
      }

      return;
    }


    /*
     * Normal navigation item.
     */

    navigate(item.path);

    if (onMobileClose) {
      onMobileClose();
    }
  };


  /*
   * ============================================================
   * SOP SUBMENU NAVIGATION
   * ============================================================
   */

  const handleSubNavigation = (path) => {
    navigate(path);

    if (onMobileClose) {
      onMobileClose();
    }
  };


  /*
   * ============================================================
   * FEEDBACK
   * ============================================================
   */

  const handleFeedback = () => {
    window.alert(
      "Feedback form will be connected here."
    );
  };


  /*
   * ============================================================
   * CLOSE MOBILE SIDEBAR
   * ============================================================
   */

  const handleMobileClose = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };


  return (
    <>
      {/* ======================================================
          MOBILE OVERLAY
      ====================================================== */}

      {mobileOpen && (
        <div
          className="employee-sidebar-overlay"
          onClick={handleMobileClose}
          aria-hidden="true"
        />
      )}


      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={[
          "employee-sidebar",
          collapsed
            ? "employee-sidebar-collapsed"
            : "",
          mobileOpen
            ? "employee-sidebar-mobile-open"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >

        {/* ====================================================
            SIDEBAR HEADER
        ==================================================== */}

        <div className="employee-sidebar-header">

          <div className="employee-sidebar-brand">

            <div className="employee-sidebar-brand-icon">
              AI
            </div>

            <div className="employee-sidebar-brand-content">

              <div className="employee-sidebar-brand-title">
                AI<span>SOP Intelligence</span>
              </div>

              <div className="employee-sidebar-brand-subtitle">
                Smarter Processes. Better Decisions.
              </div>

            </div>

          </div>


          {/* Desktop collapse button */}

          <button
            type="button"
            className="employee-sidebar-collapse-button"
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


          {/* Mobile close button */}

          <button
            type="button"
            className="employee-sidebar-mobile-close"
            onClick={handleMobileClose}
            aria-label="Close navigation"
          >
            <FaTimes />
          </button>

        </div>


        {/* ====================================================
            NAVIGATION
        ==================================================== */}

        <nav
          className="employee-sidebar-navigation"
          aria-label="Employee dashboard navigation"
        >

          <div className="employee-sidebar-section-title">
            Workspace
          </div>


          {navigationItems.map((item) => (
            <React.Fragment key={item.label}>

              {/* =================================================
                  MAIN NAVIGATION ITEM
              ================================================= */}

              <button
                type="button"
                className={[
                  "employee-sidebar-nav-item",

                  /*
                   * Keep SOP Library active when
                   * one of its child pages is active.
                   */

                  item.hasChildren &&
                  isSopSectionActive
                    ? "employee-sidebar-nav-item-active"
                    : "",

                  !item.hasChildren &&
                  isActive(item.path)
                    ? "employee-sidebar-nav-item-active"
                    : "",

                  item.hasChildren &&
                  sopOpen
                    ? "employee-sidebar-nav-item-expanded"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}

                onClick={() =>
                  handleNavigation(item)
                }

                title={
                  collapsed
                    ? item.label
                    : undefined
                }

                aria-current={
                  !item.hasChildren &&
                  isActive(item.path)
                    ? "page"
                    : undefined
                }

                aria-expanded={
                  item.hasChildren
                    ? sopOpen
                    : undefined
                }
              >

                <span className="employee-sidebar-nav-icon">
                  {item.icon}
                </span>

                <span className="employee-sidebar-nav-label">
                  {item.label}
                </span>


                {item.badge > 0 && (
                  <span className="employee-sidebar-badge">
                    {item.badge}
                  </span>
                )}


                {/* SOP dropdown arrow */}

                {item.hasChildren && !collapsed && (
                  <span
                    className={[
                      "employee-sidebar-nav-arrow",
                      sopOpen
                        ? "employee-sidebar-nav-arrow-open"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <FaChevronDown />
                  </span>
                )}

              </button>


              {/* =================================================
                  SOP LIBRARY DROPDOWN
              ================================================= */}

              {item.hasChildren &&
                sopOpen &&
                !collapsed && (
                  <div
                    className="employee-sidebar-submenu"
                    role="menu"
                  >

                    {/* -----------------------------------------
                        ALL SOPS
                    ----------------------------------------- */}

                    <button
                      type="button"
                      role="menuitem"
                      className={
                        isActive(
                          "/dashboard/employee/sop-library"
                        )
                          ? "employee-sidebar-submenu-active"
                          : ""
                      }
                      onClick={() =>
                        handleSubNavigation(
                          "/dashboard/employee/sop-library"
                        )
                      }
                    >
                      <span className="employee-sidebar-submenu-dot" />

                      <span>
                        All SOPs
                      </span>
                    </button>


                    {/* -----------------------------------------
                        MY SOPS
                    ----------------------------------------- */}

                    <button
                      type="button"
                      role="menuitem"
                      className={
                        isActive(
                          "/dashboard/employee/my-sops"
                        )
                          ? "employee-sidebar-submenu-active"
                          : ""
                      }
                      onClick={() =>
                        handleSubNavigation(
                          "/dashboard/employee/my-sops"
                        )
                      }
                    >
                      <span className="employee-sidebar-submenu-dot" />

                      <span>
                        My SOPs
                      </span>
                    </button>


                    {/* -----------------------------------------
                        GENERATE SOP
                    ----------------------------------------- */}

                    <button
                      type="button"
                      role="menuitem"
                      className={
                        isActive(
                          "/dashboard/employee/generate-sop"
                        )
                          ? "employee-sidebar-submenu-active"
                          : ""
                      }
                      onClick={() =>
                        handleSubNavigation(
                          "/dashboard/employee/generate-sop"
                        )
                      }
                    >
                      <span className="employee-sidebar-submenu-dot" />

                      <span>
                        Generate SOP
                      </span>
                    </button>

                  </div>
                )}

            </React.Fragment>
          ))}

        </nav>


        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="employee-sidebar-footer">

          {footerItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={[
                "employee-sidebar-nav-item",

                isActive(item.path)
                  ? "employee-sidebar-nav-item-active"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}

              onClick={() => {
                navigate(item.path);

                if (onMobileClose) {
                  onMobileClose();
                }
              }}

              title={
                collapsed
                  ? item.label
                  : undefined
              }
            >

              <span className="employee-sidebar-nav-icon">
                {item.icon}
              </span>

              <span className="employee-sidebar-nav-label">
                {item.label}
              </span>

            </button>
          ))}


          {/* ==================================================
              FEEDBACK
          ================================================== */}

          <button
            type="button"
            className="employee-sidebar-nav-item"
            onClick={handleFeedback}
            title={
              collapsed
                ? "Give Feedback"
                : undefined
            }
          >

            <span className="employee-sidebar-nav-icon">
              <FaCommentDots />
            </span>

            <span className="employee-sidebar-nav-label">
              Give Feedback
            </span>

          </button>


          {/* ==================================================
              USER PROFILE
          ================================================== */}

          <div className="employee-sidebar-user">

            <div className="employee-sidebar-user-avatar">
              {employeeName
                .split(" ")
                .map((part) =>
                  part.charAt(0)
                )
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>


            <div className="employee-sidebar-user-info">

              <div className="employee-sidebar-user-name">
                {employeeName}
              </div>

              <div className="employee-sidebar-user-role">
                {employeeRole}
              </div>

            </div>

          </div>

        </div>

      </aside>
    </>
  );
};

export default EmployeeSidebar;