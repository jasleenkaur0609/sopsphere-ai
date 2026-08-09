import "./Register.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaArrowRight,
    FaCheckCircle,
    FaShieldAlt,
    FaRobot,
    FaFileAlt,
    FaUsers,
} from "react-icons/fa";


export default function Register() {

    const navigate = useNavigate();


    /* =========================================================
       STATE
    ========================================================= */

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);

    const [agreeTerms, setAgreeTerms] = useState(false);


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    /* =========================================================
       FORM CHANGE
    ========================================================= */

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    /* =========================================================
       SUBMIT
    ========================================================= */

    const handleSubmit = (e) => {

        e.preventDefault();


        if (!agreeTerms) {

            alert(
                "Please accept the Terms & Conditions."
            );

            return;
        }


        if (
            formData.password !==
            formData.confirmPassword
        ) {

            alert(
                "Passwords do not match."
            );

            return;
        }


        setLoading(true);


        setTimeout(() => {

            setLoading(false);

            navigate("/verify-email");

        }, 1500);
    };


    /* =========================================================
       FRAMER MOTION VARIANTS
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
                delay: 0.10,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };


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
                delay: 0.16,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };


    const cardVariants = {

        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.96,
        },

        visible: {

            opacity: 1,
            y: 0,
            scale: 1,

            transition: {
                duration: 0.75,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };


    const itemVariants = {

        hidden: {
            opacity: 0,
            y: 15,
        },

        visible: {

            opacity: 1,
            y: 0,

            transition: {
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };


    const formVariants = {

        hidden: {},

        visible: {

            transition: {
                delayChildren: 0.58,
                staggerChildren: 0.09,
            },
        },
    };


    const stepVariants = {

        hidden: {
            opacity: 0,
            x: -10,
        },

        visible: {

            opacity: 1,
            x: 0,

            transition: {
                duration: 0.35,
            },
        },
    };


    /* =========================================================
       PASSWORD REQUIREMENT
    ========================================================= */

    const passwordRules = [
        {
            label: "8+ characters",
            valid: formData.password.length >= 8,
        },
        {
            label: "Uppercase",
            valid: /[A-Z]/.test(formData.password),
        },
        {
            label: "Lowercase",
            valid: /[a-z]/.test(formData.password),
        },
        {
            label: "Number",
            valid: /[0-9]/.test(formData.password),
        },
        {
            label: "Special character",
            valid: /[^A-Za-z0-9]/.test(formData.password),
        },
    ];


    return (

        <motion.div
            className="register-page"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >


            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div className="register-bg"></div>


            <motion.div
                className="blob blob1"
                animate={{
                    x: [0, 18, 0],
                    y: [0, 14, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            <motion.div
                className="blob blob2"
                animate={{
                    x: [0, -16, 0],
                    y: [0, 18, 0],
                    scale: [1, 1.06, 1],
                }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            <motion.div
                className="blob blob3"
                animate={{
                    x: [0, 14, 0],
                    y: [0, -16, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 13,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            {/* =================================================
                MAIN CONTAINER
            ================================================= */}

            <motion.div
                className="register-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >


                {/* =================================================
                    LEFT PANEL
                ================================================= */}

                <motion.div
                    className="register-left"
                    variants={leftVariants}
                    initial="hidden"
                    animate="visible"
                >


                    {/* BRAND */}

                    <motion.div
                        className="brand"
                        variants={itemVariants}
                    >

                        <motion.div
                            className="brand-logo"
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
                                delay: 0.28,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            AI
                        </motion.div>


                        <div className="brand-text">

                            <h2>
                                AI SOP Portal
                            </h2>

                            <span>
                                Enterprise Knowledge Platform
                            </span>

                        </div>

                    </motion.div>



                    {/* =================================================
                        STEP INDICATOR
                    ================================================= */}

                    <motion.div
                        className="step-indicator"
                        variants={itemVariants}
                    >

                        <div className="step-header">

                            <span className="step-label">
                                Step 1 of 4
                            </span>

                            <span className="step-percent">
                                25%
                            </span>

                        </div>


                        <div className="step-progress">

                            <motion.div
                                className="step-progress-fill"
                                initial={{
                                    width: 0,
                                }}
                                animate={{
                                    width: "25%",
                                }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.45,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            />

                        </div>


                        <motion.div
                            className="step-items"
                            initial="hidden"
                            animate="visible"
                        >

                            <motion.div
                                className="step-item active"
                                variants={stepVariants}
                            >

                                <motion.div
                                    className="step-circle"
                                    initial={{
                                        scale: 0.7,
                                    }}
                                    animate={{
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.35,
                                        delay: 0.55,
                                    }}
                                >
                                    1
                                </motion.div>

                                <span>
                                    Create Account
                                </span>

                            </motion.div>


                            <motion.div
                                className="step-item"
                                variants={stepVariants}
                            >

                                <div className="step-circle">
                                    2
                                </div>

                                <span>
                                    Email Verification
                                </span>

                            </motion.div>


                            <motion.div
                                className="step-item"
                                variants={stepVariants}
                            >

                                <div className="step-circle">
                                    3
                                </div>

                                <span>
                                    Profile Completion
                                </span>

                            </motion.div>


                            <motion.div
                                className="step-item"
                                variants={stepVariants}
                            >

                                <div className="step-circle">
                                    4
                                </div>

                                <span>
                                    Mobile Verification
                                </span>

                            </motion.div>

                        </motion.div>

                    </motion.div>



                    {/* =================================================
                        HERO
                    ================================================= */}

                    <motion.div
                        className="hero-content"
                        variants={itemVariants}
                    >

                        <motion.div
                            className="register-badge"
                            variants={itemVariants}
                        >

                            <FaCheckCircle />

                            <span>
                                Secure Registration
                            </span>

                        </motion.div>


                        <motion.h1
                            variants={itemVariants}
                        >

                            Create Your{" "}

                            <span>
                                Enterprise Account
                            </span>

                        </motion.h1>


                        <motion.p
                            variants={itemVariants}
                        >

                            Securely create your enterprise account
                            to access AI-powered SOP management,
                            workflow automation, and team
                            collaboration from a single platform.

                        </motion.p>

                    </motion.div>



                    {/* =================================================
                        BENEFITS
                    ================================================= */}

                    <motion.div
                        className="benefits"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},

                            visible: {
                                transition: {
                                    delayChildren: 0.55,
                                    staggerChildren: 0.12,
                                },
                            },
                        }}
                    >


                        <motion.div
                            className="benefit-item"
                            variants={itemVariants}
                            whileHover={{
                                x: 4,
                            }}
                        >

                            <div className="benefit-icon">
                                <FaShieldAlt />
                            </div>

                            <span>
                                Enterprise Grade Security
                            </span>

                        </motion.div>


                        <motion.div
                            className="benefit-item"
                            variants={itemVariants}
                            whileHover={{
                                x: 4,
                            }}
                        >

                            <div className="benefit-icon">
                                <FaRobot />
                            </div>

                            <span>
                                AI Powered SOP Management
                            </span>

                        </motion.div>


                        <motion.div
                            className="benefit-item"
                            variants={itemVariants}
                            whileHover={{
                                x: 4,
                            }}
                        >

                            <div className="benefit-icon">
                                <FaFileAlt />
                            </div>

                            <span>
                                Workflow Automation
                            </span>

                        </motion.div>


                    </motion.div>



                    {/* LEFT FOOTER */}

                    <motion.div
                        className="register-left-footer"
                        variants={itemVariants}
                    >

                        <FaCheckCircle />

                        <span>
                            Secure onboarding for enterprise users
                        </span>

                    </motion.div>


                </motion.div>



                {/* =================================================
                    RIGHT PANEL
                ================================================= */}

                <motion.div
                    className="register-right"
                    variants={rightVariants}
                    initial="hidden"
                    animate="visible"
                >


                    <motion.div
                        className="register-card"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{
                            y: -2,
                            transition: {
                                duration: 0.25,
                            },
                        }}
                    >


                        {/* CARD HEADER */}

                        <motion.div
                            className="register-header"
                            variants={itemVariants}
                        >

                            <motion.div
                                className="register-header-badge"
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
                                    delay: 0.48,
                                }}
                            >

                                <FaUser />

                                <span>
                                    Account Setup
                                </span>

                            </motion.div>


                            <h2>
                                Create Account
                            </h2>


                            <p>
                                Create your account to begin the
                                secure onboarding process.
                            </p>

                        </motion.div>



                        {/* =================================================
                            FORM
                        ================================================= */}

                        <motion.form
                            className="register-form"
                            onSubmit={handleSubmit}
                            variants={formVariants}
                            initial="hidden"
                            animate="visible"
                        >


                            {/* NAME ROW */}

                            <motion.div
                                className="row"
                                variants={itemVariants}
                            >


                                {/* FIRST NAME */}

                                <div className="input-group">

                                    <label htmlFor="firstName">
                                        First Name
                                    </label>


                                    <div className="input-field">

                                        <FaUser className="input-icon" />


                                        <input
                                            id="firstName"
                                            type="text"
                                            name="firstName"
                                            placeholder="Enter first name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            autoComplete="given-name"
                                            required
                                        />

                                    </div>

                                </div>



                                {/* LAST NAME */}

                                <div className="input-group">

                                    <label htmlFor="lastName">
                                        Last Name
                                    </label>


                                    <div className="input-field">

                                        <FaUser className="input-icon" />


                                        <input
                                            id="lastName"
                                            type="text"
                                            name="lastName"
                                            placeholder="Enter last name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            autoComplete="family-name"
                                            required
                                        />

                                    </div>

                                </div>


                            </motion.div>



                            {/* EMAIL */}

                            <motion.div
                                className="input-group"
                                variants={itemVariants}
                            >

                                <label htmlFor="register-email">
                                    Email Address
                                </label>


                                <div className="input-field">

                                    <FaEnvelope className="input-icon" />


                                    <input
                                        id="register-email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        required
                                    />

                                </div>

                            </motion.div>



                            {/* PASSWORD */}

                            <motion.div
                                className="input-group"
                                variants={itemVariants}
                            >

                                <label htmlFor="register-password">
                                    Password
                                </label>


                                <div className="input-field">

                                    <FaLock className="input-icon" />


                                    <input
                                        id="register-password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                        required
                                    />


                                    <motion.button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        whileHover={{
                                            scale: 1.08,
                                        }}
                                        whileTap={{
                                            scale: 0.92,
                                        }}
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >

                                        {showPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                        }

                                    </motion.button>

                                </div>

                            </motion.div>



                            {/* CONFIRM PASSWORD */}

                            <motion.div
                                className="input-group"
                                variants={itemVariants}
                            >

                                <label htmlFor="confirm-password">
                                    Confirm Password
                                </label>


                                <div className="input-field">

                                    <FaLock className="input-icon" />


                                    <input
                                        id="confirm-password"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmPassword"
                                        placeholder="Re-enter your password"
                                        value={
                                            formData.confirmPassword
                                        }
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                        required
                                    />


                                    <motion.button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        whileHover={{
                                            scale: 1.08,
                                        }}
                                        whileTap={{
                                            scale: 0.92,
                                        }}
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >

                                        {showConfirmPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                        }

                                    </motion.button>

                                </div>

                            </motion.div>



                            {/* =================================================
                                PASSWORD REQUIREMENTS
                            ================================================= */}

                            <motion.div
                                className="password-info"
                                variants={itemVariants}
                            >

                                <p>
                                    Password must contain:
                                </p>


                                <div className="password-rules">

                                    {passwordRules.map(
                                        (rule) => (

                                            <motion.span
                                                key={rule.label}
                                                className={
                                                    rule.valid
                                                        ? "valid"
                                                        : ""
                                                }
                                                animate={{
                                                    opacity:
                                                        rule.valid
                                                            ? 1
                                                            : 0.65,
                                                    x:
                                                        rule.valid
                                                            ? 0
                                                            : 0,
                                                }}
                                            >

                                                <FaCheckCircle />

                                                {rule.label}

                                            </motion.span>

                                        )
                                    )}

                                </div>

                            </motion.div>



                            {/* =================================================
                                TERMS
                            ================================================= */}

                            <motion.label
                                className="terms-check"
                                variants={itemVariants}
                            >

                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) =>
                                        setAgreeTerms(
                                            e.target.checked
                                        )
                                    }
                                />


                                <span className="custom-check"></span>


                                <span className="terms-text">

                                    I agree to the{" "}

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

                            </motion.label>



                            {/* =================================================
                                CREATE ACCOUNT
                            ================================================= */}

                            <motion.button
                                type="submit"
                                className="register-btn"
                                disabled={loading}
                                variants={itemVariants}
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
                                            scale: 0.98,
                                        }
                                        : {}
                                }
                            >

                                {loading ? (

                                    <>
                                        <span className="register-spinner"></span>

                                        Creating Account...
                                    </>

                                ) : (

                                    <>
                                        Create Account

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
                            LOGIN SECTION
                        ================================================= */}

                        <motion.div
                            className="login-section"
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                        >

                            <p>
                                Already have an account?
                            </p>


                            <motion.button
                                type="button"
                                className="login-link"
                                onClick={() =>
                                    navigate("/login")
                                }
                                whileHover={{
                                    x: 3,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                            >

                                Sign In

                                <FaArrowRight />

                            </motion.button>

                        </motion.div>


                    </motion.div>

                </motion.div>

            </motion.div>

        </motion.div>
    );
}