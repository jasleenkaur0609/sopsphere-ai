import React, { useMemo, useState } from "react";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaArrowRight,
} from "react-icons/fa";

import "./EmployeeTasks.css";

const EmployeeTasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Review Information Security SOP",
      description:
        "Review the latest Information Security SOP and acknowledge completion.",
      category: "SOP",
      priority: "High",
      status: "Pending",
      dueDate: "Aug 22, 2026",
    },
    {
      id: 2,
      title: "Complete Data Privacy Training",
      description:
        "Complete the mandatory employee data privacy training module.",
      category: "Training",
      priority: "Medium",
      status: "In Progress",
      dueDate: "Aug 25, 2026",
    },
    {
      id: 3,
      title: "Submit Process Improvement Suggestion",
      description:
        "Submit one improvement suggestion for an existing business process.",
      category: "Improvement",
      priority: "Low",
      status: "Pending",
      dueDate: "Aug 28, 2026",
    },
    {
      id: 4,
      title: "Complete Quarterly Compliance Review",
      description:
        "Review your assigned compliance requirements and confirm completion.",
      category: "Compliance",
      priority: "High",
      status: "Completed",
      dueDate: "Aug 18, 2026",
    },
    {
      id: 5,
      title: "Review Updated SOP Guidelines",
      description:
        "Read the updated enterprise SOP documentation guidelines.",
      category: "SOP",
      priority: "Medium",
      status: "Completed",
      dueDate: "Aug 16, 2026",
    },
  ]);

  const filters = [
    "All",
    "Pending",
    "In Progress",
    "Completed",
  ];

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter =
        filter === "All" || task.status === filter;

      const query = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, searchTerm]);

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completionRate =
    tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

  const handleComplete = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status: "Completed",
            }
          : task
      )
    );
  };

  return (
    <div className="employee-tasks-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="employee-tasks-header">

        <div className="employee-tasks-title">

          <div className="employee-tasks-title-icon">
            <FaTasks />
          </div>

          <div>
            <span className="employee-tasks-eyebrow">
              WORK MANAGEMENT
            </span>

            <h1>My Tasks</h1>

            <p>
              View, manage, and complete your assigned
              employee tasks and activities.
            </p>
          </div>

        </div>

      </header>


      {/* =====================================================
          KPI SUMMARY
          ===================================================== */}

      <section className="employee-tasks-summary">

        <div className="employee-task-summary-card">

          <div className="employee-task-summary-icon">
            <FaTasks />
          </div>

          <div>
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>

        </div>


        <div className="employee-task-summary-card">

          <div className="employee-task-summary-icon">
            <FaClock />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>

        </div>


        <div className="employee-task-summary-card">

          <div className="employee-task-summary-icon">
            <FaExclamationCircle />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{inProgressTasks}</strong>
          </div>

        </div>


        <div className="employee-task-summary-card">

          <div className="employee-task-summary-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>Completion</span>
            <strong>{completionRate}%</strong>
          </div>

        </div>

      </section>


      {/* =====================================================
          TASK CONTAINER
          ===================================================== */}

      <section className="employee-tasks-container">

        {/* =================================================
            TOOLBAR
            ================================================= */}

        <div className="employee-tasks-toolbar">

          <div>

            <span className="employee-tasks-toolbar-label">
              ASSIGNED WORK
            </span>

            <h2>
              Task List
            </h2>

          </div>


          <div className="employee-tasks-toolbar-actions">

            <div className="employee-tasks-search">

              <FaSearch />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search tasks..."
              />

            </div>


            <div className="employee-tasks-filter">

              <FaFilter />

              <select
                value={filter}
                onChange={(event) =>
                  setFilter(event.target.value)
                }
              >

                {filters.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

              <FaChevronDown />

            </div>

          </div>

        </div>


        {/* =================================================
            TASK LIST
            ================================================= */}

        <div className="employee-tasks-list">

          {filteredTasks.length > 0 ? (

            filteredTasks.map((task) => (

              <article
                className={`employee-task-item employee-task-${task.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
                key={task.id}
              >

                <div className="employee-task-main">

                  <div className="employee-task-status-icon">

                    {task.status === "Completed" ? (
                      <FaCheckCircle />
                    ) : task.status === "In Progress" ? (
                      <FaClock />
                    ) : (
                      <FaTasks />
                    )}

                  </div>


                  <div className="employee-task-content">

                    <div className="employee-task-title-row">

                      <h3>
                        {task.title}
                      </h3>

                      <span
                        className={`employee-task-priority employee-task-priority-${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>

                    </div>

                    <p>
                      {task.description}
                    </p>


                    <div className="employee-task-meta">

                      <span>
                        {task.category}
                      </span>

                      <span>•</span>

                      <span>
                        Due {task.dueDate}
                      </span>

                    </div>

                  </div>

                </div>


                <div className="employee-task-actions">

                  <span
                    className={`employee-task-status employee-task-status-${task.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {task.status}
                  </span>


                  {task.status !== "Completed" && (

                    <button
                      type="button"
                      onClick={() =>
                        handleComplete(task.id)
                      }
                      className="employee-task-complete-button"
                    >
                      <FaCheckCircle />
                      Complete
                    </button>

                  )}

                  <button
                    type="button"
                    className="employee-task-view-button"
                  >
                    View
                    <FaArrowRight />
                  </button>

                </div>

              </article>

            ))

          ) : (

            <div className="employee-tasks-empty">

              <FaTasks />

              <strong>
                No tasks found
              </strong>

              <span>
                Try changing your search or filter.
              </span>

            </div>

          )}

        </div>

      </section>

    </div>
  );
};

export default EmployeeTasks;