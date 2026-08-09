import "./AuthBase.css";
import "./CompleteProfile.css";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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


const leftPanelVariants = {
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


const rightPanelVariants = {
  hidden: {
    opacity: 0,
    x: 45,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      delay: 0.12,
      ease: "easeOut",
    },
  },
};


const brandVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.15,
      ease: "easeOut",
    },
  },
};


const progressVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.28,
      ease: "easeOut",
    },
  },
};


const heroVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: 0.38,
      ease: "easeOut",
    },
  },
};


const benefitContainerVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.12,
    },
  },
};


const benefitVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};


const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 25,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.15,
      ease: "easeOut",
    },
  },
};


const formItemVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};


const blobAnimation = {
  animate: {
    x: [0, 18, -12, 0],
    y: [0, -15, 12, 0],
    scale: [1, 1.04, 0.97, 1],
  },

  transition: {
    duration: 12,
    repeat: Infinity,
    ease: "easeInOut",
  },
};


export default function CompleteProfile() {

  const navigate = useNavigate();
  const location = useLocation();


  /* =========================================================
     EMAIL FROM PREVIOUS AUTHENTICATION PAGE
     ========================================================= */

  const registeredEmail =
    location.state?.email ||
    location.state?.user?.email ||
    localStorage.getItem("registrationEmail") ||
    "";


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


    const completedProfile = {
      ...formData,
      email: registeredEmail,
    };


    /* Save current onboarding information */

    localStorage.setItem(
      "completedProfile",
      JSON.stringify(completedProfile)
    );


    /* Preserve registration email */

    if (registeredEmail) {

      localStorage.setItem(
        "registrationEmail",
        registeredEmail
      );
    }


    /*
     * Small delay so the loading animation can be seen
     * before moving to the success page.
     */

    setTimeout(() => {

      setLoading(false);

      navigate("/registration-success", {

        replace: true,

        state: {

          email: registeredEmail,

          user: {
            ...completedProfile,
          },

        },

      });

    }, 1200);
  };


  /* =========================================================
     HANDLE BACK
     ========================================================= */

  const handleBack = () => {

    if (loading) {
      return;
    }

    navigate("/verify-email");
  };


  /* =========================================================
     PAGE
     ========================================================= */

  return (

    <motion.main
      className="auth-page profile-page"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >


      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div
        className="profile-bg"
        aria-hidden="true"
      />


      <motion.div
        className="profile-blob profile-blob1"
        aria-hidden="true"
        animate={blobAnimation.animate}
        transition={blobAnimation.transition}
      />


      <motion.div
        className="profile-blob profile-blob2"
        aria-hidden="true"
        animate={{
          x: [0, -20, 15, 0],
          y: [0, 12, -18, 0],
          scale: [1, 0.96, 1.04, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      <motion.div
        className="profile-blob profile-blob3"
        aria-hidden="true"
        animate={{
          x: [0, 12, -15, 0],
          y: [0, -12, 15, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* =====================================================
          MAIN AUTH CONTAINER
          ===================================================== */}

      <section className="auth-container profile-container">


        {/* ===================================================
            LEFT PANEL
            =================================================== */}

        <motion.div
          className="auth-left profile-left"
          variants={leftPanelVariants}
          initial="hidden"
          animate="visible"
        >


          {/* =================================================
              BRAND
              ================================================= */}

          <motion.div
            className="auth-brand profile-brand"
            variants={brandVariants}
            initial="hidden"
            animate="visible"
          >

            <motion.div
              className="auth-brand-logo profile-brand-logo"
              aria-hidden="true"
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


            <div className="auth-brand-text profile-brand-text">

              <h2>
                AI SOP Portal
              </h2>

              <span>
                Enterprise Knowledge Platform
              </span>

            </div>

          </motion.div>


          {/* =================================================
              REGISTRATION PROGRESS
              ================================================= */}

          <motion.div
            className="profile-progress"
            variants={progressVariants}
            initial="hidden"
            animate="visible"
          >

            <div className="profile-progress-header">

              <span>
                Registration Progress
              </span>

              <strong>
                Step 3 of 4
              </strong>

            </div>


            <div className="profile-progress-bar">

              <motion.div
                className="profile-progress-fill"
                aria-hidden="true"
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "75%",
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  ease: "easeOut",
                }}
              />

            </div>


            {/* Step indicators */}

            <div className="profile-step-items">


              {/* STEP 1 */}

              <motion.div
                className="profile-step completed"
                whileHover={{
                  y: -2,
                }}
              >

                <div className="profile-step-circle">
                  <FaCheckCircle />
                </div>

                <span>
                  Create Account
                </span>

              </motion.div>


              {/* STEP 2 */}

              <motion.div
                className="profile-step completed"
                whileHover={{
                  y: -2,
                }}
              >

                <div className="profile-step-circle">
                  <FaCheckCircle />
                </div>

                <span>
                  Email Verification
                </span>

              </motion.div>


              {/* STEP 3 */}

              <motion.div
                className="profile-step active"
                animate={{
                  scale: [1, 1.025, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >

                <div className="profile-step-circle">
                  3
                </div>

                <span>
                  Profile Completion
                </span>

              </motion.div>


              {/* STEP 4 */}

              <motion.div
                className="profile-step"
                whileHover={{
                  y: -2,
                }}
              >

                <div className="profile-step-circle">
                  4
                </div>

                <span>
                  Registration Complete
                </span>

              </motion.div>

            </div>

          </motion.div>


          {/* =================================================
              HERO
              ================================================= */}

          <motion.section
            className="profile-hero"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >


            <motion.div
              className="profile-hero-icon"
              aria-hidden="true"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaUserTie />
            </motion.div>


            <h1>
              Complete Your{" "}
              <span>
                Professional Profile
              </span>
            </h1>


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

          </motion.section>


          {/* =================================================
              BENEFITS
              ================================================= */}

          <motion.div
            className="profile-benefits"
            variants={benefitContainerVariants}
            initial="hidden"
            animate="visible"
          >


            {/* BENEFIT 01 */}

            <motion.div
              className="profile-benefit"
              variants={benefitVariants}
              whileHover={{
                x: 6,
                scale: 1.01,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 20,
              }}
            >

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

            </motion.div>


            {/* BENEFIT 02 */}

            <motion.div
              className="profile-benefit"
              variants={benefitVariants}
              whileHover={{
                x: 6,
                scale: 1.01,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 20,
              }}
            >

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

            </motion.div>


            {/* BENEFIT 03 */}

            <motion.div
              className="profile-benefit"
              variants={benefitVariants}
              whileHover={{
                x: 6,
                scale: 1.01,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 20,
              }}
            >

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

            </motion.div>

          </motion.div>


          {/* =================================================
              SECURITY NOTE
              ================================================= */}

          <motion.div
            className="profile-security-note"
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
              Your professional information is protected
              with secure enterprise authentication.
            </span>

          </motion.div>

        </motion.div>


        {/* ===================================================
            RIGHT PANEL
            =================================================== */}

        <motion.div
          className="auth-right profile-right"
          variants={rightPanelVariants}
          initial="hidden"
          animate="visible"
        >


          {/* =================================================
              PROFILE CARD
              ================================================= */}

          <motion.div
            className="profile-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >


            {/* =================================================
                CARD HEADER
                ================================================= */}

            <motion.div
              className="profile-header"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.5,
              }}
            >

              <motion.div
                className="profile-header-badge"
                whileHover={{
                  scale: 1.03,
                }}
              >

                <FaUserTie />

                <span>
                  Profile Setup
                </span>

              </motion.div>


              <h2>
                Complete Your Profile
              </h2>

              <p>
                Tell us a little more about your professional
                profile to complete your onboarding.
              </p>

            </motion.div>


            {/* =================================================
                PROFILE FORM
                ================================================= */}

            <form
              className="profile-form"
              onSubmit={handleSubmit}
            >


              {/* =================================================
                  JOB TITLE + DEPARTMENT
                  ================================================= */}

              <motion.div
                className="profile-form-row"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      delayChildren: 0.45,
                      staggerChildren: 0.08,
                    },
                  },
                }}
              >


                {/* JOB TITLE */}

                <motion.div
                  className="profile-input-group"
                  variants={formItemVariants}
                >

                  <label htmlFor="jobTitle">
                    Job Title
                  </label>

                  <motion.div
                    className="profile-input-field"
                    whileFocus={{
                      scale: 1.01,
                    }}
                  >

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

                  </motion.div>

                </motion.div>


                {/* DEPARTMENT */}

                <motion.div
                  className="profile-input-group"
                  variants={formItemVariants}
                >

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

                </motion.div>

              </motion.div>


              {/* =================================================
                  ORGANIZATION
                  ================================================= */}

              <motion.div
                className="profile-input-group"
                variants={formItemVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: 0.62,
                }}
              >

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

              </motion.div>


              {/* =================================================
                  EMPLOYEE ID + LOCATION
                  ================================================= */}

              <motion.div
                className="profile-form-row"
                initial="hidden"
                animate="visible"
                transition={{
                  delay: 0.7,
                }}
              >


                {/* EMPLOYEE ID */}

                <motion.div
                  className="profile-input-group"
                  variants={formItemVariants}
                >

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

                </motion.div>


                {/* LOCATION */}

                <motion.div
                  className="profile-input-group"
                  variants={formItemVariants}
                >

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

                </motion.div>

              </motion.div>


              {/* =================================================
                  ROLE
                  ================================================= */}

              <motion.div
                className="profile-input-group"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.82,
                  duration: 0.45,
                }}
              >

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

              </motion.div>


              {/* =================================================
                  ACTION BUTTONS
                  ================================================= */}

              <motion.div
                className="profile-actions"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.92,
                  duration: 0.45,
                }}
              >


                {/* BACK */}

                <motion.button
                  type="button"
                  className="profile-back-btn"
                  onClick={handleBack}
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
                    Back
                  </span>

                </motion.button>


                {/* CONTINUE */}

                <motion.button
                  type="submit"
                  className="profile-continue-btn"
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
                        className="profile-spinner"
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
                        Saving...
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


              {/* =================================================
                  SECURITY NOTE
                  ================================================= */}

              <motion.div
                className="profile-card-security"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 1.05,
                  duration: 0.5,
                }}
              >

                <FaLock />

                <span>
                  Your information is secure and encrypted
                </span>

              </motion.div>

            </form>

          </motion.div>

        </motion.div>

      </section>

    </motion.main>
  );
}