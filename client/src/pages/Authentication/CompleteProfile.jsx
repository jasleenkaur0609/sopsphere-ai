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
} from "react-icons/fa";

export default function ProfileCompletion() {
  const navigate = useNavigate();

  /* =====================================================
     FORM STATE
  ===================================================== */

  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    organization: "",
    employeeId: "",
    location: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  /* =====================================================
     HANDLE INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     HANDLE SUBMIT
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.jobTitle ||
      !formData.department ||
      !formData.organization ||
      !formData.location ||
      !formData.role
    ) {
      alert("Please complete all required fields.");

      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate("/mobile-verification");
    }, 1200);
  };

  /* =====================================================
     BACK
  ===================================================== */

  const handleBack = () => {
    navigate("/verify-email");
  };
    /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="profile-page">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="profile-bg"></div>

      <div className="profile-blob profile-blob1"></div>
      <div className="profile-blob profile-blob2"></div>
      <div className="profile-blob profile-blob3"></div>


      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="profile-container">


        {/* =================================================
            LEFT PANEL
        ================================================= */}

        <div className="profile-left">


          {/* ===============================================
              BRAND
          =============================================== */}

          <div className="profile-brand">

            <div className="profile-brand-logo">
              AI
            </div>

            <div className="profile-brand-text">

              <h2>
                AI SOP Portal
              </h2>

              <span>
                Enterprise Knowledge Platform
              </span>

            </div>

          </div>


          {/* ===============================================
              REGISTRATION PROGRESS
          =============================================== */}

          <div className="profile-progress">

            <div className="profile-progress-header">

              <span>
                Registration Progress
              </span>

              <span>
                Step 3 of 4
              </span>

            </div>


            <div className="profile-progress-bar">

              <div className="profile-progress-fill"></div>

            </div>


            <div className="profile-step-items">


              {/* STEP 1 */}

              <div className="profile-step completed">

                <div className="profile-step-circle">
                  ✓
                </div>

                <span>
                  Create Account
                </span>

              </div>


              {/* STEP 2 */}

              <div className="profile-step completed">

                <div className="profile-step-circle">
                  ✓
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


          {/* ===============================================
              HERO / INFORMATION
          =============================================== */}

          <div className="profile-hero">

            <div className="profile-hero-icon">

              <FaUserTie />

            </div>


            <h1>
              Complete Your{" "}
              <span>Professional Profile</span>
            </h1>


            <p>
             Complete your professional profile to personalize your enterprise workspace and make the most of the AI SOP Portal. Providing details about your role, department, organization, location, and professional identity allows the platform to deliver a more relevant experience with tailored workflows, resources, and access to features aligned with your responsibilities.
            </p>

          </div>


          {/* ===============================================
              BENEFITS
          =============================================== */}

          <div className="profile-benefits">


            <div className="profile-benefit">

              <FaBriefcase />

              <span>
                Personalize your enterprise workspace
              </span>

            </div>


            <div className="profile-benefit">

              <FaBuilding />

              <span>
                Connect your organization details
              </span>

            </div>


            <div className="profile-benefit">

              <FaIdBadge />

              <span>
                Configure your professional identity
              </span>

            </div>


          </div>


        </div>
                {/* =================================================
            RIGHT PANEL
        ================================================= */}

        <div className="profile-right">

          <div className="profile-card">


            {/* ===============================================
                HEADER
            =============================================== */}

            <div className="profile-header">

              <h2>
                Complete Your Profile
              </h2>

              <p>
                Tell us a little more about your professional
                profile to complete your onboarding.
              </p>

            </div>


            {/* ===============================================
                PROFILE FORM
            =============================================== */}

            <form
              className="profile-form"
              onSubmit={handleSubmit}
            >


              {/* =============================================
                  JOB TITLE
              ============================================= */}

              <div className="profile-input-group">

                <label>
                  Job Title
                </label>

                <div className="profile-input-field">

                  <FaBriefcase className="profile-input-icon" />

                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Enter your job title"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* =============================================
                  DEPARTMENT
              ============================================= */}

              <div className="profile-input-group">

                <label>
                  Department
                </label>

                <div className="profile-input-field">

                  <FaBuilding className="profile-input-icon" />

                  <select
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


              {/* =============================================
                  ORGANIZATION
              ============================================= */}

              <div className="profile-input-group">

                <label>
                  Organization
                </label>

                <div className="profile-input-field">

                  <FaBuilding className="profile-input-icon" />

                  <input
                    type="text"
                    name="organization"
                    placeholder="Enter your organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* =============================================
                  EMPLOYEE ID
              ============================================= */}

              <div className="profile-input-group">

                <label>
                  Employee ID
                  <span className="optional-label">
                    Optional
                  </span>
                </label>

                <div className="profile-input-field">

                  <FaIdBadge className="profile-input-icon" />

                  <input
                    type="text"
                    name="employeeId"
                    placeholder="Enter employee ID"
                    value={formData.employeeId}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* =============================================
                  LOCATION
              ============================================= */}

              <div className="profile-input-group">

                <label>
                  Location
                </label>

                <div className="profile-input-field">

                  <FaMapMarkerAlt className="profile-input-icon" />

                  <select
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


              {/* =============================================
                  ROLE
              ============================================= */}

              <div className="profile-input-group">

                <label>
                  Role
                </label>

                <div className="profile-input-field">

                  <FaUserTie className="profile-input-icon" />

                  <select
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


              {/* =============================================
                  ACTION BUTTONS
              ============================================= */}

              <div className="profile-actions">


                {/* BACK */}

                <button
                  type="button"
                  className="profile-back-btn"
                  onClick={handleBack}
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

                  <span>
                    {loading
                      ? "Saving..."
                      : "Continue"
                    }
                  </span>

                  {!loading && (
                    <FaArrowRight />
                  )}

                </button>


              </div>

            </form>


          </div>

        </div>


      </div>

    </div>
  );
}