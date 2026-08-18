import React from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Trophy,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import "./EmployeeKPI.css";

const EmployeeKPI = ({ stats = {} }) => {
  /*
   * Default values are used until the dashboard
   * is connected to the backend/API.
   *
   * These can later be replaced by real employee data.
   */
  const {
    assignedSOPs = 12,
    completedSOPs = 8,
    pendingTasks = 4,
    complianceScore = 92,
  } = stats;

  const kpiCards = [
    {
      id: "assigned-sops",
      title: "Assigned SOPs",
      value: assignedSOPs,
      description: "SOPs assigned to you",
      icon: BookOpen,
      iconClass: "employee-kpi-purple",
      trend: "+2",
      trendType: "positive",
      trendText: "this week",
    },

    {
      id: "completed-sops",
      title: "Completed SOPs",
      value: completedSOPs,
      description: "SOPs completed",
      icon: CheckCircle2,
      iconClass: "employee-kpi-green",
      trend: "+18%",
      trendType: "positive",
      trendText: "completion rate",
    },

    {
      id: "pending-tasks",
      title: "Pending Tasks",
      value: pendingTasks,
      description: "Tasks requiring attention",
      icon: Clock3,
      iconClass: "employee-kpi-gold",
      trend: "2",
      trendType: "negative",
      trendText: "due soon",
    },

    {
      id: "compliance-score",
      title: "Compliance Score",
      value: `${complianceScore}%`,
      description: "Your current compliance",
      icon: Trophy,
      iconClass: "employee-kpi-purple",
      trend: "+5%",
      trendType: "positive",
      trendText: "vs last month",
    },
  ];

  return (
    <section
      className="employee-kpi-section"
      aria-label="Employee performance overview"
    >
      <div className="employee-kpi-grid">
        {kpiCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              className="employee-kpi-card"
              key={card.id}
            >
              {/* ==========================================
                  CARD TOP
              ========================================== */}

              <div className="employee-kpi-card-top">
                <div
                  className={`employee-kpi-icon ${card.iconClass}`}
                >
                  <Icon
                    size={22}
                    strokeWidth={2}
                  />
                </div>

                <span className="employee-kpi-card-menu">
                  •••
                </span>
              </div>

              {/* ==========================================
                  CARD CONTENT
              ========================================== */}

              <div className="employee-kpi-content">
                <span className="employee-kpi-title">
                  {card.title}
                </span>

                <strong className="employee-kpi-value">
                  {card.value}
                </strong>

                <span className="employee-kpi-description">
                  {card.description}
                </span>
              </div>

              {/* ==========================================
                  TREND
              ========================================== */}

              <div
                className={`employee-kpi-trend ${
                  card.trendType === "positive"
                    ? "employee-kpi-trend-positive"
                    : "employee-kpi-trend-negative"
                }`}
              >
                <span className="employee-kpi-trend-icon">
                  {card.trendType === "positive" ? (
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2.5}
                    />
                  ) : (
                    <ArrowDownRight
                      size={14}
                      strokeWidth={2.5}
                    />
                  )}
                </span>

                <strong>
                  {card.trend}
                </strong>

                <span>
                  {card.trendText}
                </span>
              </div>

              {/* ==========================================
                  DECORATIVE GLOW
              ========================================== */}

              <div className="employee-kpi-card-glow" />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default EmployeeKPI;