import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  CircleCheck,
  CircleX,
} from "lucide-react";

import "./AuthBase.css";
import "./ResetPassword.css";


/* =========================================================
   ANIMATION VARIANTS
   ========================================================= */

const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.985,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


/* =========================================================
   COMPONENT
   ========================================================= */

const ResetPassword = () => {

  const navigate = useNavigate();

  const location = useLocation();


  /* =========================================================
     STATE
     ========================================================= */

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isSuccess, setIsSuccess] =
    useState(false);

  const [passwordError, setPasswordError] =
    useState("");

  const [confirmError, setConfirmError] =
    useState("");

  const [isVisible, setIsVisible] =
    useState(false);


  /* =========================================================
     REGISTERED EMAIL
     ========================================================= */

  const registeredEmail =
    location.state?.email ||
    location.state?.user?.email ||
    localStorage.getItem("passwordResetEmail") ||
    "your registered email address";


  /* =========================================================
     PAGE ENTRANCE
     ========================================================= */

  useEffect(() => {

    const timer = requestAnimationFrame(() => {

      setIsVisible(true);

    });

    return () => cancelAnimationFrame(timer);

  }, []);


  /* =========================================================
     PASSWORD REQUIREMENTS
     ========================================================= */

  const passwordRequirements = useMemo(
    () => ({
      minLength:
        password.length >= 8,

      uppercase:
        /[A-Z]/.test(password),

      lowercase:
        /[a-z]/.test(password),

      number:
        /[0-9]/.test(password),

      special:
        /[^A-Za-z0-9]/.test(password),
    }),
    [password]
  );


  const completedRequirements =
    Object.values(passwordRequirements)
      .filter(Boolean)
      .length;


  /* =========================================================
     PASSWORD STRENGTH
     ========================================================= */

  const passwordStrength = useMemo(() => {

    if (!password) {

      return {
        label: "",
        percentage: 0,
        level: "",
      };

    }


    if (completedRequirements <= 2) {

      return {
        label: "Weak",
        percentage: 30,
        level: "weak",
      };

    }


    if (completedRequirements === 3) {

      return {
        label: "Fair",
        percentage: 55,
        level: "fair",
      };

    }


    if (completedRequirements === 4) {

      return {
        label: "Good",
        percentage: 75,
        level: "good",
      };

    }


    return {
      label: "Strong",
      percentage: 100,
      level: "strong",
    };

  }, [
    password,
    completedRequirements,
  ]);


  /* =========================================================
     PASSWORD VALIDATION
     ========================================================= */

  const validatePassword = () => {

    if (!password.trim()) {

      setPasswordError(
        "Please enter a new password."
      );

      return false;

    }


    if (password.length < 8) {

      setPasswordError(
        "Password must contain at least 8 characters."
      );

      return false;

    }


    if (!/[A-Z]/.test(password)) {

      setPasswordError(
        "Password must contain at least one uppercase letter."
      );

      return false;

    }


    if (!/[a-z]/.test(password)) {

      setPasswordError(
        "Password must contain at least one lowercase letter."
      );

      return false;

    }


    if (!/[0-9]/.test(password)) {

      setPasswordError(
        "Password must contain at least one number."
      );

      return false;

    }


    if (!/[^A-Za-z0-9]/.test(password)) {

      setPasswordError(
        "Password must contain at least one special character."
      );

      return false;

    }


    setPasswordError("");

    return true;

  };


  /* =========================================================
     CONFIRM PASSWORD VALIDATION
     ========================================================= */

  const validateConfirmPassword = () => {

    if (!confirmPassword.trim()) {

      setConfirmError(
        "Please confirm your password."
      );

      return false;

    }


    if (password !== confirmPassword) {

      setConfirmError(
        "Passwords do not match."
      );

      return false;

    }


    setConfirmError("");

    return true;

  };


  /* =========================================================
     PASSWORD CHANGE
     ========================================================= */

  const handlePasswordChange = (e) => {

    const value = e.target.value;

    setPassword(value);

    if (passwordError) {

      setPasswordError("");

    }

    if (
      confirmPassword &&
      value === confirmPassword
    ) {

      setConfirmError("");

    }

  };


  /* =========================================================
     CONFIRM PASSWORD CHANGE
     ========================================================= */

  const handleConfirmPasswordChange = (e) => {

    const value = e.target.value;

    setConfirmPassword(value);

    if (confirmError) {

      setConfirmError("");

    }

  };


  /* =========================================================
     SUBMIT
     ========================================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();


    const passwordValid =
      validatePassword();

    const confirmValid =
      validateConfirmPassword();


    if (!passwordValid || !confirmValid) {

      return;

    }


    setIsSubmitting(true);


    /*
     * Temporary password-reset transition.
     *
     * Replace this section later with the
     * actual backend/API password update.
     */

    setTimeout(() => {

      setIsSubmitting(false);

      setIsSuccess(true);

    }, 1200);

  };


  /* =========================================================
     BACK TO FORGOT PASSWORD
     ========================================================= */

  const handleBackToForgotPassword = () => {

    if (isSubmitting) {

      return;

    }

    navigate("/forgot-password");

  };


  /* =========================================================
     BACK TO LOGIN
     ========================================================= */

  const handleBackToLogin = () => {

    if (isSubmitting) {

      return;

    }

    navigate("/login");

  };


  /* =========================================================
     CONTINUE AFTER SUCCESS
     ========================================================= */

  const handleContinueToLogin = () => {

    navigate("/login");

  };


  /* =========================================================
     SUCCESS STATE
     ========================================================= */

  if (isSuccess) {

    return (

      <div className="auth-page reset-password-page">

        <div
          className="reset-password-background"
          aria-hidden="true"
        >

          <div className="reset-password-orb reset-password-orb-one" />

          <div className="reset-password-orb reset-password-orb-two" />

          <div className="reset-password-grid" />

        </div>


        <motion.main
          className="reset-password-success-container"
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <motion.section
            className="reset-password-success-card"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.08,
              duration: 0.45,
            }}
          >

            <div className="reset-password-success-line" />


            {/* SUCCESS ICON */}

            <motion.div
              className="reset-password-success-icon"
              initial={{
                scale: 0,
                rotate: -15,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.5,
                type: "spring",
                stiffness: 180,
                damping: 14,
              }}
            >

              <CheckCircle2
                size={62}
                strokeWidth={1.7}
              />

              <div className="reset-password-success-spark">

                <Sparkles size={14} />

              </div>

            </motion.div>


            {/* BADGE */}

            <motion.div
              className="reset-password-success-badge"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >

              <Check
                size={14}
                strokeWidth={3}
              />

              <span>
                Password Updated
              </span>

            </motion.div>


            {/* HEADING */}

            <motion.h1
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >

              Password Reset
              <span>
                {" "}Successful!
              </span>

            </motion.h1>


            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >

              Your password has been successfully
              updated. You can now use your new
              password to securely sign in to the
              AI SOP Portal.

            </motion.p>


            {/* EMAIL */}

            <motion.div
              className="reset-password-success-email"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >

              <div className="reset-password-success-email-icon">

                <CheckCircle2
                  size={17}
                  strokeWidth={2}
                />

              </div>


              <div>

                <span>
                  Password updated for
                </span>

                <strong>
                  {registeredEmail}
                </strong>

              </div>

            </motion.div>


            {/* LOGIN BUTTON */}

            <motion.button
              type="button"
              className="reset-password-login-button"
              onClick={handleContinueToLogin}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >

              <span>
                Continue to Sign In
              </span>

              <ArrowRight
                size={18}
                strokeWidth={2}
              />

            </motion.button>


            {/* SECURITY */}

            <motion.div
              className="reset-password-success-security"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >

              <ShieldCheck
                size={14}
                strokeWidth={2}
              />

              <span>
                Your account remains protected with
                enterprise authentication.
              </span>

            </motion.div>

          </motion.section>

        </motion.main>

      </div>

    );

  }


  /* =========================================================
     MAIN PAGE
     ========================================================= */

  return (

    <div
      className={`auth-page reset-password-page ${
        isVisible
          ? "reset-password-visible"
          : ""
      }`}
    >

      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div
        className="reset-password-background"
        aria-hidden="true"
      >

        <div className="reset-password-orb reset-password-orb-one" />

        <div className="reset-password-orb reset-password-orb-two" />

        <div className="reset-password-grid" />

      </div>


      {/* =====================================================
          MAIN CONTAINER
          ===================================================== */}

      <motion.main
        className="reset-password-container"
        variants={containerVariants}
        initial="hidden"
        animate={
          isVisible
            ? "visible"
            : "hidden"
        }
      >

        {/* ===================================================
            LEFT PANEL
            =================================================== */}

        <section className="reset-password-left">

          {/* BRAND */}

          <motion.div
            className="reset-password-brand"
            variants={itemVariants}
          >

            <div className="reset-password-brand-logo">
              AI
            </div>

            <div className="reset-password-brand-text">

              <h2>
                AI SOP Portal
              </h2>

              <span>
                Enterprise Knowledge Platform
              </span>

            </div>

          </motion.div>


          {/* HERO */}

          <motion.div
            className="reset-password-hero"
            variants={itemVariants}
          >

            <div className="reset-password-hero-icon">

              <KeyRound
                size={27}
                strokeWidth={1.8}
              />

            </div>

            <h1>

              Create a

              <span>
                New Password
              </span>

            </h1>

            <p>

              Secure your account with a strong
              password. Your new password will be
              used the next time you sign in to the
              AI SOP Portal.

            </p>

          </motion.div>


          {/* BENEFITS */}

          <motion.div
            className="reset-password-benefits"
            variants={itemVariants}
          >

            <div className="reset-password-benefit">

              <div className="reset-password-benefit-icon">

                <ShieldCheck
                  size={19}
                  strokeWidth={1.9}
                />

              </div>

              <div>

                <strong>
                  Enterprise Security
                </strong>

                <span>
                  Your credentials are protected
                  with secure authentication.
                </span>

              </div>

            </div>


            <div className="reset-password-benefit">

              <div className="reset-password-benefit-icon">

                <LockKeyhole
                  size={19}
                  strokeWidth={1.9}
                />

              </div>

              <div>

                <strong>
                  Strong Password Protection
                </strong>

                <span>
                  Use a unique password to keep
                  your account secure.
                </span>

              </div>

            </div>


            <div className="reset-password-benefit">

              <div className="reset-password-benefit-icon">

                <CheckCircle2
                  size={19}
                  strokeWidth={1.9}
                />

              </div>

              <div>

                <strong>
                  Instant Access
                </strong>

                <span>
                  Sign in immediately after updating
                  your password.
                </span>

              </div>

            </div>

          </motion.div>


          {/* SECURITY */}

          <motion.div
            className="reset-password-security"
            variants={itemVariants}
          >

            <ShieldCheck
              size={14}
              strokeWidth={2}
            />

            <span>
              Protected enterprise authentication
            </span>

          </motion.div>

        </section>


        {/* ===================================================
            RIGHT PANEL
            =================================================== */}

        <section className="reset-password-right">

          <AnimatePresence mode="wait">

            <motion.div
              key="reset-form"
              className="reset-password-card"
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -20,
              }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <div className="reset-password-card-line" />


              {/* CARD HEADER */}

              <div className="reset-password-card-header">

                <div className="reset-password-card-icon">

                  <LockKeyhole
                    size={21}
                    strokeWidth={1.8}
                  />

                </div>

                <div>

                  <h2>
                    Reset Password
                  </h2>

                  <p>
                    Create a new secure password
                    for your account.
                  </p>

                </div>

              </div>


              {/* ACCOUNT */}

              <div className="reset-password-account">

                <div className="reset-password-account-icon">

                  <CheckCircle2
                    size={16}
                    strokeWidth={2}
                  />

                </div>

                <div>

                  <span>
                    Account
                  </span>

                  <strong>
                    {registeredEmail}
                  </strong>

                </div>

              </div>


              {/* FORM */}

              <form
                className="reset-password-form"
                onSubmit={handleSubmit}
              >

                {/* NEW PASSWORD */}

                <div className="reset-password-field">

                  <label htmlFor="reset-password">
                    New Password
                  </label>

                  <div
                    className={`reset-password-input-wrapper ${
                      passwordError
                        ? "reset-password-input-error"
                        : ""
                    }`}
                  >

                    <LockKeyhole
                      className="reset-password-input-icon"
                      size={17}
                      strokeWidth={1.8}
                    />

                    <input
                      id="reset-password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={
                        handlePasswordChange
                      }
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      disabled={isSubmitting}
                    />

                    <button
                      type="button"
                      className="reset-password-visibility"
                      onClick={() =>
                        setShowPassword(
                          (previous) =>
                            !previous
                        )
                      }
                      disabled={isSubmitting}
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >

                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}

                    </button>

                  </div>

                  {passwordError && (

                    <span className="reset-password-error">
                      {passwordError}
                    </span>

                  )}

                </div>


                {/* PASSWORD STRENGTH */}

                {password && (

                  <div className="reset-password-strength">

                    <div className="reset-password-strength-header">

                      <span>
                        Password strength
                      </span>

                      <strong
                        className={`strength-${passwordStrength.level}`}
                      >
                        {passwordStrength.label}
                      </strong>

                    </div>

                    <div className="reset-password-strength-track">

                      <motion.div
                        className={`reset-password-strength-bar strength-${passwordStrength.level}`}
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${passwordStrength.percentage}%`,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: "easeOut",
                        }}
                      />

                    </div>

                  </div>

                )}


                {/* REQUIREMENTS */}

                <div className="reset-password-requirements">

                  <span className="reset-password-requirements-title">
                    Password must contain:
                  </span>

                  <div className="reset-password-requirement-grid">

                    <PasswordRequirement
                      valid={
                        passwordRequirements.minLength
                      }
                      text="At least 8 characters"
                    />

                    <PasswordRequirement
                      valid={
                        passwordRequirements.uppercase
                      }
                      text="One uppercase letter"
                    />

                    <PasswordRequirement
                      valid={
                        passwordRequirements.lowercase
                      }
                      text="One lowercase letter"
                    />

                    <PasswordRequirement
                      valid={
                        passwordRequirements.number
                      }
                      text="One number"
                    />

                    <PasswordRequirement
                      valid={
                        passwordRequirements.special
                      }
                      text="One special character"
                    />

                  </div>

                </div>


                {/* CONFIRM PASSWORD */}

                <div className="reset-password-field">

                  <label htmlFor="confirm-password">
                    Confirm Password
                  </label>

                  <div
                    className={`reset-password-input-wrapper ${
                      confirmError
                        ? "reset-password-input-error"
                        : ""
                    }`}
                  >

                    <LockKeyhole
                      className="reset-password-input-icon"
                      size={17}
                      strokeWidth={1.8}
                    />

                    <input
                      id="confirm-password"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={
                        handleConfirmPasswordChange
                      }
                      placeholder="Re-enter your new password"
                      autoComplete="new-password"
                      disabled={isSubmitting}
                    />

                    <button
                      type="button"
                      className="reset-password-visibility"
                      onClick={() =>
                        setShowConfirmPassword(
                          (previous) =>
                            !previous
                        )
                      }
                      disabled={isSubmitting}
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >

                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}

                    </button>

                  </div>

                  {confirmError && (

                    <span className="reset-password-error">
                      {confirmError}
                    </span>

                  )}

                  {confirmPassword &&
                    password ===
                      confirmPassword &&
                    !confirmError && (

                      <span className="reset-password-match">

                        <CheckCircle2
                          size={12}
                          strokeWidth={3}
                        />

                        Passwords match

                      </span>

                    )}

                </div>


                {/* ACTIONS */}

                <div className="reset-password-actions">

                  <motion.button
                    type="button"
                    className="reset-password-back-button"
                    onClick={
                      handleBackToForgotPassword
                    }
                    disabled={isSubmitting}
                    whileHover={{
                      y: -1,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                  >

                    <ArrowLeft
                      size={16}
                      strokeWidth={2}
                    />

                    <span>
                      Back
                    </span>

                  </motion.button>


                  <motion.button
                    type="submit"
                    className={`reset-password-submit-button ${
                      isSubmitting
                        ? "reset-password-button-loading"
                        : ""
                    }`}
                    disabled={isSubmitting}
                    whileHover={
                      !isSubmitting
                        ? {
                            y: -2,
                          }
                        : {}
                    }
                    whileTap={
                      !isSubmitting
                        ? {
                            scale: 0.98,
                          }
                        : {}
                    }
                  >

                    {isSubmitting ? (
                      <>

                        <span className="reset-password-spinner" />

                        <span>
                          Updating Password...
                        </span>

                      </>
                    ) : (
                      <>

                        <span>
                          Reset Password
                        </span>

                        <ArrowRight
                          size={17}
                          strokeWidth={2}
                        />

                      </>
                    )}

                  </motion.button>

                </div>

              </form>


              {/* SECURITY */}

              <div className="reset-password-card-security">

                <ShieldCheck
                  size={13}
                  strokeWidth={2}
                />

                <span>
                  Your new password is securely protected
                </span>

              </div>


              {/* LOGIN */}

              <button
                type="button"
                className="reset-password-login-link"
                onClick={handleBackToLogin}
                disabled={isSubmitting}
              >

                Already have access?{" "}

                <span>
                  Sign in
                </span>

              </button>

            </motion.div>

          </AnimatePresence>

        </section>

      </motion.main>

    </div>

  );

};


/* =========================================================
   PASSWORD REQUIREMENT COMPONENT
   ========================================================= */

const PasswordRequirement = ({
  valid,
  text,
}) => {

  return (

    <div
      className={`reset-password-requirement ${
        valid
          ? "reset-password-requirement-valid"
          : ""
      }`}
    >

      {valid ? (

        <CircleCheck
          size={14}
          strokeWidth={2}
        />

      ) : (

        <CircleX
          size={14}
          strokeWidth={1.8}
        />

      )}

      <span>
        {text}
      </span>

    </div>

  );

};


export default ResetPassword;