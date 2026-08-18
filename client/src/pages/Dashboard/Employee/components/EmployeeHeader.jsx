import React, { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./EmployeeHeader.css";

const EmployeeHeader = ({
  profile = {},
  employeeName = "Employee",
  jobTitle = "Employee",
  department = "Department",
  employeeId = "Not assigned",
  location = "Location",
  onMenuClick,
}) => {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  const initials = employeeName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase();

  const handleNotifications = () => {
    navigate("/dashboard/notifications");
  };

  const handleProfile = () => {
    setProfileOpen(false);
    navigate("/dashboard/settings");
  };

  const handleLogout = () => {
    setProfileOpen(false);

    /*
     * Do not clear profile data here unless your
     * authentication system specifically requires it.
     *
     * This only returns the user to login.
     */
    navigate("/login");
  };

  return (
    <header className="employee-header">

      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <div className="employee-header-left">

        <button
          type="button"
          className="employee-mobile-menu"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <div className="employee-header-title">

          <span className="employee-header-eyebrow">
            EMPLOYEE PORTAL
          </span>

          <h1>
            My Workspace
          </h1>

        </div>

      </div>


      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <div className="employee-header-right">

        {/* Search */}

        <div className="employee-header-search">

          <Search size={18} />

          <input
            type="search"
            placeholder="Search SOPs, documents..."
            aria-label="Search"
          />

          <span className="employee-search-shortcut">
            /
          </span>

        </div>


        {/* Notifications */}

        <button
          type="button"
          className="employee-header-icon-button"
          onClick={handleNotifications}
          aria-label="Notifications"
          title="Notifications"
        >

          <Bell size={20} />

          <span className="employee-notification-dot">
            6
          </span>

        </button>


        {/* Divider */}

        <div className="employee-header-divider" />


        {/* Profile */}

        <div className="employee-header-profile-wrapper">

          <button
            type="button"
            className={`employee-header-profile ${
              profileOpen
                ? "profile-open"
                : ""
            }`}
            onClick={() =>
              setProfileOpen((previous) => !previous)
            }
            aria-expanded={profileOpen}
          >

            <div className="employee-header-avatar">
              {initials || "EM"}
            </div>

            <div className="employee-header-profile-info">

              <strong>
                {employeeName}
              </strong>

              <span>
                {jobTitle}
              </span>

            </div>

            <ChevronDown
              size={17}
              className="employee-header-profile-chevron"
            />

          </button>


          {/* =================================================
              PROFILE DROPDOWN
          ================================================= */}

          {profileOpen && (

            <div className="employee-header-profile-menu">

              <div className="employee-profile-menu-header">

                <div className="employee-profile-menu-avatar">
                  {initials || "EM"}
                </div>

                <div>

                  <strong>
                    {employeeName}
                  </strong>

                  <span>
                    {jobTitle}
                  </span>

                </div>

              </div>


              <div className="employee-profile-menu-details">

                <div>
                  <span>Department</span>
                  <strong>{department}</strong>
                </div>

                <div>
                  <span>Employee ID</span>
                  <strong>{employeeId}</strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>{location}</strong>
                </div>

              </div>


              <div className="employee-profile-menu-divider" />


              <button
                type="button"
                className="employee-profile-menu-item"
                onClick={handleProfile}
              >

                <User size={17} />

                <span>
                  My Profile
                </span>

              </button>


              <button
                type="button"
                className="employee-profile-menu-item"
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/dashboard/settings");
                }}
              >

                <Settings size={17} />

                <span>
                  Settings
                </span>

              </button>


              <div className="employee-profile-menu-divider" />


              <button
                type="button"
                className="employee-profile-menu-item employee-profile-logout"
                onClick={handleLogout}
              >

                <LogOut size={17} />

                <span>
                  Sign Out
                </span>

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
};

export default EmployeeHeader;