import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGoogle,
  FaMicrosoft,
  FaRobot,
  FaShieldAlt,
  FaChartLine,
  FaBrain,
} from "react-icons/fa";

export default function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    email: "",

    password: "",

  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({

      ...formData,

      [name]: value,

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    setLoading(true);

    setTimeout(() => {

      setLoading(false);

      navigate("/dashboard");

    }, 1800);

  };

  return (

    <div className="login-page">

      {/* Animated Background */}

      <div className="login-bg"></div>

      <div className="blob blob1"></div>

      <div className="blob blob2"></div>

      <div className="blob blob3"></div>

      {/* Login Container */}

      <div className="login-container">
                {/*==========================================================
                        LEFT PANEL
        ==========================================================*/}

        <div className="login-left">

          <div className="brand">

            <div className="brand-logo">

              AI

            </div>

            <div>

              <h2>AI SOP Portal</h2>

              <span>Enterprise Intelligence Platform</span>

            </div>

          </div>

          <div className="hero-content">

            <span className="login-badge">

              <FaRobot />

              AI Powered Enterprise Platform

            </span>

            <h1>

              Intelligent

              <br />

              Workspace for

              <br />

              <span>Modern Enterprises</span>

            </h1>

            <p>

              Manage SOPs, automate workflows, collaborate securely,

              generate AI-powered documents and gain business insights

              from one intelligent platform.

            </p>

          </div>

          {/*==============================
                LIVE STATS
          ==============================*/}

          <div className="stats-grid">

            <div className="stat-box">

              <FaBrain className="stat-icon"/>

              <div>

                <h3>98%</h3>

                <span>AI Accuracy</span>

              </div>

            </div>

            <div className="stat-box">

              <FaShieldAlt className="stat-icon"/>

              <div>

                <h3>100%</h3>

                <span>Secure</span>

              </div>

            </div>

            <div className="stat-box">

              <FaChartLine className="stat-icon"/>

              <div>

                <h3>250K+</h3>

                <span>SOP Processed</span>

              </div>

            </div>

          </div>

          {/*==============================
                FLOATING CARDS
          ==============================*/}

          <div className="floating-card card-top">

            <FaRobot />

            <div>

              <h4>AI Assistant</h4>

              <span>Always Available</span>

            </div>

          </div>

          <div className="floating-card card-middle">

            <FaShieldAlt />

            <div>

              <h4>Enterprise Security</h4>

              <span>ISO 27001 Ready</span>

            </div>

          </div>

          <div className="floating-card card-bottom">

            <FaChartLine />

            <div>

              <h4>Analytics</h4>

              <span>Real-time Insights</span>

            </div>

          </div>

        </div>

        {/*==========================================================
                        RIGHT PANEL
        ==========================================================*/}

        <div className="login-right">

          <div className="login-card">

            <div className="login-header">

              <h2>

                Welcome Back

              </h2>

              <p>

                Sign in to continue to your workspace

              </p>

            </div>
                        {/*==========================================================
                            LOGIN FORM
            ==========================================================*/}

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >

              {/*==============================
                    EMAIL
              ==============================*/}

              <div className="input-group">

                <label>

                  Email Address

                </label>

                <div className="input-field">

                  <FaEnvelope className="input-icon" />

                  <input

                    type="email"

                    name="email"

                    placeholder="Enter your email"

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

                <label>

                  Password

                </label>

                <div className="input-field">

                  <FaLock className="input-icon" />

                  <input

                    type={showPassword ? "text" : "password"}

                    name="password"

                    placeholder="Enter your password"

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

                        ?

                        <FaEyeSlash />

                        :

                        <FaEye />

                    }

                  </button>

                </div>

              </div>

              {/*==============================
                  REMEMBER + FORGOT
              ==============================*/}

              <div className="login-options">

                <label className="remember-me">

                  <input

                    type="checkbox"

                    checked={rememberMe}

                    onChange={() =>

                      setRememberMe(!rememberMe)

                    }

                  />

                  Remember Me

                </label>

                <button

                  type="button"

                  className="forgot-password"

                  onClick={() =>

                    navigate("/forgot-password")

                  }

                >

                  Forgot Password?

                </button>

              </div>

              {/*==============================
                    LOGIN BUTTON
              ==============================*/}

              <button

                className="login-btn"

                type="submit"

                disabled={loading}

              >

                {

                  loading

                  ?

                  "Signing In..."

                  :

                  <>

                    Sign In

                    <FaArrowRight />

                  </>

                }

              </button>

            </form>

            {/*==========================================================
                    SOCIAL LOGIN
            ==========================================================*/}

            <div className="divider">

              <span>

                OR CONTINUE WITH

              </span>

            </div>

            <div className="social-login">

              <button className="social-btn">

                <FaMicrosoft />

                Microsoft

              </button>

              <button className="social-btn">

                <FaGoogle />

                Google

              </button>

            </div>
                        {/*==========================================================
                        CREATE ACCOUNT
            ==========================================================*/}

            <div className="register-section">

              <p>

                Don't have an account?

              </p>

              <button

                type="button"

                className="register-link"

                onClick={() => navigate("/register")}

              >

                Create Account

              </button>

            </div>

            {/*==========================================================
                        TERMS
            ==========================================================*/}

            <div className="login-footer">

              <p>

                By signing in you agree to our

                <span> Terms of Service </span>

                and

                <span> Privacy Policy</span>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}