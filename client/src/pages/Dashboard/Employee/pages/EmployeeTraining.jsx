import React, { useMemo, useState } from "react";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronRight,
  FaClock,
  FaGraduationCap,
  FaPlay,
  FaSearch,
  FaFilter,
  FaChartLine,
  FaAward,
  FaTimes,
} from "react-icons/fa";

import "./EmployeeTraining.css";

const EmployeeTraining = ({ profile }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTraining, setSelectedTraining] = useState(null);

  /*
   * =========================================================
   * TRAINING DATA
   * =========================================================
   *
   * Temporary frontend data.
   * This will later be replaced with training data from
   * the backend/database.
   */

  const trainingPrograms = [
    {
      id: 1,
      title: "Information Security Awareness",
      category: "Compliance",
      description:
        "Learn the organization's information security policies, security responsibilities, and safe working practices.",
      status: "In Progress",
      progress: 68,
      duration: "45 min",
      lessons: 8,
      completedLessons: 5,
      dueDate: "Aug 28, 2026",
      level: "Required",
      instructor: "Information Security Team",
    },
    {
      id: 2,
      title: "AI SOP Management Fundamentals",
      category: "Technology",
      description:
        "Understand how to create, review, manage, and use enterprise SOPs through the AI SOP Portal.",
      status: "Assigned",
      progress: 0,
      duration: "35 min",
      lessons: 6,
      completedLessons: 0,
      dueDate: "Sep 02, 2026",
      level: "Recommended",
      instructor: "Learning & Development",
    },
    {
      id: 3,
      title: "Data Privacy & Protection",
      category: "Compliance",
      description:
        "Learn the key principles of responsible data handling, privacy protection, and secure information processing.",
      status: "Completed",
      progress: 100,
      duration: "40 min",
      lessons: 7,
      completedLessons: 7,
      dueDate: "Aug 15, 2026",
      level: "Required",
      instructor: "Compliance Team",
    },
    {
      id: 4,
      title: "Workplace Communication",
      category: "Professional Development",
      description:
        "Improve professional communication, collaboration, documentation, and workplace interaction skills.",
      status: "Assigned",
      progress: 0,
      duration: "30 min",
      lessons: 5,
      completedLessons: 0,
      dueDate: "Sep 10, 2026",
      level: "Recommended",
      instructor: "Learning & Development",
    },
    {
      id: 5,
      title: "Enterprise Process Excellence",
      category: "Operations",
      description:
        "Explore standardized processes, continuous improvement principles, process documentation, and operational excellence.",
      status: "In Progress",
      progress: 32,
      duration: "55 min",
      lessons: 10,
      completedLessons: 3,
      dueDate: "Sep 18, 2026",
      level: "Recommended",
      instructor: "Operations Excellence Team",
    },
    {
      id: 6,
      title: "Cybersecurity Essentials",
      category: "Security",
      description:
        "Build foundational cybersecurity awareness covering passwords, phishing, device security, and incident reporting.",
      status: "Completed",
      progress: 100,
      duration: "50 min",
      lessons: 9,
      completedLessons: 9,
      dueDate: "Aug 08, 2026",
      level: "Required",
      instructor: "Cybersecurity Team",
    },
  ];

  /*
   * =========================================================
   * FILTER OPTIONS
   * =========================================================
   */

  const filters = [
    "All",
    "Assigned",
    "In Progress",
    "Completed",
  ];

  /*
   * =========================================================
   * FILTER TRAINING
   * =========================================================
   */

  const filteredTraining = useMemo(() => {
    const normalizedSearch = searchTerm
      .toLowerCase()
      .trim();

    return trainingPrograms.filter((training) => {
      const matchesFilter =
        activeFilter === "All" ||
        training.status === activeFilter;

      const matchesSearch =
        !normalizedSearch ||
        training.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        training.category
          .toLowerCase()
          .includes(normalizedSearch) ||
        training.description
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  /*
   * =========================================================
   * STATISTICS
   * =========================================================
   */

  const totalTraining = trainingPrograms.length;

  const completedTraining = trainingPrograms.filter(
    (training) => training.status === "Completed"
  ).length;

  const inProgressTraining = trainingPrograms.filter(
    (training) => training.status === "In Progress"
  ).length;

  const assignedTraining = trainingPrograms.filter(
    (training) => training.status === "Assigned"
  ).length;

  const overallProgress = Math.round(
    trainingPrograms.reduce(
      (total, training) => total + training.progress,
      0
    ) / totalTraining
  );

  /*
   * =========================================================
   * PROFILE NAME
   * =========================================================
   */

  const employeeName =
    profile?.name ||
    profile?.fullName ||
    "Employee";

  /*
   * =========================================================
   * STATUS CLASS
   * =========================================================
   */

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "employee-training-status-completed";
    }

    if (status === "In Progress") {
      return "employee-training-status-progress";
    }

    return "employee-training-status-assigned";
  };

  /*
   * =========================================================
   * OPEN TRAINING
   * =========================================================
   */

  const handleOpenTraining = (training) => {
    setSelectedTraining(training);
  };

  /*
   * =========================================================
   * CLOSE TRAINING
   * =========================================================
   */

  const handleCloseTraining = () => {
    setSelectedTraining(null);
  };

  /*
   * =========================================================
   * CLEAR SEARCH
   * =========================================================
   */

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  /*
   * =========================================================
   * TRAINING DETAIL MODAL
   * =========================================================
   */

  if (selectedTraining) {
    return (
      <div className="employee-training-page">

        <div className="employee-training-detail-page">

          <button
            type="button"
            className="employee-training-detail-close"
            onClick={handleCloseTraining}
            aria-label="Close training details"
          >
            <FaTimes />
          </button>


          <div className="employee-training-detail-icon">
            <FaGraduationCap />
          </div>


          <span className="employee-training-eyebrow">
            TRAINING PROGRAM
          </span>


          <h1>
            {selectedTraining.title}
          </h1>


          <p className="employee-training-detail-description">
            {selectedTraining.description}
          </p>


          <div className="employee-training-detail-meta">

            <div>
              <span>Category</span>
              <strong>
                {selectedTraining.category}
              </strong>
            </div>

            <div>
              <span>Duration</span>
              <strong>
                {selectedTraining.duration}
              </strong>
            </div>

            <div>
              <span>Lessons</span>
              <strong>
                {selectedTraining.lessons}
              </strong>
            </div>

            <div>
              <span>Level</span>
              <strong>
                {selectedTraining.level}
              </strong>
            </div>

          </div>


          <div className="employee-training-detail-progress">

            <div className="employee-training-detail-progress-header">

              <span>
                Training Progress
              </span>

              <strong>
                {selectedTraining.progress}%
              </strong>

            </div>

            <div className="employee-training-progress-track">

              <div
                className="employee-training-progress-fill"
                style={{
                  width: `${selectedTraining.progress}%`,
                }}
              />

            </div>

            <p>
              {selectedTraining.completedLessons} of{" "}
              {selectedTraining.lessons} lessons completed
            </p>

          </div>


          <div className="employee-training-detail-info">

            <div>
              <FaCalendarAlt />

              <span>
                Due date
              </span>

              <strong>
                {selectedTraining.dueDate}
              </strong>
            </div>


            <div>
              <FaBookOpen />

              <span>
                Instructor
              </span>

              <strong>
                {selectedTraining.instructor}
              </strong>
            </div>

          </div>


          <div className="employee-training-detail-actions">

            <button
              type="button"
              className="employee-training-primary-button"
              onClick={() =>
                console.log(
                  "Start training:",
                  selectedTraining.title
                )
              }
            >

              <FaPlay />

              <span>
                {selectedTraining.status === "Completed"
                  ? "Review Training"
                  : selectedTraining.status ===
                    "In Progress"
                  ? "Continue Training"
                  : "Start Training"}
              </span>

              <FaChevronRight />

            </button>


            <button
              type="button"
              className="employee-training-secondary-button"
              onClick={handleCloseTraining}
            >
              Back to Training
            </button>

          </div>

        </div>

      </div>
    );
  }

  /*
   * =========================================================
   * MAIN TRAINING PAGE
   * =========================================================
   */

  return (
    <div className="employee-training-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="employee-training-header">

        <div className="employee-training-title-wrapper">

          <div className="employee-training-title-icon">
            <FaGraduationCap />
          </div>

          <div>

            <span className="employee-training-eyebrow">
              LEARNING & DEVELOPMENT
            </span>

            <h1>
              Training & Learning
            </h1>

            <p>
              Welcome back, {employeeName}. Continue your
              assigned learning and build your skills.
            </p>

          </div>

        </div>


        <div className="employee-training-header-action">

          <FaAward />

          <span>
            {completedTraining} Completed
          </span>

        </div>

      </header>


      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <section className="employee-training-kpis">

        <div className="employee-training-kpi-card">

          <div className="employee-training-kpi-icon">
            <FaBookOpen />
          </div>

          <div>

            <span>
              Total Training
            </span>

            <strong>
              {totalTraining}
            </strong>

          </div>

        </div>


        <div className="employee-training-kpi-card">

          <div className="employee-training-kpi-icon">
            <FaClock />
          </div>

          <div>

            <span>
              In Progress
            </span>

            <strong>
              {inProgressTraining}
            </strong>

          </div>

        </div>


        <div className="employee-training-kpi-card">

          <div className="employee-training-kpi-icon">
            <FaCheckCircle />
          </div>

          <div>

            <span>
              Completed
            </span>

            <strong>
              {completedTraining}
            </strong>

          </div>

        </div>


        <div className="employee-training-kpi-card">

          <div className="employee-training-kpi-icon">
            <FaChartLine />
          </div>

          <div>

            <span>
              Overall Progress
            </span>

            <strong>
              {overallProgress}%
            </strong>

          </div>

        </div>

      </section>


      {/* =====================================================
          OVERALL PROGRESS
      ===================================================== */}

      <section className="employee-training-overview">

        <div className="employee-training-overview-heading">

          <div>

            <span>
              YOUR LEARNING JOURNEY
            </span>

            <h2>
              Overall Training Progress
            </h2>

          </div>

          <strong>
            {overallProgress}%
          </strong>

        </div>


        <div className="employee-training-overview-track">

          <div
            className="employee-training-overview-fill"
            style={{
              width: `${overallProgress}%`,
            }}
          />

        </div>


        <div className="employee-training-overview-footer">

          <span>
            {completedTraining} of {totalTraining} training
            programs completed
          </span>

          <span>
            {assignedTraining} assigned
          </span>

        </div>

      </section>


      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <section className="employee-training-toolbar">

        <div className="employee-training-search">

          <FaSearch />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search training programs..."
          />

          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}

        </div>


        <div className="employee-training-filters">

          <FaFilter />

          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={
                activeFilter === filter
                  ? "employee-training-filter-active"
                  : ""
              }
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>
          ))}

        </div>

      </section>


      {/* =====================================================
          TRAINING LIST
      ===================================================== */}

      <section className="employee-training-list-section">

        <div className="employee-training-list-heading">

          <div>

            <span>
              AVAILABLE PROGRAMS
            </span>

            <h2>
              Your Training
            </h2>

          </div>

          <span>
            {filteredTraining.length} programs
          </span>

        </div>


        {filteredTraining.length > 0 ? (

          <div className="employee-training-grid">

            {filteredTraining.map((training) => (

              <article
                key={training.id}
                className="employee-training-card"
              >

                <div className="employee-training-card-top">

                  <div className="employee-training-card-icon">
                    <FaBookOpen />
                  </div>

                  <span
                    className={`employee-training-status ${getStatusClass(
                      training.status
                    )}`}
                  >
                    {training.status}
                  </span>

                </div>


                <span className="employee-training-category">
                  {training.category}
                </span>


                <h3>
                  {training.title}
                </h3>


                <p>
                  {training.description}
                </p>


                <div className="employee-training-card-meta">

                  <span>
                    <FaClock />
                    {training.duration}
                  </span>

                  <span>
                    <FaBookOpen />
                    {training.lessons} lessons
                  </span>

                </div>


                <div className="employee-training-card-progress">

                  <div className="employee-training-card-progress-heading">

                    <span>
                      Progress
                    </span>

                    <strong>
                      {training.progress}%
                    </strong>

                  </div>

                  <div className="employee-training-progress-track">

                    <div
                      className="employee-training-progress-fill"
                      style={{
                        width: `${training.progress}%`,
                      }}
                    />

                  </div>

                </div>


                <div className="employee-training-card-footer">

                  <div>

                    <span>
                      Due
                    </span>

                    <strong>
                      {training.dueDate}
                    </strong>

                  </div>


                  <button
                    type="button"
                    onClick={() =>
                      handleOpenTraining(training)
                    }
                  >

                    <span>
                      {training.status ===
                      "Completed"
                        ? "Review"
                        : training.status ===
                          "In Progress"
                        ? "Continue"
                        : "Start"}
                    </span>

                    <FaChevronRight />

                  </button>

                </div>

              </article>

            ))}

          </div>

        ) : (

          <div className="employee-training-empty">

            <div className="employee-training-empty-icon">
              <FaSearch />
            </div>

            <h3>
              No Training Found
            </h3>

            <p>
              No training programs match your current
              search or filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveFilter("All");
              }}
            >
              Clear Filters
            </button>

          </div>

        )}

      </section>

    </div>
  );
};

export default EmployeeTraining;