import React from "react";
import {
  BookOpen,
  FileText,
  WandSparkles,
  Bot,
  FolderSearch,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import "./EmployeeFeatureCards.css";

const EmployeeFeatureCards = ({ onNavigate }) => {
  const featureCards = [
    {
      id: "sop-library",
      title: "SOP Library",
      description:
        "Browse and access approved standard operating procedures.",
      icon: BookOpen,
      className: "employee-feature-purple",
      path: "/dashboard/sop-library",
    },
    {
      id: "my-sops",
      title: "My SOPs",
      description:
        "View SOPs assigned to you and track your completion progress.",
      icon: FileText,
      className: "employee-feature-blue",
      path: "/dashboard/my-sops",
    },
    {
      id: "generate-sop",
      title: "Generate SOP",
      description:
        "Create structured SOP documents with AI-powered assistance.",
      icon: WandSparkles,
      className: "employee-feature-gold",
      path: "/dashboard/generate-sop",
    },
    {
      id: "ai-assistant",
      title: "AI Assistant",
      description:
        "Get instant answers and guidance using the SOP knowledge base.",
      icon: Bot,
      className: "employee-feature-green",
      path: "/dashboard/ai-assistant",
    },
    {
      id: "documents",
      title: "Document Intelligence",
      description:
        "Extract, analyze and understand information from documents.",
      icon: FolderSearch,
      className: "employee-feature-purple",
      path: "/dashboard/documents",
    },
    {
      id: "training",
      title: "Training & Learning",
      description:
        "Complete assigned learning activities and improve your skills.",
      icon: GraduationCap,
      className: "employee-feature-gold",
      path: "/dashboard/training",
    },
    {
      id: "compliance",
      title: "Compliance",
      description:
        "Monitor your compliance requirements and upcoming activities.",
      icon: ShieldCheck,
      className: "employee-feature-green",
      path: "/dashboard/compliance",
    },
  ];

  const handleCardClick = (path) => {
    if (typeof onNavigate === "function") {
      onNavigate(path);
    }
  };

  return (
    <section
      className="employee-feature-section"
      aria-labelledby="employee-feature-heading"
    >
      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="employee-feature-section-header">
        <div>
          <span className="employee-feature-eyebrow">
            Workspace
          </span>

          <h2 id="employee-feature-heading">
            Your Workspace
          </h2>

          <p>
            Everything you need to manage SOPs, learning,
            documents and compliance.
          </p>
        </div>

        <button
          type="button"
          className="employee-feature-view-all"
          onClick={() =>
            handleCardClick("/dashboard/sop-library")
          }
        >
          <span>View SOP Library</span>

          <ArrowRight
            size={16}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* =====================================================
          FEATURE GRID
      ===================================================== */}

      <div className="employee-feature-grid">
        {featureCards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              type="button"
              key={card.id}
              className="employee-feature-card"
              onClick={() => handleCardClick(card.path)}
              aria-label={`Open ${card.title}`}
            >
              {/* Card glow */}
              <span className="employee-feature-card-glow" />

              {/* Top row */}
              <span className="employee-feature-card-top">
                <span
                  className={`employee-feature-icon ${card.className}`}
                >
                  <Icon
                    size={22}
                    strokeWidth={2}
                  />
                </span>

                <span className="employee-feature-arrow">
                  <ArrowRight
                    size={17}
                    strokeWidth={2}
                  />
                </span>
              </span>

              {/* Content */}
              <span className="employee-feature-content">
                <span className="employee-feature-title">
                  {card.title}
                </span>

                <span className="employee-feature-description">
                  {card.description}
                </span>
              </span>

              {/* Bottom indicator */}
              <span className="employee-feature-card-indicator" />
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default EmployeeFeatureCards;