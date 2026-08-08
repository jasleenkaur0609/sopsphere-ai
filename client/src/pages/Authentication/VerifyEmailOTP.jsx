import "./VerifyEmailOTP.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
} from "react-icons/fa";

export default function VerifyEmailOTP() {
  const navigate = useNavigate();

  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [timer, setTimer] = useState(60);

  const [loading, setLoading] = useState(false);

  /*==========================================
                    TIMER
  ==========================================*/

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /*==========================================
                OTP CHANGE
  ==========================================*/

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOTP = [...otp];

    updatedOTP[index] = value;

    setOtp(updatedOTP);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /*==========================================
                BACKSPACE
  ==========================================*/

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /*==========================================
                  PASTE OTP
  ==========================================*/

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedOTP = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    if (!pastedOTP.length) return;

    const updatedOTP = [...otp];

    pastedOTP.forEach((digit, index) => {
      updatedOTP[index] = digit;
    });

    setOtp(updatedOTP);
  };

  /*==========================================
                VERIFY EMAIL
  ==========================================*/

  const handleVerify = () => {
    if (otp.join("").length !== 6) {
      alert("Please enter the complete OTP.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate("/complete-profile");
    }, 1500);
  };

  /*==========================================
                  RESEND OTP
  ==========================================*/

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);

    setTimer(60);

    inputRefs.current[0]?.focus();
  };

  return (
    <div className="verify-page">

      {/* Background */}

      <div className="register-bg"></div>

      <div className="blob blob1"></div>

      <div className="blob blob2"></div>

      <div className="blob blob3"></div>

      <div className="verify-container">
                {/*==========================================================
                        LEFT PANEL
        ==========================================================*/}

        <div className="verify-left">

          {/*==============================
                  BRAND
          ==============================*/}

          <div className="brand">

            <div className="brand-logo">
              AI
            </div>

            <div className="brand-text">

              <h2>AI SOP Portal</h2>

              <span>Enterprise Knowledge Platform</span>

            </div>

          </div>

          {/*==============================
                STEP INDICATOR
          ==============================*/}

          <div className="step-indicator">

            <span className="step-label">

              Step 2 of 4

            </span>

            <div className="step-progress">

              <div
                className="step-progress-fill"
                style={{ width: "50%" }}
              ></div>

            </div>

            <div className="step-items">

              <div className="step-item completed">

                <div className="step-circle">

                  <FaCheckCircle />

                </div>

                <span>Create Account</span>

              </div>

              <div className="step-item active">

                <div className="step-circle">

                  2

                </div>

                <span>Email Verification</span>

              </div>

              <div className="step-item">

                <div className="step-circle">

                  3

                </div>

                <span>Profile Completion</span>

              </div>

              <div className="step-item">

                <div className="step-circle">

                  4

                </div>

                <span>Mobile Verification</span>

              </div>

            </div>

          </div>

          {/*==============================
                  HERO
          ==============================*/}

          <div className="hero-content">

            <div className="register-badge">

              <FaEnvelope />

              <span>Email Verification</span>

            </div>

            <h1>

              Verify Your
              <span> Email Address</span>

            </h1>

            <p>

              We've sent a secure six-digit verification code to your
              registered email address. Enter the code below to continue
              your onboarding process.

            </p>

          </div>

          {/*==============================
                  BENEFITS
          ==============================*/}

          <div className="benefits">

            <div className="benefit-item">

              <FaCheckCircle />

              <span>Secure Email Verification</span>

            </div>

            <div className="benefit-item">

              <FaCheckCircle />

              <span>Encrypted Authentication</span>

            </div>

            <div className="benefit-item">

              <FaCheckCircle />

              <span>Fast & Secure Access</span>

            </div>

          </div>

        </div>

        {/*==========================================================
                        RIGHT PANEL
        ==========================================================*/}

        <div className="verify-right">

          <div className="verify-card">

            <div className="verify-header">

              <h2>

                Verify Email

              </h2>

              <p>

                Enter the 6-digit OTP sent to your email address.

              </p>

            </div>
                        {/*==========================================
                        OTP INPUTS
            ==========================================*/}

            <div className="otp-section">

              <div className="otp-inputs">

                {otp.map((digit, index) => (

                  <input
                    key={index}
                    ref={(element) =>
                      (inputRefs.current[index] = element)
                    }
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) =>
                      handleChange(e.target.value, index)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(e, index)
                    }
                    onPaste={handlePaste}
                    className="otp-input"
                  />

                ))}

              </div>

            </div>

            {/*==========================================
                        TIMER
            ==========================================*/}

            <div className="timer-section">

              {timer > 0 ? (

                <p>

                  OTP expires in

                  <span>

                    {" "}
                    00:{String(timer).padStart(2, "0")}

                  </span>

                </p>

              ) : (

                <button
                  type="button"
                  className="resend-btn"
                  onClick={handleResend}
                >

                  Resend OTP

                </button>

              )}

            </div>

            {/*==========================================
                    ACTION BUTTONS
            ==========================================*/}

            <div className="verify-actions">

              <button
                type="button"
                className="back-btn"
                onClick={() => navigate("/register")}
              >

                <FaArrowLeft />

                Back

              </button>

              <button
                type="button"
                className="verify-btn"
                onClick={handleVerify}
                disabled={loading}
              >

                {loading ? (

                  "Verifying..."

                ) : (

                  <>

                    Verify Email

                    <FaArrowRight />

                  </>

                )}

              </button>

            </div>

            {/*==========================================
                    CHANGE EMAIL
            ==========================================*/}

            <div className="change-email">

              <p>

                Wrong email address?

              </p>

              <button
                type="button"
                onClick={() => navigate("/register")}
              >

                Change Email

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}