import "./AuthBase.css";
import "./ForgotPassword.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaArrowLeft,
  FaArrowRight,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";


/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */

const pageVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};


const leftVariants = {
  hidden: {
    opacity: 0,
    x: -45,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};


const cardVariants = {
  hidden: {
    opacity: 0,
    x: 45,
    scale: 0.97,
  },

  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.1,
      ease: "easeOut",
    },
  },
};


const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};


const blobOneAnimation = {
  x: [0, 18, -12, 0],
  y: [0, -15, 12, 0],
  scale: [1, 1.04, 0.97, 1],
};


const blobTwoAnimation = {
  x: [0, -20, 15, 0],
  y: [0, 12, -18, 0],
  scale: [1, 0.96, 1.04, 1],
};


/* ============================================================
   COMPONENT
   ============================================================ */

export default function ForgotPassword() {

  const navigate = useNavigate();


  /* ==========================================================
     STATE
     ========================================================== */

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);


  /* ==========================================================
     EMAIL VALIDATION
     ========================================================== */

  const validateEmail = (value) => {

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(value);
  };


  /* ==========================================================
     INPUT CHANGE
     ========================================================== */

  const handleEmailChange = (e) => {

    const value = e.target.value;

    setEmail(value);

    if (error) {
      setError("");
    }

    if (submitted) {
      setSubmitted(false);
    }
  };


  /* ==========================================================
     SUBMIT
     ========================================================== */

  const handleSubmit = (e) => {

    e.preventDefault();


    const trimmedEmail = email.trim();


    /* Empty email */

    if (!trimmedEmail) {

      setError("Please enter your email address.");

      return;
    }


    /* Invalid email */

    if (!validateEmail(trimmedEmail)) {

      setError(
        "Please enter a valid email address."
      );

      return;
    }


    setError("");

    setLoading(true);


    /*
     * Save email temporarily so the next authentication
     * page can access it.
     */

    localStorage.setItem(
      "passwordResetEmail",
      trimmedEmail
    );


    /*
     * Temporary reset-flow transition.
     *
     * Replace this section later with your backend/API
     * password-reset request.
     */

    setTimeout(() => {

      setLoading(false);

      setSubmitted(true);

    }, 1200);
  };


  /* ==========================================================
     BACK TO LOGIN
     ========================================================== */

  const handleBackToLogin = () => {

    if (loading) {
      return;
    }

    navigate("/login");
  };


  /* ==========================================================
     CONTINUE TO RESET PASSWORD
     ========================================================== */

  const handleContinue = () => {

    navigate("/reset-password", {

      state: {
        email,
      },

    });
  };


  /* ==========================================================
     PAGE
     ========================================================== */

  return (

    <motion.main
      className="auth-page forgot-password-page"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >


      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div
        className="forgot-password-bg"
        aria-hidden="true"
      />


      <motion.div
        className="forgot-password-blob forgot-password-blob-one"
        animate={blobOneAnimation}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />


      <motion.div
        className="forgot-password-blob forgot-password-blob-two"
        animate={blobTwoAnimation}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />


      {/* =====================================================
          AUTH CONTAINER
          ===================================================== */}

      <section className="auth-container forgot-password-container">


        {/* ===================================================
            LEFT PANEL
            =================================================== */}

        <motion.div
          className="auth-left forgot-password-left"
          variants={leftVariants}
          initial="hidden"
          animate="visible"
        >


          {/* =================================================
              BRAND
              ================================================= */}

          <motion.div
            className="auth-brand forgot-password-brand"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >

            <motion.div
              className="auth-brand-logo forgot-password-logo"
              whileHover={{
                scale: 1.08,
                rotate: 3,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
            >
              AI
            </motion.div>


            <div className="auth-brand-text">

              <h2>
                AI SOP Portal
              </h2>

              <span>
                Enterprise Knowledge Platform
              </span>

            </div>

          </motion.div>


          {/* =================================================
              HERO
              ================================================= */}

          <motion.div
            className="forgot-password-hero"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >

            <motion.div
              className="forgot-password-hero-icon"
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >

              <FaLock />

            </motion.div>


            <h1>
              Securely Recover
              <span>
                Your Account
              </span>
            </h1>


            <p>
              Forgot your password? Don't worry. Enter the
              email address associated with your enterprise
              account and we'll help you securely regain
              access.
            </p>

          </motion.div>


          {/* =================================================
              SECURITY BENEFITS
              ================================================= */}

          <motion.div
            className="forgot-password-benefits"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  delayChildren: 0.55,
                  staggerChildren: 0.12,
                },
              },
            }}
          >


            {/* BENEFIT 01 */}

            <motion.div
              className="forgot-password-benefit"
              variants={itemVariants}
              whileHover={{
                x: 5,
                scale: 1.01,
              }}
            >

              <div className="forgot-password-benefit-icon">

                <FaShieldAlt />

              </div>

              <div>

                <strong>
                  Secure Recovery
                </strong>

                <span>
                  Your password recovery process is protected
                  by enterprise-grade security.
                </span>

              </div>

            </motion.div>


            {/* BENEFIT 02 */}

            <motion.div
              className="forgot-password-benefit"
              variants={itemVariants}
              whileHover={{
                x: 5,
                scale: 1.01,
              }}
            >

              <div className="forgot-password-benefit-icon">

                <FaEnvelope />

              </div>

              <div>

                <strong>
                  Email Verification
                </strong>

                <span>
                  A secure recovery process will be linked
                  to your registered email address.
                </span>

              </div>

            </motion.div>


            {/* BENEFIT 03 */}

            <motion.div
              className="forgot-password-benefit"
              variants={itemVariants}
              whileHover={{
                x: 5,
                scale: 1.01,
              }}
            >

              <div className="forgot-password-benefit-icon">

                <FaCheckCircle />

              </div>

              <div>

                <strong>
                  Quick Account Recovery
                </strong>

                <span>
                  Follow the recovery steps to securely
                  create a new password.
                </span>

              </div>

            </motion.div>

          </motion.div>


          {/* =================================================
              SECURITY FOOTER
              ================================================= */}

          <motion.div
            className="forgot-password-security"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.9,
              duration: 0.5,
            }}
          >

            <FaLock />

            <span>
              Protected enterprise authentication
            </span>

          </motion.div>

        </motion.div>


        {/* ===================================================
            RIGHT PANEL
            =================================================== */}

        <motion.div
          className="auth-right forgot-password-right"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >


          {/* =================================================
              CARD
              ================================================= */}

          <motion.div
            className="forgot-password-card"
            layout
          >


            {!submitted ? (

              <>


                {/* =========================================
                    HEADER
                    ========================================= */}

                <motion.div
                  className="forgot-password-header"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >

                  <div className="forgot-password-badge">

                    <FaLock />

                    <span>
                      Account Recovery
                    </span>

                  </div>


                  <h2>
                    Forgot Password?
                  </h2>


                  <p>
                    Enter your registered email address
                    to begin the password recovery process.
                  </p>

                </motion.div>


                {/* =========================================
                    FORM
                    ========================================= */}

                <form
                  className="forgot-password-form"
                  onSubmit={handleSubmit}
                >


                  {/* EMAIL */}

                  <motion.div
                    className="forgot-password-input-group"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      delay: 0.35,
                    }}
                  >

                    <label htmlFor="forgot-email">
                      Email Address
                    </label>


                    <div
                      className={`forgot-password-input-wrapper ${
                        error
                          ? "forgot-password-input-error"
                          : ""
                      }`}
                    >

                      <FaEnvelope
                        className="forgot-password-input-icon"
                      />


                      <input
                        id="forgot-email"
                        type="email"
                        name="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={handleEmailChange}
                        autoComplete="email"
                        disabled={loading}
                      />

                    </div>


                    {error && (

                      <motion.span
                        className="forgot-password-error"
                        initial={{
                          opacity: 0,
                          y: -5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                      >
                        {error}
                      </motion.span>

                    )}

                  </motion.div>


                  {/* INFO */}

                  <motion.div
                    className="forgot-password-info"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.55,
                    }}
                  >

                    <FaShieldAlt />

                    <span>
                      Make sure you enter the email address
                      associated with your AI SOP Portal account.
                    </span>

                  </motion.div>


                  {/* ACTIONS */}

                  <motion.div
                    className="forgot-password-actions"
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.65,
                    }}
                  >


                    {/* BACK */}

                    <motion.button
                      type="button"
                      className="forgot-password-back-btn"
                      onClick={handleBackToLogin}
                      disabled={loading}
                      whileHover={{
                        x: -3,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                    >

                      <FaArrowLeft />

                      <span>
                        Back to Sign In
                      </span>

                    </motion.button>


                    {/* CONTINUE */}

                    <motion.button
                      type="submit"
                      className="forgot-password-submit-btn"
                      disabled={loading}
                      whileHover={
                        !loading
                          ? {
                              y: -2,
                              scale: 1.01,
                            }
                          : {}
                      }
                      whileTap={
                        !loading
                          ? {
                              scale: 0.97,
                            }
                          : {}
                      }
                    >

                      {loading ? (

                        <>

                          <motion.span
                            className="forgot-password-spinner"
                            animate={{
                              rotate: 360,
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />

                          <span>
                            Processing...
                          </span>

                        </>

                      ) : (

                        <>

                          <span>
                            Continue
                          </span>

                          <motion.span
                            animate={{
                              x: [0, 4, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >

                            <FaArrowRight />

                          </motion.span>

                        </>

                      )}

                    </motion.button>

                  </motion.div>


                  {/* SECURITY */}

                  <div className="forgot-password-card-security">

                    <FaLock />

                    <span>
                      Your account information remains secure
                    </span>

                  </div>

                </form>

              </>

            ) : (

              /* =================================================
                 SUCCESS STATE
                 ================================================= */

              <motion.div
                className="forgot-password-success"
                initial={{
                  opacity: 0,
                  scale: 0.94,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >

                <motion.div
                  className="forgot-password-success-icon"
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 15,
                  }}
                >

                  <FaCheckCircle />

                </motion.div>


                <h2>
                  Check Your Email
                </h2>


                <p>
                  We've received your password recovery
                  request for:
                </p>


                <strong>
                  {email}
                </strong>


                <span className="forgot-password-success-note">
                  Follow the instructions sent to your
                  email to continue resetting your password.
                </span>


                <motion.button
                  type="button"
                  className="forgot-password-continue-btn"
                  onClick={handleContinue}
                  whileHover={{
                    y: -2,
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                >

                  <span>
                    Continue
                  </span>

                  <FaArrowRight />

                </motion.button>


                <button
                  type="button"
                  className="forgot-password-return-btn"
                  onClick={handleBackToLogin}
                >
                  Return to Sign In
                </button>

              </motion.div>

            )}

          </motion.div>

        </motion.div>

      </section>

    </motion.main>
  );
}