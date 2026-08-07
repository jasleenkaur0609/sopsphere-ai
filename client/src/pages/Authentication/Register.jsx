import "./Register.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

export default function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);

  const [formData, setFormData] = useState({

    firstName: "",

    lastName: "",

    email: "",

    password: "",

    confirmPassword: "",

  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!agreeTerms) {

      alert("Please accept the Terms & Conditions.");

      return;

    }

    if (formData.password !== formData.confirmPassword) {

      alert("Passwords do not match.");

      return;

    }

    setLoading(true);

    setTimeout(() => {

      setLoading(false);

      navigate("/verify-email");

    }, 1500);

  };

  return (

    <div className="register-page">

      {/* Background */}

      <div className="register-bg"></div>

      <div className="blob blob1"></div>

      <div className="blob blob2"></div>

      <div className="blob blob3"></div>

      <div className="register-container">
                {/*==========================================================
                        LEFT PANEL
        ==========================================================*/}

        <div className="register-left">

          {/*==============================
                    BRAND
          ==============================*/}

          <div className="brand">

            <div className="brand-logo">

              AI

            </div>

            <div>

              <h2>AI SOP Portal</h2>

              <span>Enterprise Knowledge Platform</span>

            </div>

          </div>

          {/*==============================
                  STEP INDICATOR
          ==============================*/}

          <div className="step-indicator">

            <span className="step-label">

              Step 1 of 4

            </span>

            <div className="step-progress">

              <div className="step-progress-fill"></div>

            </div>

            <div className="step-items">

              <div className="step-item active">

                <div className="step-circle">

                  1

                </div>

                <span>Create Account</span>

              </div>

              <div className="step-item">

                <div className="step-circle">

                  2

                </div>

                <span>Verify Email</span>

              </div>

              <div className="step-item">

                <div className="step-circle">

                  3

                </div>

                <span>Profile</span>

              </div>

              <div className="step-item">

                <div className="step-circle">

                  4

                </div>

                <span>Verify Mobile</span>

              </div>

            </div>

          </div>

          {/*==============================
                    HERO
          ==============================*/}

          <div className="hero-content">

            <span className="register-badge">

              <FaCheckCircle />

              Secure Enterprise Registration

            </span>

            <h1>

              Create Your

              <br />

              <span>Enterprise Account</span>

            </h1>

            <p>

              Start your journey with the AI SOP Portal.
              Create your secure account to manage SOPs,
              collaborate with teams, automate workflows,
              and access AI-powered enterprise tools.

            </p>

          </div>

          {/*==============================
                    BENEFITS
          ==============================*/}

          <div className="benefits">

            <div className="benefit-item">

              <FaCheckCircle />

              <span>Enterprise Grade Security</span>

            </div>

            <div className="benefit-item">

              <FaCheckCircle />

              <span>AI Powered SOP Management</span>

            </div>

            <div className="benefit-item">

              <FaCheckCircle />

              <span>Workflow Automation</span>

            </div>

            <div className="benefit-item">

              <FaCheckCircle />

              <span>Real-time Analytics & Reports</span>

            </div>

          </div>

        </div>

        {/*==========================================================
                        RIGHT PANEL
        ==========================================================*/}

        <div className="register-right">

          <div className="register-card">

            <div className="register-header">

              <h2>

                Create Account

              </h2>

              <p>

                Create your account to begin the secure
                onboarding process.

              </p>

            </div>
                        {/*==========================================================
                        REGISTER FORM
            ==========================================================*/}

            <form
              className="register-form"
              onSubmit={handleSubmit}
            >

              {/*==============================
                    NAME
              ==============================*/}

              <div className="row">

                <div className="input-group">

                  <label>First Name</label>

                  <div className="input-field">

                    <FaUser className="input-icon" />

                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <div className="input-group">

                  <label>Last Name</label>

                  <div className="input-field">

                    <FaUser className="input-icon" />

                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

              </div>

              {/*==============================
                    EMAIL
              ==============================*/}

              <div className="input-group">

                <label>Email Address</label>

                <div className="input-field">

                  <FaEnvelope className="input-icon" />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/*==============================
                    PASSWORD
              ==============================*/}

              <div className="input-group">

                <label>Password</label>

                <div className="input-field">

                  <FaLock className="input-icon" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >

                    {
                      showPassword
                        ? <FaEyeSlash />
                        : <FaEye />
                    }

                  </button>

                </div>

              </div>

              {/*==============================
                CONFIRM PASSWORD
              ==============================*/}

              <div className="input-group">

                <label>Confirm Password</label>

                <div className="input-field">

                  <FaLock className="input-icon" />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >

                    {
                      showConfirmPassword
                        ? <FaEyeSlash />
                        : <FaEye />
                    }

                  </button>

                </div>

              </div>

              {/*==============================
                PASSWORD REQUIREMENTS
              ==============================*/}

              <div className="password-info">

                <p>Password should contain:</p>

                <ul>

                  <li>✓ At least 8 characters</li>

                  <li>✓ One uppercase letter</li>

                  <li>✓ One lowercase letter</li>

                  <li>✓ One number</li>

                  <li>✓ One special character</li>

                </ul>

              </div>
                            {/*==============================
                  TERMS & CONDITIONS
              ==============================*/}

              <label className="terms-check">

                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                />

                <span>

                  I agree to the

                  <button
                    type="button"
                    className="terms-link"
                  >
                    Terms & Conditions
                  </button>

                  {" "}and{" "}

                  <button
                    type="button"
                    className="terms-link"
                  >
                    Privacy Policy
                  </button>

                </span>

              </label>

              {/*==============================
                    REGISTER BUTTON
              ==============================*/}

              <button
                type="submit"
                className="register-btn"
                disabled={loading}
              >

                {

                  loading

                    ?

                    "Creating Account..."

                    :

                    <>

                      Create Account

                      <FaArrowRight />

                    </>

                }

              </button>

            </form>

            {/*==========================================================
                        LOGIN LINK
            ==========================================================*/}

            <div className="login-section">

              <p>

                Already have an account?

              </p>

              <button

                type="button"

                className="login-link"

                onClick={() => navigate("/login")}

              >

                Sign In

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}