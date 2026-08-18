import React from "react";
import {
  Bell,
  CheckCircle2,
  Clock3,
  FileText,
  AlertCircle,
  ArrowRight,
  MoreHorizontal,
} from "lucide-react";

import "./EmployeeNotifications.css";

const EmployeeNotifications = ({ onNavigate }) => {
  const notifications = [
    {
      id: 1,
      type: "sop",
      title: "SOP Review Assigned",
      message:
        "You have been assigned the Customer Onboarding SOP for review.",
      time: "10 min ago",
      unread: true,
    },
    {
      id: 2,
      type: "task",
      title: "Task Due Soon",
      message:
        "Invoice Processing Guidelines task is due tomorrow.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "training",
      title: "New Training Available",
      message:
        "A new compliance training module is available for you.",
      time: "3 hours ago",
      unread: true,
    },
    {
      id: 4,
      type: "success",
      title: "SOP Approved",
      message:
        "Your submitted Employee Data Management SOP was approved.",
      time: "Yesterday",
      unread: false,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "sop":
        return <FileText size={17} strokeWidth={1.9} />;

      case "task":
        return <Clock3 size={17} strokeWidth={1.9} />;

      case "training":
        return <AlertCircle size={17} strokeWidth={1.9} />;

      case "success":
        return <CheckCircle2 size={17} strokeWidth={1.9} />;

      default:
        return <Bell size={17} strokeWidth={1.9} />;
    }
  };

  const handleViewAll = () => {
    if (typeof onNavigate === "function") {
      onNavigate("/dashboard/notifications");
    }
  };

  const handleNotificationClick = (notification) => {
    if (typeof onNavigate !== "function") {
      return;
    }

    if (notification.type === "sop") {
      onNavigate("/dashboard/my-sops");
      return;
    }

    if (notification.type === "task") {
      onNavigate("/dashboard/tasks");
      return;
    }

    if (notification.type === "training") {
      onNavigate("/dashboard/training");
      return;
    }

    onNavigate("/dashboard/notifications");
  };

  return (
    <section
      className="employee-notifications-section"
      aria-labelledby="employee-notifications-title"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="employee-notifications-header">
        <div className="employee-notifications-heading">
          <div className="employee-notifications-title-row">
            <span className="employee-notifications-icon">
              <Bell size={17} strokeWidth={1.9} />
            </span>

            <div>
              <span className="employee-notifications-eyebrow">
                Updates
              </span>

              <h2 id="employee-notifications-title">
                Notifications
              </h2>
            </div>
          </div>

          <p>
            Stay updated with your latest workspace activity.
          </p>
        </div>

        <button
          type="button"
          className="employee-notifications-view-all"
          onClick={handleViewAll}
        >
          <span>View All</span>

          <ArrowRight
            size={16}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* =====================================================
          NOTIFICATION CARD
      ===================================================== */}

      <div className="employee-notifications-card">
        <div className="employee-notifications-list">
          {notifications.map((notification) => (
            <button
              type="button"
              key={notification.id}
              className={`employee-notification-item ${
                notification.unread
                  ? "employee-notification-unread"
                  : ""
              }`}
              onClick={() =>
                handleNotificationClick(notification)
              }
            >
              {/* =================================================
                  ICON
              ================================================= */}

              <span
                className={`employee-notification-item-icon employee-notification-icon-${notification.type}`}
              >
                {getNotificationIcon(notification.type)}
              </span>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <span className="employee-notification-content">
                <span className="employee-notification-title">
                  {notification.title}

                  {notification.unread && (
                    <span
                      className="employee-notification-unread-dot"
                      aria-label="Unread notification"
                    />
                  )}
                </span>

                <span className="employee-notification-message">
                  {notification.message}
                </span>

                <span className="employee-notification-time">
                  {notification.time}
                </span>
              </span>

              {/* =================================================
                  ACTION
              ================================================= */}

              <span
                className="employee-notification-arrow"
                aria-hidden="true"
              >
                <ArrowRight
                  size={15}
                  strokeWidth={1.9}
                />
              </span>
            </button>
          ))}
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="employee-notifications-footer">
          <span>
            <strong>4</strong> recent notifications
          </span>

          <button
            type="button"
            onClick={handleViewAll}
          >
            Manage notifications

            <ArrowRight
              size={14}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EmployeeNotifications;