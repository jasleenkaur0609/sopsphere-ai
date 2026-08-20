import React, { useMemo, useState } from "react";
import {
  FaQuestionCircle,
  FaSearch,
  FaBook,
  FaComments,
  FaEnvelope,
  FaChevronDown,
  FaArrowRight,
  FaLightbulb,
  FaExclamationCircle,
} from "react-icons/fa";

import "./EmployeeHelp.css";

const EmployeeHelp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    {
      title: "Getting Started",
      description: "Learn the basics of the AI SOP Portal.",
      icon: <FaBook />,
      count: "8 Guides",
    },
    {
      title: "SOP Management",
      description: "Find help with SOPs, documents, and workflows.",
      icon: <FaBook />,
      count: "12 Guides",
    },
    {
      title: "AI Assistant",
      description: "Learn how to use AI-powered knowledge assistance.",
      icon: <FaLightbulb />,
      count: "6 Guides",
    },
    {
      title: "Account & Access",
      description: "Manage your profile, security, and permissions.",
      icon: <FaQuestionCircle />,
      count: "7 Guides",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I find an SOP?",
      answer:
        "Open SOP Library from the sidebar and use the search bar or available categories to locate the SOP you need.",
    },
    {
      id: 2,
      question: "How can I generate an SOP using AI?",
      answer:
        "Open Generate SOP from the navigation menu, provide the required process information, and use the AI assistance options to create a draft SOP.",
    },
    {
      id: 3,
      question: "Where can I view my assigned tasks?",
      answer:
        "Open My Tasks from the employee navigation. You can review assigned tasks, due dates, priorities, and completion status there.",
    },
    {
      id: 4,
      question: "How do I update my profile?",
      answer:
        "Open Settings from the sidebar and use the profile or account settings available for your employee account.",
    },
    {
      id: 5,
      question: "Where can I check my compliance status?",
      answer:
        "Open My Compliance from the employee dashboard navigation to review compliance requirements, progress, and upcoming deadlines.",
    },
  ];

  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) {
      return faqs;
    }

    const query = searchTerm.toLowerCase();

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }, [searchTerm]);

  const toggleFaq = (id) => {
    setOpenFaq((current) => (current === id ? null : id));
  };

  return (
    <div className="employee-help-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="employee-help-header">

        <div className="employee-help-title">

          <div className="employee-help-title-icon">
            <FaQuestionCircle />
          </div>

          <div>
            <span className="employee-help-eyebrow">
              SUPPORT CENTER
            </span>

            <h1>Help & Support</h1>

            <p>
              Find answers, guides, and support for using the
              AI SOP Portal.
            </p>
          </div>

        </div>

      </header>


      {/* =====================================================
          SEARCH
          ===================================================== */}

      <section className="employee-help-search-card">

        <div className="employee-help-search-icon">
          <FaSearch />
        </div>

        <div className="employee-help-search-content">

          <span>
            HOW CAN WE HELP?
          </span>

          <h2>
            Search the Help Center
          </h2>

          <div className="employee-help-search">

            <FaSearch />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search for help, guides, or questions..."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK HELP CATEGORIES
          ===================================================== */}

      <section className="employee-help-section">

        <div className="employee-help-section-header">

          <div>
            <span>KNOWLEDGE BASE</span>
            <h2>Explore Help Topics</h2>
          </div>

        </div>


        <div className="employee-help-categories">

          {categories.map((category) => (

            <button
              type="button"
              className="employee-help-category"
              key={category.title}
            >

              <div className="employee-help-category-icon">
                {category.icon}
              </div>

              <div className="employee-help-category-content">

                <h3>
                  {category.title}
                </h3>

                <p>
                  {category.description}
                </p>

                <span>
                  {category.count}
                </span>

              </div>

              <FaArrowRight className="employee-help-category-arrow" />

            </button>

          ))}

        </div>

      </section>


      {/* =====================================================
          FAQ + SUPPORT
          ===================================================== */}

      <div className="employee-help-main">

        {/* =================================================
            FAQ
            ================================================= */}

        <section className="employee-help-faq-section">

          <div className="employee-help-section-header">

            <div>
              <span>COMMON QUESTIONS</span>
              <h2>Frequently Asked Questions</h2>
            </div>

          </div>


          <div className="employee-help-faq-list">

            {filteredFaqs.length > 0 ? (

              filteredFaqs.map((faq) => {

                const isOpen = openFaq === faq.id;

                return (
                  <div
                    className={`employee-help-faq ${
                      isOpen
                        ? "employee-help-faq-open"
                        : ""
                    }`}
                    key={faq.id}
                  >

                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="employee-help-faq-question"
                    >

                      <span>
                        {faq.question}
                      </span>

                      <FaChevronDown />

                    </button>


                    {isOpen && (
                      <div className="employee-help-faq-answer">
                        {faq.answer}
                      </div>
                    )}

                  </div>
                );
              })

            ) : (

              <div className="employee-help-empty">

                <FaSearch />

                <strong>
                  No matching questions
                </strong>

                <span>
                  Try another search term.
                </span>

              </div>

            )}

          </div>

        </section>


        {/* =================================================
            CONTACT SUPPORT
            ================================================= */}

        <aside className="employee-help-support">

          <div className="employee-help-support-icon">
            <FaComments />
          </div>

          <span className="employee-help-support-label">
            NEED MORE HELP?
          </span>

          <h2>
            Contact Support
          </h2>

          <p>
            Can't find what you're looking for? Reach out
            to the support team for assistance.
          </p>


          <button
            type="button"
            className="employee-help-support-button"
          >
            <FaComments />
            Contact Support
            <FaArrowRight />
          </button>


          <div className="employee-help-support-divider" />


          <div className="employee-help-support-email">

            <FaEnvelope />

            <div>
              <span>Email Support</span>
              <strong>support@aisopportal.com</strong>
            </div>

          </div>


          <div className="employee-help-support-note">

            <FaExclamationCircle />

            <span>
              Support requests are monitored during
              business hours.
            </span>

          </div>

        </aside>

      </div>


      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="employee-help-footer">

        <FaLightbulb />

        <span>
          Tip: Use the AI Assistant for quick answers
          about enterprise SOPs and processes.
        </span>

      </footer>

    </div>
  );
};

export default EmployeeHelp;