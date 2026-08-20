import React, { useMemo, useState } from "react";
import {
  FaBell,
  FaCheck,
  FaCheckDouble,
  FaClock,
  FaFileAlt,
  FaExclamationCircle,
  FaGraduationCap,
  FaTasks,
  FaFilter,
  FaChevronDown,
} from "react-icons/fa";

import "./EmployeeNotifications.css";

const EmployeeNotifications = () => {
  const [filter, setFilter] = useState("All");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "SOP",
      title: "New SOP Assigned",
      message:
        "A new Information Security SOP has been assigned to you for review.",
      time: "15 minutes ago",
      date: "Today",
      read: false,
      icon: <FaFileAlt />,
    },
    {
      id: 2,
      type: "Task",
      title: "Task Due Soon",
      message:
        "Your quarterly SOP compliance review is due tomorrow.",
      time: "1 hour ago",
      date: "Today",
      read: false,
      icon: <FaTasks />,
    },
    {
      id: 3,
      type: "Training",
      title: "Training Reminder",
      message:
        "Your mandatory Data Privacy training is pending completion.",
      time: "3 hours ago",
      date: "Today",
      read: true,
      icon: <FaGraduationCap />,
    },
    {
      id: 4,
      type: "Compliance",
      title: "Compliance Update",
      message:
        "Your compliance status has been updated successfully.",
      time: "Yesterday",
      date: "Yesterday",
      read: true,
      icon: <FaCheck />,
    },
    {
      id: 5,
      type: "SOP",
      title: "SOP Updated",
      message:
        "The Enterprise SOP Guidelines have been updated by your team.",
      time: "Yesterday",
      date: "Yesterday",
      read: true,
      icon: <FaFileAlt />,
    },
    {
      id: 6,
      type: "System",
      title: "System Announcement",
      message:
        "The AI SOP Management Portal has received a platform update.",
      time: "Aug 18, 2026",
      date: "Earlier",
      read: true,
      icon: <FaBell />,
    },
  ]);

  const filters = [
    "All",
    "Unread",
    "SOP",
    "Task",
    "Training",
    "Compliance",
    "System",
  ];

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications = useMemo(() => {
    if (filter === "All") {
      return notifications;
    }

    if (filter === "Unread") {
      return notifications.filter(
        (notification) => !notification.read
      );
    }

    return notifications.filter(
      (notification) => notification.type === filter
    );
  }, [filter, notifications]);

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  return (
    <div className="employee-notifications-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="employee-notifications-header">

        <div className="employee-notifications-title">

          <div className="employee-notifications-title-icon">
            <FaBell />
          </div>

          <div>
            <span className="employee-notifications-eyebrow">
              NOTIFICATION CENTER
            </span>

            <h1>Notifications</h1>

            <p>
              Stay updated with SOP assignments, tasks,
              training, compliance, and system activity.
            </p>
          </div>

        </div>


        <div className="employee-notifications-header-actions">

          <div className="employee-notifications-count">

            <span>UNREAD</span>

            <strong>
              {unreadCount}
            </strong>

          </div>

          <button
            type="button"
            className="employee-notifications-mark-all"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <FaCheckDouble />
            Mark all as read
          </button>

        </div>

      </header>


      {/* =====================================================
          SUMMARY
          ===================================================== */}

      <section className="employee-notifications-summary">

        <div className="employee-notifications-summary-card">

          <div className="employee-notifications-summary-icon">
            <FaBell />
          </div>

          <div>
            <span>Total Notifications</span>
            <strong>{notifications.length}</strong>
          </div>

        </div>


        <div className="employee-notifications-summary-card">

          <div className="employee-notifications-summary-icon">
            <FaExclamationCircle />
          </div>

          <div>
            <span>Unread</span>
            <strong>{unreadCount}</strong>
          </div>

        </div>


        <div className="employee-notifications-summary-card">

          <div className="employee-notifications-summary-icon">
            <FaClock />
          </div>

          <div>
            <span>Recent Activity</span>
            <strong>Today</strong>
          </div>

        </div>

      </section>


      {/* =====================================================
          NOTIFICATION LIST
          ===================================================== */}

      <section className="employee-notifications-container">

        <div className="employee-notifications-toolbar">

          <div>

            <span className="employee-notifications-toolbar-label">
              ACTIVITY
            </span>

            <h2>
              Your Notifications
            </h2>

          </div>


          <div className="employee-notifications-filter">

            <FaFilter />

            <select
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value)
              }
            >
              {filters.map((item) => (
                <option
                  value={item}
                  key={item}
                >
                  {item}
                </option>
              ))}
            </select>

            <FaChevronDown />

          </div>

        </div>


        <div className="employee-notifications-list">

          {filteredNotifications.length > 0 ? (

            filteredNotifications.map((notification) => (

              <article
                key={notification.id}
                className={`employee-notification-item ${
                  !notification.read
                    ? "employee-notification-unread"
                    : ""
                }`}
              >

                <div
                  className={`employee-notification-icon employee-notification-${notification.type.toLowerCase()}`}
                >
                  {notification.icon}
                </div>


                <div className="employee-notification-content">

                  <div className="employee-notification-heading">

                    <h3>
                      {notification.title}
                    </h3>

                    {!notification.read && (
                      <span className="employee-notification-new">
                        NEW
                      </span>
                    )}

                  </div>

                  <p>
                    {notification.message}
                  </p>

                  <div className="employee-notification-meta">

                    <span>
                      {notification.type}
                    </span>

                    <span>•</span>

                    <span>
                      {notification.time}
                    </span>

                  </div>

                </div>


                {!notification.read && (
                  <button
                    type="button"
                    className="employee-notification-read"
                    onClick={() =>
                      markAsRead(notification.id)
                    }
                    title="Mark as read"
                  >
                    <FaCheck />
                  </button>
                )}

              </article>

            ))

          ) : (

            <div className="employee-notifications-empty">

              <FaBell />

              <strong>
                No notifications found
              </strong>

              <span>
                There are no notifications matching
                the selected filter.
              </span>

            </div>

          )}

        </div>

      </section>

    </div>
  );
};

export default EmployeeNotifications;