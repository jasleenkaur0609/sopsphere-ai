import "./Register.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaBuilding,
  FaIdBadge,
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

    phone: "",

    employeeId: "",

    department: "",

    designation: "",

    password: "",

    confirmPassword: "",

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

      navigate("/verify-otp");

    }, 1800);

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

            <span className="register-badge">

              <FaCheckCircle />

              Join the Future of Enterprise Automation

            </span>

            <h1>

              Create Your

              <br />

              <span>Enterprise Account</span>

            </h1>

            <p>

              Get access to AI-powered SOP management, intelligent
              document processing, workflow automation, advanced analytics,
              and secure enterprise collaboration — all from one platform.

            </p>

          </div>

          {/*==============================
                BENEFITS
          ==============================*/}

          <div className="benefits">

            <div className="benefit-item">

              <FaCheckCircle />

              <span>AI-Powered SOP Generation</span>

            </div>

            <div className="benefit-item">

              <FaCheckCircle />

              <span>Enterprise Grade Security</span>

            </div>

            <div className="benefit-item">

              <FaCheckCircle />

              <span>Role Based User Access</span>

            </div>

            <div className="benefit-item">

              <FaCheckCircle />

              <span>Real-time Reports & Analytics</span>

            </div>

          </div>

          {/*==============================
                PROGRESS
          ==============================*/}

          <div className="register-progress">

            <div className="progress-header">

              <span>Account Setup</span>

              <span>Step 1 of 3</span>

            </div>

            <div className="progress-bar">

              <div className="progress-fill"></div>

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

                Fill in your details to create your enterprise account.

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

                    <FaUser className="input-icon"/>

                    <input

                      type="text"

                      name="firstName"

                      placeholder="First Name"

                      value={formData.firstName}

                      onChange={handleChange}

                      required

                    />

                  </div>

                </div>

                <div className="input-group">

                  <label>Last Name</label>

                  <div className="input-field">

                    <FaUser className="input-icon"/>

                    <input

                      type="text"

                      name="lastName"

                      placeholder="Last Name"

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

                  <FaEnvelope className="input-icon"/>

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
                    PHONE
              ==============================*/}

              <div className="row">

                <div className="input-group">

                  <label>Phone Number</label>

                  <div className="input-field">

                    <FaPhoneAlt className="input-icon"/>

                    <input

                      type="tel"

                      name="phone"

                      placeholder="Phone Number"

                      value={formData.phone}

                      onChange={handleChange}

                      required

                    />

                  </div>

                </div>

                <div className="input-group">

                  <label>Employee ID</label>

                  <div className="input-field">

                    <FaIdBadge className="input-icon"/>

                    <input

                      type="text"

                      name="employeeId"

                      placeholder="Employee ID"

                      value={formData.employeeId}

                      onChange={handleChange}

                      required

                    />

                  </div>

                </div>

              </div>

              {/*==============================
                    DEPARTMENT
              ==============================*/}

              <div className="row">

                <div className="input-group">

                  <label>Department</label>

                  <div className="input-field">

                    <FaBuilding className="input-icon"/>

                    <input

                      type="text"

                      name="department"

                      placeholder="Department"

                      value={formData.department}

                      onChange={handleChange}

                      required

                    />

                  </div>

                </div>

                <div className="input-group">

                  <label>Designation</label>

                  <div className="input-field">

                    <FaBuilding className="input-icon"/>

                    <input

                      type="text"

                      name="designation"

                      placeholder="Designation"

                      value={formData.designation}

                      onChange={handleChange}

                      required

                    />

                  </div>

                </div>

              </div>

              {/*==============================
                    PASSWORD
              ==============================*/}

              <div className="input-group">

                <label>Password</label>

                <div className="input-field">

                  <FaLock className="input-icon"/>

                  <input

                    type={showPassword ? "text" : "password"}

                    name="password"

                    placeholder="Create Password"

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

                      <FaEyeSlash/>

                      :

                      <FaEye/>

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

                  <FaLock className="input-icon"/>

                  <input

                    type={

                      showConfirmPassword

                        ?

                        "text"

                        :

                        "password"

                    }

                    name="confirmPassword"

                    placeholder="Confirm Password"

                    value={formData.confirmPassword}

                    onChange={handleChange}

                    required

                  />

                  <button

                    type="button"

                    className="password-toggle"

                    onClick={()=>

                      setShowConfirmPassword(

                        !showConfirmPassword

                      )

                    }

                  >

                    {

                      showConfirmPassword

                      ?

                      <FaEyeSlash/>

                      :

                      <FaEye/>

                    }

                  </button>

                </div>

              </div>
                            {/*==============================
                  TERMS & CONDITIONS
              ==============================*/}

              <label className="terms-check">

                <input

                  type="checkbox"

                  checked={agreeTerms}

                  onChange={() =>

                    setAgreeTerms(!agreeTerms)

                  }

                />

                <span>

                  I agree to the

                  <button
                    type="button"
                    className="terms-link"
                  >
                    Terms & Conditions
                  </button>

                  and

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

                    <FaArrowRight/>

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