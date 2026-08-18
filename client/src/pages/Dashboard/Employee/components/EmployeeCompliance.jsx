import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock3,
  ArrowRight,
  FileCheck2,
  CalendarDays,
} from "lucide-react";

import "./EmployeeCompliance.css";

const EmployeeCompliance = ({ onNavigate }) => {
  const complianceItems = [
    {
      id: 1,
      title: "Annual Compliance Training",
      description:
        "Complete the mandatory annual compliance training assigned to you.",
      category: "Training",
      status: "Completed",
      dueDate: "Completed",
      icon: <CheckCircle2 size={17} strokeWidth={1.9} />,
    },
    {
      id: 2,
      title: "Information Security Policy",
      description:
        "Review and acknowledge the latest information security policy.",
      category: "Policy",
      status: "Action Required",
      dueDate: "Due in 5 days",
      icon: <AlertCircle size={17} strokeWidth={1.9} />,
    },
    {
      id: 3,
      title: "Data Privacy Guidelines",
      description:
        "Review the updated data privacy and handling guidelines.",
      category: "Policy",
      status: "Pending Review",
      dueDate: "Due in 12 days",
      icon: <Clock3 size={17} strokeWidth={1.9} />,
    },
  ];

  const handleNavigate = () => {
    if (typeof onNavigate === "function") {
      onNavigate("/dashboard/compliance");
      return;
    }

    window.location.href = "/dashboard/compliance";
  };

  const handleItemClick = (item) => {
    if (typeof onNavigate === "function") {
      onNavigate(
        `/dashboard/compliance?item=${item.id}`
      );
      return;
    }

    window.location.href =
      `/dashboard/compliance?item=${item.id}`;
  };

  return (
    <section className="employee-compliance-section">
      {/* =====================================================
          SECTION HEADER
          ===================================================== */}

      <div className="employee-compliance-header">
        <div className="employee-compliance-heading">
          <div className="employee-compliance-title-row">
            <div className="employee-compliance-title-icon">
              <ShieldCheck
                size={18}
                strokeWidth={1.9}
              />
            </div>

            <div>
              <span className="employee-compliance-eyebrow">
                Governance
              </span>

              <h2>Compliance</h2>
            </div>
          </div>

          <p>
            Stay compliant with policies, training and
            organizational requirements.
          </p>
        </div>

        <button
          type="button"
          className="employee-compliance-view-all"
          onClick={handleNavigate}
        >
          <span>View Compliance</span>

          <ArrowRight
            size={13}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* =====================================================
          COMPLIANCE SUMMARY
          ===================================================== */}

      <div className="employee-compliance-summary">
        <div className="employee-compliance-summary-main">
          <div className="employee-compliance-summary-icon">
            <FileCheck2
              size={19}
              strokeWidth={1.9}
            />
          </div>

          <div className="employee-compliance-summary-content">
            <span>Overall Compliance</span>

            <strong>92%</strong>

            <p>
              Your compliance status is healthy.
            </p>
          </div>
        </div>

        <div className="employee-compliance-summary-progress">
          <div className="employee-compliance-progress-track">
            <div
              className="employee-compliance-progress-fill"
              style={{
                width: "92%",
              }}
            />
          </div>

          <span>
            11 of 12 requirements completed
          </span>
        </div>
      </div>

      {/* =====================================================
          COMPLIANCE ITEMS
          ===================================================== */}

      <div className="employee-compliance-list">
        {complianceItems.map((item) => {
          const isCompleted =
            item.status === "Completed";

          const isActionRequired =
            item.status === "Action Required";

          return (
            <article
              key={item.id}
              className="employee-compliance-card"
              onClick={() =>
                handleItemClick(item)
              }
            >
              {/* Icon */}

              <div
                className={`employee-compliance-item-icon ${
                  isCompleted
                    ? "employee-compliance-item-icon-completed"
                    : isActionRequired
                    ? "employee-compliance-item-icon-action"
                    : "employee-compliance-item-icon-pending"
                }`}
              >
                {item.icon}
              </div>

              {/* Content */}

              <div className="employee-compliance-item-content">
                <div className="employee-compliance-item-top">
                  <span className="employee-compliance-category">
                    {item.category}
                  </span>

                  <span
                    className={`employee-compliance-status ${
                      isCompleted
                        ? "employee-compliance-status-completed"
                        : isActionRequired
                        ? "employee-compliance-status-action"
                        : "employee-compliance-status-pending"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="employee-compliance-due">
                  <CalendarDays
                    size={11}
                    strokeWidth={1.9}
                  />

                  <span>
                    {item.dueDate}
                  </span>
                </div>
              </div>

              {/* Action */}

              <button
                type="button"
                className="employee-compliance-item-action"
                aria-label={`Open ${item.title}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleItemClick(item);
                }}
              >
                <ArrowRight
                  size={15}
                  strokeWidth={2}
                />
              </button>
            </article>
          );
        })}
      </div>

      {/* =====================================================
          FOOTER MESSAGE
          ===================================================== */}

      <div className="employee-compliance-footer">
        <div className="employee-compliance-footer-icon">
          <ShieldCheck
            size={15}
            strokeWidth={1.9}
          />
        </div>

        <div className="employee-compliance-footer-content">
          <strong>
            Keep your compliance status up to date
          </strong>

          <span>
            Review pending requirements before their
            due dates to maintain full compliance.
          </span>
        </div>

        <button
          type="button"
          onClick={handleNavigate}
          className="employee-compliance-footer-action"
        >
          Review
          <ArrowRight
            size={12}
            strokeWidth={2}
          />
        </button>
      </div>
    </section>
  );
};

export default EmployeeCompliance;