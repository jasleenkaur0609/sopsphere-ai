import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeSidebar from "../components/EmployeeSidebar";
import "./EmployeeSOPLibrary.css";

const SOP_DATA = [
  {
    id: 1,
    title: "Employee Onboarding Process",
    category: "Human Resources",
    status: "Published",
    description:
      "Standard process for onboarding new employees and completing required activities.",
    readingTime: 8,
    version: "2.1",
    date: "Aug 12, 2026",
    owner: "HR Operations",
  },
  {
    id: 2,
    title: "IT Access Request Procedure",
    category: "IT Operations",
    status: "Published",
    description:
      "Process for requesting, approving and provisioning enterprise system access.",
    readingTime: 6,
    version: "3.0",
    date: "Aug 10, 2026",
    owner: "IT Operations",
  },
  {
    id: 3,
    title: "Incident Reporting Procedure",
    category: "Compliance",
    status: "Published",
    description:
      "Guidelines for reporting, documenting and escalating workplace incidents.",
    readingTime: 7,
    version: "1.8",
    date: "Aug 08, 2026",
    owner: "Compliance Team",
  },
  {
    id: 4,
    title: "Information Security Guidelines",
    category: "Information Security",
    status: "Published",
    description:
      "Required security practices for protecting organizational systems, data and information.",
    readingTime: 12,
    version: "4.2",
    date: "Aug 05, 2026",
    owner: "Information Security",
  },
  {
    id: 5,
    title: "Expense Reimbursement Process",
    category: "Finance",
    status: "Published",
    description:
      "Process for submitting and approving employee expense reimbursements.",
    readingTime: 9,
    version: "2.3",
    date: "Aug 03, 2026",
    owner: "Finance Team",
  },
  {
    id: 6,
    title: "Password Management Policy",
    category: "IT Operations",
    status: "In Progress",
    description:
      "Policy and procedures for creating, storing and managing secure passwords.",
    readingTime: 5,
    version: "1.2",
    date: "Aug 01, 2026",
    owner: "IT Operations",
  },
  {
    id: 7,
    title: "Exit Process Procedure",
    category: "Human Resources",
    status: "Pending Review",
    description:
      "Standard procedure for employee exit and offboarding activities.",
    readingTime: 6,
    version: "1.0",
    date: "Jul 26, 2026",
    owner: "HR Operations",
  },
  {
    id: 8,
    title: "Data Backup and Recovery",
    category: "IT Operations",
    status: "Published",
    description:
      "Procedure for data backup, recovery and business continuity management.",
    readingTime: 10,
    version: "1.5",
    date: "Jul 25, 2026",
    owner: "IT Operations",
  },
];

const CATEGORIES = [
  "All Categories",
  "Human Resources",
  "IT Operations",
  "Compliance",
  "Information Security",
  "Finance",
];

function EmployeeSOPLibrary() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("Newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [notification, setNotification] = useState("");

  const ITEMS_PER_PAGE = viewMode === "grid" ? 8 : 5;

  const showMessage = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 2500);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleViewSOP = (sop) => {
    /*
      Replace this route with your actual SOP details route
      when the backend/details page is available.
    */
    navigate(`/employee/sop/${sop.id}`);
  };

  const handleDownload = (sop) => {
    /*
      Backend/download API can be connected later.
    */
    showMessage(
      `Download request created for "${sop.title}". Backend integration required.`
    );
  };

  const handleAI = (sop) => {
    showMessage(
      `AI Assistant requested for "${sop.title}". AI backend integration required.`
    );
  };

  const filteredSOPs = useMemo(() => {
    let result = [...SOP_DATA];

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((sop) =>
        [
          sop.title,
          sop.category,
          sop.description,
          sop.owner,
          sop.status,
          sop.version,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    if (category !== "All Categories") {
      result = result.filter((sop) => sop.category === category);
    }

    if (status !== "All Status") {
      result = result.filter((sop) => sop.status === status);
    }

    if (sortBy === "A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy === "Z-A") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortBy === "Reading Time") {
      result.sort((a, b) => a.readingTime - b.readingTime);
    }

    if (sortBy === "Favorites") {
      result.sort(
        (a, b) =>
          Number(favorites.includes(b.id)) -
          Number(favorites.includes(a.id))
      );
    }

    return result;
  }, [search, category, status, sortBy, favorites]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSOPs.length / ITEMS_PER_PAGE)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedSOPs = filteredSOPs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const publishedCount = SOP_DATA.filter(
    (sop) => sop.status === "Published"
  ).length;

  const progressCount = SOP_DATA.filter(
    (sop) => sop.status === "In Progress"
  ).length;

  const pendingCount = SOP_DATA.filter(
    (sop) => sop.status === "Pending Review"
  ).length;

  const clearFilters = () => {
    setCategory("All Categories");
    setStatus("All Status");
    setSortBy("Newest");
    setSearch("");
    setPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="employee-library-shell">
      <EmployeeSidebar activePage="sop-library" />

      <main className="employee-library-main">
        {/* ================= HEADER ================= */}
        <section className="library-header">
          <div className="library-title-area">
            <div className="library-title-icon">
              <span>▤</span>
            </div>

            <div>
              <span className="library-eyebrow">
                KNOWLEDGE REPOSITORY
              </span>

              <h1>SOP Library</h1>

              <p>
                Browse and access approved Standard Operating Procedures
                across the organization.
              </p>
            </div>
          </div>

          <div className="library-kpis">
            <div className="library-kpi">
              <div className="kpi-icon purple">▤</div>
              <div>
                <strong>{SOP_DATA.length}</strong>
                <span>Available SOPs</span>
              </div>
            </div>

            <div className="library-kpi">
              <div className="kpi-icon green">✓</div>
              <div>
                <strong>{progressCount}</strong>
                <span>In Progress</span>
              </div>
            </div>

            <div className="library-kpi">
              <div className="kpi-icon amber">⌛</div>
              <div>
                <strong>{pendingCount}</strong>
                <span>Pending Review</span>
              </div>
            </div>

            <div className="library-kpi">
              <div className="kpi-icon pink">☆</div>
              <div>
                <strong>{favorites.length}</strong>
                <span>Favorites</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TOOLBAR ================= */}
        <section className="library-toolbar">
          <div className="search-wrapper">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search SOPs, processes, departments or keywords..."
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => handleSearch("")}
                type="button"
              >
                ×
              </button>
            )}
          </div>

          <button
            className={`toolbar-button ${
              showFilters ? "active" : ""
            }`}
            onClick={() => setShowFilters((prev) => !prev)}
            type="button"
          >
            <span>⚑</span>
            Filters
            <span className="button-chevron">
              {showFilters ? "⌃" : "⌄"}
            </span>
          </button>

          <div className="sort-wrapper">
            <span className="sort-symbol">↕</span>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              aria-label="Sort SOPs"
            >
              <option value="Newest">Newest</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="Reading Time">Reading Time</option>
              <option value="Favorites">Favorites</option>
            </select>
          </div>

          <div className="view-toggle">
            <button
              type="button"
              className={viewMode === "grid" ? "selected" : ""}
              onClick={() => {
                setViewMode("grid");
                setPage(1);
              }}
              title="Grid view"
            >
              ▦
            </button>

            <button
              type="button"
              className={viewMode === "list" ? "selected" : ""}
              onClick={() => {
                setViewMode("list");
                setPage(1);
              }}
              title="List view"
            >
              ☷
            </button>
          </div>
        </section>

        {/* ================= FILTER PANEL ================= */}
        {showFilters && (
          <section className="filter-panel">
            <div className="filter-field">
              <label>Status</label>

              <select
                value={status}
                onChange={(e) =>
                  handleStatusChange(e.target.value)
                }
              >
                <option>All Status</option>
                <option>Published</option>
                <option>In Progress</option>
                <option>Pending Review</option>
              </select>
            </div>

            <div className="filter-field">
              <label>Category</label>

              <select
                value={category}
                onChange={(e) =>
                  handleCategoryChange(e.target.value)
                }
              >
                {CATEGORIES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="filter-summary">
              <span>
                {filteredSOPs.length} matching SOP
                {filteredSOPs.length !== 1 ? "s" : ""}
              </span>
            </div>

            <button
              type="button"
              className="clear-filter-button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </section>
        )}

        {/* ================= CATEGORY CHIPS ================= */}
        <div className="category-row">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item ? "category-chip active" : "category-chip"
              }
              onClick={() => handleCategoryChange(item)}
            >
              {item}
            </button>
          ))}

          <button
            type="button"
            className="category-chip more-chip"
            onClick={() => setShowFilters(true)}
          >
            + More
          </button>
        </div>

        {/* ================= RESULTS ================= */}
        <div className="results-header">
          <span>
            {filteredSOPs.length} SOP
            {filteredSOPs.length !== 1 ? "s" : ""} found
          </span>

          {favorites.length > 0 && (
            <span className="favorites-summary">
              ★ {favorites.length} favorite
              {favorites.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {paginatedSOPs.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "sop-grid"
                : "sop-list"
            }
          >
            {paginatedSOPs.map((sop) => (
              <article className="sop-card" key={sop.id}>
                <div className="sop-card-top">
                  <div className="sop-document-icon">
                    ▤
                  </div>

                  <button
                    type="button"
                    className={`favorite-button ${
                      favorites.includes(sop.id) ? "favorite" : ""
                    }`}
                    onClick={() => toggleFavorite(sop.id)}
                    title={
                      favorites.includes(sop.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    {favorites.includes(sop.id) ? "★" : "☆"}
                  </button>
                </div>

                <div className="sop-badges">
                  <span className="category-badge">
                    {sop.category}
                  </span>

                  <span
                    className={`status-badge ${sop.status
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {sop.status}
                  </span>
                </div>

                <h2>{sop.title}</h2>

                <p className="sop-description">
                  {sop.description}
                </p>

                <div className="sop-meta">
                  <span>◷ {sop.readingTime} min</span>
                  <span className="meta-divider">|</span>
                  <span>v{sop.version}</span>
                  <span className="meta-divider">|</span>
                  <span>▣ {sop.date}</span>
                </div>

                <div className="sop-divider" />

                <div className="sop-bottom">
                  <div className="owner-info">
                    <span>Owner</span>
                    <strong>{sop.owner}</strong>
                  </div>

                  <div className="sop-actions">
                    <button
                      type="button"
                      className="primary-action"
                      onClick={() => handleViewSOP(sop)}
                    >
                      ◉ View SOP
                    </button>

                    <button
                      type="button"
                      className="icon-action"
                      onClick={() => handleAI(sop)}
                      title="AI Assistant"
                    >
                      ✦
                    </button>

                    <button
                      type="button"
                      className="icon-action"
                      onClick={() => handleDownload(sop)}
                      title="Download"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">⌕</div>
            <h2>No SOPs found</h2>
            <p>
              Try changing your search or clearing one of the filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="primary-action"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* ================= FOOTER / PAGINATION ================= */}
        <div className="library-footer">
          <span>
            Showing{" "}
            {filteredSOPs.length === 0
              ? 0
              : (currentPage - 1) * ITEMS_PER_PAGE + 1}{" "}
            to{" "}
            {Math.min(
              currentPage * ITEMS_PER_PAGE,
              filteredSOPs.length
            )}{" "}
            of {filteredSOPs.length} SOPs
          </span>

          <div className="pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setPage((prev) => Math.max(1, prev - 1))
              }
            >
              ‹
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((number) => (
              <button
                type="button"
                key={number}
                className={
                  currentPage === number ? "current" : ""
                }
                onClick={() => setPage(number)}
              >
                {number}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setPage((prev) =>
                  Math.min(totalPages, prev + 1)
                )
              }
            >
              ›
            </button>
          </div>
        </div>
      </main>

      {/* ================= FRONTEND NOTIFICATION ================= */}
      {notification && (
        <div className="library-toast">
          <span>✓</span>
          {notification}
        </div>
      )}
    </div>
  );
}

export default EmployeeSOPLibrary;