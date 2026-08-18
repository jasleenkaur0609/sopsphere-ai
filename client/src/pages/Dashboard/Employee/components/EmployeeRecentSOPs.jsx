import React from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  MoreHorizontal,
  Star,
} from "lucide-react";

import "./EmployeeRecentSOPs.css";

const EmployeeRecentSOPs = ({ onNavigate }) => {
  const recentSOPs = [
    {
      id: 1,
      title: "Customer Onboarding Process",
      category: "Operations",
      version: "v3.2",
      status: "Approved",
      updated: "Updated today",
      progress: 100,
      starred: true,
    },
    {
      id: 2,
      title: "Invoice Processing Guidelines",
      category: "Finance",
      version: "v2.4",
      status: "In Review",
      updated: "Updated yesterday",
      progress: 75,
      starred: false,
    },
    {
      id: 3,
      title: "Employee Data Management",
      category: "Human Resources",
      version: "v1.8",
      status: "Approved",
      updated: "Updated 2 days ago",
      progress: 100,
      starred: true,
    },
    {
      id: 4,
      title: "Document Submission Procedure",
      category: "Compliance",
      version: "v2.1",
      status: "Draft",
      updated: "Updated 4 days ago",
      progress: 45,
      starred: false,
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "employee-recent-sop-status-approved";

      case "In Review":
        return "employee-recent-sop-status-review";

      case "Draft":
        return "employee-recent-sop-status-draft";

      default:
        return "";
    }
  };

  const handleViewAll = () => {
    if (typeof onNavigate === "function") {
      onNavigate("/dashboard/sop-library");
    }
  };

  const handleSOPClick = () => {
    if (typeof onNavigate === "function") {
      onNavigate("/dashboard/my-sops");
    }
  };

  return (
    <section
      className="employee-recent-sops-section"
      aria-labelledby="employee-recent-sops-title"
    >
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="employee-recent-sops-header">
        <div className="employee-recent-sops-heading">
          <div className="employee-recent-sops-title-row">
            <span className="employee-recent-sops-icon">
              <BookOpen
                size={17}
                strokeWidth={1.9}
              />
            </span>

            <div>
              <span className="employee-recent-sops-eyebrow">
                Knowledge Workspace
              </span>

              <h2 id="employee-recent-sops-title">
                Recent SOPs
              </h2>
            </div>
          </div>

          <p>
            Quickly access SOPs you recently viewed, edited,
            or submitted.
          </p>
        </div>

        <button
          type="button"
          className="employee-recent-sops-view-all"
          onClick={handleViewAll}
        >
          <span>View Library</span>

          <ArrowRight
            size={16}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* =====================================================
          SOP CARD
          ===================================================== */}

      <div className="employee-recent-sops-card">
        <div className="employee-recent-sops-list">
          {recentSOPs.map((sop) => (
            <button
              type="button"
              className="employee-recent-sop-item"
              key={sop.id}
              onClick={handleSOPClick}
            >
              {/* =================================================
                  DOCUMENT ICON
                  ================================================= */}

              <span className="employee-recent-sop-document-icon">
                <FileText
                  size={18}
                  strokeWidth={1.8}
                />
              </span>

              {/* =================================================
                  CONTENT
                  ================================================= */}

              <span className="employee-recent-sop-content">
                <span className="employee-recent-sop-title-row">
                  <span className="employee-recent-sop-title">
                    {sop.title}
                  </span>

                  {sop.starred && (
                    <Star
                      className="employee-recent-sop-star"
                      size={13}
                      strokeWidth={1.8}
                    />
                  )}
                </span>

                <span className="employee-recent-sop-meta">
                  <span>{sop.category}</span>

                  <span className="employee-recent-sop-meta-dot">
                    •
                  </span>

                  <span>{sop.version}</span>

                  <span className="employee-recent-sop-meta-dot">
                    •
                  </span>

                  <span>{sop.updated}</span>
                </span>

                <span className="employee-recent-sop-progress">
                  <span className="employee-recent-sop-progress-track">
                    <span
                      className="employee-recent-sop-progress-fill"
                      style={{
                        width: `${sop.progress}%`,
                      }}
                    />
                  </span>

                  <span className="employee-recent-sop-progress-value">
                    {sop.progress}%
                  </span>
                </span>
              </span>

              {/* =================================================
                  STATUS
                  ================================================= */}

              <span
                className={`employee-recent-sop-status ${getStatusClass(
                  sop.status
                )}`}
              >
                {sop.status === "Approved" && (
                  <CheckCircle2
                    size={12}
                    strokeWidth={2}
                  />
                )}

                {sop.status === "In Review" && (
                  <Clock3
                    size={12}
                    strokeWidth={2}
                  />
                )}

                <span>{sop.status}</span>
              </span>

              {/* =================================================
                  ACTION
                  ================================================= */}

              <span
                className="employee-recent-sop-action"
                aria-hidden="true"
              >
                <MoreHorizontal
                  size={17}
                  strokeWidth={1.8}
                />
              </span>
            </button>
          ))}
        </div>

        {/* =====================================================
            FOOTER
            ===================================================== */}

        <div className="employee-recent-sops-footer">
          <div className="employee-recent-sops-footer-summary">
            <FileText
              size={14}
              strokeWidth={1.9}
            />

            <span>
              Showing <strong>{recentSOPs.length}</strong> recently
              accessed SOPs
            </span>
          </div>

          <button
            type="button"
            onClick={handleViewAll}
          >
            Browse all SOPs

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

export default EmployeeRecentSOPs;