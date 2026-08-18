import React, { useMemo, useState } from "react";
import {
  FaBookOpen,
  FaSearch,
  FaFilter,
  FaStar,
  FaRegStar,
  FaClock,
  FaEye,
  FaDownload,
  FaRobot,
  FaEdit,
  FaCheckCircle,
  FaHourglassHalf,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";

import "./EmployeeMySOPs.css";

const EmployeeMySOPs = ({ profile }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const [favorites, setFavorites] = useState([]);

  /*
   * =========================================================
   * EMPLOYEE SOP DATA
   * =========================================================
   *
   * Temporary frontend data.
   *
   * This will later be replaced with data retrieved from
   * the backend based on the authenticated employee.
   */

  const mySOPData = [
    {
      id: 1,
      title: "Employee Onboarding Process",
      description:
        "Standard procedure for completing employee onboarding activities and required documentation.",
      type: "Assigned",
      status: "Completed",
      version: "v2.1",
      lastAccessed: "Aug 17, 2026",
      dueDate: "Completed",
      readTime: "8 min",
      progress: 100,
      owner: "HR Operations",
    },

    {
      id: 2,
      title: "Information Security Guidelines",
      description:
        "Required security practices for protecting organizational systems, data and information.",
      type: "Mandatory",
      status: "In Progress",
      version: "v4.2",
      lastAccessed: "Aug 16, 2026",
      dueDate: "Aug 25, 2026",
      readTime: "12 min",
      progress: 65,
      owner: "Information Security",
    },

    {
      id: 3,
      title: "IT Access Request Procedure",
      description:
        "Procedure for requesting and maintaining access to enterprise applications and systems.",
      type: "Assigned",
      status: "Not Started",
      version: "v3.0",
      lastAccessed: "Never",
      dueDate: "Aug 28, 2026",
      readTime: "6 min",
      progress: 0,
      owner: "IT Operations",
    },

    {
      id: 4,
      title: "Incident Reporting Procedure",
      description:
        "Guidelines for identifying, documenting and escalating workplace incidents.",
      type: "Mandatory",
      status: "In Progress",
      version: "v1.8",
      lastAccessed: "Aug 14, 2026",
      dueDate: "Sep 02, 2026",
      readTime: "7 min",
      progress: 40,
      owner: "Compliance Team",
    },

    {
      id: 5,
      title: "Document Management Procedure",
      description:
        "Guidelines for creating, maintaining, reviewing and managing enterprise documents.",
      type: "Created",
      status: "Draft",
      version: "v1.0",
      lastAccessed: "Aug 13, 2026",
      dueDate: "Sep 05, 2026",
      readTime: "10 min",
      progress: 25,
      owner: "Knowledge Management",
    },

    {
      id: 6,
      title: "Expense Reimbursement Procedure",
      description:
        "Process for submitting business expenses and completing reimbursement activities.",
      type: "Assigned",
      status: "Completed",
      version: "v1.6",
      lastAccessed: "Aug 08, 2026",
      dueDate: "Completed",
      readTime: "9 min",
      progress: 100,
      owner: "Finance Operations",
    },
  ];

  /*
   * =========================================================
   * FILTER OPTIONS
   * =========================================================
   */

  const statuses = [
    "All",
    "Not Started",
    "In Progress",
    "Completed",
    "Draft",
  ];

  const types = [
    "All",
    "Assigned",
    "Mandatory",
    "Created",
  ];

  /*
   * =========================================================
   * FILTER SOPs
   * =========================================================
   */

  const filteredSOPs = useMemo(() => {
    const normalizedSearch =
      searchTerm.toLowerCase().trim();

    return mySOPData.filter((sop) => {
      const matchesSearch =
        !normalizedSearch ||
        sop.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        sop.description
          .toLowerCase()
          .includes(normalizedSearch) ||
        sop.owner
          .toLowerCase()
          .includes(normalizedSearch) ||
        sop.type
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        selectedStatus === "All" ||
        sop.status === selectedStatus;

      const matchesType =
        selectedType === "All" ||
        sop.type === selectedType;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    searchTerm,
    selectedStatus,
    selectedType,
  ]);

  /*
   * =========================================================
   * STATISTICS
   * =========================================================
   */

  const totalSOPs = mySOPData.length;

  const completedSOPs = mySOPData.filter(
    (sop) => sop.status === "Completed"
  ).length;

  const inProgressSOPs = mySOPData.filter(
    (sop) => sop.status === "In Progress"
  ).length;

  const pendingSOPs = mySOPData.filter(
    (sop) =>
      sop.status === "Not Started"
  ).length;

  /*
   * =========================================================
   * FAVORITES
   * =========================================================
   */

  const toggleFavorite = (id) => {
    setFavorites((current) => {
      if (current.includes(id)) {
        return current.filter(
          (favoriteId) => favoriteId !== id
        );
      }

      return [...current, id];
    });
  };

  /*
   * =========================================================
   * CLEAR FILTERS
   * =========================================================
   */

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("All");
    setSelectedType("All");
  };

  /*
   * =========================================================
   * ACTIONS
   * =========================================================
   */

  const handleViewSOP = (sop) => {
    console.log("View employee SOP:", sop);
  };

  const handleDownloadSOP = (sop) => {
    console.log("Download employee SOP:", sop);
  };

  const handleAskAI = (sop) => {
    console.log("Ask AI about employee SOP:", sop);
  };

  const handleEditSOP = (sop) => {
    console.log("Edit employee SOP:", sop);
  };

  /*
   * =========================================================
   * STATUS ICON
   * =========================================================
   */

  const getStatusIcon = (status) => {
    if (status === "Completed") {
      return <FaCheckCircle />;
    }

    if (status === "In Progress") {
      return <FaHourglassHalf />;
    }

    if (status === "Not Started") {
      return <FaClock />;
    }

    return <FaEdit />;
  };

  /*
   * =========================================================
   * STATUS CLASS
   * =========================================================
   */

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "employee-my-sops-status-completed";
    }

    if (status === "In Progress") {
      return "employee-my-sops-status-progress";
    }

    if (status === "Not Started") {
      return "employee-my-sops-status-pending";
    }

    return "employee-my-sops-status-draft";
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="employee-my-sops-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="employee-my-sops-header">

        <div className="employee-my-sops-title-wrapper">

          <div className="employee-my-sops-title-icon">
            <FaBookOpen />
          </div>

          <div>

            <span className="employee-my-sops-eyebrow">
              Personal Workspace
            </span>

            <h1>
              My SOPs
            </h1>

            <p>
              View and manage SOPs assigned to you,
              required for your role, or created by you.
            </p>

          </div>

        </div>


        {/* =================================================
            SUMMARY STATISTICS
        ================================================= */}

        <div className="employee-my-sops-summary">

          <div className="employee-my-sops-summary-item">

            <strong>
              {totalSOPs}
            </strong>

            <span>
              Total
            </span>

          </div>

          <div className="employee-my-sops-summary-item">

            <strong>
              {completedSOPs}
            </strong>

            <span>
              Completed
            </span>

          </div>

          <div className="employee-my-sops-summary-item">

            <strong>
              {inProgressSOPs}
            </strong>

            <span>
              In Progress
            </span>

          </div>

          <div className="employee-my-sops-summary-item">

            <strong>
              {pendingSOPs}
            </strong>

            <span>
              Pending
            </span>

          </div>

        </div>

      </header>


      {/* =====================================================
          SEARCH TOOLBAR
      ===================================================== */}

      <section className="employee-my-sops-toolbar">

        <div className="employee-my-sops-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search your SOPs..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            aria-label="Search my SOPs"
          />

          {searchTerm && (
            <button
              type="button"
              className="employee-my-sops-search-clear"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}

        </div>


        <button
          type="button"
          className={`employee-my-sops-filter-button ${
            showFilters
              ? "employee-my-sops-filter-button-active"
              : ""
          }`}
          onClick={() =>
            setShowFilters((current) => !current)
          }
        >

          <FaFilter />

          <span>
            Filters
          </span>

          <FaChevronDown
            className={
              showFilters
                ? "employee-my-sops-filter-arrow-open"
                : ""
            }
          />

        </button>

      </section>


      {/* =====================================================
          FILTER PANEL
      ===================================================== */}

      {showFilters && (
        <section className="employee-my-sops-filter-panel">

          <div className="employee-my-sops-filter-group">

            <label>
              Status
            </label>

            <select
              value={selectedStatus}
              onChange={(event) =>
                setSelectedStatus(
                  event.target.value
                )
              }
            >

              {statuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}

            </select>

          </div>


          <div className="employee-my-sops-filter-group">

            <label>
              SOP Type
            </label>

            <select
              value={selectedType}
              onChange={(event) =>
                setSelectedType(
                  event.target.value
                )
              }
            >

              {types.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}

            </select>

          </div>


          <button
            type="button"
            className="employee-my-sops-clear-filters"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </section>
      )}


      {/* =====================================================
          RESULTS HEADER
      ===================================================== */}

      <div className="employee-my-sops-results-header">

        <div>

          <strong>
            {filteredSOPs.length}
          </strong>

          <span>
            {" "}
            SOP
            {filteredSOPs.length !== 1
              ? "s"
              : ""}{" "}
            in your workspace
          </span>

        </div>


        {(searchTerm ||
          selectedStatus !== "All" ||
          selectedType !== "All") && (

          <button
            type="button"
            onClick={clearFilters}
          >
            Clear all filters
          </button>

        )}

      </div>


      {/* =====================================================
          SOP LIST
      ===================================================== */}

      <main className="employee-my-sops-list">

        {filteredSOPs.length > 0 ? (

          filteredSOPs.map((sop) => {

            const isFavorite =
              favorites.includes(sop.id);

            return (
              <article
                key={sop.id}
                className="employee-my-sops-card"
              >

                {/* -------------------------------------------
                    CARD MAIN
                ------------------------------------------- */}

                <div className="employee-my-sops-card-main">

                  <div className="employee-my-sops-card-icon">
                    <FaBookOpen />
                  </div>


                  <div className="employee-my-sops-card-content">

                    <div className="employee-my-sops-card-top">

                      <div className="employee-my-sops-card-heading">

                        <div className="employee-my-sops-card-labels">

                          <span className="employee-my-sops-type">
                            {sop.type}
                          </span>

                          <span
                            className={`employee-my-sops-status ${getStatusClass(
                              sop.status
                            )}`}
                          >

                            {getStatusIcon(
                              sop.status
                            )}

                            {sop.status}

                          </span>

                        </div>


                        <h2>
                          {sop.title}
                        </h2>

                      </div>


                      <button
                        type="button"
                        className={`employee-my-sops-favorite ${
                          isFavorite
                            ? "employee-my-sops-favorite-active"
                            : ""
                        }`}
                        onClick={() =>
                          toggleFavorite(sop.id)
                        }
                        aria-label={
                          isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >

                        {isFavorite ? (
                          <FaStar />
                        ) : (
                          <FaRegStar />
                        )}

                      </button>

                    </div>


                    <p className="employee-my-sops-description">
                      {sop.description}
                    </p>


                    {/* ---------------------------------------
                        PROGRESS
                    --------------------------------------- */}

                    <div className="employee-my-sops-progress-wrapper">

                      <div className="employee-my-sops-progress-header">

                        <span>
                          Completion
                        </span>

                        <strong>
                          {sop.progress}%
                        </strong>

                      </div>

                      <div className="employee-my-sops-progress-track">

                        <div
                          className="employee-my-sops-progress-fill"
                          style={{
                            width: `${sop.progress}%`,
                          }}
                        />

                      </div>

                    </div>


                    {/* ---------------------------------------
                        DETAILS
                    --------------------------------------- */}

                    <div className="employee-my-sops-details">

                      <div>
                        <span>
                          Version
                        </span>

                        <strong>
                          {sop.version}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Last Accessed
                        </span>

                        <strong>
                          {sop.lastAccessed}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Due Date
                        </span>

                        <strong>
                          {sop.dueDate}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Reading Time
                        </span>

                        <strong>
                          {sop.readTime}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Owner
                        </span>

                        <strong>
                          {sop.owner}
                        </strong>
                      </div>

                    </div>

                  </div>

                </div>


                {/* =================================================
                    CARD ACTIONS
                ================================================= */}

                <div className="employee-my-sops-actions">

                  <button
                    type="button"
                    className="employee-my-sops-primary-action"
                    onClick={() =>
                      handleViewSOP(sop)
                    }
                  >
                    <FaEye />

                    <span>
                      {sop.status === "Not Started"
                        ? "Start SOP"
                        : "Open SOP"}
                    </span>

                  </button>


                  <button
                    type="button"
                    className="employee-my-sops-secondary-action"
                    onClick={() =>
                      handleAskAI(sop)
                    }
                    title="Ask AI about this SOP"
                  >
                    <FaRobot />
                  </button>


                  <button
                    type="button"
                    className="employee-my-sops-secondary-action"
                    onClick={() =>
                      handleDownloadSOP(sop)
                    }
                    title="Download SOP"
                  >
                    <FaDownload />
                  </button>


                  {sop.type === "Created" && (
                    <button
                      type="button"
                      className="employee-my-sops-secondary-action"
                      onClick={() =>
                        handleEditSOP(sop)
                      }
                      title="Edit SOP"
                    >
                      <FaEdit />
                    </button>
                  )}

                </div>

              </article>
            );
          })

        ) : (

          /* ===================================================
             EMPTY STATE
          =================================================== */

          <div className="employee-my-sops-empty">

            <div className="employee-my-sops-empty-icon">
              <FaBookOpen />
            </div>

            <h2>
              No SOPs Found
            </h2>

            <p>
              There are no SOPs matching your current
              search or filter selection.
            </p>

            <button
              type="button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>

        )}

      </main>

    </div>
  );
};

export default EmployeeMySOPs;