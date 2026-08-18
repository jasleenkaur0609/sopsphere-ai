import React, { useState } from "react";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Mail,
} from "lucide-react";

import "./EmployeeProfileMenu.css";

const EmployeeProfileMenu = ({
  profile,
  onNavigate,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const employeeName =
    profile?.fullName ||
    profile?.name ||
    "Jasleen Kaur";

  const employeeEmail =
    profile?.email ||
    "employee@company.com";

  const employeeRole =
    profile?.role ||
    "Employee";

  const initials = employeeName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name.charAt(0).toUpperCase())
    .join("");

  const handleNavigation = (path) => {
    setIsOpen(false);

    if (typeof onNavigate === "function") {
      onNavigate(path);
    }
  };

  const handleLogout = () => {
    setIsOpen(false);

    if (typeof onLogout === "function") {
      onLogout();
      return;
    }

    window.location.href = "/login";
  };

  return (
    <div className="employee-profile-menu">
      {/* =====================================================
          PROFILE TRIGGER
          ===================================================== */}

      <button
        type="button"
        className={`employee-profile-trigger ${
          isOpen
            ? "employee-profile-trigger-open"
            : ""
        }`}
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <div className="employee-profile-avatar">
          {initials || "E"}
        </div>

        <div className="employee-profile-trigger-info">
          <strong>{employeeName}</strong>

          <span>{employeeRole}</span>
        </div>

        <ChevronDown
          className={`employee-profile-chevron ${
            isOpen
              ? "employee-profile-chevron-open"
              : ""
          }`}
          size={15}
          strokeWidth={2}
        />
      </button>

      {/* =====================================================
          DROPDOWN
          ===================================================== */}

      {isOpen && (
        <>
          <button
            type="button"
            className="employee-profile-menu-backdrop"
            aria-label="Close profile menu"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="employee-profile-dropdown"
            role="menu"
          >
            {/* =================================================
                PROFILE HEADER
                ================================================= */}

            <div className="employee-profile-dropdown-header">
              <div className="employee-profile-dropdown-avatar">
                {initials || "E"}
              </div>

              <div className="employee-profile-dropdown-user">
                <strong>{employeeName}</strong>

                <div className="employee-profile-dropdown-email">
                  <Mail
                    size={11}
                    strokeWidth={1.9}
                  />

                  <span>{employeeEmail}</span>
                </div>
              </div>
            </div>

            {/* =================================================
                ROLE
                ================================================= */}

            <div className="employee-profile-role">
              <ShieldCheck
                size={13}
                strokeWidth={1.9}
              />

              <span>
                {employeeRole}
              </span>

              <span className="employee-profile-role-status">
                Active
              </span>
            </div>

            <div className="employee-profile-divider" />

            {/* =================================================
                MENU ITEMS
                ================================================= */}

            <button
              type="button"
              className="employee-profile-menu-item"
              role="menuitem"
              onClick={() =>
                handleNavigation(
                  "/dashboard/settings"
                )
              }
            >
              <span className="employee-profile-menu-item-icon">
                <User
                  size={15}
                  strokeWidth={1.9}
                />
              </span>

              <span className="employee-profile-menu-item-content">
                <strong>My Profile</strong>

                <small>
                  View your profile details
                </small>
              </span>
            </button>

            <button
              type="button"
              className="employee-profile-menu-item"
              role="menuitem"
              onClick={() =>
                handleNavigation(
                  "/dashboard/settings"
                )
              }
            >
              <span className="employee-profile-menu-item-icon">
                <Settings
                  size={15}
                  strokeWidth={1.9}
                />
              </span>

              <span className="employee-profile-menu-item-content">
                <strong>Settings</strong>

                <small>
                  Manage your preferences
                </small>
              </span>
            </button>

            <div className="employee-profile-divider" />

            {/* =================================================
                LOGOUT
                ================================================= */}

            <button
              type="button"
              className="employee-profile-menu-item employee-profile-logout"
              role="menuitem"
              onClick={handleLogout}
            >
              <span className="employee-profile-menu-item-icon">
                <LogOut
                  size={15}
                  strokeWidth={1.9}
                />
              </span>

              <span className="employee-profile-menu-item-content">
                <strong>Sign Out</strong>

                <small>
                  Securely sign out of your account
                </small>
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeProfileMenu;