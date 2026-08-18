import React from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock3,
  FileText,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import "./EmployeeRecommendations.css";

const EmployeeRecommendations = ({ onNavigate }) => {
  const recommendations = [
    {
      id: 1,
      type: "SOP",
      title: "Customer Onboarding SOP",
      description:
        "Review the latest approved onboarding process and updated compliance steps.",
      reason: "Based on your recent activity",
      icon: BookOpen,
      action: "Review SOP",
      path: "/dashboard/sop-library",
      priority: "Recommended",
    },
    {
      id: 2,
      type: "Training",
      title: "Data Privacy & Security",
      description:
        "Complete the upcoming learning module to strengthen your compliance knowledge.",
      reason: "Training due soon",
      icon: Brain,
      action: "Start Training",
      path: "/dashboard/training",
      priority: "Due Soon",
    },
    {
      id: 3,
      type: "Document",
      title: "Document Intelligence",
      description:
        "Use AI-powered document analysis to extract important information faster.",
      reason: "Suggested for your workflow",
      icon: FileText,
      action: "Explore",
      path: "/dashboard/documents",
      priority: "AI Suggested",
    },
  ];

  const handleNavigation = (path) => {
    if (typeof onNavigate === "function") {
      onNavigate(path);
    }
  };

  const getPriorityClass = (priority) => {
    if (priority === "Due Soon") {
      return "employee-recommendation-priority-due";
    }

    if (priority === "AI Suggested") {
      return "employee-recommendation-priority-ai";
    }

    return "employee-recommendation-priority-default";
  };

  return (
    <section
      className="employee-recommendations-section"
      aria-labelledby="employee-recommendations-title"
    >
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="employee-recommendations-header">
        <div className="employee-recommendations-heading">
          <div className="employee-recommendations-title-row">
            <span className="employee-recommendations-icon">
              <Lightbulb
                size={17}
                strokeWidth={1.9}
              />
            </span>

            <div>
              <span className="employee-recommendations-eyebrow">
                Personalized For You
              </span>

              <h2 id="employee-recommendations-title">
                Recommendations
              </h2>
            </div>
          </div>

          <p>
            AI-powered suggestions based on your work,
            learning, and recent activity.
          </p>
        </div>

        <div className="employee-recommendations-ai-badge">
          <Sparkles
            size={13}
            strokeWidth={2}
          />

          <span>AI Powered</span>
        </div>
      </div>

      {/* =====================================================
          RECOMMENDATION LIST
          ===================================================== */}

      <div className="employee-recommendations-grid">
        {recommendations.map((recommendation) => {
          const RecommendationIcon = recommendation.icon;

          return (
            <article
              className="employee-recommendation-card"
              key={recommendation.id}
            >
              {/* =================================================
                  CARD TOP
                  ================================================= */}

              <div className="employee-recommendation-card-top">
                <div className="employee-recommendation-card-icon">
                  <RecommendationIcon
                    size={19}
                    strokeWidth={1.8}
                  />
                </div>

                <span
                  className={`employee-recommendation-priority ${getPriorityClass(
                    recommendation.priority
                  )}`}
                >
                  {recommendation.priority}
                </span>
              </div>

              {/* =================================================
                  CONTENT
                  ================================================= */}

              <div className="employee-recommendation-content">
                <span className="employee-recommendation-type">
                  {recommendation.type}
                </span>

                <h3>
                  {recommendation.title}
                </h3>

                <p>
                  {recommendation.description}
                </p>
              </div>

              {/* =================================================
                  REASON
                  ================================================= */}

              <div className="employee-recommendation-reason">
                {recommendation.priority === "Due Soon" ? (
                  <Clock3
                    size={13}
                    strokeWidth={1.9}
                  />
                ) : (
                  <CheckCircle2
                    size={13}
                    strokeWidth={1.9}
                  />
                )}

                <span>
                  {recommendation.reason}
                </span>
              </div>

              {/* =================================================
                  ACTION
                  ================================================= */}

              <button
                type="button"
                className="employee-recommendation-action"
                onClick={() =>
                  handleNavigation(recommendation.path)
                }
              >
                <span>
                  {recommendation.action}
                </span>

                <ArrowRight
                  size={15}
                  strokeWidth={2}
                />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default EmployeeRecommendations;