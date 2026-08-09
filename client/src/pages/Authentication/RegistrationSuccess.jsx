import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "./AuthBase.css";
import "./RegistrationSuccess.css";


const RegistrationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  /*
   * Email can be passed from the previous authentication page:
   *
   * navigate("/registration-success", {
   *   state: { email: userEmail }
   * });
   *
   * If it isn't available, the page still works normally.
   */
  const registeredEmail =
    location.state?.email ||
    location.state?.user?.email ||
    "your registered email address";


  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);


  const handleDashboard = () => {
    if (isRedirecting) return;

    setIsRedirecting(true);

    /*
     * Small delay allows the button animation to be visible
     * before navigating to the dashboard.
     */
    setTimeout(() => {
      navigate("/dashboard");
    }, 450);
  };


  const handleLogin = () => {
    navigate("/login");
  };


  return (
    <div
      className={`registration-success-page ${
        isVisible ? "registration-success-visible" : ""
      }`}
    >

      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className="registration-success-background">

        <div className="registration-success-orb registration-success-orb-one" />

        <div className="registration-success-orb registration-success-orb-two" />

        <div className="registration-success-orb registration-success-orb-three" />

        <div className="registration-success-grid" />

      </div>


      {/* =====================================================
          MAIN CONTAINER
          ===================================================== */}

      <main className="registration-success-container">

        {/* ===================================================
            BRAND
            =================================================== */}

        <div className="registration-success-brand">

          <div className="registration-success-brand-logo">
            AI
          </div>

          <div className="registration-success-brand-text">

            <h1>AI SOP Portal</h1>

            <span>
              Enterprise Knowledge Platform
            </span>

          </div>

        </div>


        {/* ===================================================
            SUCCESS CARD
            =================================================== */}

        <section className="registration-success-card">

          {/* Top animated accent */}
          <div className="registration-success-card-line" />


          {/* =================================================
              SUCCESS ICON
              ================================================= */}

          <div className="registration-success-icon-wrapper">

            <div className="registration-success-icon-ring registration-success-ring-one" />

            <div className="registration-success-icon-ring registration-success-ring-two" />

            <div className="registration-success-icon">

              <CheckCircle2
                size={58}
                strokeWidth={1.8}
              />

            </div>

            <div className="registration-success-spark spark-one">
              <Sparkles size={14} />
            </div>

            <div className="registration-success-spark spark-two">
              <Sparkles size={11} />
            </div>

          </div>


          {/* =================================================
              BADGE
              ================================================= */}

          <div className="registration-success-badge">

            <Check size={14} strokeWidth={3} />

            <span>
              Registration Complete
            </span>

          </div>


          {/* =================================================
              HEADING
              ================================================= */}

          <div className="registration-success-heading">

            <h2>
              Your Account
              <span> Is Ready!</span>
            </h2>

            <p>
              Welcome to the AI SOP Portal. Your enterprise
              account has been successfully created and is
              ready to use.
            </p>

          </div>


          {/* =================================================
              EMAIL CONFIRMATION
              ================================================= */}

          <div className="registration-success-email">

            <div className="registration-success-email-icon">

              <CheckCircle2
                size={18}
                strokeWidth={2}
              />

            </div>

            <div className="registration-success-email-content">

              <span>
                Account registered with
              </span>

              <strong>
                {registeredEmail}
              </strong>

            </div>

          </div>


          {/* =================================================
              FEATURES
              ================================================= */}

          <div className="registration-success-features">

            <div className="registration-success-feature">

              <div className="registration-success-feature-icon">
                <ShieldCheck
                  size={18}
                  strokeWidth={1.9}
                />
              </div>

              <div>
                <strong>
                  Secure Account
                </strong>

                <span>
                  Your enterprise account is protected.
                </span>
              </div>

            </div>


            <div className="registration-success-feature">

              <div className="registration-success-feature-icon">
                <LayoutDashboard
                  size={18}
                  strokeWidth={1.9}
                />
              </div>

              <div>
                <strong>
                  Dashboard Ready
                </strong>

                <span>
                  Access your personalized workspace.
                </span>
              </div>

            </div>

          </div>


          {/* =================================================
              PRIMARY ACTION
              ================================================= */}

          <button
            type="button"
            className={`registration-success-dashboard-btn ${
              isRedirecting
                ? "registration-success-button-loading"
                : ""
            }`}
            onClick={handleDashboard}
            disabled={isRedirecting}
          >

            {isRedirecting ? (
              <>
                <span className="registration-success-spinner" />

                <span>
                  Opening Dashboard...
                </span>
              </>
            ) : (
              <>
                <LayoutDashboard
                  size={18}
                  strokeWidth={2}
                />

                <span>
                  Go to Dashboard
                </span>

                <ArrowRight
                  size={18}
                  strokeWidth={2}
                />
              </>
            )}

          </button>


          {/* =================================================
              SECONDARY ACTION
              ================================================= */}

          <button
            type="button"
            className="registration-success-login-btn"
            onClick={handleLogin}
          >
            Return to Sign In
          </button>


          {/* =================================================
              SECURITY FOOTER
              ================================================= */}

          <div className="registration-success-security">

            <ShieldCheck
              size={14}
              strokeWidth={2}
            />

            <span>
              Protected enterprise authentication
            </span>

          </div>

        </section>


        {/* ===================================================
            FOOTER
            =================================================== */}

        <footer className="registration-success-footer">

          <span>
            AI SOP Portal
          </span>

          <span className="registration-success-footer-dot">
            •
          </span>

          <span>
            Secure Enterprise Platform
          </span>

        </footer>

      </main>

    </div>
  );
};


export default RegistrationSuccess;