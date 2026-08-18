import React from "react";
import { FaArrowRight, FaBell, FaSearch } from "react-icons/fa";

import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const user = {
    name: "Jasleen Kaur",
    role: "Employee",
  };

  const kpis = [
    {
      id: 1,
      title: "My SOPs",
      value: "24",
      description: "SOPs assigned to you",
      change: "+3 this month",
      icon: "📘",
    },
    {
      id: 2,
      title: "Pending Actions",
      value: "04",
      description: "Actions requiring attention",
      change: "2 due today",
      icon: "⏱",
    },
    {
      id: 3,
      title: "Training Progress",
      value: "82%",
      description: "Overall learning progress",
      change: "2 courses pending",
      icon: "🎓",
    },
    {
      id: 4,
      title: "Compliance Score",
      value: "94%",
      description: "Current compliance level",
      change: "Excellent",
      icon: "🛡",
    },
  ];

  const quickActions = [
    {
      title: "Generate SOP",
      description: "Create a new SOP using AI",
      icon: "✦",
    },
    {
      title: "Ask AI",
      description: "Get instant SOP answers",
      icon: "◉",
    },
    {
      title: "Upload Document",
      description: "Analyze a document",
      icon: "↑",
    },
    {
      title: "Find SOP",
      description: "Search the SOP library",
      icon: "⌕",
    },
    {
      title: "Start Training",
      description: "Continue your learning",
      icon: "🎓",
    },
  ];

  const actions = [
    {
      title: "Review Updated SOP",
      description: "Distributor Onboarding v3.2",
      priority: "High",
      due: "Due Today",
      action: "Review",
    },
    {
      title: "Acknowledge SOP",
      description: "Invoice Processing v2.1",
      priority: "Medium",
      due: "Due Aug 16",
      action: "View",
    },
    {
      title: "Complete Training",
      description: "Data Privacy Certification",
      priority: "Medium",
      due: "Due Aug 18",
      action: "Start",
    },
    {
      title: "Training Completed",
      description: "Email Handling Process",
      priority: "Completed",
      due: "Aug 12",
      action: "View",
    },
  ];

  const recentSOPs = [
    {
      title: "Distributor Onboarding",
      version: "v3.2",
      status: "Approved",
      lastViewed: "2 hours ago",
    },
    {
      title: "Invoice Processing",
      version: "v2.1",
      status: "Under Review",
      lastViewed: "Yesterday",
    },
    {
      title: "Email Handling Process",
      version: "v4.0",
      status: "Approved",
      lastViewed: "Yesterday",
    },
  ];

  const activities = [
    {
      title: "Submitted Malaysia Distributor SOP",
      time: "10 minutes ago",
    },
    {
      title: "Completed Data Privacy Training",
      time: "Yesterday",
    },
    {
      title: "Viewed Invoice Processing SOP",
      time: "Yesterday",
    },
    {
      title: "Asked AI about escalation process",
      time: "2 days ago",
    },
  ];

  const teamUpdates = [
    {
      title: "New SOP published",
      description: "Malaysia Invoice Processing",
      time: "2h ago",
    },
    {
      title: "Policy updated",
      description: "Information Security Guidelines",
      time: "5h ago",
    },
    {
      title: "Training assigned",
      description: "Data Privacy Certification",
      time: "Yesterday",
    },
  ];

  return (
    <div className="employee-dashboard-page">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header className="employee-dashboard-header">

        <div className="employee-search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search SOPs, documents, policies..."
          />

          <span className="employee-search-shortcut">
            Ctrl K
          </span>
        </div>

        <div className="employee-header-right">

          <div className="employee-header-date">
            14 Aug 2025, Thursday
          </div>

          <button
            type="button"
            className="employee-notification-button"
            title="Notifications"
          >
            <FaBell />
            <span>6</span>
          </button>

          <div className="employee-header-profile">
            <div className="employee-profile-avatar">
              JK
            </div>

            <div className="employee-profile-details">
              <strong>{user.name}</strong>
              <span>{user.role}</span>
            </div>
          </div>

        </div>
      </header>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="employee-dashboard-content">

        {/* =================================================
            WELCOME SECTION
        ================================================= */}

        <section className="employee-welcome-section">

          <div>
            <span className="employee-section-label">
              PERSONALIZED WORKSPACE
            </span>

            <h1>
              Good Morning, {user.name}! 👋
            </h1>

            <p>
              Here's your personalized overview for SOPs,
              training and compliance.
            </p>
          </div>

          <div className="employee-welcome-date">
            <span>Today</span>
            <strong>14 August 2025</strong>
          </div>

        </section>


        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section className="employee-dashboard-section">

          <div className="employee-section-heading">
            <div>
              <span>GET STARTED</span>
              <h2>Quick Actions</h2>
            </div>
          </div>

          <div className="employee-quick-actions">

            {quickActions.map((item) => (
              <button
                type="button"
                className="employee-quick-action"
                key={item.title}
              >

                <div className="employee-quick-icon">
                  {item.icon}
                </div>

                <div className="employee-quick-content">
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </div>

                <FaArrowRight className="employee-quick-arrow" />

              </button>
            ))}

          </div>

        </section>


        {/* =================================================
            KPI CARDS
        ================================================= */}

        <section className="employee-kpi-grid">

          {kpis.map((kpi) => (
            <article
              className="employee-kpi-card"
              key={kpi.id}
            >

              <div className="employee-kpi-top">

                <span className="employee-kpi-title">
                  {kpi.title}
                </span>

                <div className="employee-kpi-icon">
                  {kpi.icon}
                </div>

              </div>

              <strong className="employee-kpi-value">
                {kpi.value}
              </strong>

              <span className="employee-kpi-description">
                {kpi.description}
              </span>

              <div className="employee-kpi-change">
                {kpi.change}
              </div>

            </article>
          ))}

        </section>


        {/* =================================================
            TWO COLUMN SECTION
        ================================================= */}

        <section className="employee-dashboard-grid">

          {/* MY ACTIONS */}

          <article className="employee-dashboard-card employee-actions-card">

            <div className="employee-card-header">

              <div>
                <span>WORK QUEUE</span>
                <h2>My Actions</h2>
              </div>

              <button type="button">
                View All
                <FaArrowRight />
              </button>

            </div>

            <div className="employee-action-filters">

              <button className="active">
                All <span>4</span>
              </button>

              <button>
                SOP <span>2</span>
              </button>

              <button>
                Training <span>1</span>
              </button>

              <button>
                Compliance <span>1</span>
              </button>

            </div>

            <div className="employee-actions-list">

              {actions.map((item, index) => (
                <div
                  className="employee-action-row"
                  key={index}
                >

                  <div className="employee-action-indicator" />

                  <div className="employee-action-details">

                    <strong>{item.title}</strong>

                    <span>{item.description}</span>

                  </div>

                  <span
                    className={`employee-action-priority ${item.priority
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {item.priority}
                  </span>

                  <span className="employee-action-due">
                    {item.due}
                  </span>

                  <button
                    type="button"
                    className="employee-action-button"
                  >
                    {item.action}
                  </button>

                </div>
              ))}

            </div>

          </article>


          {/* MY LEARNING */}

          <article className="employee-dashboard-card">

            <div className="employee-card-header">

              <div>
                <span>DEVELOPMENT</span>
                <h2>My Learning</h2>
              </div>

              <button type="button">
                View All
                <FaArrowRight />
              </button>

            </div>

            <div className="employee-learning-overall">

              <div className="employee-learning-circle">
                <strong>82%</strong>
                <span>Overall</span>
              </div>

              <div>
                <strong>Learning Progress</strong>
                <p>
                  You're on track with your assigned
                  training.
                </p>
              </div>

            </div>

            <div className="employee-learning-list">

              <div>
                <div>
                  <span>Data Privacy Training</span>
                  <strong>100%</strong>
                </div>

                <div className="employee-progress">
                  <span style={{ width: "100%" }} />
                </div>
              </div>

              <div>
                <div>
                  <span>SOP Compliance</span>
                  <strong>75%</strong>
                </div>

                <div className="employee-progress">
                  <span style={{ width: "75%" }} />
                </div>
              </div>

              <div>
                <div>
                  <span>Process Training</span>
                  <strong>50%</strong>
                </div>

                <div className="employee-progress">
                  <span style={{ width: "50%" }} />
                </div>
              </div>

            </div>

            <button
              type="button"
              className="employee-primary-button"
            >
              Continue Learning
              <FaArrowRight />
            </button>

          </article>

        </section>


        {/* =================================================
            COMPLIANCE
        ================================================= */}

        <section className="employee-dashboard-grid employee-compliance-grid">

          <article className="employee-dashboard-card employee-compliance-card">

            <div className="employee-card-header">

              <div>
                <span>RISK & GOVERNANCE</span>
                <h2>My Compliance</h2>
              </div>

              <span className="employee-info-icon">
                i
              </span>

            </div>

            <div className="employee-compliance-content">

              <div className="employee-compliance-score">
                <strong>94%</strong>
                <span>Compliance Score</span>
              </div>

              <div className="employee-compliance-items">

                <div>
                  <span>SOP Acknowledgement</span>
                  <strong>98%</strong>
                </div>

                <div>
                  <span>Training Compliance</span>
                  <strong>92%</strong>
                </div>

                <div>
                  <span>Policy Compliance</span>
                  <strong>95%</strong>
                </div>

                <div>
                  <span>Certifications</span>
                  <strong>91%</strong>
                </div>

              </div>

            </div>

            <button
              type="button"
              className="employee-secondary-button"
            >
              View Compliance Details
              <FaArrowRight />
            </button>

          </article>


          {/* AI ASSISTANT */}

          <article className="employee-dashboard-card employee-ai-card">

            <div className="employee-ai-icon">
              ✦
            </div>

            <div className="employee-ai-content">

              <span>AI KNOWLEDGE ASSISTANT</span>

              <h2>
                Need help with an SOP?
              </h2>

              <p>
                Ask questions about processes, policies,
                approvals and compliance.
              </p>

              <button
                type="button"
                className="employee-ai-button"
              >
                Ask AI Assistant
                <FaArrowRight />
              </button>

            </div>

          </article>

        </section>


        {/* =================================================
            TOOLS
        ================================================= */}

        <section className="employee-dashboard-section">

          <div className="employee-section-heading">

            <div>
              <span>SMART WORKSPACE</span>
              <h2>Tools & Resources</h2>
            </div>

          </div>

          <div className="employee-tools-grid">

            <article className="employee-tool-card">

              <div className="employee-tool-icon">
                ✦
              </div>

              <h3>AI SOP Generator</h3>

              <p>
                Create structured SOPs from your process
                knowledge.
              </p>

              <button type="button">
                Start New SOP
                <FaArrowRight />
              </button>

            </article>


            <article className="employee-tool-card">

              <div className="employee-tool-icon">
                ↑
              </div>

              <h3>Document Intelligence</h3>

              <p>
                Upload documents for AI analysis and
                extraction.
              </p>

              <button type="button">
                Upload Document
                <FaArrowRight />
              </button>

            </article>


            <article className="employee-tool-card">

              <div className="employee-tool-icon">
                ◉
              </div>

              <h3>SOP Comparison</h3>

              <p>
                Compare SOP versions and identify changes.
              </p>

              <button type="button">
                Compare SOPs
                <FaArrowRight />
              </button>

            </article>


            <article className="employee-tool-card">

              <div className="employee-tool-icon">
                📚
              </div>

              <h3>SOP Library</h3>

              <p>
                Explore SOPs across departments and
                processes.
              </p>

              <button type="button">
                Browse Library
                <FaArrowRight />
              </button>

            </article>

          </div>

        </section>


        {/* =================================================
            LOWER CONTENT
        ================================================= */}

        <section className="employee-dashboard-grid employee-lower-grid">

          {/* RECENT SOPS */}

          <article className="employee-dashboard-card">

            <div className="employee-card-header">

              <div>
                <span>RECENTLY ACCESSED</span>
                <h2>Recent SOPs</h2>
              </div>

              <button type="button">
                View All
                <FaArrowRight />
              </button>

            </div>

            <div className="employee-sop-list">

              {recentSOPs.map((sop) => (
                <div
                  className="employee-sop-row"
                  key={sop.title}
                >

                  <div className="employee-sop-icon">
                    📄
                  </div>

                  <div className="employee-sop-details">

                    <strong>{sop.title}</strong>

                    <span>
                      {sop.version} • {sop.lastViewed}
                    </span>

                  </div>

                  <span
                    className={`employee-sop-status ${
                      sop.status === "Approved"
                        ? "approved"
                        : "review"
                    }`}
                  >
                    {sop.status}
                  </span>

                  <button type="button">
                    View
                  </button>

                </div>
              ))}

            </div>

          </article>


          {/* ACTIVITY */}

          <article className="employee-dashboard-card">

            <div className="employee-card-header">

              <div>
                <span>YOUR WORKSPACE</span>
                <h2>Recent Activity</h2>
              </div>

              <button type="button">
                View All
                <FaArrowRight />
              </button>

            </div>

            <div className="employee-activity-list">

              {activities.map((activity, index) => (
                <div
                  className="employee-activity-item"
                  key={index}
                >

                  <div className="employee-activity-dot" />

                  <div>
                    <strong>{activity.title}</strong>
                    <span>{activity.time}</span>
                  </div>

                </div>
              ))}

            </div>

          </article>


          {/* TEAM UPDATES */}

          <article className="employee-dashboard-card">

            <div className="employee-card-header">

              <div>
                <span>TEAM</span>
                <h2>Team Updates</h2>
              </div>

              <button type="button">
                View All
                <FaArrowRight />
              </button>

            </div>

            <div className="employee-team-list">

              {teamUpdates.map((item, index) => (
                <div
                  className="employee-team-item"
                  key={index}
                >

                  <div className="employee-team-icon">
                    ✓
                  </div>

                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </div>

                  <small>{item.time}</small>

                </div>
              ))}

            </div>

          </article>

        </section>


        {/* =================================================
            AI BANNER
        ================================================= */}

        <section className="employee-ai-banner">

          <div className="employee-ai-banner-icon">
            ✦
          </div>

          <div>

            <span>WORK SMARTER</span>

            <h2>
              Make your work smarter with AI
            </h2>

            <p>
              Create SOPs faster, find information quicker
              and stay compliant with AI-powered insights.
            </p>

          </div>

          <button type="button">
            Explore AI Features
            <FaArrowRight />
          </button>

        </section>

      </main>

    </div>
  );
};

export default EmployeeDashboard;