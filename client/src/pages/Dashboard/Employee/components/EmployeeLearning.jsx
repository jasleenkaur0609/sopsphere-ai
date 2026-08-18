import React from "react";
import {
  BookOpen,
  Clock3,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";

import "./EmployeeLearning.css";

const EmployeeLearning = ({
  onNavigate,
}) => {
  const learningItems = [
    {
      id: 1,
      title: "SOP Fundamentals",
      category: "Core Learning",
      progress: 82,
      duration: "45 min",
      lessons: "8 lessons",
      status: "In Progress",
    },
    {
      id: 2,
      title: "AI-Powered SOP Management",
      category: "Recommended",
      progress: 55,
      duration: "1 hr 20 min",
      lessons: "10 lessons",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Compliance Essentials",
      category: "Compliance",
      progress: 100,
      duration: "35 min",
      lessons: "6 lessons",
      status: "Completed",
    },
  ];

  const handleLearningNavigation = () => {
    if (typeof onNavigate === "function") {
      onNavigate("/dashboard/training");
      return;
    }

    window.location.href = "/dashboard/training";
  };

  const handleCourseClick = (course) => {
    if (typeof onNavigate === "function") {
      onNavigate(
        `/dashboard/training?course=${course.id}`
      );
      return;
    }

    window.location.href =
      `/dashboard/training?course=${course.id}`;
  };

  return (
    <section className="employee-learning-section">
      {/* =====================================================
          SECTION HEADER
          ===================================================== */}

      <div className="employee-learning-header">
        <div className="employee-learning-heading">
          <div className="employee-learning-title-row">
            <div className="employee-learning-title-icon">
              <GraduationCap
                size={18}
                strokeWidth={1.9}
              />
            </div>

            <div>
              <span className="employee-learning-eyebrow">
                Development
              </span>

              <h2>Learning & Development</h2>
            </div>
          </div>

          <p>
            Continue your learning journey and build
            stronger SOP expertise.
          </p>
        </div>

        <button
          type="button"
          className="employee-learning-view-all"
          onClick={handleLearningNavigation}
        >
          <span>View Learning</span>

          <ArrowRight
            size={13}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* =====================================================
          COURSE LIST
          ===================================================== */}

      <div className="employee-learning-list">
        {learningItems.map((course) => {
          const isCompleted =
            course.progress === 100;

          return (
            <article
              className="employee-learning-card"
              key={course.id}
              onClick={() =>
                handleCourseClick(course)
              }
            >
              {/* Course Icon */}

              <div className="employee-learning-course-icon">
                {isCompleted ? (
                  <CheckCircle2
                    size={19}
                    strokeWidth={1.9}
                  />
                ) : (
                  <BookOpen
                    size={19}
                    strokeWidth={1.9}
                  />
                )}
              </div>

              {/* Course Content */}

              <div className="employee-learning-course-content">
                <div className="employee-learning-course-top">
                  <span className="employee-learning-category">
                    {course.category}
                  </span>

                  <span
                    className={`employee-learning-status ${
                      isCompleted
                        ? "employee-learning-status-completed"
                        : "employee-learning-status-progress"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                <h3>{course.title}</h3>

                <div className="employee-learning-course-meta">
                  <span>
                    <Clock3
                      size={11}
                      strokeWidth={1.9}
                    />

                    {course.duration}
                  </span>

                  <span>
                    <BookOpen
                      size={11}
                      strokeWidth={1.9}
                    />

                    {course.lessons}
                  </span>
                </div>

                {/* Progress */}

                <div className="employee-learning-progress-area">
                  <div className="employee-learning-progress-label">
                    <span>Progress</span>

                    <strong>
                      {course.progress}%
                    </strong>
                  </div>

                  <div className="employee-learning-progress-track">
                    <div
                      className={`employee-learning-progress-fill ${
                        isCompleted
                          ? "employee-learning-progress-complete"
                          : ""
                      }`}
                      style={{
                        width: `${course.progress}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action */}

              <button
                type="button"
                className="employee-learning-course-action"
                aria-label={`Open ${course.title}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleCourseClick(course);
                }}
              >
                {isCompleted ? (
                  <CheckCircle2
                    size={17}
                    strokeWidth={1.9}
                  />
                ) : (
                  <PlayCircle
                    size={18}
                    strokeWidth={1.9}
                  />
                )}
              </button>
            </article>
          );
        })}
      </div>

      {/* =====================================================
          LEARNING SUMMARY
          ===================================================== */}

      <div className="employee-learning-summary">
        <div className="employee-learning-summary-icon">
          <GraduationCap
            size={16}
            strokeWidth={1.9}
          />
        </div>

        <div className="employee-learning-summary-content">
          <strong>
            Keep building your expertise
          </strong>

          <span>
            Complete your assigned learning modules
            to stay up to date with organizational SOPs.
          </span>
        </div>

        <button
          type="button"
          className="employee-learning-summary-action"
          onClick={handleLearningNavigation}
        >
          Start Learning
          <ArrowRight
            size={12}
            strokeWidth={2}
          />
        </button>
      </div>
    </section>
  );
};

export default EmployeeLearning;