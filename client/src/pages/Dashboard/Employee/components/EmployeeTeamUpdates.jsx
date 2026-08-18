import React from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  MessageSquare,
  Users,
} from "lucide-react";

import "./EmployeeTeamUpdates.css";

const EmployeeTeamUpdates = ({ onNavigate }) => {
  const updates = [
    {
      id: 1,
      type: "Team Update",
      title: "New SOP review cycle announced",
      description:
        "The team has started a new review cycle for operational SOPs. Please review the documents assigned to you.",
      time: "Today, 10:30 AM",
      icon: Bell,
      status: "Action Required",
      statusType: "action",
    },
    {
      id: 2,
      type: "Team Activity",
      title: "Monthly knowledge session",
      description:
        "Join the upcoming knowledge-sharing session to learn about the latest process improvements.",
      time: "Tomorrow, 3:00 PM",
      icon: CalendarDays,
      status: "Upcoming",
      statusType: "upcoming",
    },
    {
      id: 3,
      type: "Team Message",
      title: "Process improvement discussion",
      description:
        "Your team has shared new suggestions for improving document management and SOP adoption.",
      time: "Yesterday",
      icon: MessageSquare,
      status: "New",
      statusType: "new",
    },
  ];

  const handleNavigation = (path) => {
    if (typeof onNavigate === "function") {
      onNavigate(path);
    }
  };

  return (
    <section
      className="employee-team-updates-section"
      aria-labelledby="employee-team-updates-title"
    >
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="employee-team-updates-header">
        <div className="employee-team-updates-heading">
          <div className="employee-team-updates-title-row">
            <span className="employee-team-updates-title-icon">
              <Users size={17} strokeWidth={1.9} />
            </span>

            <div>
              <span className="employee-team-updates-eyebrow">
                Stay Connected
              </span>

              <h2 id="employee-team-updates-title">
                Team Updates
              </h2>
            </div>
          </div>

          <p>
            Stay informed about important team activities,
            announcements, and upcoming events.
          </p>
        </div>

        <button
          type="button"
          className="employee-team-updates-view-all"
          onClick={() =>
            handleNavigation("/dashboard/notifications")
          }
        >
          <span>View All</span>

          <ArrowRight
            size={14}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* =====================================================
          UPDATE LIST
          ===================================================== */}

      <div className="employee-team-updates-list">
        {updates.map((update) => {
          const UpdateIcon = update.icon;

          return (
            <article
              className="employee-team-update-card"
              key={update.id}
            >
              {/* =================================================
                  ICON
                  ================================================= */}

              <div className="employee-team-update-icon">
                <UpdateIcon
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

              {/* =================================================
                  CONTENT
                  ================================================= */}

              <div className="employee-team-update-content">
                <div className="employee-team-update-meta">
                  <span className="employee-team-update-type">
                    {update.type}
                  </span>

                  <span
                    className={`employee-team-update-status employee-team-update-status-${update.statusType}`}
                  >
                    {update.status}
                  </span>
                </div>

                <h3>{update.title}</h3>

                <p>{update.description}</p>

                <div className="employee-team-update-time">
                  <CalendarDays
                    size={12}
                    strokeWidth={1.8}
                  />

                  <span>{update.time}</span>
                </div>
              </div>

              {/* =================================================
                  ACTION
                  ================================================= */}

              <button
                type="button"
                className="employee-team-update-action"
                onClick={() =>
                  handleNavigation("/dashboard/notifications")
                }
                aria-label={`Open ${update.title}`}
              >
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                />
              </button>
            </article>
          );
        })}
      </div>

      {/* =====================================================
          FOOTER SUMMARY
          ===================================================== */}

      <div className="employee-team-updates-summary">
        <div className="employee-team-updates-summary-icon">
          <CheckCircle2
            size={15}
            strokeWidth={1.9}
          />
        </div>

        <div className="employee-team-updates-summary-content">
          <strong>
            You're up to date
          </strong>

          <span>
            Keep checking team updates for new announcements.
          </span>
        </div>
      </div>
    </section>
  );
};

export default EmployeeTeamUpdates;