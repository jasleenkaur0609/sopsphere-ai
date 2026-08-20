import React, { useMemo, useState } from "react";
import {
  FaFileAlt,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaClock,
  FaCheckCircle,
  FaFolder,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaChevronDown,
} from "react-icons/fa";

import "./EmployeeDocuments.css";

const EmployeeDocuments = ({ profile }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recent");

  const documents = [
    {
      id: 1,
      name: "Employee Information Security Policy",
      category: "Policies",
      type: "PDF",
      size: "2.4 MB",
      updated: "Aug 19, 2026",
      status: "Available",
      icon: <FaFilePdf />,
    },
    {
      id: 2,
      name: "Enterprise SOP Guidelines",
      category: "SOPs",
      type: "PDF",
      size: "4.8 MB",
      updated: "Aug 18, 2026",
      status: "Available",
      icon: <FaFilePdf />,
    },
    {
      id: 3,
      name: "Employee Onboarding Guide",
      category: "Training",
      type: "DOCX",
      size: "1.7 MB",
      updated: "Aug 15, 2026",
      status: "Available",
      icon: <FaFileWord />,
    },
    {
      id: 4,
      name: "Data Privacy & Protection Guidelines",
      category: "Policies",
      type: "PDF",
      size: "3.2 MB",
      updated: "Aug 12, 2026",
      status: "Available",
      icon: <FaFilePdf />,
    },
    {
      id: 5,
      name: "Monthly Performance Report",
      category: "Reports",
      type: "XLSX",
      size: "890 KB",
      updated: "Aug 10, 2026",
      status: "Available",
      icon: <FaFileExcel />,
    },
    {
      id: 6,
      name: "Workplace Safety Training Material",
      category: "Training",
      type: "PDF",
      size: "5.1 MB",
      updated: "Aug 08, 2026",
      status: "Available",
      icon: <FaFilePdf />,
    },
  ];

  const categories = [
    "All",
    "SOPs",
    "Policies",
    "Training",
    "Reports",
  ];

  const filteredDocuments = useMemo(() => {
    let result = [...documents];

    if (category !== "All") {
      result = result.filter(
        (document) => document.category === category
      );
    }

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();

      result = result.filter(
        (document) =>
          document.name.toLowerCase().includes(query) ||
          document.category.toLowerCase().includes(query) ||
          document.type.toLowerCase().includes(query)
      );
    }

    if (sortBy === "Name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [category, searchTerm, sortBy]);

  const totalDocuments = documents.length;

  const recentDocuments = documents.filter(
    (document) =>
      document.updated.includes("Aug 19") ||
      document.updated.includes("Aug 18")
  ).length;

  return (
    <div className="employee-documents-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="employee-documents-header">

        <div className="employee-documents-title">

          <div className="employee-documents-title-icon">
            <FaFileAlt />
          </div>

          <div>
            <span className="employee-documents-eyebrow">
              DOCUMENT MANAGEMENT
            </span>

            <h1>My Documents</h1>

            <p>
              Access your assigned documents, policies,
              training material, and enterprise resources.
            </p>
          </div>

        </div>

        <div className="employee-documents-user">

          <span>DOCUMENTS</span>

          <strong>
            {totalDocuments}
          </strong>

        </div>

      </header>


      {/* =====================================================
          SUMMARY CARDS
          ===================================================== */}

      <section className="employee-documents-summary">

        <div className="employee-documents-summary-card">

          <div className="employee-documents-summary-icon">
            <FaFolder />
          </div>

          <div>
            <span>Total Documents</span>
            <strong>{totalDocuments}</strong>
            <small>Available to you</small>
          </div>

        </div>


        <div className="employee-documents-summary-card">

          <div className="employee-documents-summary-icon">
            <FaClock />
          </div>

          <div>
            <span>Recently Updated</span>
            <strong>{recentDocuments}</strong>
            <small>Updated this week</small>
          </div>

        </div>


        <div className="employee-documents-summary-card">

          <div className="employee-documents-summary-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>Accessible</span>
            <strong>100%</strong>
            <small>Your assigned resources</small>
          </div>

        </div>

      </section>


      {/* =====================================================
          TOOLBAR
          ===================================================== */}

      <section className="employee-documents-library">

        <div className="employee-documents-toolbar">

          <div className="employee-documents-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

          </div>


          <div className="employee-documents-controls">

            <div className="employee-documents-filter">

              <FaFilter />

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <FaChevronDown />

            </div>


            <div className="employee-documents-filter">

              <span className="employee-documents-sort-label">
                Sort
              </span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
              >
                <option value="Recent">
                  Recent
                </option>

                <option value="Name">
                  Name
                </option>
              </select>

              <FaChevronDown />

            </div>

          </div>

        </div>


        {/* =================================================
            DOCUMENT HEADER
            ================================================= */}

        <div className="employee-documents-list-header">

          <span>DOCUMENT</span>
          <span>CATEGORY</span>
          <span>UPDATED</span>
          <span>SIZE</span>
          <span>ACTION</span>

        </div>


        {/* =================================================
            DOCUMENT LIST
            ================================================= */}

        <div className="employee-documents-list">

          {filteredDocuments.length > 0 ? (

            filteredDocuments.map((document) => (

              <article
                className="employee-document-row"
                key={document.id}
              >

                <div className="employee-document-info">

                  <div
                    className={`employee-document-icon ${document.type.toLowerCase()}`}
                  >
                    {document.icon}
                  </div>

                  <div>

                    <h3>
                      {document.name}
                    </h3>

                    <span>
                      {document.type}
                    </span>

                  </div>

                </div>


                <div className="employee-document-category">
                  {document.category}
                </div>


                <div className="employee-document-updated">
                  <FaClock />
                  {document.updated}
                </div>


                <div className="employee-document-size">
                  {document.size}
                </div>


                <div className="employee-document-actions">

                  <button
                    type="button"
                    title="View document"
                  >
                    <FaEye />
                  </button>

                  <button
                    type="button"
                    title="Download document"
                  >
                    <FaDownload />
                  </button>

                </div>

              </article>

            ))

          ) : (

            <div className="employee-documents-empty">

              <FaSearch />

              <strong>
                No documents found
              </strong>

              <span>
                Try changing your search or filter.
              </span>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          STORAGE / INFORMATION FOOTER
          ===================================================== */}

      <section className="employee-documents-info">

        <div className="employee-documents-info-icon">
          <FaFileAlt />
        </div>

        <div>

          <strong>
            Enterprise Document Access
          </strong>

          <p>
            Documents displayed here are resources assigned
            to your employee profile and available through
            the enterprise knowledge platform.
          </p>

        </div>

        <span>
          Secure Access
        </span>

      </section>

    </div>
  );
};

export default EmployeeDocuments;