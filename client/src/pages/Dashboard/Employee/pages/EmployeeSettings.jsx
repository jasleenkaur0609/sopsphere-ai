import React, { useState } from "react";
import {
  FaCog,
  FaUser,
  FaBell,
  FaShieldAlt,
  FaLock,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";

import "./EmployeeSettings.css";

const EmployeeSettings = () => {
  const [activeSection, setActiveSection] = useState("Profile");

  const [profile, setProfile] = useState({
    firstName: "Jasleen",
    lastName: "Kaur",
    email: "jasleen.kaur@company.com",
    employeeId: "EMP-1024",
    department: "Technology",
    designation: "RPA Technical Consultant",
    phone: "+91 98XXXXXX90",
  });

  const [notifications, setNotifications] = useState({
    sopUpdates: true,
    taskReminders: true,
    trainingReminders: true,
    complianceAlerts: true,
    systemUpdates: false,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [saved, setSaved] = useState(false);

  const sections = [
    {
      label: "Profile",
      icon: <FaUser />,
    },
    {
      label: "Notifications",
      icon: <FaBell />,
    },
    {
      label: "Security",
      icon: <FaShieldAlt />,
    },
  ];

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleNotificationChange = (name) => {
    setNotifications((current) => ({
      ...current,
      [name]: !current[name],
    }));

    setSaved(false);
  };

  const handleSecurityChange = (event) => {
    const { name, value } = event.target;

    setSecurity((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const togglePassword = (field) => {
    setShowPasswords((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  return (
    <div className="employee-settings-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="employee-settings-header">

        <div className="employee-settings-title">

          <div className="employee-settings-title-icon">
            <FaCog />
          </div>

          <div>
            <span className="employee-settings-eyebrow">
              ACCOUNT MANAGEMENT
            </span>

            <h1>Settings</h1>

            <p>
              Manage your profile, notifications, and account
              security preferences.
            </p>
          </div>

        </div>

        {saved && (
          <div className="employee-settings-saved">
            <FaCheckCircle />
            Changes saved
          </div>
        )}

      </header>


      {/* =====================================================
          SETTINGS LAYOUT
          ===================================================== */}

      <div className="employee-settings-layout">

        {/* =================================================
            SIDEBAR
            ================================================= */}

        <aside className="employee-settings-sidebar">

          <div className="employee-settings-sidebar-title">
            SETTINGS
          </div>

          <nav>

            {sections.map((section) => (

              <button
                type="button"
                key={section.label}
                className={
                  activeSection === section.label
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveSection(section.label)
                }
              >

                {section.icon}

                <span>
                  {section.label}
                </span>

              </button>

            ))}

          </nav>

        </aside>


        {/* =================================================
            CONTENT
            ================================================= */}

        <main className="employee-settings-content">

          {/* =================================================
              PROFILE
              ================================================= */}

          {activeSection === "Profile" && (

            <section className="employee-settings-card">

              <div className="employee-settings-card-header">

                <div>
                  <span>PERSONAL INFORMATION</span>

                  <h2>
                    Profile Settings
                  </h2>

                  <p>
                    Update the information associated with
                    your employee account.
                  </p>
                </div>

                <div className="employee-settings-card-icon">
                  <FaUser />
                </div>

              </div>


              <div className="employee-settings-form">

                <div className="employee-settings-form-grid">

                  <div className="employee-settings-field">

                    <label>
                      First Name
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleProfileChange}
                    />

                  </div>


                  <div className="employee-settings-field">

                    <label>
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleProfileChange}
                    />

                  </div>


                  <div className="employee-settings-field full">

                    <label>
                      Work Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                    />

                  </div>


                  <div className="employee-settings-field">

                    <label>
                      Employee ID
                    </label>

                    <input
                      type="text"
                      value={profile.employeeId}
                      disabled
                    />

                  </div>


                  <div className="employee-settings-field">

                    <label>
                      Department
                    </label>

                    <input
                      type="text"
                      value={profile.department}
                      disabled
                    />

                  </div>


                  <div className="employee-settings-field full">

                    <label>
                      Designation
                    </label>

                    <input
                      type="text"
                      value={profile.designation}
                      disabled
                    />

                  </div>


                  <div className="employee-settings-field full">

                    <label>
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                    />

                  </div>

                </div>

              </div>


              <div className="employee-settings-card-footer">

                <span>
                  Some organizational fields can only be
                  updated by an administrator.
                </span>

                <button
                  type="button"
                  onClick={handleSave}
                >
                  <FaSave />
                  Save Changes
                </button>

              </div>

            </section>

          )}


          {/* =================================================
              NOTIFICATIONS
              ================================================= */}

          {activeSection === "Notifications" && (

            <section className="employee-settings-card">

              <div className="employee-settings-card-header">

                <div>
                  <span>COMMUNICATION PREFERENCES</span>

                  <h2>
                    Notification Settings
                  </h2>

                  <p>
                    Choose which updates and reminders you
                    want to receive.
                  </p>
                </div>

                <div className="employee-settings-card-icon">
                  <FaBell />
                </div>

              </div>


              <div className="employee-settings-notifications">

                <NotificationToggle
                  title="SOP Updates"
                  description="Receive notifications when assigned SOPs are created or updated."
                  checked={notifications.sopUpdates}
                  onChange={() =>
                    handleNotificationChange("sopUpdates")
                  }
                />

                <NotificationToggle
                  title="Task Reminders"
                  description="Receive reminders for upcoming and overdue employee tasks."
                  checked={notifications.taskReminders}
                  onChange={() =>
                    handleNotificationChange("taskReminders")
                  }
                />

                <NotificationToggle
                  title="Training Reminders"
                  description="Receive reminders about pending or upcoming training."
                  checked={notifications.trainingReminders}
                  onChange={() =>
                    handleNotificationChange("trainingReminders")
                  }
                />

                <NotificationToggle
                  title="Compliance Alerts"
                  description="Receive important notifications about compliance requirements."
                  checked={notifications.complianceAlerts}
                  onChange={() =>
                    handleNotificationChange("complianceAlerts")
                  }
                />

                <NotificationToggle
                  title="System Updates"
                  description="Receive general platform announcements and system updates."
                  checked={notifications.systemUpdates}
                  onChange={() =>
                    handleNotificationChange("systemUpdates")
                  }
                />

              </div>


              <div className="employee-settings-card-footer">

                <span>
                  Critical security and compliance alerts
                  cannot be disabled.
                </span>

                <button
                  type="button"
                  onClick={handleSave}
                >
                  <FaSave />
                  Save Preferences
                </button>

              </div>

            </section>

          )}


          {/* =================================================
              SECURITY
              ================================================= */}

          {activeSection === "Security" && (

            <section className="employee-settings-card">

              <div className="employee-settings-card-header">

                <div>
                  <span>ACCOUNT SECURITY</span>

                  <h2>
                    Security Settings
                  </h2>

                  <p>
                    Keep your account secure by maintaining
                    a strong password.
                  </p>
                </div>

                <div className="employee-settings-card-icon">
                  <FaShieldAlt />
                </div>

              </div>


              <div className="employee-settings-security">

                <div className="employee-settings-security-banner">

                  <div>
                    <FaLock />
                  </div>

                  <div>
                    <strong>
                      Password Protection
                    </strong>

                    <span>
                      Use a unique password with a combination
                      of letters, numbers, and special characters.
                    </span>
                  </div>

                </div>


                <div className="employee-settings-form">

                  <div className="employee-settings-field">

                    <label>
                      Current Password
                    </label>

                    <div className="employee-settings-password">

                      <input
                        type={
                          showPasswords.current
                            ? "text"
                            : "password"
                        }
                        name="currentPassword"
                        value={security.currentPassword}
                        onChange={handleSecurityChange}
                        placeholder="Enter current password"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          togglePassword("current")
                        }
                      >
                        {showPasswords.current ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>

                    </div>

                  </div>


                  <div className="employee-settings-form-grid">

                    <div className="employee-settings-field">

                      <label>
                        New Password
                      </label>

                      <div className="employee-settings-password">

                        <input
                          type={
                            showPasswords.new
                              ? "text"
                              : "password"
                          }
                          name="newPassword"
                          value={security.newPassword}
                          onChange={handleSecurityChange}
                          placeholder="Enter new password"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            togglePassword("new")
                          }
                        >
                          {showPasswords.new ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>

                      </div>

                    </div>


                    <div className="employee-settings-field">

                      <label>
                        Confirm Password
                      </label>

                      <div className="employee-settings-password">

                        <input
                          type={
                            showPasswords.confirm
                              ? "text"
                              : "password"
                          }
                          name="confirmPassword"
                          value={security.confirmPassword}
                          onChange={handleSecurityChange}
                          placeholder="Confirm new password"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            togglePassword("confirm")
                          }
                        >
                          {showPasswords.confirm ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              </div>


              <div className="employee-settings-card-footer">

                <span>
                  You will remain signed in after updating
                  your password.
                </span>

                <button
                  type="button"
                  onClick={handleSave}
                >
                  <FaLock />
                  Update Password
                </button>

              </div>

            </section>

          )}

        </main>

      </div>

    </div>
  );
};


/* =========================================================
   NOTIFICATION TOGGLE
   ========================================================= */

const NotificationToggle = ({
  title,
  description,
  checked,
  onChange,
}) => {
  return (
    <div className="employee-settings-notification-row">

      <div>

        <strong>
          {title}
        </strong>

        <p>
          {description}
        </p>

      </div>

      <button
        type="button"
        className={`employee-settings-toggle ${
          checked ? "checked" : ""
        }`}
        onClick={onChange}
        aria-label={`Toggle ${title}`}
        aria-pressed={checked}
      >

        <span />

      </button>

    </div>
  );
};

export default EmployeeSettings;