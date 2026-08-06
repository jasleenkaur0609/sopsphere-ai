import "./Home.css";

import {
  FaArrowRight,
  FaRobot,
  FaSearch,
  FaChartLine,
  FaUsers,
  FaShieldAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

export default function Home() {
     

 const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {

    const sections = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },

        {

            threshold:0.18,

        }

    );

    sections.forEach((section)=>{

        observer.observe(section);

    });

    return ()=>{

        sections.forEach((section)=>{

            observer.unobserve(section);

        });

    };

},[]);

    const scrollToSection = (id) => {

    const section = document.getElementById(id);

    if(!section) return;

    const navbarHeight = 110;

    const top =

        section.offsetTop -

        navbarHeight;

    window.scrollTo({

        top,

        behavior:"smooth"

    });

};

  return (

    <div className="home">

      {/* ==============================
            BACKGROUND
      ============================== */}

      <div className="bg-gradient"></div>
      <div className="bg-circle bg1"></div>
      <div className="bg-circle bg2"></div>
      <div className="bg-circle bg3"></div>

      {/* ==============================
            NAVBAR
      ============================== */}

      <nav className="navbar">

    <div
        className="logo"
        onClick={() => navigate("/")}
    >

        <div className="logo-icon">

            AI

        </div>

        <div>

            <h3>AI SOP</h3>

            <span>Management Portal</span>

        </div>

    </div>

    <ul className={menuOpen ? "nav-links active" : "nav-links"}>

        <li onClick={() => scrollToSection("hero")}>

            Home

        </li>

        <li onClick={() => scrollToSection("features")}>

            Features

        </li>

        <li onClick={() => scrollToSection("modules")}>

            Platform

        </li>

        <li onClick={() => scrollToSection("workflow")}>

            Workflow

        </li>

        <li onClick={() => scrollToSection("security")}>

            Security

        </li>

        <li onClick={() => scrollToSection("faq")}>

            FAQ

        </li>

    </ul>

    <div className="nav-buttons">

        <button
            className="btn-login"
            onClick={() => navigate("/login")}
        >

            Sign In

        </button>

        <button
            className="btn-register"
            onClick={() => navigate("/register")}
        >

            Get Started

        </button>

    </div>

    <div
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
    >

        {menuOpen ? <FaTimes /> : <FaBars />}

    </div>

</nav>
      {/* ==============================
            HERO
      ============================== */}

      <section id="hero" className="hero reveal">

        <div className="hero-left">

          <div className="hero-badge">

            ✦ Enterprise AI Platform

          </div>

          <h1>

            Transform

            <span>

              Knowledge

            </span>

            Into Intelligent

            <br />

            Workflows

          </h1>

          <p>

            AI SOP Management Portal helps organizations
            create, manage, approve and discover Standard
            Operating Procedures with Artificial Intelligence,
            Automation and Enterprise Collaboration.

          </p>

          <div className="hero-buttons">

            <button className="primary-btn">

              Get Started

              <FaArrowRight />

            </button>

            <button className="secondary-btn">

              Watch Demo

            </button>

          </div>

          <div className="hero-info">

            <div>

              <h2>25K+</h2>

              <span>Enterprise Users</span>

            </div>

            <div>

              <h2>500K+</h2>

              <span>SOP Documents</span>

            </div>

            <div>

              <h2>99.9%</h2>

              <span>Availability</span>

            </div>

          </div>

        </div>

        {/* ==========================
             RIGHT PANEL
        ========================== */}

        <div className="hero-right">

          <div className="dashboard-preview">

            <div className="window-header">

              <div className="window-dots">

                <span></span>

                <span></span>

                <span></span>

              </div>

              <p>AI Workspace</p>

            </div>

            <div className="search-box">

              <FaSearch />

              <input

                type="text"

                placeholder="Ask AI about SOPs..."

                readOnly

              />

            </div>

            <div className="preview-list">

              <div className="preview-item">

                <FaRobot />

                <div>

                  <h4>AI Generated SOP</h4>

                  <span>Employee Onboarding</span>

                </div>

              </div>

              <div className="preview-item">

                <FaShieldAlt />

                <div>

                  <h4>Compliance</h4>

                  <span>94% Score</span>

                </div>

              </div>

              <div className="preview-item">

                <FaUsers />

                <div>

                  <h4>Pending Approvals</h4>

                  <span>18 Requests</span>

                </div>

              </div>

            </div>

            <div className="analytics-card">

              <FaChartLine />

              <div>

                <h3>+28%</h3>

                <span>Productivity Increase</span>

              </div>

            </div>

          </div>

          {/* Floating Cards */}

          <div className="floating-card card-one">

            <FaRobot />

            <div>

              <h4>AI Assistant</h4>

              <span>Online</span>

            </div>

          </div>

          <div className="floating-card card-two">

            <FaShieldAlt />

            <div>

              <h4>Security</h4>

              <span>Protected</span>

            </div>

          </div>

          <div className="floating-card card-three">

            <FaChartLine />

            <div>

              <h4>Analytics</h4>

              <span>Live Reports</span>

            </div>

          </div>

        </div>

      </section>
            {/*========================================
              TRUSTED BY
      =========================================*/}

      <section className="trusted-section reveal">

        <p className="section-subtitle">

          TRUSTED TECHNOLOGIES

        </p>

        <div className="trusted-grid">

          <div className="trusted-item">
            Artificial Intelligence
          </div>

          <div className="trusted-item">
            Machine Learning
          </div>

          <div className="trusted-item">
            OCR Intelligence
          </div>

          <div className="trusted-item">
            Workflow Automation
          </div>

          <div className="trusted-item">
            Enterprise Security
          </div>

          <div className="trusted-item">
            Knowledge Management
          </div>

        </div>

      </section>



      {/*========================================
              PLATFORM STATS
      =========================================*/}

      <section className="stats-section reveal">

        <div className="section-heading">

          <h2>

            Everything You Need To
            Manage SOPs

          </h2>

          <p>

            Designed for modern enterprises that
            want automation, collaboration and
            AI-powered knowledge management.

          </p>

        </div>

        <div className="stats-grid">

          <div className="stat-card">

            <h1>

              10×

            </h1>

            <h3>

              Faster SOP Creation

            </h3>

            <p>

              AI creates SOP drafts in seconds.

            </p>

          </div>

          <div className="stat-card">

            <h1>

              60%

            </h1>

            <h3>

              Less Manual Work

            </h3>

            <p>

              Reduce repetitive documentation.

            </p>

          </div>

          <div className="stat-card">

            <h1>

              24/7

            </h1>

            <h3>

              AI Assistant

            </h3>

            <p>

              Search every document instantly.

            </p>

          </div>

          <div className="stat-card">

            <h1>

              100%

            </h1>

            <h3>

              Version Control

            </h3>

            <p>

              Track every document revision.

            </p>

          </div>

        </div>

      </section>



      {/*========================================
              FEATURES
      =========================================*/}

      <section id="features" className="features-section reveal">
        <div className="section-heading">

          <span>

            FEATURES

          </span>

          <h2>

            Powerful AI
            Enterprise Features

          </h2>

        </div>

        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">

              🤖

            </div>

            <h3>

              AI SOP Generator

            </h3>

            <p>

              Generate enterprise SOPs using AI
              with structured formatting.

            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">

              📄

            </div>

            <h3>

              OCR Intelligence

            </h3>

            <p>

              Extract text from scanned
              documents and images.

            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">

              💬

            </div>

            <h3>

              AI Chat

            </h3>

            <p>

              Ask questions from SOPs
              and PDFs naturally.

            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">

              🔒

            </div>

            <h3>

              Enterprise Security

            </h3>

            <p>

              Secure authentication,
              permissions and audit logs.

            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">

              📊

            </div>

            <h3>

              Reports

            </h3>

            <p>

              AI powered analytics
              with visual dashboards.

            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">

              ⚡

            </div>

            <h3>

              Automation

            </h3>

            <p>

              Intelligent approval
              workflows and notifications.

            </p>

          </div>

        </div>

      </section>
            {/*========================================
              PLATFORM MODULES
      =========================================*/}

      <section id="modules" className="modules-section reveal">

        <div className="section-heading">

          <span>

            PLATFORM

          </span>

          <h2>

            Everything Connected
            In One Workspace

          </h2>

          <p>

            Every department works from one
            intelligent platform.

          </p>

        </div>

        <div className="modules-grid">

          <div className="module-card large">

            <div className="module-icon">👥</div>

            <h3>User Management</h3>

            <p>

              Manage employees, departments,
              permissions and profiles.

            </p>

          </div>

          <div className="module-card">

            <div className="module-icon">📑</div>

            <h3>SOP Management</h3>

          </div>

          <div className="module-card">

            <div className="module-icon">🤖</div>

            <h3>AI Assistant</h3>

          </div>

          <div className="module-card">

            <div className="module-icon">📊</div>

            <h3>Analytics</h3>

          </div>

          <div className="module-card">

            <div className="module-icon">📚</div>

            <h3>Training</h3>

          </div>

          <div className="module-card">

            <div className="module-icon">📢</div>

            <h3>Notifications</h3>

          </div>

          <div className="module-card">

            <div className="module-icon">🛡</div>

            <h3>Security</h3>

          </div>

          <div className="module-card large">

            <div className="module-icon">⚙</div>

            <h3>Workflow Automation</h3>

            <p>

              Intelligent approvals,
              reminders and AI automation.

            </p>

          </div>

        </div>

      </section>



      {/*========================================
                HOW IT WORKS
      =========================================*/}

      <section id="workflow" className="workflow-section reveal">

        <div className="section-heading">

          <span>

            WORKFLOW

          </span>

          <h2>

            Intelligent Process

          </h2>

        </div>

        <div className="workflow">

            <div className="workflow-step">

                <div className="step-number">

                    01

                </div>

                <h3>Create</h3>

                <p>

                    Generate SOPs using AI.

                </p>

            </div>

            <div className="workflow-line"></div>

            <div className="workflow-step">

                <div className="step-number">

                    02

                </div>

                <h3>Review</h3>

                <p>

                    Managers review documents.

                </p>

            </div>

            <div className="workflow-line"></div>

            <div className="workflow-step">

                <div className="step-number">

                    03

                </div>

                <h3>Approve</h3>

                <p>

                    Intelligent approval workflow.

                </p>

            </div>

            <div className="workflow-line"></div>

            <div className="workflow-step">

                <div className="step-number">

                    04

                </div>

                <h3>Train</h3>

                <p>

                    Employees learn latest SOPs.

                </p>

            </div>

            <div className="workflow-line"></div>

            <div className="workflow-step">

                <div className="step-number">

                    05

                </div>

                <h3>Analyse</h3>

                <p>

                    AI generates insights.

                </p>

            </div>

        </div>

      </section>



      {/*========================================
                AI PREVIEW
      =========================================*/}

      <section className="ai-preview reveal">

        <div className="ai-left">

            <span>

                AI Workspace

            </span>

            <h2>

                Ask Your Knowledge Base
                Like ChatGPT

            </h2>

            <p>

                Search SOPs, policies,
                training manuals and documents
                naturally using Artificial
                Intelligence.

            </p>

            <button className="primary-btn">

                Try AI Assistant

                <FaArrowRight />

            </button>

        </div>

        <div className="ai-right">

            <div className="chat-window">

                <div className="chat-header">

                    AI Assistant

                </div>

                <div className="chat-body">

                    <div className="user-msg">

                        Show SOP for Vendor
                        Onboarding

                    </div>

                    <div className="ai-msg">

                        I found 4 SOPs.

                        <br />

                        ✔ Vendor Registration

                        <br />

                        ✔ Approval Workflow

                        <br />

                        ✔ Procurement Process

                        <br />

                        ✔ Compliance Checklist

                    </div>

                </div>

            </div>

        </div>

      </section>
            {/*========================================
              SECURITY
      =========================================*/}

      <section id="security" className="security-section reveal">

        <div className="section-heading">

          <span>SECURITY</span>

          <h2>
            Enterprise Grade
            Security & Governance
          </h2>

          <p>
            Designed with security, compliance,
            governance and scalability at its core.
          </p>

        </div>

        <div className="security-grid">

          <div className="security-card">
            <div className="security-icon">🔐</div>
            <h3>Authentication</h3>
            <p>
              Secure Login, OTP,
              Password Policies &
              Multi-level Authentication.
            </p>
          </div>

          <div className="security-card">
            <div className="security-icon">🛡</div>
            <h3>Role Permissions</h3>
            <p>
              Fine-grained access
              for every department
              and employee.
            </p>
          </div>

          <div className="security-card">
            <div className="security-icon">📜</div>
            <h3>Audit Trail</h3>
            <p>
              Every action is
              securely recorded
              for complete traceability.
            </p>
          </div>

          <div className="security-card">
            <div className="security-icon">📂</div>
            <h3>Version History</h3>
            <p>
              Restore previous SOPs
              with complete
              document history.
            </p>
          </div>

        </div>

      </section>



      {/*========================================
              TESTIMONIALS
      =========================================*/}

      <section className="testimonial-section reveal">

        <div className="section-heading">

          <span>SUCCESS STORIES</span>

          <h2>

            Teams Love Working
            With AI SOP

          </h2>

        </div>

        <div className="testimonial-grid">

          <div className="testimonial-card">

            <p>

              "Our documentation time
              reduced dramatically.
              AI makes SOP creation
              effortless."

            </p>

            <h4>

              Sarah Johnson

            </h4>

            <span>

              Operations Manager

            </span>

          </div>

          <div className="testimonial-card">

            <p>

              "Approval workflows
              became faster and
              compliance tracking
              is now effortless."

            </p>

            <h4>

              Michael Smith

            </h4>

            <span>

              Compliance Lead

            </span>

          </div>

          <div className="testimonial-card">

            <p>

              "The AI Assistant
              instantly finds
              every SOP we need."

            </p>

            <h4>

              Emily Davis

            </h4>

            <span>

              HR Manager

            </span>

          </div>

        </div>

      </section>



      {/*========================================
                  FAQ
      =========================================*/}

      <section id="faq" className="faq-section reveal">

        <div className="section-heading">

          <span>FAQ</span>

          <h2>

            Frequently Asked Questions

          </h2>

        </div>

        <div className="faq-container">

          <div className="faq-item">

            <h3>

              What is AI SOP Management Portal?

            </h3>

            <p>

              An enterprise platform
              for managing SOPs,
              AI automation,
              approvals,
              training
              and compliance.

            </p>

          </div>

          <div className="faq-item">

            <h3>

              Can AI generate SOPs?

            </h3>

            <p>

              Yes.
              AI generates structured
              SOP drafts that can be
              reviewed and approved.

            </p>

          </div>

          <div className="faq-item">

            <h3>

              Can I upload PDFs?

            </h3>

            <p>

              Yes.
              Upload PDFs,
              images,
              Word files and
              use OCR to extract
              information.

            </p>

          </div>

        </div>

      </section>



      {/*========================================
                CTA
      =========================================*/}

      <section className="cta-section reveal">

        <h2>

          Ready To Transform
          Your Organization?

        </h2>

        <p>

          Build intelligent workflows,
          automate documentation
          and empower every team
          with Artificial Intelligence.

        </p>

        <div className="cta-buttons">

          <button className="primary-btn">

            Get Started

            <FaArrowRight />

          </button>

          <button className="secondary-btn">

            Book Demo

          </button>

        </div>

      </section>



      {/*========================================
                  FOOTER
      =========================================*/}

      <footer className="footer reveal">

        <div className="footer-top">

          <div className="footer-brand">

            <h2>

              AI SOP

            </h2>

            <p>

              Enterprise AI Platform
              for SOP Management,
              Automation and
              Knowledge Intelligence.

            </p>

          </div>

          <div className="footer-links">

            <div>

              <h4>

                Platform

              </h4>

              <a href="#">Features</a>

              <a href="#">Modules</a>

              <a href="#">Security</a>

              <a href="#">Pricing</a>

            </div>

            <div>

              <h4>

                Company

              </h4>

              <a href="#">About</a>

              <a href="#">Contact</a>

              <a href="#">Support</a>

              <a href="#">Careers</a>

            </div>

            <div>

              <h4>

                Account

              </h4>

              <a href="#">Login</a>

              <a href="#">Register</a>

              <a href="#">Forgot Password</a>

            </div>

          </div>

        </div>

        <div className="footer-bottom">

          © 2026 AI SOP Management Portal.
          All Rights Reserved.

        </div>

      </footer>

    </div>

  );

}