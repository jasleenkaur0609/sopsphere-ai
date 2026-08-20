import React, { useMemo, useState } from "react";
import {
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaFileAlt,
  FaGraduationCap,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";

import "./EmployeeCompliance.css";

const EmployeeCompliance = ({ profile }) => {
  const [filter, setFilter] = useState("All");

  const employeeName =
    profile?.name ||
    profile?.fullName ||
    "Employee";

  const complianceItems = [
    {
      id: 1,
      title: "Information Security Policy",
      category: "Policy",
      status: "Compliant",
      dueDate: "Sep 15, 2026",
      progress: 100,
      icon: <FaShieldAlt />,
    },
    {
      id: 2,
      title: "Data Privacy & Protection",
      category: "Training",
      status: "Compliant",
      dueDate: "Oct 02, 2026",
      progress: 100,
      icon: <FaGraduationCap />,
    },
    {
      id: 3,
      title: "Workplace Safety Training",
      category: "Training",
      status: "Due Soon",
      dueDate: "Aug 28, 2026",
      progress: 75,
      icon: <FaGraduationCap />,
    },
    {
      id: 4,
      title: "Acceptable Use Policy",
      category: "Policy",
      status: "Compliant",
      dueDate: "Nov 10, 2026",
      progress: 100,
      icon: <FaFileAlt />,
    },
    {
      id: 5,
      title: "Annual Compliance Assessment",
      category: "Assessment",
      status: "Pending",
      dueDate: "Sep 05, 2026",
      progress: 40,
      icon: <FaFileAlt />,
    },
  ];

  const filteredItems = useMemo(() => {
    if (filter === "All") {
      return complianceItems;
    }

    return complianceItems.filter(
      (item) => item.status === filter
    );
  }, [filter]);

  const compliantCount = complianceItems.filter(
    (item) => item.status === "Compliant"
  ).length;

  const dueSoonCount = complianceItems.filter(
    (item) => item.status === "Due Soon"
  ).length;

  const pendingCount = complianceItems.filter(
    (item) => item.status === "Pending"
  ).length;

  return (
    <div className="employee-compliance-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="employee-compliance-header">

        <div className="employee-compliance-title">

          <div className="employee-compliance-title-icon">
            <FaShieldAlt />
          </div>

          <div>
            <span className="employee-compliance-eyebrow">
              GOVERNANCE & COMPLIANCE
            </span>

            <h1>My Compliance</h1>

            <p>
              Monitor your policies, training requirements,
              assessments, and compliance obligations.
            </p>
          </div>

        </div>

        <div className="employee-compliance-date">
          <FaCalendarAlt />
          <span>Updated Today</span>
        </div>

      </header>


      {/* =====================================================
          OVERALL COMPLIANCE
          ===================================================== */}

      <section className="employee-compliance-overview">

        <div className="employee-compliance-overview-content">

          <span className="employee-compliance-label">
            OVERALL COMPLIANCE
          </span>

          <h2>
            You're doing well, {employeeName}
          </h2>

          <p>
            Your compliance status is healthy. Complete the
            remaining requirements before their due dates to
            maintain your compliance standing.
          </p>

          <div className="employee-compliance-overview-status">
            <FaCheckCircle />
            <span>Good Standing</span>
          </div>

        </div>


        <div className="employee-compliance-score">

          <div className="employee-compliance-score-ring">

            <strong>96%</strong>

            <span>Compliant</span>

          </div>

        </div>

      </section>


      {/* =====================================================
          KPI CARDS
          ===================================================== */}

      <section className="employee-compliance-kpis">

        <div className="employee-compliance-kpi">

          <div className="employee-compliance-kpi-icon compliant">
            <FaCheckCircle />
          </div>

          <div>
            <span>Compliant</span>
            <strong>{compliantCount}</strong>
            <small>Requirements completed</small>
          </div>

        </div>


        <div className="employee-compliance-kpi">

          <div className="employee-compliance-kpi-icon warning">
            <FaExclamationTriangle />
          </div>

          <div>
            <span>Due Soon</span>
            <strong>{dueSoonCount}</strong>
            <small>Requires your attention</small>
          </div>

        </div>


        <div className="employee-compliance-kpi">

          <div className="employee-compliance-kpi-icon pending">
            <FaClock />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingCount}</strong>
            <small>Awaiting completion</small>
          </div>

        </div>

      </section>


      {/* =====================================================
          REQUIREMENTS
          ===================================================== */}

      <section className="employee-compliance-section">

        <div className="employee-compliance-section-header">

          <div>
            <span>COMPLIANCE REQUIREMENTS</span>
            <h2>My Requirements</h2>
          </div>

          <div className="employee-compliance-filters">

            {["All", "Compliant", "Due Soon", "Pending"].map(
              (option) => (
                <button
                  key={option}
                  type="button"
                  className={
                    filter === option
                      ? "active"
                      : ""
                  }
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              )
            )}

          </div>

        </div>


        <div className="employee-compliance-list">

          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <article
                className="employee-compliance-item"
                key={item.id}
              >

                <div className="employee-compliance-item-icon">
                  {item.icon}
                </div>


                <div className="employee-compliance-item-content">

                  <div className="employee-compliance-item-title">

                    <div>
                      <h3>{item.title}</h3>

                      <span>
                        {item.category}
                      </span>
                    </div>

                    <div
                      className={`employee-compliance-status ${item.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {item.status === "Compliant" && (
                        <FaCheckCircle />
                      )}

                      {item.status === "Due Soon" && (
                        <FaExclamationTriangle />
                      )}

                      {item.status === "Pending" && (
                        <FaClock />
                      )}

                      {item.status}
                    </div>

                  </div>


                  <div className="employee-compliance-item-meta">

                    <div className="employee-compliance-progress-wrapper">

                      <div className="employee-compliance-progress">

                        <div
                          style={{
                            width: `${item.progress}%`,
                          }}
                        />

                      </div>

                      <span>
                        {item.progress}%
                      </span>

                    </div>


                    <div className="employee-compliance-due">
                      <FaCalendarAlt />
                      Due {item.dueDate}
                    </div>

                  </div>

                </div>


                <button
                  type="button"
                  className="employee-compliance-item-action"
                >
                  View
                  <FaArrowRight />
                </button>

              </article>
            ))
          ) : (
            <div className="employee-compliance-empty">
              <FaCheckCircle />
              <strong>No requirements found</strong>
              <span>
                There are no compliance items in this category.
              </span>
            </div>
          )}

        </div>

      </section>


      {/* =====================================================
          COMPLIANCE REMINDER
          ===================================================== */}

      <section className="employee-compliance-reminder">

        <div className="employee-compliance-reminder-icon">
          <FaExclamationTriangle />
        </div>

        <div>

          <strong>
            Keep your compliance up to date
          </strong>

          <p>
            Complete upcoming training and assessments
            before their deadlines to avoid compliance gaps.
          </p>

        </div>

        <button type="button">
          View Training
          <FaArrowRight />
        </button>

      </section>

    </div>
  );
};

export default EmployeeCompliance;