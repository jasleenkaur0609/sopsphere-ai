import React from "react";

import {
  FaBell,
  FaFileAlt,
  FaGraduationCap,
  FaShieldAlt,
  FaCheckCircle,
  FaRobot,
} from "react-icons/fa";

const notifications = [
  {
    id: 1,
    title: "SOP Updated",
    text: "Distributor Onboarding v3.2 has been updated.",
    time: "10 minutes ago",
    icon: <FaFileAlt />,
  },
  {
    id: 2,
    title: "Training Recommended",
    text: "Data Privacy Certification is due soon.",
    time: "1 hour ago",
    icon: <FaGraduationCap />,
  },
  {
    id: 3,
    title: "Compliance Alert",
    text: "Your compliance score has been updated.",
    time: "3 hours ago",
    icon: <FaShieldAlt />,
  },
  {
    id: 4,
    title: "Task Completed",
    text: "Email Handling Process training was completed.",
    time: "Yesterday",
    icon: <FaCheckCircle />,
  },
  {
    id: 5,
    title: "AI Recommendation",
    text: "New SOP recommendations are available.",
    time: "Yesterday",
    icon: <FaRobot />,
  },
  {
    id: 6,
    title: "New SOP Assigned",
    text: "Invoice Processing SOP has been assigned.",
    time: "2 days ago",
    icon: <FaBell />,
  },
];

const NotificationPanel = ({ onClose }) => {
  return (
    <aside className="notification-panel">
      <div className="notification-header">
        <div>
          <div className="notification-title">
            Notifications
          </div>

          <div className="notification-count">
            6 unread notifications
          </div>
        </div>

        <button
          type="button"
          className="header-action-btn"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="notification-list">
        {notifications.map((notification) => (
          <div
            className="notification-item"
            key={notification.id}
          >
            <div className="notification-icon">
              {notification.icon}
            </div>

            <div className="notification-content">
              <div className="notification-item-title">
                {notification.title}
              </div>

              <div className="notification-item-text">
                {notification.text}
              </div>

              <div className="notification-time">
                {notification.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default NotificationPanel;