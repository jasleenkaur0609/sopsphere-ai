import React from "react";
import {
  BookOpen,
  Clock3,
  FileCheck2,
  MoreHorizontal,
  ArrowRight,
  Eye,
  Download,
} from "lucide-react";

import "./EmployeeRecentSOPs.css";

const EmployeeRecentSOPs = ({ onNavigate }) => {
  const recentSOPs = [
    {
      id: "sop-001",
      title: "Customer Onboarding Process",
      category: "Operations",
      status: "Completed",
      statusClass: "completed",
      updated: "Updated 2 hours ago",
      progress: 100,
    },
    {
      id: "sop-002",
      title: "Invoice Processing Guidelines",
      category: "Finance",
      status: "In Progress",
      statusClass: "progress",
      updated: "Updated yesterday",
      progress: 68,
    },
    {
      id: "sop-003",
      title: "Employee Data Management",
      category: "Human Resources",
      status: "Pending Review",
      statusClass: "review",
      updated: "Updated 2 days ago",
      progress: 82,
    },
    {
      id: "sop-004",
      title: "Information Security Procedure",
      category: "Compliance",
      status: "In Progress",
      statusClass: "progress",
      updated: "Updated 3 days ago",
      progress: 45,
    },
  ];

  const handleOpenLibrary = () => {
    if (typeof onNavigate === "function") {
      onNavigate("/dashboard/sop-library");
    }
  };

  const handleOpenSOP = (sop) => {
    /*
     * The detailed SOP route can be connected later
     * when the SOP detail page is implemented.
     */
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
          <span className="employee-recent-sops-eyebrow">
            SOP Activity
          </span>

          <h2 id="employee-recent-sops-title">
            Recent SOPs
          </h2>

          <p>
            Recently accessed and assigned standard operating
            procedures.
          </p>
        </div>

        <button
          type="button"
          className="employee-recent-sops-view-all"
          onClick={handleOpenLibrary}
        >
          <span>View All</span>

          <ArrowRight
            size={16}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* =====================================================
          SOP LIST
      ===================================================== */}

      <div className="employee-recent-sops-card">
        <div className="employee-recent-sops-list">
          {recentSOPs.map((sop) => (
            <article
              className="employee-recent-sop-item"
              key={sop.id}
            >
              {/* =================================================
                  SOP ICON
              ================================================= */}

              <div className="employee-recent-sop-icon">
                <BookOpen
                  size={20}
                  strokeWidth={1.9}
                />
              </div>

              {/* =================================================
                  SOP INFORMATION
              ================================================= */}

              <div className="employee-recent-sop-info">
                <button
                  type="button"
                  className="employee-recent-sop-title"
                  onClick={() => handleOpenSOP(sop)}
                >
                  {sop.title}
                </button>

                <div className="employee-recent-sop-meta">
                  <span>
                    {sop.category}
                  </span>

                  <span className="employee-recent-sop-meta-dot">
                    •
                  </span>

                  <span>
                    {sop.updated}
                  </span>
                </div>
              </div>

              {/* =================================================
                  PROGRESS
              ================================================= */}

              <div className="employee-recent-sop-progress">
                <div className="employee-recent-sop-progress-top">
                  <span>
                    Progress
                  </span>

                  <strong>
                    {sop.progress}%
                  </strong>
                </div>

                <div className="employee-recent-sop-progress-track">
                  <div
                    className="employee-recent-sop-progress-fill"
                    style={{
                      width: `${sop.progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* =================================================
                  STATUS
              ================================================= */}

              <div
                className={`employee-recent-sop-status employee-recent-sop-status-${sop.statusClass}`}
              >
                {sop.statusClass === "completed" && (
                  <FileCheck2
                    size={13}
                    strokeWidth={2}
                  />
                )}

                {sop.statusClass === "progress" && (
                  <Clock3
                    size={13}
                    strokeWidth={2}
                  />
                )}

                {sop.statusClass === "review" && (
                  <Eye
                    size={13}
                    strokeWidth={2}
                  />
                )}

                <span>
                  {sop.status}
                </span>
              </div>

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="employee-recent-sop-actions">
                <button
                  type="button"
                  className="employee-recent-sop-action-btn"
                  title="Open SOP"
                  aria-label={`Open ${sop.title}`}
                  onClick={() => handleOpenSOP(sop)}
                >
                  <Eye
                    size={16}
                    strokeWidth={1.9}
                  />
                </button>

                <button
                  type="button"
                  className="employee-recent-sop-action-btn"
                  title="Download SOP"
                  aria-label={`Download ${sop.title}`}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <Download
                    size={16}
                    strokeWidth={1.9}
                  />
                </button>

                <button
                  type="button"
                  className="employee-recent-sop-action-btn"
                  title="More options"
                  aria-label={`More options for ${sop.title}`}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <MoreHorizontal
                    size={17}
                    strokeWidth={1.9}
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployeeRecentSOPs;