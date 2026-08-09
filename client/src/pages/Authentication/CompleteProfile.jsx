import "./AuthBase.css";
import "./CompleteProfile.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBriefcase,
  FaBuilding,
  FaIdBadge,
  FaMapMarkerAlt,
  FaUserTie,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";

export default function CompleteProfile() {
  const navigate = useNavigate();

  /* =========================================================
     FORM STATE
  ========================================================= */

  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    organization: "",
    employeeId: "",
    location: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);


  /* =========================================================
     HANDLE INPUT CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /* =========================================================
     HANDLE SUBMIT
  ========================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.jobTitle.trim() ||
      !formData.department ||
      !formData.organization.trim() ||
      !formData.location ||
      !formData.role
    ) {
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);

    /*
      Temporary onboarding transition.

      Replace this with your API / Redux / Firebase
      profile-save logic when backend integration
      is connected.
    */

    setTimeout(() => {
      setLoading(false);

      navigate("/mobile-verification");
    }, 1200);
  };


  /* =========================================================
     BACK
  ========================================================= */

  const handleBack = () => {
    navigate("/verify-email");
  };


  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="auth-page profile-page">

      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div
        className="profile-bg"
        aria-hidden="true"
      />

      <div
        className="profile-blob profile-blob1"
        aria-hidden="true"
      />

      <div
        className="profile-blob profile-blob2"
        aria-hidden="true"
      />

      <div
        className="profile-blob profile-blob3"
        aria-hidden="true"
      />


      {/* =====================================================
          MAIN AUTH CONTAINER

          auth-container / auth-left / auth-right
          come from AuthBase.css.

          profile-* classes are page-specific.
      ===================================================== */}

      <section className="auth-container profile-container">


        {/* ===================================================
            LEFT PANEL
        =================================================== */}

        <div className="auth-left profile-left">


          {/* =================================================
              BRAND
          ================================================= */}

          <div className="auth-brand profile-brand">

            <div
              className="auth-brand-logo profile-brand-logo"
              aria-hidden="true"
            >
              AI
            </div>

            <div className="auth-brand-text profile-brand-text">

              <h2>
                AI SOP Portal
              </h2>

              <span>
                Enterprise Knowledge Platform
              </span>

            </div>

          </div>


          {/* =================================================
              REGISTRATION PROGRESS
          ================================================= */}

          <div className="profile-progress">

            <div className="profile-progress-header">

              <span>
                Registration Progress
              </span>

              <strong>
                Step 3 of 4
              </strong>

            </div>


            {/* Progress bar */}

            <div className="profile-progress-bar">

              <div
                className="profile-progress-fill"
                aria-hidden="true"
              />

            </div>


            {/* Step indicators */}

            <div className="profile-step-items">


              {/* STEP 1 */}

              <div className="profile-step completed">

                <div className="profile-step-circle">
                  <FaCheckCircle />
                </div>

                <span>
                  Create Account
                </span>

              </div>


              {/* STEP 2 */}

              <div className="profile-step completed">

                <div className="profile-step-circle">
                  <FaCheckCircle />
                </div>

                <span>
                  Email Verification
                </span>

              </div>


              {/* STEP 3 */}

              <div className="profile-step active">

                <div className="profile-step-circle">
                  3
                </div>

                <span>
                  Profile Completion
                </span>

              </div>


              {/* STEP 4 */}

              <div className="profile-step">

                <div className="profile-step-circle">
                  4
                </div>

                <span>
                  Mobile Verification
                </span>

              </div>

            </div>

          </div>


          {/* =================================================
              HERO
          ================================================= */}

          <section className="profile-hero">


            {/* Hero icon */}

            <div
              className="profile-hero-icon"
              aria-hidden="true"
            >
              <FaUserTie />
            </div>


            {/* Heading */}

            <h1>
              Complete Your{" "}
              <span>
                Professional Profile
              </span>
            </h1>


            {/* Description */}

            <p>
              Complete your professional profile to personalize
              your enterprise workspace and make the most of the
              AI SOP Portal. Providing details about your role,
              department, organization, location, and professional
              identity allows the platform to deliver a more
              relevant experience with tailored workflows,
              resources, and access to features aligned with your
              responsibilities.
            </p>

          </section>


          {/* =================================================
              BENEFITS
          ================================================= */}

          <div className="profile-benefits">


            {/* BENEFIT 01 */}

            <div className="profile-benefit">

              <div
                className="profile-benefit-icon"
                aria-hidden="true"
              >
                <FaBriefcase />
              </div>

              <div className="profile-benefit-content">

                <strong>
                  Personalize your enterprise workspace
                </strong>

                <span>
                  Get a customized workspace with relevant
                  content, workflows, and recommendations.
                </span>

              </div>

              <span
                className="profile-benefit-number"
                aria-hidden="true"
              >
                01
              </span>

            </div>


            {/* BENEFIT 02 */}

            <div className="profile-benefit">

              <div
                className="profile-benefit-icon"
                aria-hidden="true"
              >
                <FaBuilding />
              </div>

              <div className="profile-benefit-content">

                <strong>
                  Connect your organization
                </strong>

                <span>
                  Link your organization details and enable
                  smoother collaboration across your team.
                </span>

              </div>

              <span
                className="profile-benefit-number"
                aria-hidden="true"
              >
                02
              </span>

            </div>


            {/* BENEFIT 03 */}

            <div className="profile-benefit">

              <div
                className="profile-benefit-icon"
                aria-hidden="true"
              >
                <FaIdBadge />
              </div>

              <div className="profile-benefit-content">

                <strong>
                  Configure your professional identity
                </strong>

                <span>
                  Set your role and professional identity for
                  relevant access and personalized experiences.
                </span>

              </div>

              <span
                className="profile-benefit-number"
                aria-hidden="true"
              >
                03
              </span>

            </div>

          </div>


          {/* =================================================
              SECURITY NOTE
          ================================================= */}

          <div className="profile-security-note">

            <FaLock />

            <span>
              Your professional information is protected
              with secure enterprise authentication.
            </span>

          </div>

        </div>


        {/* ===================================================
            RIGHT PANEL
        =================================================== */}

        <div className="auth-right profile-right">


          {/* =================================================
              PROFILE CARD
          ================================================= */}

          <div className="profile-card">


            {/* =================================================
                CARD HEADER
            ================================================= */}

            <div className="profile-header">


              {/* Badge */}

              <div className="profile-header-badge">

                <FaUserTie />

                <span>
                  Profile Setup
                </span>

              </div>


              <h2>
                Complete Your Profile
              </h2>

              <p>
                Tell us a little more about your professional
                profile to complete your onboarding.
              </p>

            </div>


            {/* =================================================
                PROFILE FORM
            ================================================= */}

            <form
              className="profile-form"
              onSubmit={handleSubmit}
            >


              {/* =================================================
                  TOP ROW
                  JOB TITLE + DEPARTMENT
              ================================================= */}

              <div className="profile-form-row">


                {/* JOB TITLE */}

                <div className="profile-input-group">

                  <label htmlFor="jobTitle">
                    Job Title
                  </label>

                  <div className="profile-input-field">

                    <FaBriefcase
                      className="profile-input-icon"
                      aria-hidden="true"
                    />

                    <input
                      id="jobTitle"
                      type="text"
                      name="jobTitle"
                      placeholder="Enter your job title"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      autoComplete="organization-title"
                      required
                    />

                  </div>

                </div>


                {/* DEPARTMENT */}

                <div className="profile-input-group">

                  <label htmlFor="department">
                    Department
                  </label>

                  <div className="profile-input-field">

                    <FaBuilding
                      className="profile-input-icon"
                      aria-hidden="true"
                    />

                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select your department
                      </option>

                      <option value="engineering">
                        Engineering
                      </option>

                      <option value="technology">
                        Technology
                      </option>

                      <option value="operations">
                        Operations
                      </option>

                      <option value="finance">
                        Finance
                      </option>

                      <option value="human-resources">
                        Human Resources
                      </option>

                      <option value="sales">
                        Sales
                      </option>

                      <option value="marketing">
                        Marketing
                      </option>

                      <option value="other">
                        Other
                      </option>

                    </select>

                  </div>

                </div>

              </div>


              {/* =================================================
                  ORGANIZATION
              ================================================= */}

              <div className="profile-input-group">

                <label htmlFor="organization">
                  Organization
                </label>

                <div className="profile-input-field">

                  <FaBuilding
                    className="profile-input-icon"
                    aria-hidden="true"
                  />

                  <input
                    id="organization"
                    type="text"
                    name="organization"
                    placeholder="Enter your organization"
                    value={formData.organization}
                    onChange={handleChange}
                    autoComplete="organization"
                    required
                  />

                </div>

              </div>


              {/* =================================================
                  EMPLOYEE ID + LOCATION
              ================================================= */}

              <div className="profile-form-row">


                {/* EMPLOYEE ID */}

                <div className="profile-input-group">

                  <label htmlFor="employeeId">

                    Employee ID

                    <span className="optional-label">
                      Optional
                    </span>

                  </label>

                  <div className="profile-input-field">

                    <FaIdBadge
                      className="profile-input-icon"
                      aria-hidden="true"
                    />

                    <input
                      id="employeeId"
                      type="text"
                      name="employeeId"
                      placeholder="Enter employee ID"
                      value={formData.employeeId}
                      onChange={handleChange}
                      autoComplete="off"
                    />

                  </div>

                </div>


                {/* LOCATION */}

                <div className="profile-input-group">

                  <label htmlFor="location">
                    Location
                  </label>

                  <div className="profile-input-field">

                    <FaMapMarkerAlt
                      className="profile-input-icon"
                      aria-hidden="true"
                    />

                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select your location
                      </option>

                      <option value="india">
                        India
                      </option>

                      <option value="usa">
                        United States
                      </option>

                      <option value="canada">
                        Canada
                      </option>

                      <option value="uk">
                        United Kingdom
                      </option>

                      <option value="australia">
                        Australia
                      </option>

                      <option value="other">
                        Other
                      </option>

                    </select>

                  </div>

                </div>

              </div>


              {/* =================================================
                  ROLE
              ================================================= */}

              <div className="profile-input-group">

                <label htmlFor="role">
                  Role
                </label>

                <div className="profile-input-field">

                  <FaUserTie
                    className="profile-input-icon"
                    aria-hidden="true"
                  />

                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select your role
                    </option>

                    <option value="employee">
                      Employee
                    </option>

                    <option value="manager">
                      Manager
                    </option>

                    <option value="team-lead">
                      Team Lead
                    </option>

                    <option value="administrator">
                      Administrator
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </div>

              </div>


              {/* =================================================
                  ACTION BUTTONS
              ================================================= */}

              <div className="profile-actions">


                {/* BACK */}

                <button
                  type="button"
                  className="profile-back-btn"
                  onClick={handleBack}
                  disabled={loading}
                >

                  <FaArrowLeft />

                  <span>
                    Back
                  </span>

                </button>


                {/* CONTINUE */}

                <button
                  type="submit"
                  className="profile-continue-btn"
                  disabled={loading}
                >

                  {loading ? (
                    <>
                      <span className="profile-spinner" />

                      <span>
                        Saving...
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        Continue
                      </span>

                      <FaArrowRight />
                    </>
                  )}

                </button>

              </div>


              {/* =================================================
                  CARD SECURITY NOTE
              ================================================= */}

              <div className="profile-card-security">

                <FaLock />

                <span>
                  Your information is secure and encrypted
                </span>

              </div>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}