import React from "react";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileEdit,
  FileText,
  GraduationCap,
  Upload,
} from "lucide-react";

import "./EmployeeRecentActivity.css";

const EmployeeRecentActivity = ({ onNavigate }) => {
  const activities = [
    {
      id: 1,
      type: "sop",
      title: "Customer Onboarding SOP reviewed",
      description:
        "You reviewed and completed the latest version of the SOP.",
      time: "Today, 10:32 AM",
      status: "Completed",
    },
    {
      id: 2,
      type: "document",
      title: "Invoice Processing document uploaded",
      description:
        "A new document was uploaded to Document Intelligence.",
      time: "Today, 09:15 AM",
      status: "Uploaded",
    },
    {
      id: 3,
      type: "training",
      title: "Compliance training completed",
      description:
        "You completed the Workplace Compliance training module.",
      time: "Yesterday, 04:45 PM",
      status: "Completed",
    },
    {
      id: 4,
      type: "edit",
      title: "Employee Data Management SOP updated",
      description:
        "You made changes to the SOP and submitted it for review.",
      time: "Yesterday, 02:20 PM",
      status: "Submitted",
    },
    {
      id: 5,
      type: "task",
      title: "New task assigned",
      description:
        "Review the updated process documentation assigned to you.",
      time: "18 Aug, 11:10 AM",
      status: "Pending",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "sop":
        return <FileText size={17} strokeWidth={1.9} />;

      case "document":
        return <Upload size={17} strokeWidth={1.9} />;

      case "training":
        return <GraduationCap size={17} strokeWidth={1.9} />;

      case "edit":
        return <FileEdit size={17} strokeWidth={1.9} />;

      case "task":
        return <Clock3 size={17} strokeWidth={1.9} />;

      default:
        return <Activity size={17} strokeWidth={1.9} />;
    }
  };

  const getActivityIconClass = (type) => {
    switch (type) {
      case "sop":
        return "employee-activity-icon-sop";

      case "document":
        return "employee-activity-icon-document";

      case "training":
        return "employee-activity-icon-training";

      case "edit":
        return "employee-activity-icon-edit";

      case "task":
        return "employee-activity-icon-task";

      default:
        return "employee-activity-icon-default";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "employee-activity-status-completed";

      case "Uploaded":
        return "employee-activity-status-uploaded";

      case "Submitted":
        return "employee-activity-status-submitted";

      case "Pending":
        return "employee-activity-status-pending";

      default:
        return "";
    }
  };

  const handleViewAll = () => {
    if (typeof onNavigate === "function") {
      onNavigate("/dashboard/analytics");
    }
  };

  return (
    <section
      className="employee-recent-activity-section"
      aria-labelledby="employee-recent-activity-title"
    >
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="employee-recent-activity-header">
        <div className="employee-recent-activity-heading">
          <div className="employee-recent-activity-title-row">
            <span className="employee-recent-activity-icon">
              <Activity size={17} strokeWidth={1.9} />
            </span>

            <div>
              <span className="employee-recent-activity-eyebrow">
                Workspace Timeline
              </span>

              <h2 id="employee-recent-activity-title">
                Recent Activity
              </h2>
            </div>
          </div>

          <p>
            A quick view of your latest actions and workspace updates.
          </p>
        </div>

        <button
          type="button"
          className="employee-recent-activity-view-all"
          onClick={handleViewAll}
        >
          <span>View Activity</span>

          <ArrowRight
            size={16}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* =====================================================
          ACTIVITY CARD
          ===================================================== */}

      <div className="employee-recent-activity-card">
        <div className="employee-recent-activity-list">
          {activities.map((activity, index) => (
            <div
              className="employee-recent-activity-item"
              key={activity.id}
            >
              {/* =================================================
                  TIMELINE
                  ================================================= */}

              <div className="employee-recent-activity-timeline">
                <span
                  className={`employee-recent-activity-item-icon ${getActivityIconClass(
                    activity.type
                  )}`}
                >
                  {getActivityIcon(activity.type)}
                </span>

                {index !== activities.length - 1 && (
                  <span className="employee-recent-activity-line" />
                )}
              </div>

              {/* =================================================
                  CONTENT
                  ================================================= */}

              <div className="employee-recent-activity-content">
                <div className="employee-recent-activity-main">
                  <h3>{activity.title}</h3>

                  <span
                    className={`employee-recent-activity-status ${getStatusClass(
                      activity.status
                    )}`}
                  >
                    {activity.status}
                  </span>
                </div>

                <p>{activity.description}</p>

                <div className="employee-recent-activity-meta">
                  <Clock3
                    size={12}
                    strokeWidth={1.9}
                  />

                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =====================================================
            FOOTER
            ===================================================== */}

        <div className="employee-recent-activity-footer">
          <div className="employee-recent-activity-footer-summary">
            <CheckCircle2
              size={15}
              strokeWidth={1.9}
            />

            <span>
              Your workspace activity is up to date.
            </span>
          </div>

          <button
            type="button"
            onClick={handleViewAll}
          >
            View full activity

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

export default EmployeeRecentActivity;