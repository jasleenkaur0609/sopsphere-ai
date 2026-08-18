import React from "react";
import {
  ArrowRight,
  BookOpen,
  FilePlus2,
  FolderOpen,
  ListTodo,
  Search,
} from "lucide-react";

import "./EmployeeActions.css";

const EmployeeActions = ({ onNavigate }) => {
  const handleNavigate = (path) => {
    if (typeof onNavigate === "function") {
      onNavigate(path);
      return;
    }

    window.location.href = path;
  };

  const actions = [
    {
      id: "generate-sop",
      title: "Generate SOP",
      description: "Create a new SOP with AI assistance.",
      icon: FilePlus2,
      path: "/dashboard/generate-sop",
      featured: true,
    },
    {
      id: "my-sops",
      title: "My SOPs",
      description: "View and manage your assigned SOPs.",
      icon: FolderOpen,
      path: "/dashboard/my-sops",
    },
    {
      id: "sop-library",
      title: "SOP Library",
      description: "Browse available organizational SOPs.",
      icon: BookOpen,
      path: "/dashboard/sop-library",
    },
    {
      id: "tasks",
      title: "My Tasks",
      description: "Check your pending tasks and actions.",
      icon: ListTodo,
      path: "/dashboard/tasks",
    },
    {
      id: "search",
      title: "Search Knowledge",
      description: "Find information across your workspace.",
      icon: Search,
      path: "/dashboard/ai-assistant",
    },
  ];

  return (
    <section className="employee-actions-section">
      {/* =====================================================
          SECTION HEADER
          ===================================================== */}

      <div className="employee-actions-header">
        <div>
          <span className="employee-actions-eyebrow">
            WORKSPACE
          </span>

          <h2>Quick Actions</h2>

          <p>
            Access the tools you use most often.
          </p>
        </div>
      </div>

      {/* =====================================================
          ACTION GRID
          ===================================================== */}

      <div className="employee-actions-grid">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.id}
              type="button"
              className={`employee-action-card ${
                action.featured
                  ? "employee-action-card-featured"
                  : ""
              }`}
              onClick={() =>
                handleNavigate(action.path)
              }
            >
              <div className="employee-action-card-top">
                <div className="employee-action-icon">
                  <Icon
                    size={17}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="employee-action-arrow">
                  <ArrowRight
                    size={13}
                    strokeWidth={1.9}
                  />
                </div>
              </div>

              <div className="employee-action-content">
                <h3>{action.title}</h3>

                <p>{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default EmployeeActions;