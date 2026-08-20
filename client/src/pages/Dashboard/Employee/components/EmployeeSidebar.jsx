import React, { useEffect, useState } from "react";
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


  /* ============================================================
     SOP SUBMENU STATE
     ============================================================ */

  const [sopOpen, setSopOpen] = useState(false);


  /* ============================================================
     PROFILE DATA
     ============================================================ */

  const employeeName =
    profile?.firstName ||
    profile?.first_name ||
    profile?.name ||
    "Employee";

  const employeeRole =
    profile?.role ||
    "Employee";


  /* ============================================================
     NAVIGATION ITEMS
     ============================================================ */

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


  /* ============================================================
     FOOTER ITEMS
     ============================================================ */

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


  /* ============================================================
     SOP SUBMENU ITEMS
     ============================================================ */

  const sopSubmenuItems = [

    {
      label: "All SOPs",
      icon: <FaBook />,
      path: "/dashboard/employee/sop-library",
    },

    {
      label: "My SOPs",
      icon: <FaFileAlt />,
      path: "/dashboard/employee/my-sops",
    },

    {
      label: "Generate SOP",
      icon: <FaMagic />,
      path: "/dashboard/employee/generate-sop",
    },

  ];


  /* ============================================================
     EXACT ACTIVE ROUTE
     ============================================================
     
     IMPORTANT:
     
     We intentionally DO NOT use startsWith() here.

     Example:

     /dashboard
     
     must NOT remain active when the user is on:

     /dashboard/employee/sop-library

     Every navigation item is therefore active only when its
     exact route matches the current URL.
     
     ============================================================ */

  const isExactActive = (path) => {

    return location.pathname === path;

  };


  /* ============================================================
     SOP ACTIVE STATE
     ============================================================
     
     SOP Library parent should ONLY be active on the actual
     SOP Library page.

     If the user is on My SOPs or Generate SOP, the parent
     remains inactive and only the child is highlighted.
     
     ============================================================ */

  const isSOPLibraryActive =
    location.pathname ===
    "/dashboard/employee/sop-library";


  /* ============================================================
     CURRENT SOP SUBMENU PAGE
     ============================================================ */

  const isSOPSubmenuActive = (path) => {

    return location.pathname === path;

  };


  /* ============================================================
     AUTOMATICALLY OPEN SOP SUBMENU
     ============================================================
     
     If the current page belongs to the SOP section,
     automatically open the dropdown.
     
     ============================================================ */

  useEffect(() => {

    const isInsideSOPSection =
      location.pathname ===
        "/dashboard/employee/sop-library" ||

      location.pathname ===
        "/dashboard/employee/my-sops" ||

      location.pathname ===
        "/dashboard/employee/generate-sop";

    if (isInsideSOPSection) {

      setSopOpen(true);

    }

  }, [location.pathname]);


  /* ============================================================
     NAVIGATION HANDLER
     ============================================================ */

  const handleNavigation = (path) => {

    navigate(path);

    if (onMobileClose) {
      onMobileClose();
    }

  };


  /* ============================================================
     SOP PARENT CLICK
     ============================================================
     
     Clicking SOP Library:
     
     1. Opens/closes the dropdown.
     2. Navigates to All SOPs when sidebar is expanded.
     
     ============================================================ */

  const handleSOPClick = () => {

    setSopOpen((previous) => !previous);


    /*
     * When expanded, clicking the parent also opens
     * the main SOP Library page.
     */

    if (!collapsed) {

      navigate(
        "/dashboard/employee/sop-library"
      );

      if (onMobileClose) {
        onMobileClose();
      }

    } else {

      /*
       * When collapsed, expand the sidebar first.
       */

      if (onToggle) {
        onToggle();
      }

    }

  };


  /* ============================================================
     SOP CHILD NAVIGATION
     ============================================================ */

  const handleSubNavigation = (path) => {

    navigate(path);

    setSopOpen(true);

    if (onMobileClose) {
      onMobileClose();
    }

  };


  /* ============================================================
     FEEDBACK
     ============================================================ */

  const handleFeedback = () => {

    window.alert(
      "Feedback form will be connected here."
    );

  };


  /* ============================================================
     RENDER
     ============================================================ */

  return (

    <>

      {/* ========================================================
          MOBILE OVERLAY
          ======================================================== */}

      {mobileOpen && (

        <div
          className="employee-sidebar-overlay"
          onClick={onMobileClose}
        />

      )}


      {/* ========================================================
          SIDEBAR
          ======================================================== */}

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


        {/* ======================================================
            BRAND
            ====================================================== */}

        <div className="employee-sidebar-brand">

          <div className="employee-sidebar-brand-icon">
            <FaBook />
          </div>


          {!collapsed && (

            <div className="employee-sidebar-brand-content">

              <strong>
                SOP INTELLIGENCE
              </strong>

              <span>
                Employee Portal
              </span>

            </div>

          )}


          {/* MOBILE CLOSE */}

          {mobileOpen && (

            <button
              type="button"
              className="employee-sidebar-close"
              onClick={onMobileClose}
              aria-label="Close sidebar"
            >
              <FaTimes />
            </button>

          )}

        </div>


        {/* ======================================================
            NAVIGATION
            ====================================================== */}

        <nav className="employee-sidebar-navigation">

          {navigationItems.map((item) => {

            const isSOPItem =
              item.hasChildren;

            const active =
              isSOPItem
                ? isSOPLibraryActive
                : isExactActive(item.path);


            /* ==================================================
               SOP LIBRARY PARENT
               ================================================== */

            if (isSOPItem) {

              return (

                <React.Fragment key={item.label}>

                  <button
                    type="button"
                    className={[
                      "employee-sidebar-nav-item",

                      active
                        ? "employee-sidebar-nav-item-active"
                        : "",

                    ]
                      .filter(Boolean)
                      .join(" ")}

                    onClick={handleSOPClick}

                    title={
                      collapsed
                        ? item.label
                        : undefined
                    }
                  >

                    <span className="employee-sidebar-nav-icon">
                      {item.icon}
                    </span>


                    {!collapsed && (

                      <span className="employee-sidebar-nav-label">
                        {item.label}
                      </span>

                    )}


                    {!collapsed && (

                      <FaChevronDown
                        className={[
                          "employee-sidebar-chevron",

                          sopOpen
                            ? "employee-sidebar-chevron-open"
                            : "",

                        ]
                          .filter(Boolean)
                          .join(" ")}
                      />

                    )}

                  </button>


                  {/* ==========================================
                      SOP SUBMENU
                      ========================================== */}

                  {!collapsed && sopOpen && (

                    <div className="employee-sidebar-submenu">

                      {sopSubmenuItems.map(
                        (submenuItem) => {

                          const submenuActive =
                            isSOPSubmenuActive(
                              submenuItem.path
                            );

                          return (

                            <button
                              key={
                                submenuItem.path
                              }

                              type="button"

                              className={[
                                "employee-sidebar-submenu-item",

                                submenuActive
                                  ? "employee-sidebar-submenu-active"
                                  : "",

                              ]
                                .filter(Boolean)
                                .join(" ")}

                              onClick={() =>
                                handleSubNavigation(
                                  submenuItem.path
                                )
                              }

                              title={
                                submenuItem.label
                              }
                            >

                              <span className="employee-sidebar-submenu-dot" />


                              <span>
                                {submenuItem.label}
                              </span>

                            </button>

                          );

                        }
                      )}

                    </div>

                  )}

                </React.Fragment>

              );

            }


            /* ==================================================
               NORMAL NAVIGATION ITEM
               ================================================== */

            return (

              <button
                key={item.label}
                type="button"

                className={[
                  "employee-sidebar-nav-item",

                  active
                    ? "employee-sidebar-nav-item-active"
                    : "",

                ]
                  .filter(Boolean)
                  .join(" ")}

                onClick={() =>
                  handleNavigation(
                    item.path
                  )
                }

                title={
                  collapsed
                    ? item.label
                    : undefined
                }
              >

                <span className="employee-sidebar-nav-icon">
                  {item.icon}
                </span>


                {!collapsed && (

                  <span className="employee-sidebar-nav-label">
                    {item.label}
                  </span>

                )}


                {item.badge &&
                  !collapsed && (

                    <span className="employee-sidebar-nav-badge">
                      {item.badge}
                    </span>

                  )}

              </button>

            );

          })}

        </nav>


        {/* ======================================================
            FOOTER
            ====================================================== */}

        <div className="employee-sidebar-footer">


          {/* ====================================================
              SETTINGS / HELP
              ==================================================== */}

          {footerItems.map((item) => {

            const active =
              isExactActive(
                item.path
              );

            return (

              <button
                key={item.label}
                type="button"

                className={[
                  "employee-sidebar-nav-item",

                  active
                    ? "employee-sidebar-nav-item-active"
                    : "",

                ]
                  .filter(Boolean)
                  .join(" ")}

                onClick={() =>
                  handleNavigation(
                    item.path
                  )
                }

                title={
                  collapsed
                    ? item.label
                    : undefined
                }
              >

                <span className="employee-sidebar-nav-icon">
                  {item.icon}
                </span>


                {!collapsed && (

                  <span className="employee-sidebar-nav-label">
                    {item.label}
                  </span>

                )}

              </button>

            );

          })}


          {/* ====================================================
              FEEDBACK
              ==================================================== */}

          <button
            type="button"
            className="employee-sidebar-nav-item"

            onClick={
              handleFeedback
            }

            title={
              collapsed
                ? "Give Feedback"
                : undefined
            }
          >

            <span className="employee-sidebar-nav-icon">
              <FaCommentDots />
            </span>


            {!collapsed && (

              <span className="employee-sidebar-nav-label">
                Give Feedback
              </span>

            )}

          </button>


          {/* ====================================================
              USER PROFILE
              ==================================================== */}

          <div className="employee-sidebar-user">

            <div className="employee-sidebar-user-avatar">

              {employeeName
                .split(" ")
                .map(
                  (part) =>
                    part.charAt(0)
                )
                .join("")
                .slice(0, 2)
                .toUpperCase()}

            </div>


            {!collapsed && (

              <div className="employee-sidebar-user-info">

                <div className="employee-sidebar-user-name">
                  {employeeName}
                </div>

                <div className="employee-sidebar-user-role">
                  {employeeRole}
                </div>

              </div>

            )}

          </div>


          {/* ====================================================
              COLLAPSE / EXPAND
              ==================================================== */}

          {onToggle && (

            <button
              type="button"
              className="employee-sidebar-toggle"
              onClick={onToggle}
              title={
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

          )}

        </div>

      </aside>

    </>

  );

};


export default EmployeeSidebar;