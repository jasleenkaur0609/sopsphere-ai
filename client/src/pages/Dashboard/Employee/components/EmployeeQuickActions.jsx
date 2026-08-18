import React from "react";
import {
  Plus,
  FileText,
  WandSparkles,
  CheckSquare,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

import "./EmployeeQuickActions.css";

const EmployeeQuickActions = ({ onNavigate }) => {
  const quickActions = [
    {
      id: "create-sop",
      title: "Create SOP",
      description: "Start a new SOP document",
      icon: Plus,
      path: "/dashboard/generate-sop",
      className: "employee-quick-action-purple",
    },
    {
      id: "my-sops",
      title: "View My SOPs",
      description: "Review your assigned SOPs",
      icon: FileText,
      path: "/dashboard/my-sops",
      className: "employee-quick-action-blue",
    },
    {
      id: "ai-assistant",
      title: "Ask AI",
      description: "Get instant SOP assistance",
      icon: WandSparkles,
      path: "/dashboard/ai-assistant",
      className: "employee-quick-action-gold",
    },
    {
      id: "tasks",
      title: "My Tasks",
      description: "Check pending activities",
      icon: CheckSquare,
      path: "/dashboard/tasks",
      className: "employee-quick-action-green",
    },
    {
      id: "training",
      title: "Continue Learning",
      description: "Resume your training",
      icon: GraduationCap,
      path: "/dashboard/training",
      className: "employee-quick-action-purple",
    },
  ];

  const handleNavigation = (path) => {
    if (typeof onNavigate === "function") {
      onNavigate(path);
    }
  };

  return (
    <section
      className="employee-quick-actions-section"
      aria-labelledby="employee-quick-actions-title"
    >
      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="employee-quick-actions-header">
        <div className="employee-quick-actions-heading">
          <span className="employee-quick-actions-eyebrow">
            Shortcuts
          </span>

          <h2 id="employee-quick-actions-title">
            Quick Actions
          </h2>

          <p>
            Access your most frequently used employee actions.
          </p>
        </div>
      </div>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <div className="employee-quick-actions-grid">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.id}
              type="button"
              className="employee-quick-action-card"
              onClick={() => handleNavigation(action.path)}
              aria-label={action.title}
            >
              {/* Decorative background */}
              <span className="employee-quick-action-glow" />

              {/* Icon */}
              <span
                className={`employee-quick-action-icon ${action.className}`}
              >
                <Icon
                  size={20}
                  strokeWidth={2}
                />
              </span>

              {/* Content */}
              <span className="employee-quick-action-content">
                <span className="employee-quick-action-title">
                  {action.title}
                </span>

                <span className="employee-quick-action-description">
                  {action.description}
                </span>
              </span>

              {/* Arrow */}
              <span className="employee-quick-action-arrow">
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default EmployeeQuickActions;