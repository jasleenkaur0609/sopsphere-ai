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
  FaSortAmountDown,
  FaArrowUp,
  FaArrowDown,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

import EmployeeSidebar from "../components/EmployeeSidebar";

import "./EmployeeMySOPs.css";


const EmployeeMySOPs = ({ profile }) => {

  /* =========================================================
     STATE
     ========================================================= */

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const [selectedType, setSelectedType] =
    useState("All");

  const [showFilters, setShowFilters] =
    useState(false);

  const [showSort, setShowSort] =
    useState(false);

  const [sortBy, setSortBy] =
    useState("recent");

  const [favorites, setFavorites] =
    useState([]);

  const [showFavoritesOnly, setShowFavoritesOnly] =
    useState(false);


  /* =========================================================
     SOP DATA
     ========================================================= */

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


  /* =========================================================
     FILTER OPTIONS
     ========================================================= */

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


  /* =========================================================
     SORT OPTIONS
     ========================================================= */

  const sortOptions = [
    {
      value: "recent",
      label: "Recently Accessed",
    },
    {
      value: "titleAsc",
      label: "Title A–Z",
    },
    {
      value: "titleDesc",
      label: "Title Z–A",
    },
    {
      value: "progressHigh",
      label: "Progress: High to Low",
    },
    {
      value: "progressLow",
      label: "Progress: Low to High",
    },
  ];


  /* =========================================================
     FILTER + SORT SOPs
     ========================================================= */

  const filteredSOPs = useMemo(() => {

    const normalizedSearch =
      searchTerm.toLowerCase().trim();

    let results = mySOPData.filter((sop) => {

      const searchableText = [
        sop.title,
        sop.description,
        sop.owner,
        sop.type,
        sop.status,
        sop.version,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        searchableText.includes(normalizedSearch);

      const matchesStatus =
        selectedStatus === "All" ||
        sop.status === selectedStatus;

      const matchesType =
        selectedType === "All" ||
        sop.type === selectedType;

      const matchesFavorites =
        !showFavoritesOnly ||
        favorites.includes(sop.id);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesFavorites
      );
    });


    /* ---------------------------------------------------------
       SORT
    --------------------------------------------------------- */

    results = [...results].sort((a, b) => {

      if (sortBy === "titleAsc") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "titleDesc") {
        return b.title.localeCompare(a.title);
      }

      if (sortBy === "progressHigh") {
        return b.progress - a.progress;
      }

      if (sortBy === "progressLow") {
        return a.progress - b.progress;
      }

      if (sortBy === "recent") {

        if (
          a.lastAccessed === "Never" &&
          b.lastAccessed === "Never"
        ) {
          return 0;
        }

        if (a.lastAccessed === "Never") {
          return 1;
        }

        if (b.lastAccessed === "Never") {
          return -1;
        }

        return (
          new Date(b.lastAccessed) -
          new Date(a.lastAccessed)
        );
      }

      return 0;
    });


    return results;

  }, [
    searchTerm,
    selectedStatus,
    selectedType,
    sortBy,
    favorites,
    showFavoritesOnly,
  ]);


  /* =========================================================
     KPI STATISTICS
     ========================================================= */

  const totalSOPs =
    mySOPData.length;

  const completedSOPs =
    mySOPData.filter(
      (sop) => sop.status === "Completed"
    ).length;

  const inProgressSOPs =
    mySOPData.filter(
      (sop) => sop.status === "In Progress"
    ).length;

  const pendingSOPs =
    mySOPData.filter(
      (sop) =>
        sop.status === "Not Started" ||
        sop.status === "Draft"
    ).length;


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

    setSelectedStatus("All");

    setSelectedType("All");

    setShowFavoritesOnly(false);

    setSortBy("recent");

  };


  /* =========================================================
     ACTIVE FILTER COUNT
     ========================================================= */

  const activeFilterCount =
    [
      selectedStatus !== "All",
      selectedType !== "All",
      showFavoritesOnly,
    ].filter(Boolean).length;


  /* =========================================================
     ACTIONS
     ========================================================= */

  const handleViewSOP = (sop) => {

    /*
     * Replace this with your SOP viewer route
     * when the SOP details/viewer page is available.
     */

    console.log(
      "Opening SOP:",
      sop
    );

    alert(
      `Opening "${sop.title}"`
    );

  };


  const handleDownloadSOP = (sop) => {

    /*
     * Creates a small downloadable text representation
     * until the real backend/document download API
     * is connected.
     */

    const content = `
SOP INTELLIGENCE
================

Title: ${sop.title}
Type: ${sop.type}
Status: ${sop.status}
Version: ${sop.version}
Owner: ${sop.owner}

Description:
${sop.description}

Progress:
${sop.progress}%

Last Accessed:
${sop.lastAccessed}

Due Date:
${sop.dueDate}

Reading Time:
${sop.readTime}
`;

    const blob =
      new Blob(
        [content],
        {
          type: "text/plain",
        }
      );

    const url =
      URL.createObjectURL(blob);

    const anchor =
      document.createElement("a");

    anchor.href = url;

    anchor.download =
      `${sop.title.replace(
        /\s+/g,
        "-"
      )}.txt`;

    document.body.appendChild(
      anchor
    );

    anchor.click();

    document.body.removeChild(
      anchor
    );

    URL.revokeObjectURL(
      url
    );

  };


  const handleAskAI = (sop) => {

    console.log(
      "Ask AI about:",
      sop
    );

    alert(
      `AI Assistant: Ask anything about "${sop.title}".`
    );

  };


  const handleEditSOP = (sop) => {

    console.log(
      "Edit SOP:",
      sop
    );

    alert(
      `Editing "${sop.title}"`
    );

  };


  /* =========================================================
     STATUS ICON
     ========================================================= */

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


  /* =========================================================
     STATUS CLASS
     ========================================================= */

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


  /* =========================================================
     RENDER
     ========================================================= */

  return (

    <div className="employee-my-sops-layout">


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="employee-my-sops-sidebar">

        <EmployeeSidebar
          profile={profile}
        />

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="employee-my-sops-content">


        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <header className="employee-my-sops-header">


          {/* -------------------------------------------------
              TITLE
          ------------------------------------------------- */}

          <div className="employee-my-sops-title-wrapper">

            <div className="employee-my-sops-title-icon">

              <FaBookOpen />

            </div>


            <div>

              <span className="employee-my-sops-eyebrow">
                SOP WORKSPACE
              </span>

              <h1>
                My SOPs
              </h1>

              <p>
                View, track and manage the SOPs
                assigned to you or created by you.
              </p>

            </div>

          </div>


          {/* -------------------------------------------------
              KPI SUMMARY
          ------------------------------------------------- */}

          <div className="employee-my-sops-kpis">


            <div className="employee-my-sops-kpi">

              <span>
                Total SOPs
              </span>

              <strong>
                {totalSOPs}
              </strong>

            </div>


            <div className="employee-my-sops-kpi">

              <span>
                Completed
              </span>

              <strong>
                {completedSOPs}
              </strong>

            </div>


            <div className="employee-my-sops-kpi">

              <span>
                In Progress
              </span>

              <strong>
                {inProgressSOPs}
              </strong>

            </div>


            <div className="employee-my-sops-kpi">

              <span>
                Pending
              </span>

              <strong>
                {pendingSOPs}
              </strong>

            </div>


          </div>

        </header>


        {/* ===================================================
            TOOLBAR
        =================================================== */}

        <section className="employee-my-sops-toolbar">


          {/* -------------------------------------------------
              SEARCH
          ------------------------------------------------- */}

          <div className="employee-my-sops-search">

            <FaSearch />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              placeholder="Search SOPs by title, keyword, owner..."
              aria-label="Search my SOPs"
            />


            {searchTerm && (

              <button
                type="button"
                className="employee-my-sops-search-clear"
                onClick={() =>
                  setSearchTerm("")
                }
                aria-label="Clear search"
              >

                <FaTimes />

              </button>

            )}

          </div>


          {/* -------------------------------------------------
              FILTER BUTTON
          ------------------------------------------------- */}

          <button
            type="button"
            className={`employee-my-sops-filter-button ${
              showFilters
                ? "employee-my-sops-filter-button-active"
                : ""
            }`}
            onClick={() =>
              setShowFilters(
                (current) => !current
              )
            }
          >

            <FaFilter />

            <span>
              Filters
            </span>


            {activeFilterCount > 0 && (

              <span className="employee-my-sops-filter-count">
                {activeFilterCount}
              </span>

            )}


            <FaChevronDown
              className={
                showFilters
                  ? "employee-my-sops-filter-arrow-open"
                  : ""
              }
            />

          </button>


          {/* -------------------------------------------------
              FAVORITES
          ------------------------------------------------- */}

          <button
            type="button"
            className={`employee-my-sops-favorites-toggle ${
              showFavoritesOnly
                ? "active"
                : ""
            }`}
            onClick={() =>
              setShowFavoritesOnly(
                (current) => !current
              )
            }
          >

            {showFavoritesOnly ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}

            <span>
              Favorites
            </span>

            {favorites.length > 0 && (
              <small>
                {favorites.length}
              </small>
            )}

          </button>


          {/* -------------------------------------------------
              SORT
          ------------------------------------------------- */}

          <div className="employee-my-sops-sort-wrapper">

            <button
              type="button"
              className={`employee-my-sops-sort-button ${
                showSort
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setShowSort(
                  (current) => !current
                )
              }
            >

              <FaSortAmountDown />

              <span>
                Sort
              </span>

              <FaChevronDown
                className={
                  showSort
                    ? "employee-my-sops-filter-arrow-open"
                    : ""
                }
              />

            </button>


            {showSort && (

              <div className="employee-my-sops-sort-menu">

                {sortOptions.map(
                  (option) => (

                    <button
                      key={option.value}
                      type="button"
                      className={
                        sortBy ===
                        option.value
                          ? "active"
                          : ""
                      }
                      onClick={() => {

                        setSortBy(
                          option.value
                        );

                        setShowSort(
                          false
                        );

                      }}
                    >

                      {option.label}

                    </button>

                  )
                )}

              </div>

            )}

          </div>

        </section>


        {/* ===================================================
            FILTER PANEL
        =================================================== */}

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

                {types.map(
                  (type) => (

                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>

                  )
                )}

              </select>

            </div>


            <div className="employee-my-sops-filter-summary">

              <span>
                Active filters
              </span>

              <strong>
                {activeFilterCount}
              </strong>

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


        {/* ===================================================
            RESULTS BAR
        =================================================== */}

        <div className="employee-my-sops-results-bar">


          <div>

            <strong>
              {filteredSOPs.length}
            </strong>

            <span>

              {" "}

              SOP
              {filteredSOPs.length !== 1
                ? "s"
                : ""}

              {" "}
              found

            </span>

          </div>


          <div className="employee-my-sops-results-actions">

            {showFavoritesOnly && (

              <span className="employee-my-sops-active-chip">

                <FaStar />

                Favorites only

              </span>

            )}


            {selectedStatus !== "All" && (

              <span className="employee-my-sops-active-chip">

                Status: {selectedStatus}

              </span>

            )}


            {selectedType !== "All" && (

              <span className="employee-my-sops-active-chip">

                Type: {selectedType}

              </span>

            )}


            {(searchTerm ||
              selectedStatus !== "All" ||
              selectedType !== "All" ||
              showFavoritesOnly) && (

              <button
                type="button"
                onClick={clearFilters}
                className="employee-my-sops-clear-all"
              >

                Clear all

              </button>

            )}

          </div>

        </div>


        {/* ===================================================
            SOP LIST
        =================================================== */}

        <main className="employee-my-sops-list">


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
                    className="employee-my-sops-card"
                  >


                    {/* =====================================
                        CARD MAIN
                    ===================================== */}

                    <div className="employee-my-sops-card-main">


                      {/* DOCUMENT ICON */}

                      <div className="employee-my-sops-card-icon">

                        <FaBookOpen />

                      </div>


                      {/* CONTENT */}

                      <div className="employee-my-sops-card-content">


                        {/* ---------------------------------
                            CARD TOP
                        --------------------------------- */}

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


                          {/* FAVORITE */}

                          <button
                            type="button"
                            className={`employee-my-sops-favorite ${
                              isFavorite
                                ? "employee-my-sops-favorite-active"
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
                            title={
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


                        {/* ---------------------------------
                            DESCRIPTION
                        --------------------------------- */}

                        <p className="employee-my-sops-description">

                          {sop.description}

                        </p>


                        {/* ---------------------------------
                            PROGRESS
                        --------------------------------- */}

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
                                width:
                                  `${sop.progress}%`,
                              }}
                            />

                          </div>

                        </div>


                        {/* ---------------------------------
                            DETAILS
                        --------------------------------- */}

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


                    {/* =====================================
                        ACTIONS
                    ===================================== */}

                    <div className="employee-my-sops-actions">


                      <button
                        type="button"
                        className="employee-my-sops-primary-action"
                        onClick={() =>
                          handleViewSOP(
                            sop
                          )
                        }
                      >

                        <FaEye />

                        <span>
                          {sop.status ===
                          "Not Started"
                            ? "Start SOP"
                            : "Open SOP"}
                        </span>

                      </button>


                      <button
                        type="button"
                        className="employee-my-sops-secondary-action"
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
                        className="employee-my-sops-secondary-action"
                        onClick={() =>
                          handleDownloadSOP(
                            sop
                          )
                        }
                        title="Download SOP"
                      >

                        <FaDownload />

                      </button>


                      {sop.type ===
                        "Created" && (

                        <button
                          type="button"
                          className="employee-my-sops-secondary-action"
                          onClick={() =>
                            handleEditSOP(
                              sop
                            )
                          }
                          title="Edit SOP"
                        >

                          <FaEdit />

                        </button>

                      )}


                    </div>


                  </article>

                );

              }
            )

          ) : (

            /* ===============================================
               EMPTY STATE
            =============================================== */

            <div className="employee-my-sops-empty">


              <div className="employee-my-sops-empty-icon">

                <FaBookOpen />

              </div>


              <h2>
                No SOPs Found
              </h2>


              <p>
                There are no SOPs matching your
                current search or filter selection.
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


      </section>

    </div>

  );

};


export default EmployeeMySOPs;