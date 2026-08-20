import React, { useMemo, useState } from "react";

import {
  FaBook,
  FaSearch,
  FaFilter,
  FaStar,
  FaRegStar,
  FaClock,
  FaChevronDown,
  FaEye,
  FaDownload,
  FaRobot,
  FaTimes,
} from "react-icons/fa";

import EmployeeSidebar from "../components/EmployeeSidebar";

import "./EmployeeSOPLibrary.css";


const EmployeeSOPLibrary = ({ profile }) => {

  /* =========================================================
     STATE
  ========================================================= */

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const [showFilters, setShowFilters] =
    useState(false);

  const [favorites, setFavorites] =
    useState([]);


  /* =========================================================
     SOP DATA
  ========================================================= */

  const sopData = [
    {
      id: 1,
      title: "Employee Onboarding Process",
      description:
        "Standard process for onboarding new employees and completing required activities.",
      category: "Human Resources",
      department: "Human Resources",
      status: "Published",
      version: "v2.1",
      lastUpdated: "Aug 12, 2026",
      owner: "HR Operations",
      readTime: "8 min",
      tags: [
        "Onboarding",
        "HR",
        "Employee",
      ],
    },

    {
      id: 2,
      title: "IT Access Request Procedure",
      description:
        "Process for requesting, approving and provisioning enterprise system access.",
      category: "IT Operations",
      department: "Technology",
      status: "Published",
      version: "v3.0",
      lastUpdated: "Aug 10, 2026",
      owner: "IT Operations",
      readTime: "6 min",
      tags: [
        "IT",
        "Access",
        "Security",
      ],
    },

    {
      id: 3,
      title: "Incident Reporting Procedure",
      description:
        "Guidelines for reporting, documenting and escalating workplace incidents.",
      category: "Compliance",
      department: "Compliance",
      status: "Published",
      version: "v1.8",
      lastUpdated: "Aug 08, 2026",
      owner: "Compliance Team",
      readTime: "7 min",
      tags: [
        "Incident",
        "Compliance",
        "Reporting",
      ],
    },

    {
      id: 4,
      title: "Leave Request Process",
      description:
        "Standard procedure for submitting, reviewing and approving employee leave requests.",
      category: "Human Resources",
      department: "Human Resources",
      status: "Published",
      version: "v2.4",
      lastUpdated: "Aug 05, 2026",
      owner: "HR Operations",
      readTime: "5 min",
      tags: [
        "Leave",
        "HR",
        "Attendance",
      ],
    },

    {
      id: 5,
      title: "Expense Reimbursement Procedure",
      description:
        "Process for submitting business expenses and completing reimbursement approval.",
      category: "Finance",
      department: "Finance",
      status: "Published",
      version: "v1.6",
      lastUpdated: "Jul 30, 2026",
      owner: "Finance Operations",
      readTime: "9 min",
      tags: [
        "Finance",
        "Expenses",
        "Reimbursement",
      ],
    },

    {
      id: 6,
      title: "Information Security Guidelines",
      description:
        "Enterprise security practices employees must follow when handling organizational information.",
      category: "Information Security",
      department: "Technology",
      status: "Published",
      version: "v4.2",
      lastUpdated: "Jul 28, 2026",
      owner: "Information Security",
      readTime: "12 min",
      tags: [
        "Security",
        "Information",
        "Policy",
      ],
    },

    {
      id: 7,
      title: "Customer Escalation Process",
      description:
        "Standard process for identifying, documenting and escalating customer issues.",
      category: "Operations",
      department: "Operations",
      status: "Published",
      version: "v2.0",
      lastUpdated: "Jul 25, 2026",
      owner: "Operations Team",
      readTime: "8 min",
      tags: [
        "Customer",
        "Escalation",
        "Operations",
      ],
    },

    {
      id: 8,
      title: "Document Management Procedure",
      description:
        "Guidelines for creating, storing, reviewing and maintaining enterprise documents.",
      category: "Operations",
      department: "Operations",
      status: "Under Review",
      version: "v1.3",
      lastUpdated: "Jul 22, 2026",
      owner: "Knowledge Management",
      readTime: "10 min",
      tags: [
        "Documents",
        "Knowledge",
        "Management",
      ],
    },
  ];


  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  const categories = [
    "All",
    ...new Set(
      sopData.map(
        (sop) => sop.category
      )
    ),
  ];

  const statuses = [
    "All",
    "Published",
    "Under Review",
  ];


  /* =========================================================
     FILTER SOPs
  ========================================================= */

  const filteredSOPs = useMemo(() => {

    const normalizedSearch =
      searchTerm
        .toLowerCase()
        .trim();

    return sopData.filter((sop) => {

      const matchesSearch =
        !normalizedSearch ||
        sop.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        sop.description
          .toLowerCase()
          .includes(normalizedSearch) ||
        sop.department
          .toLowerCase()
          .includes(normalizedSearch) ||
        sop.owner
          .toLowerCase()
          .includes(normalizedSearch) ||
        sop.tags.some((tag) =>
          tag
            .toLowerCase()
            .includes(normalizedSearch)
        );

      const matchesCategory =
        selectedCategory === "All" ||
        sop.category ===
          selectedCategory;

      const matchesStatus =
        selectedStatus === "All" ||
        sop.status ===
          selectedStatus;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });

  }, [
    searchTerm,
    selectedCategory,
    selectedStatus,
  ]);


  /* =========================================================
     FAVORITES
  ========================================================= */

  const toggleFavorite = (id) => {

    setFavorites((current) => {

      if (current.includes(id)) {

        return current.filter(
          (favoriteId) =>
            favoriteId !== id
        );

      }

      return [
        ...current,
        id,
      ];

    });

  };


  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {

    setSearchTerm("");

    setSelectedCategory("All");

    setSelectedStatus("All");

  };


  /* =========================================================
     ACTION HANDLERS
  ========================================================= */

  const handleViewSOP = (sop) => {
    console.log(
      "View SOP:",
      sop
    );
  };

  const handleDownloadSOP = (sop) => {
    console.log(
      "Download SOP:",
      sop
    );
  };

  const handleAskAI = (sop) => {
    console.log(
      "Ask AI about SOP:",
      sop
    );
  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div className="employee-sop-library-layout">


      {/* =====================================================
          EMPLOYEE SIDEBAR
      ===================================================== */}

      <aside className="employee-sop-library-sidebar">

        <EmployeeSidebar
          profile={profile}
        />

      </aside>


      {/* =====================================================
          MAIN PAGE CONTENT
      ===================================================== */}

      <main className="employee-sop-library-page">


        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <header className="employee-sop-library-header">

          <div className="employee-sop-library-header-content">

            <div className="employee-sop-library-title-wrapper">

              <div className="employee-sop-library-title-icon">
                <FaBook />
              </div>

              <div>

                <span className="employee-sop-library-eyebrow">
                  KNOWLEDGE REPOSITORY
                </span>

                <h1>
                  SOP Library
                </h1>

                <p>
                  Browse and access approved
                  Standard Operating Procedures
                  across the organization.
                </p>

              </div>

            </div>


            {/* ===============================================
                HEADER STATISTICS
            =============================================== */}

            <div className="employee-sop-library-header-stats">

              <div className="employee-sop-library-stat">

                <strong>
                  {sopData.length}
                </strong>

                <span>
                  Available SOPs
                </span>

              </div>


              <div className="employee-sop-library-stat">

                <strong>
                  {favorites.length}
                </strong>

                <span>
                  Favorites
                </span>

              </div>

            </div>

          </div>

        </header>


        {/* ===================================================
            SEARCH + FILTER BAR
        =================================================== */}

        <section className="employee-sop-library-toolbar">

          <div className="employee-sop-library-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search SOPs, processes, departments or keywords..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              aria-label="Search SOP library"
            />

            {searchTerm && (

              <button
                type="button"
                className="employee-sop-library-search-clear"
                onClick={() =>
                  setSearchTerm("")
                }
                aria-label="Clear search"
              >
                <FaTimes />
              </button>

            )}

          </div>


          <button
            type="button"
            className={`employee-sop-library-filter-button ${
              showFilters
                ? "employee-sop-library-filter-button-active"
                : ""
            }`}
            onClick={() =>
              setShowFilters(
                (current) =>
                  !current
              )
            }
          >

            <FaFilter />

            <span>
              Filters
            </span>

            <FaChevronDown
              className={
                showFilters
                  ? "employee-sop-library-filter-arrow-open"
                  : ""
              }
            />

          </button>

        </section>


        {/* ===================================================
            FILTER PANEL
        =================================================== */}

        {showFilters && (

          <section className="employee-sop-library-filter-panel">

            <div className="employee-sop-library-filter-group">

              <label>
                Category
              </label>

              <select
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(
                    event.target.value
                  )
                }
              >

                {categories.map(
                  (category) => (

                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>

                  )
                )}

              </select>

            </div>


            <div className="employee-sop-library-filter-group">

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

                {statuses.map(
                  (status) => (

                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>

                  )
                )}

              </select>

            </div>


            <button
              type="button"
              className="employee-sop-library-clear-filters"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </section>

        )}


        {/* ===================================================
            RESULTS HEADER
        =================================================== */}

        <div className="employee-sop-library-results-header">

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
              found
            </span>

          </div>


          {(searchTerm ||
            selectedCategory !==
              "All" ||
            selectedStatus !==
              "All") && (

            <button
              type="button"
              onClick={clearFilters}
            >
              Clear all filters
            </button>

          )}

        </div>


        {/* ===================================================
            SOP GRID
        =================================================== */}

        <section className="employee-sop-library-grid">

          {filteredSOPs.length > 0 ? (

            filteredSOPs.map(
              (sop) => {

                const isFavorite =
                  favorites.includes(
                    sop.id
                  );

                return (

                  <article
                    key={sop.id}
                    className="employee-sop-library-card"
                  >


                    {/* =========================================
                        CARD HEADER
                    ========================================= */}

                    <div className="employee-sop-library-card-header">

                      <div className="employee-sop-library-card-icon">
                        <FaBook />
                      </div>

                      <button
                        type="button"
                        className={`employee-sop-library-favorite ${
                          isFavorite
                            ? "employee-sop-library-favorite-active"
                            : ""
                        }`}
                        onClick={() =>
                          toggleFavorite(
                            sop.id
                          )
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


                    {/* =========================================
                        CATEGORY + STATUS
                    ========================================= */}

                    <div className="employee-sop-library-card-meta">

                      <span className="employee-sop-library-category">
                        {sop.category}
                      </span>

                      <span
                        className={`employee-sop-library-status ${
                          sop.status ===
                          "Published"
                            ? "employee-sop-library-status-published"
                            : "employee-sop-library-status-review"
                        }`}
                      >
                        {sop.status}
                      </span>

                    </div>


                    {/* =========================================
                        TITLE
                    ========================================= */}

                    <h2>
                      {sop.title}
                    </h2>


                    {/* =========================================
                        DESCRIPTION
                    ========================================= */}

                    <p className="employee-sop-library-description">
                      {sop.description}
                    </p>


                    {/* =========================================
                        TAGS
                    ========================================= */}

                    <div className="employee-sop-library-tags">

                      {sop.tags.map(
                        (tag) => (

                          <span
                            key={tag}
                          >
                            {tag}
                          </span>

                        )
                      )}

                    </div>


                    {/* =========================================
                        DETAILS
                    ========================================= */}

                    <div className="employee-sop-library-details">

                      <div>

                        <FaClock />

                        <span>
                          {sop.readTime}
                        </span>

                      </div>

                      <div>

                        <span>
                          {sop.version}
                        </span>

                      </div>

                      <div>

                        <span>
                          Updated{" "}
                          {sop.lastUpdated}
                        </span>

                      </div>

                    </div>


                    {/* =========================================
                        OWNER
                    ========================================= */}

                    <div className="employee-sop-library-owner">

                      <span>
                        Owner
                      </span>

                      <strong>
                        {sop.owner}
                      </strong>

                    </div>


                    {/* =========================================
                        ACTIONS
                    ========================================= */}

                    <div className="employee-sop-library-actions">

                      <button
                        type="button"
                        className="employee-sop-library-primary-action"
                        onClick={() =>
                          handleViewSOP(
                            sop
                          )
                        }
                      >

                        <FaEye />

                        <span>
                          View SOP
                        </span>

                      </button>


                      <button
                        type="button"
                        className="employee-sop-library-secondary-action"
                        onClick={() =>
                          handleAskAI(
                            sop
                          )
                        }
                        title="Ask AI about this SOP"
                      >
                        <FaRobot />
                      </button>


                      <button
                        type="button"
                        className="employee-sop-library-secondary-action"
                        onClick={() =>
                          handleDownloadSOP(
                            sop
                          )
                        }
                        title="Download SOP"
                      >
                        <FaDownload />
                      </button>

                    </div>

                  </article>

                );

              }
            )

          ) : (

            /* ===============================================
               EMPTY STATE
            =============================================== */

            <div className="employee-sop-library-empty">

              <div className="employee-sop-library-empty-icon">
                <FaSearch />
              </div>

              <h2>
                No SOPs Found
              </h2>

              <p>
                We couldn't find any SOPs
                matching your current
                search or filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          )}

        </section>

      </main>

    </div>
  );
};


export default EmployeeSOPLibrary;