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

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  /*
   * Email can be passed from Forgot Password / verification page.
   * The page will still work if no email is available.
   */
  const registeredEmail =
    location.state?.email ||
    location.state?.user?.email ||
    "your registered email address";

  /* =========================================================
     PAGE ENTRANCE ANIMATION
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
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    }),
    [password]
  );

  const completedRequirements = Object.values(passwordRequirements).filter(
    Boolean
  ).length;

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
  }, [password, completedRequirements]);

  /* =========================================================
     PASSWORD VALIDATION
     ========================================================= */

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError("Please enter a new password.");
      return false;
    }

    if (password.length < 8) {
      setPasswordError("Password must contain at least 8 characters.");
      return false;
    }

    if (!passwordRequirements.uppercase) {
      setPasswordError(
        "Password must contain at least one uppercase letter."
      );
      return false;
    }

    if (!passwordRequirements.lowercase) {
      setPasswordError(
        "Password must contain at least one lowercase letter."
      );
      return false;
    }

    if (!passwordRequirements.number) {
      setPasswordError("Password must contain at least one number.");
      return false;
    }

    if (!passwordRequirements.special) {
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
      setConfirmError("Please confirm your new password.");
      return false;
    }

    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match.");
      return false;
    }

    setConfirmError("");
    return true;
  };

  /* =========================================================
     PASSWORD CHANGE
     ========================================================= */

  const handlePasswordChange = (event) => {
    const value = event.target.value;

    setPassword(value);

    if (passwordError) {
      setPasswordError("");
    }

    if (confirmPassword && value !== confirmPassword) {
      setConfirmError("Passwords do not match.");
    } else if (confirmPassword) {
      setConfirmError("");
    }
  };

  /* =========================================================
     CONFIRM PASSWORD CHANGE
     ========================================================= */

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;

    setConfirmPassword(value);

    if (confirmError) {
      if (value === password) {
        setConfirmError("");
      }
    }
  };

  /* =========================================================
     RESET PASSWORD
     ========================================================= */

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const passwordValid = validatePassword();
    const confirmValid = validateConfirmPassword();

    if (!passwordValid || !confirmValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      /*
       * -------------------------------------------------------
       * BACKEND INTEGRATION
       * -------------------------------------------------------
       *
       * Replace this timeout with your actual API call.
       *
       * Example:
       *
       * await axios.post("/api/auth/reset-password", {
       *   email: registeredEmail,
       *   password,
       *   token: location.state?.token
       * });
       *
       * -------------------------------------------------------
       */

      await new Promise((resolve) => setTimeout(resolve, 900));

      setIsSuccess(true);
    } catch (error) {
      console.error("Password reset failed:", error);

      setPasswordError(
        "Unable to reset your password. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     NAVIGATION
     ========================================================= */

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleContinueToLogin = () => {
    navigate("/login");
  };

  const handleBackToForgotPassword = () => {
    navigate("/forgot-password", {
      state: {
        email: registeredEmail,
      },
    });
  };

  /* =========================================================
     ANIMATION VARIANTS
     ========================================================= */

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 18,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 12,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  /* =========================================================
     SUCCESS STATE
     ========================================================= */

  if (isSuccess) {
    return (
      <div
        className={`auth-page reset-password-page ${
          isVisible ? "reset-password-visible" : ""
        }`}
      >
        <div className="reset-password-background">
          <div className="reset-password-orb reset-password-orb-one" />
          <div className="reset-password-orb reset-password-orb-two" />
          <div className="reset-password-grid" />
        </div>

        <motion.main
          className="reset-password-container reset-password-success-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="reset-password-success-card"
            initial={{
              opacity: 0,
              scale: 0.94,
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
            <motion.div
              className="reset-password-success-icon"
              initial={{
                scale: 0,
                rotate: -20,
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

            <motion.div
              className="reset-password-success-badge"
              variants={itemVariants}
            >
              <Check size={14} strokeWidth={3} />
              <span>Password Updated</span>
            </motion.div>

            <motion.h1 variants={itemVariants}>
              Password Reset
              <span> Successful!</span>
            </motion.h1>

            <motion.p variants={itemVariants}>
              Your password has been successfully updated.
              You can now use your new password to securely
              sign in to the AI SOP Portal.
            </motion.p>

            <motion.div
              className="reset-password-success-email"
              variants={itemVariants}
            >
              <div className="reset-password-success-email-icon">
                <CheckCircle2
                  size={17}
                  strokeWidth={2}
                />
              </div>

              <div>
                <span>Password updated for</span>

                <strong>{registeredEmail}</strong>
              </div>
            </motion.div>

            <motion.button
              type="button"
              className="reset-password-login-button"
              onClick={handleContinueToLogin}
              variants={itemVariants}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <span>Continue to Sign In</span>

              <ArrowRight
                size={18}
                strokeWidth={2}
              />
            </motion.button>

            <motion.div
              className="reset-password-success-security"
              variants={itemVariants}
            >
              <ShieldCheck
                size={14}
                strokeWidth={2}
              />

              <span>
                Your account remains protected with enterprise
                authentication.
              </span>
            </motion.div>
          </motion.div>
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
        isVisible ? "reset-password-visible" : ""
      }`}
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className="reset-password-background">
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
        animate={isVisible ? "visible" : "hidden"}
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
              <h2>AI SOP Portal</h2>

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
              <span>New Password</span>
            </h1>

            <p>
              Secure your account with a strong password.
              Your new password will be used the next time
              you sign in to the AI SOP Portal.
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
                <strong>Enterprise Security</strong>

                <span>
                  Your credentials are protected with secure
                  authentication.
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
                <strong>Strong Password Protection</strong>

                <span>
                  Use a unique password to keep your account
                  secure.
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
                <strong>Instant Access</strong>

                <span>
                  Sign in immediately after updating your
                  password.
                </span>
              </div>
            </div>
          </motion.div>

          {/* SECURITY FOOTER */}

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
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* TOP ACCENT */}

              <div className="reset-password-card-line" />

              {/* HEADER */}

              <div className="reset-password-header">
                <div className="reset-password-badge">
                  <LockKeyhole
                    size={13}
                    strokeWidth={2}
                  />

                  <span>Secure Password Reset</span>
                </div>

                <h2>Reset Your Password</h2>

                <p>
                  Create a new password for your account.
                  Make sure it meets all security requirements.
                </p>
              </div>

              {/* FORM */}

              <form
                className="reset-password-form"
                onSubmit={handleResetPassword}
                noValidate
              >
                {/* EMAIL */}

                <div className="reset-password-account">
                  <div className="reset-password-account-icon">
                    <CheckCircle2
                      size={17}
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <span>Account</span>

                    <strong>{registeredEmail}</strong>
                  </div>
                </div>

                {/* NEW PASSWORD */}

                <div className="reset-password-field">
                  <label htmlFor="new-password">
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
                      strokeWidth={1.9}
                    />

                    <input
                      id="new-password"
                      name="newPassword"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      disabled={isSubmitting}
                    />

                    <button
                      type="button"
                      className="reset-password-visibility"
                      onClick={() =>
                        setShowPassword(
                          (previous) => !previous
                        )
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      disabled={isSubmitting}
                    >
                      {showPassword ? (
                        <EyeOff
                          size={17}
                          strokeWidth={1.9}
                        />
                      ) : (
                        <Eye
                          size={17}
                          strokeWidth={1.9}
                        />
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
                  <motion.div
                    className="reset-password-strength"
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                  >
                    <div className="reset-password-strength-header">
                      <span>Password strength</span>

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
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* PASSWORD REQUIREMENTS */}

                <div className="reset-password-requirements">
                  <span className="reset-password-requirements-title">
                    Password must contain:
                  </span>

                  <div className="reset-password-requirement-grid">
                    <PasswordRequirement
                      valid={
                        passwordRequirements.minLength
                      }
                      text="8+ characters"
                    />

                    <PasswordRequirement
                      valid={
                        passwordRequirements.uppercase
                      }
                      text="Uppercase letter"
                    />

                    <PasswordRequirement
                      valid={
                        passwordRequirements.lowercase
                      }
                      text="Lowercase letter"
                    />

                    <PasswordRequirement
                      valid={
                        passwordRequirements.number
                      }
                      text="Number"
                    />

                    <PasswordRequirement
                      valid={
                        passwordRequirements.special
                      }
                      text="Special character"
                    />
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}

                <div className="reset-password-field">
                  <label htmlFor="confirm-password">
                    Confirm New Password
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
                      strokeWidth={1.9}
                    />

                    <input
                      id="confirm-password"
                      name="confirmPassword"
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
                          (previous) => !previous
                        )
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      disabled={isSubmitting}
                    >
                      {showConfirmPassword ? (
                        <EyeOff
                          size={17}
                          strokeWidth={1.9}
                        />
                      ) : (
                        <Eye
                          size={17}
                          strokeWidth={1.9}
                        />
                      )}
                    </button>
                  </div>

                  {confirmError && (
                    <span className="reset-password-error">
                      {confirmError}
                    </span>
                  )}

                  {!confirmError &&
                    confirmPassword &&
                    password === confirmPassword && (
                      <span className="reset-password-match">
                        <Check
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
                    onClick={handleBackToForgotPassword}
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

                    <span>Back</span>
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
                        <span>Reset Password</span>

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
                <span>Sign in</span>
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

const PasswordRequirement = ({ valid, text }) => {
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

      <span>{text}</span>
    </div>
  );
};

export default ResetPassword;