import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
    FaArrowRight,
    FaCheckCircle,
    FaEnvelope,
    FaEye,
    FaEyeSlash,
    FaFileAlt,
    FaLock,
    FaRobot,
    FaShieldAlt,
    FaUsers,
} from "react-icons/fa";

import "./AuthBase.css";
import "./Login.css";


export default function Login() {

    const navigate = useNavigate();


    /* =========================================================
       FORM STATE
    ========================================================= */

    const [showPassword, setShowPassword] =
        useState(false);

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [rememberMe, setRememberMe] =
        useState(false);


    /* =========================================================
       UI STATE
    ========================================================= */

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState(false);


    /* =========================================================
       PAGE ANIMATION
    ========================================================= */

    const pageVariants = {

        hidden: {
            opacity: 0,
        },

        visible: {

            opacity: 1,

            transition: {
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
            },

        },

    };


    /* =========================================================
       MAIN CONTAINER ANIMATION
    ========================================================= */

    const containerVariants = {

        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.98,
        },

        visible: {

            opacity: 1,
            y: 0,
            scale: 1,

            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },

        },

    };


    /* =========================================================
       LEFT PANEL ANIMATION
    ========================================================= */

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
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
            },

        },

    };


    /* =========================================================
       RIGHT PANEL ANIMATION
    ========================================================= */

    const rightVariants = {

        hidden: {
            opacity: 0,
            x: 45,
        },

        visible: {

            opacity: 1,
            x: 0,

            transition: {
                duration: 0.75,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
            },

        },

    };


    /* =========================================================
       LOGIN CARD ANIMATION
    ========================================================= */

    const cardVariants = {

        hidden: {
            opacity: 0,
            y: 35,
            scale: 0.96,
        },

        visible: {

            opacity: 1,
            y: 0,
            scale: 1,

            transition: {
                duration: 0.75,
                delay: 0.28,
                ease: [0.22, 1, 0.36, 1],
            },

        },

    };


    /* =========================================================
       CONTENT ITEM ANIMATION
    ========================================================= */

    const itemVariants = {

        hidden: {
            opacity: 0,
            y: 16,
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
       FORM STAGGER ANIMATION
    ========================================================= */

    const formVariants = {

        hidden: {},

        visible: {

            transition: {
                delayChildren: 0.62,
                staggerChildren: 0.10,
            },

        },

    };


    /* =========================================================
       LEFT HIGHLIGHTS STAGGER
    ========================================================= */

    const highlightsVariants = {

        hidden: {},

        visible: {

            transition: {
                delayChildren: 0.45,
                staggerChildren: 0.12,
            },

        },

    };


    /* =========================================================
       LOGIN HANDLER
    ========================================================= */

    const handleSubmit = async (e) => {

        e.preventDefault();


        /* ---------------------------------------------------------
           CLEAR OLD MESSAGES
        --------------------------------------------------------- */

        setError("");
        setSuccess(false);


        /* ---------------------------------------------------------
           VALIDATE EMAIL
        --------------------------------------------------------- */

        if (!email.trim()) {

            setError(
                "Please enter your email address."
            );

            return;
        }


        /* ---------------------------------------------------------
           VALIDATE EMAIL FORMAT
        --------------------------------------------------------- */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email.trim())) {

            setError(
                "Please enter a valid email address."
            );

            return;
        }


        /* ---------------------------------------------------------
           VALIDATE PASSWORD
        --------------------------------------------------------- */

        if (!password) {

            setError(
                "Please enter your password."
            );

            return;
        }


        /* ---------------------------------------------------------
           START LOADING
        --------------------------------------------------------- */

        setLoading(true);


        try {

            /*
             * =====================================================
             * TEMPORARY LOGIN
             * =====================================================
             *
             * This simulates the authentication request.
             *
             * Later we will replace this section with your actual
             * Firebase / backend authentication.
             */

            await new Promise((resolve) => {

                setTimeout(resolve, 900);

            });


            /* -----------------------------------------------------
               REMEMBER ME
            ----------------------------------------------------- */

            if (rememberMe) {

                localStorage.setItem(
                    "rememberedEmail",
                    email.trim()
                );

            } else {

                localStorage.removeItem(
                    "rememberedEmail"
                );

            }


            /* -----------------------------------------------------
               SAVE LOGIN STATE
            ----------------------------------------------------- */

            sessionStorage.setItem(
                "isAuthenticated",
                "true"
            );

            sessionStorage.setItem(
                "userEmail",
                email.trim()
            );


            /* -----------------------------------------------------
               SUCCESS
            ----------------------------------------------------- */

            setSuccess(true);


            /*
             * Small delay so the user can see the successful
             * authentication state before moving to dashboard.
             */

            setTimeout(() => {

                navigate("/dashboard");

            }, 500);


        } catch (loginError) {

            console.error(
                "Login failed:",
                loginError
            );


            setError(
                loginError?.message ||
                "Unable to sign in. Please try again."
            );


        } finally {

            setLoading(false);

        }

    };


    /* =========================================================
       REMEMBERED EMAIL
    ========================================================= */

    const handleEmailFocus = () => {

        if (
            !email &&
            !loading
        ) {

            const rememberedEmail =
                localStorage.getItem(
                    "rememberedEmail"
                );


            if (rememberedEmail) {

                setEmail(
                    rememberedEmail
                );

            }

        }

    };


    /* =========================================================
       NAVIGATION
    ========================================================= */

    const handleCreateAccount = () => {

        navigate("/register");

    };


    const handleForgotPassword = () => {

        navigate("/forgot-password");

    };


    /* =========================================================
       JSX
    ========================================================= */

    return (

        <motion.div
            className="auth-page auth-login"

            variants={pageVariants}

            initial="hidden"

            animate="visible"
        >


            {/* =================================================
                BACKGROUND ELEMENTS
            ================================================= */}

            <motion.div
                className="auth-blob auth-blob-1"

                animate={{
                    x: [0, 18, 0],
                    y: [0, 14, 0],
                    scale: [1, 1.06, 1],
                }}

                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            <motion.div
                className="auth-blob auth-blob-2"

                animate={{
                    x: [0, -18, 0],
                    y: [0, 16, 0],
                    scale: [1, 1.05, 1],
                }}

                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            <motion.div
                className="auth-blob auth-blob-3"

                animate={{
                    x: [0, 14, 0],
                    y: [0, -18, 0],
                    scale: [1, 1.06, 1],
                }}

                transition={{
                    duration: 13,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            {/* =================================================
                MAIN AUTH CONTAINER
            ================================================= */}

            <motion.main
                className="auth-container login-container"

                variants={containerVariants}

                initial="hidden"

                animate="visible"
            >


                {/* =================================================
                    LEFT PANEL
                ================================================= */}

                <motion.section
                    className="auth-left login-left"

                    variants={leftVariants}

                    initial="hidden"

                    animate="visible"
                >


                    {/* =================================================
                        BRAND
                    ================================================= */}

                    <motion.div
                        className="auth-brand login-brand"

                        variants={itemVariants}
                    >

                        <motion.div
                            className="auth-brand-logo"

                            initial={{
                                opacity: 0,
                                scale: 0.7,
                                rotate: -8,
                            }}

                            animate={{
                                opacity: 1,
                                scale: 1,
                                rotate: 0,
                            }}

                            transition={{
                                duration: 0.55,
                                delay: 0.30,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            AI
                        </motion.div>


                        <div className="auth-brand-content">

                            <h1 className="auth-brand-title">
                                AI SOP Portal
                            </h1>

                            <p className="auth-brand-subtitle">
                                Enterprise Knowledge Platform
                            </p>

                        </div>

                    </motion.div>


                    {/* =================================================
                        LEFT CONTENT
                    ================================================= */}

                    <motion.div
                        className="login-intro"

                        variants={itemVariants}
                    >


                        <motion.div
                            className="login-eyebrow"

                            variants={itemVariants}
                        >

                            <FaRobot />

                            <span>
                                Intelligent Enterprise Workspace
                            </span>

                        </motion.div>


                        <motion.h2
                            className="login-hero-title"

                            variants={itemVariants}
                        >

                            Welcome back to your

                            <span>
                                intelligent workspace.
                            </span>

                        </motion.h2>


                        <motion.p
                            className="login-hero-description"

                            variants={itemVariants}
                        >

                            Sign in to access your
                            organization's Standard Operating
                            Procedures, AI-powered knowledge
                            tools, workflows, reports and
                            collaboration workspace.

                        </motion.p>


                        {/* =================================================
                            PLATFORM HIGHLIGHTS
                        ================================================= */}

                        <motion.div
                            className="login-highlights"

                            variants={highlightsVariants}

                            initial="hidden"

                            animate="visible"
                        >


                            {/* AI */}

                            <motion.div
                                className="login-highlight"

                                variants={itemVariants}

                                whileHover={{
                                    x: 4,
                                }}

                                transition={{
                                    duration: 0.2,
                                }}
                            >

                                <div className="login-highlight-icon">
                                    <FaRobot />
                                </div>


                                <div>

                                    <strong>
                                        AI-Powered Knowledge
                                    </strong>

                                    <span>
                                        Discover and understand
                                        enterprise knowledge faster.
                                    </span>

                                </div>

                            </motion.div>


                            {/* SOP */}

                            <motion.div
                                className="login-highlight"

                                variants={itemVariants}

                                whileHover={{
                                    x: 4,
                                }}

                                transition={{
                                    duration: 0.2,
                                }}
                            >

                                <div className="login-highlight-icon">
                                    <FaFileAlt />
                                </div>


                                <div>

                                    <strong>
                                        Centralized SOPs
                                    </strong>

                                    <span>
                                        Create, manage and access
                                        approved procedures securely.
                                    </span>

                                </div>

                            </motion.div>


                            {/* ROLE */}

                            <motion.div
                                className="login-highlight"

                                variants={itemVariants}

                                whileHover={{
                                    x: 4,
                                }}

                                transition={{
                                    duration: 0.2,
                                }}
                            >

                                <div className="login-highlight-icon">
                                    <FaUsers />
                                </div>


                                <div>

                                    <strong>
                                        Role-Based Access
                                    </strong>

                                    <span>
                                        Your workspace adapts to your
                                        organizational responsibilities.
                                    </span>

                                </div>

                            </motion.div>


                        </motion.div>


                        {/* =================================================
                            SECURITY
                        ================================================= */}

                        <motion.div
                            className="login-security-note"

                            variants={itemVariants}
                        >

                            <FaShieldAlt />

                            <div>

                                <strong>
                                    Enterprise-grade security
                                </strong>

                                <span>
                                    Your workspace and organizational
                                    information remain protected.
                                </span>

                            </div>

                        </motion.div>

                    </motion.div>


                    {/* =================================================
                        LEFT FOOTER
                    ================================================= */}

                    <motion.div
                        className="login-left-footer"

                        variants={itemVariants}
                    >

                        <FaCheckCircle />

                        <span>
                            Secure access to your enterprise workspace
                        </span>

                    </motion.div>


                </motion.section>


                {/* =================================================
                    RIGHT PANEL
                ================================================= */}

                <motion.section
                    className="auth-right login-right"

                    variants={rightVariants}

                    initial="hidden"

                    animate="visible"
                >


                    {/* =================================================
                        LOGIN CARD
                    ================================================= */}

                    <motion.div
                        className="auth-card login-card"

                        variants={cardVariants}

                        initial="hidden"

                        animate="visible"

                        whileHover={{
                            y: -2,

                            transition: {
                                duration: 0.25,
                                ease: "easeOut",
                            },
                        }}
                    >


                        {/* =================================================
                            CARD HEADER
                        ================================================= */}

                        <motion.div
                            className="login-card-header"

                            variants={itemVariants}

                            initial="hidden"

                            animate="visible"
                        >


                            <motion.div
                                className="login-card-badge"

                                initial={{
                                    opacity: 0,
                                    scale: 0.85,
                                }}

                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}

                                transition={{
                                    duration: 0.45,
                                    delay: 0.50,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >

                                <FaLock />

                                <span>
                                    Secure Sign In
                                </span>

                            </motion.div>


                            <motion.h2
                                className="auth-heading"

                                variants={itemVariants}
                            >
                                Welcome back
                            </motion.h2>


                            <motion.p
                                className="auth-description"

                                variants={itemVariants}
                            >
                                Sign in to continue to your AI
                                SOP Management Portal.
                            </motion.p>


                        </motion.div>


                        {/* =================================================
                            SUCCESS MESSAGE
                        ================================================= */}

                        {success && (

                            <motion.div
                                className="login-success"

                                initial={{
                                    opacity: 0,
                                    y: -8,
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                transition={{
                                    duration: 0.3,
                                }}
                            >

                                <FaCheckCircle />

                                <span>
                                    Login successful. Redirecting...
                                </span>

                            </motion.div>

                        )}


                        {/* =================================================
                            ERROR MESSAGE
                        ================================================= */}

                        {error && (

                            <motion.div
                                className="login-error"

                                initial={{
                                    opacity: 0,
                                    y: -8,
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                transition={{
                                    duration: 0.3,
                                }}
                            >

                                <span>
                                    {error}
                                </span>

                            </motion.div>

                        )}


                        {/* =================================================
                            LOGIN FORM
                        ================================================= */}

                        <motion.form
                            className="login-form"

                            onSubmit={handleSubmit}

                            variants={formVariants}

                            initial="hidden"

                            animate="visible"
                        >


                            {/* =================================================
                                EMAIL
                            ================================================= */}

                            <motion.div
                                className="auth-field login-field"

                                variants={itemVariants}
                            >

                                <label
                                    className="auth-label"

                                    htmlFor="login-email"
                                >
                                    Email Address
                                </label>


                                <div className="auth-input-wrapper">

                                    <FaEnvelope
                                        className="auth-input-icon"
                                    />


                                    <input
                                        id="login-email"

                                        className="auth-input"

                                        type="email"

                                        value={email}

                                        onChange={(e) => {

                                            setEmail(
                                                e.target.value
                                            );

                                            if (error) {
                                                setError("");
                                            }

                                        }}

                                        onFocus={
                                            handleEmailFocus
                                        }

                                        placeholder="Enter your work email"

                                        autoComplete="email"

                                        disabled={loading}
                                    />

                                </div>

                            </motion.div>


                            {/* =================================================
                                PASSWORD
                            ================================================= */}

                            <motion.div
                                className="auth-field login-field"

                                variants={itemVariants}
                            >

                                <label
                                    className="auth-label"

                                    htmlFor="login-password"
                                >
                                    Password
                                </label>


                                <div className="auth-input-wrapper">

                                    <FaLock
                                        className="auth-input-icon"
                                    />


                                    <input
                                        id="login-password"

                                        className="auth-input"

                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }

                                        value={password}

                                        onChange={(e) => {

                                            setPassword(
                                                e.target.value
                                            );

                                            if (error) {
                                                setError("");
                                            }

                                        }}

                                        placeholder="Enter your password"

                                        autoComplete="current-password"

                                        disabled={loading}
                                    />


                                    <motion.button
                                        type="button"

                                        className="login-password-toggle"

                                        onClick={() =>
                                            setShowPassword(
                                                (previous) =>
                                                    !previous
                                            )
                                        }

                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }

                                        disabled={loading}

                                        whileHover={{
                                            scale: 1.08,
                                        }}

                                        whileTap={{
                                            scale: 0.92,
                                        }}
                                    >

                                        {showPassword ? (

                                            <FaEyeSlash />

                                        ) : (

                                            <FaEye />

                                        )}

                                    </motion.button>

                                </div>

                            </motion.div>


                            {/* =================================================
                                LOGIN OPTIONS
                            ================================================= */}

                            <motion.div
                                className="login-options"

                                variants={itemVariants}
                            >


                                <label className="login-remember">

                                    <input
                                        type="checkbox"

                                        checked={
                                            rememberMe
                                        }

                                        onChange={(e) =>
                                            setRememberMe(
                                                e.target.checked
                                            )
                                        }

                                        disabled={loading}
                                    />

                                    <span>
                                        Remember me
                                    </span>

                                </label>


                                <motion.button
                                    type="button"

                                    className="login-forgot"

                                    onClick={
                                        handleForgotPassword
                                    }

                                    disabled={loading}

                                    whileHover={{
                                        x: 2,
                                    }}

                                    whileTap={{
                                        scale: 0.97,
                                    }}
                                >
                                    Forgot password?
                                </motion.button>


                            </motion.div>


                            {/* =================================================
                                LOGIN BUTTON
                            ================================================= */}

                            <motion.button
                                type="submit"

                                className="auth-primary-btn login-submit"

                                disabled={
                                    loading ||
                                    !email.trim() ||
                                    !password
                                }

                                variants={itemVariants}

                                whileHover={
                                    !loading &&
                                    email.trim() &&
                                    password
                                        ? {
                                            y: -2,
                                            scale: 1.01,
                                        }
                                        : {}
                                }

                                whileTap={
                                    !loading &&
                                    email.trim() &&
                                    password
                                        ? {
                                            scale: 0.98,
                                        }
                                        : {}
                                }
                            >

                                {loading ? (

                                    <>

                                        <span className="login-spinner" />

                                        Signing in...

                                    </>

                                ) : (

                                    <>

                                        Sign In

                                        <motion.span
                                            animate={{
                                                x: [0, 3, 0],
                                            }}

                                            transition={{
                                                duration: 1.4,
                                                repeat: Infinity,
                                                repeatDelay: 1.5,
                                                ease: "easeInOut",
                                            }}
                                        >

                                            <FaArrowRight />

                                        </motion.span>

                                    </>

                                )}

                            </motion.button>


                        </motion.form>


                        {/* =================================================
                            DIVIDER
                        ================================================= */}

                        <motion.div
                            className="login-divider"

                            variants={itemVariants}

                            initial="hidden"

                            animate="visible"
                        >

                            <span></span>

                            <small>
                                NEW TO THE PLATFORM?
                            </small>

                            <span></span>

                        </motion.div>


                        {/* =================================================
                            REGISTER CTA
                        ================================================= */}

                        <motion.div
                            className="login-register"

                            variants={itemVariants}

                            initial="hidden"

                            animate="visible"
                        >

                            <div>

                                <strong>
                                    Don't have an account?
                                </strong>

                                <span>
                                    Create your enterprise account
                                    and get started.
                                </span>

                            </div>


                            <motion.button
                                type="button"

                                className="auth-secondary-btn login-register-btn"

                                onClick={
                                    handleCreateAccount
                                }

                                disabled={loading}

                                whileHover={{
                                    x: 3,
                                }}

                                whileTap={{
                                    scale: 0.97,
                                }}
                            >

                                Create Account

                                <motion.span
                                    animate={{
                                        x: [0, 3, 0],
                                    }}

                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatDelay: 2,
                                        ease: "easeInOut",
                                    }}
                                >

                                    <FaArrowRight />

                                </motion.span>

                            </motion.button>

                        </motion.div>


                        {/* =================================================
                            SECURITY FOOTER
                        ================================================= */}

                        <motion.div
                            className="login-card-footer"

                            variants={itemVariants}

                            initial="hidden"

                            animate="visible"
                        >

                            <FaShieldAlt />

                            <span>
                                Protected enterprise authentication
                            </span>

                        </motion.div>


                    </motion.div>

                </motion.section>


            </motion.main>

        </motion.div>
    );
}