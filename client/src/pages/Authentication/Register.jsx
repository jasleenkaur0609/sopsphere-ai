import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    UserRound,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    Bot,
    FileText,
    ArrowRight,
    CheckCircle2,
    UserPlus,
    Loader2
} from "lucide-react";

import "./AuthBase.css";
import "./Register.css";


const Register = ({
    onLogin,
    onRegistrationSuccess
}) => {

    /* =====================================================
       FORM STATE
       ===================================================== */

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false
    });


    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    /* =====================================================
       HANDLE INPUT
       ===================================================== */

    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked
        } = event.target;


        setFormData((previous) => ({
            ...previous,

            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));


        if (error) {
            setError("");
        }
    };


    /* =====================================================
       PASSWORD VALIDATION
       ===================================================== */

    const passwordRules = {

        length:
            formData.password.length >= 8,

        uppercase:
            /[A-Z]/.test(formData.password),

        lowercase:
            /[a-z]/.test(formData.password),

        number:
            /[0-9]/.test(formData.password),

        special:
            /[^A-Za-z0-9]/.test(formData.password)
    };


    const passwordIsValid =
        Object.values(passwordRules).every(Boolean);


    const passwordsMatch =
        formData.password.length > 0 &&
        formData.confirmPassword.length > 0 &&
        formData.password ===
            formData.confirmPassword;


    /* =====================================================
       FORM VALIDATION
       ===================================================== */

    const formIsValid =
        formData.firstName.trim().length > 0 &&
        formData.lastName.trim().length > 0 &&
        formData.email.trim().length > 0 &&
        passwordIsValid &&
        passwordsMatch &&
        formData.terms;


    /* =====================================================
       SUBMIT
       ===================================================== */

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");


        if (!formData.firstName.trim()) {

            setError(
                "Please enter your first name."
            );

            return;
        }


        if (!formData.lastName.trim()) {

            setError(
                "Please enter your last name."
            );

            return;
        }


        if (!formData.email.trim()) {

            setError(
                "Please enter your email address."
            );

            return;
        }


        if (!passwordIsValid) {

            setError(
                "Please create a password that meets all requirements."
            );

            return;
        }


        if (!passwordsMatch) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        if (!formData.terms) {

            setError(
                "Please accept the Terms & Conditions and Privacy Policy."
            );

            return;
        }


        try {

            setLoading(true);


            /*
             * =================================================
             * YOUR EXISTING REGISTRATION LOGIC GOES HERE
             * =================================================
             *
             * Example:
             *
             * const result = await registerUser(formData);
             *
             * After successful registration:
             *
             * onRegistrationSuccess?.(result);
             *
             *
             * IMPORTANT:
             *
             * Do NOT put password/confirmPassword into
             * localStorage or console in production.
             */


            if (onRegistrationSuccess) {

                await onRegistrationSuccess(
                    formData
                );
            }


        } catch (registrationError) {

            console.error(
                "Registration failed:",
                registrationError
            );


            setError(
                registrationError?.message ||
                "Unable to create your account. Please try again."
            );

        } finally {

            setLoading(false);
        }
    };


    /* =====================================================
       ANIMATION VARIANTS
       ===================================================== */

    const containerVariants = {

        hidden: {
            opacity: 0,
            y: 18
        },

        visible: {

            opacity: 1,

            y: 0,

            transition: {
                duration: 0.65,

                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ],

                staggerChildren: 0.08
            }
        }
    };


    const itemVariants = {

        hidden: {
            opacity: 0,
            y: 14
        },

        visible: {

            opacity: 1,

            y: 0,

            transition: {
                duration: 0.5,

                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            }
        }
    };


    const cardVariants = {

        hidden: {

            opacity: 0,

            y: 30,

            scale: 0.975,

            filter: "blur(4px)"
        },

        visible: {

            opacity: 1,

            y: 0,

            scale: 1,

            filter: "blur(0px)",

            transition: {

                duration: 0.75,

                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            }
        }
    };


    /* =====================================================
       JSX
       ===================================================== */

    return (

        <main className="auth-page register-page">


            {/* =================================================
                BACKGROUND BLOBS
            ================================================= */}

            <div className="auth-blob auth-blob-1" />

            <div className="auth-blob auth-blob-2" />

            <div className="auth-blob auth-blob-3" />


            {/* =================================================
                MAIN CONTAINER
            ================================================= */}

            <motion.section
                className="auth-container"
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 0.5
                }}
            >


                {/* =================================================
                    LEFT SIDE
                ================================================= */}

                <section className="auth-left">


                    {/* BRAND */}

                    <motion.div
                        className="auth-brand"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >

                        <motion.div
                            className="auth-brand-logo"
                            whileHover={{
                                y: -2,
                                scale: 1.03
                            }}
                            transition={{
                                duration: 0.25
                            }}
                        >
                            AI
                        </motion.div>


                        <div className="auth-brand-content">

                            <h2 className="auth-brand-title">
                                AI SOP Portal
                            </h2>

                            <p className="auth-brand-subtitle">
                                Enterprise Knowledge Platform
                            </p>

                        </div>

                    </motion.div>


                    {/* =================================================
                        REGISTER-SPECIFIC PROGRESS
                    ================================================= */}

                    <motion.div
                        className="register-progress"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >

                        <div className="register-progress-header">

                            <span>
                                Registration Progress
                            </span>

                            <strong>
                                Step 1 of 4
                            </strong>

                        </div>


                        <div className="register-progress-track">

                            <motion.div
                                className="register-progress-fill"
                                initial={{
                                    width: 0
                                }}
                                animate={{
                                    width: "25%"
                                }}
                                transition={{
                                    duration: 0.9,
                                    delay: 0.35,
                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1
                                    ]
                                }}
                            />

                        </div>


                        <div className="register-steps">


                            {/* STEP 1 */}

                            <div className="register-step active">

                                <motion.div
                                    className="register-step-circle"
                                    initial={{
                                        scale: 0.7,
                                        opacity: 0
                                    }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1
                                    }}
                                    transition={{
                                        delay: 0.45,
                                        duration: 0.4
                                    }}
                                >
                                    1
                                </motion.div>

                                <span>
                                    Create Account
                                </span>

                            </div>


                            {/* STEP 2 */}

                            <div className="register-step">

                                <div className="register-step-circle">
                                    2
                                </div>

                                <span>
                                    Email Verification
                                </span>

                            </div>


                            {/* STEP 3 */}

                            <div className="register-step">

                                <div className="register-step-circle">
                                    3
                                </div>

                                <span>
                                    Profile Completion
                                </span>

                            </div>


                            {/* STEP 4 */}

                            <div className="register-step">

                                <div className="register-step-circle">
                                    4
                                </div>

                                <span>
                                    Mobile Verification
                                </span>

                            </div>

                        </div>

                    </motion.div>


                    {/* =================================================
                        HERO
                    ================================================= */}

                    <motion.div
                        className="register-hero"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >


                        {/* BADGE */}

                        <motion.div
                            className="register-security-badge"
                            variants={itemVariants}
                        >

                            <ShieldCheck size={15} />

                            <span>
                                Secure Registration
                            </span>

                        </motion.div>


                        {/* TITLE */}

                        <motion.h1
                            variants={itemVariants}
                        >

                            Create Your

                            <span>
                                Enterprise Account
                            </span>

                        </motion.h1>


                        {/* DESCRIPTION */}

                        <motion.p
                            variants={itemVariants}
                        >
                            Create your secure enterprise account
                            and unlock AI-powered SOP management,
                            intelligent workflow automation,
                            centralized knowledge resources,
                            and collaborative tools designed
                            for modern enterprise teams.
                        </motion.p>

                    </motion.div>


                    {/* =================================================
                        BENEFITS
                    ================================================= */}

                    <motion.div
                        className="register-benefits"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >


                        {/* SECURITY */}

                        <motion.div
                            className="register-benefit"
                            variants={itemVariants}
                            whileHover={{
                                x: 4
                            }}
                        >

                            <div className="register-benefit-icon">

                                <ShieldCheck
                                    size={17}
                                />

                            </div>


                            <div>

                                <strong>
                                    Enterprise-Grade Security
                                </strong>

                                <span>
                                    Secure authentication and
                                    protected enterprise information.
                                </span>

                            </div>

                        </motion.div>


                        {/* AI */}

                        <motion.div
                            className="register-benefit"
                            variants={itemVariants}
                            whileHover={{
                                x: 4
                            }}
                        >

                            <div className="register-benefit-icon">

                                <Bot
                                    size={17}
                                />

                            </div>


                            <div>

                                <strong>
                                    AI-Powered SOP Management
                                </strong>

                                <span>
                                    Create, manage and discover
                                    SOP knowledge with intelligent
                                    AI assistance.
                                </span>

                            </div>

                        </motion.div>


                        {/* WORKFLOW */}

                        <motion.div
                            className="register-benefit"
                            variants={itemVariants}
                            whileHover={{
                                x: 4
                            }}
                        >

                            <div className="register-benefit-icon">

                                <FileText
                                    size={17}
                                />

                            </div>


                            <div>

                                <strong>
                                    Intelligent Workflow Automation
                                </strong>

                                <span>
                                    Simplify documents, approvals
                                    and enterprise workflows.
                                </span>

                            </div>

                        </motion.div>

                    </motion.div>


                    {/* FOOTER */}

                    <motion.div
                        className="register-left-footer"
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 0.75,
                            duration: 0.5
                        }}
                    >

                        <CheckCircle2
                            size={13}
                        />

                        <span>
                            Secure onboarding for enterprise users
                        </span>

                    </motion.div>

                </section>


                {/* =================================================
                    RIGHT SIDE
                ================================================= */}

                <section className="auth-right">


                    {/* =================================================
                        REGISTER CARD
                    ================================================= */}

                    <motion.div
                        className="auth-card register-card"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >


                        {/* =================================================
                            CARD HEADER
                        ================================================= */}

                        <motion.div
                            className="register-header"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >

                            <motion.div
                                className="register-header-badge"
                                variants={itemVariants}
                            >

                                <UserPlus
                                    size={14}
                                />

                                <span>
                                    Account Setup
                                </span>

                            </motion.div>


                            <motion.h2
                                className="auth-heading"
                                variants={itemVariants}
                            >
                                Create Account
                            </motion.h2>


                            <motion.p
                                className="auth-description"
                                variants={itemVariants}
                            >
                                Create your account to begin the
                                secure onboarding process.
                            </motion.p>

                        </motion.div>


                        {/* =================================================
                            ERROR
                        ================================================= */}

                        {error && (

                            <motion.div
                                className="auth-error register-error"
                                initial={{
                                    opacity: 0,
                                    height: 0,
                                    y: -5
                                }}
                                animate={{
                                    opacity: 1,
                                    height: "auto",
                                    y: 0
                                }}
                                transition={{
                                    duration: 0.25
                                }}
                            >

                                <span>
                                    {error}
                                </span>

                            </motion.div>

                        )}


                        {/* =================================================
                            FORM
                        ================================================= */}

                        <motion.form
                            className="register-form"
                            onSubmit={handleSubmit}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >


                            {/* =================================================
                                FIRST + LAST NAME
                            ================================================= */}

                            <div className="register-name-row">


                                {/* FIRST NAME */}

                                <motion.div
                                    className="auth-field"
                                    variants={itemVariants}
                                >

                                    <label
                                        className="auth-label"
                                        htmlFor="register-first-name"
                                    >
                                        First Name
                                    </label>


                                    <div className="auth-input-wrapper">

                                        <UserRound
                                            className="auth-input-icon"
                                        />

                                        <input
                                            id="register-first-name"
                                            className="auth-input"
                                            type="text"
                                            name="firstName"
                                            value={
                                                formData.firstName
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter first name"
                                            autoComplete="given-name"
                                        />

                                    </div>

                                </motion.div>


                                {/* LAST NAME */}

                                <motion.div
                                    className="auth-field"
                                    variants={itemVariants}
                                >

                                    <label
                                        className="auth-label"
                                        htmlFor="register-last-name"
                                    >
                                        Last Name
                                    </label>


                                    <div className="auth-input-wrapper">

                                        <UserRound
                                            className="auth-input-icon"
                                        />

                                        <input
                                            id="register-last-name"
                                            className="auth-input"
                                            type="text"
                                            name="lastName"
                                            value={
                                                formData.lastName
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter last name"
                                            autoComplete="family-name"
                                        />

                                    </div>

                                </motion.div>

                            </div>


                            {/* =================================================
                                EMAIL
                            ================================================= */}

                            <motion.div
                                className="auth-field"
                                variants={itemVariants}
                            >

                                <label
                                    className="auth-label"
                                    htmlFor="register-email"
                                >
                                    Email Address
                                </label>


                                <div className="auth-input-wrapper">

                                    <Mail
                                        className="auth-input-icon"
                                    />

                                    <input
                                        id="register-email"
                                        className="auth-input"
                                        type="email"
                                        name="email"
                                        value={
                                            formData.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter your email address"
                                        autoComplete="email"
                                    />

                                </div>

                            </motion.div>


                            {/* =================================================
                                PASSWORD
                            ================================================= */}

                            <motion.div
                                className="auth-field"
                                variants={itemVariants}
                            >

                                <label
                                    className="auth-label"
                                    htmlFor="register-password"
                                >
                                    Password
                                </label>


                                <div className="auth-input-wrapper">

                                    <Lock
                                        className="auth-input-icon"
                                    />

                                    <input
                                        id="register-password"
                                        className="auth-input"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={
                                            formData.password
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Create a strong password"
                                        autoComplete="new-password"
                                    />


                                    <button
                                        type="button"
                                        className="register-password-toggle"
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
                                    >

                                        {showPassword ? (
                                            <EyeOff size={17} />
                                        ) : (
                                            <Eye size={17} />
                                        )}

                                    </button>

                                </div>

                            </motion.div>


                            {/* =================================================
                                CONFIRM PASSWORD
                            ================================================= */}

                            <motion.div
                                className="auth-field"
                                variants={itemVariants}
                            >

                                <label
                                    className="auth-label"
                                    htmlFor="register-confirm-password"
                                >
                                    Confirm Password
                                </label>


                                <div className="auth-input-wrapper">

                                    <Lock
                                        className="auth-input-icon"
                                    />

                                    <input
                                        id="register-confirm-password"
                                        className="auth-input"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmPassword"
                                        value={
                                            formData.confirmPassword
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Re-enter your password"
                                        autoComplete="new-password"
                                    />


                                    <button
                                        type="button"
                                        className="register-password-toggle"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (previous) =>
                                                    !previous
                                            )
                                        }
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >

                                        {showConfirmPassword ? (
                                            <EyeOff size={17} />
                                        ) : (
                                            <Eye size={17} />
                                        )}

                                    </button>

                                </div>


                                {formData.confirmPassword &&
                                    !passwordsMatch && (

                                    <motion.small
                                        className="register-password-error"
                                        initial={{
                                            opacity: 0
                                        }}
                                        animate={{
                                            opacity: 1
                                        }}
                                    >
                                        Passwords do not match.
                                    </motion.small>

                                )}

                            </motion.div>


                            {/* =================================================
                                PASSWORD REQUIREMENTS
                            ================================================= */}

                            <motion.div
                                className="register-password-info"
                                variants={itemVariants}
                            >

                                <div className="register-password-title">

                                    Password must contain:

                                </div>


                                <div className="register-password-rules">


                                    <span
                                        className={
                                            passwordRules.length
                                                ? "valid"
                                                : ""
                                        }
                                    >

                                        <CheckCircle2
                                            size={10}
                                        />

                                        8+ characters

                                    </span>


                                    <span
                                        className={
                                            passwordRules.uppercase
                                                ? "valid"
                                                : ""
                                        }
                                    >

                                        <CheckCircle2
                                            size={10}
                                        />

                                        Uppercase

                                    </span>


                                    <span
                                        className={
                                            passwordRules.lowercase
                                                ? "valid"
                                                : ""
                                        }
                                    >

                                        <CheckCircle2
                                            size={10}
                                        />

                                        Lowercase

                                    </span>


                                    <span
                                        className={
                                            passwordRules.number
                                                ? "valid"
                                                : ""
                                        }
                                    >

                                        <CheckCircle2
                                            size={10}
                                        />

                                        Number

                                    </span>


                                    <span
                                        className={
                                            passwordRules.special
                                                ? "valid"
                                                : ""
                                        }
                                    >

                                        <CheckCircle2
                                            size={10}
                                        />

                                        Special Character

                                    </span>

                                </div>

                            </motion.div>


                            {/* =================================================
                                TERMS
                            ================================================= */}

                            <motion.label
                                className="register-terms"
                                variants={itemVariants}
                            >

                                <input
                                    type="checkbox"
                                    name="terms"
                                    className="auth-checkbox"
                                    checked={
                                        formData.terms
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />


                                <span className="register-terms-text">

                                    I agree to the{" "}

                                    <button
                                        type="button"
                                        className="register-terms-link"
                                    >
                                        Terms & Conditions
                                    </button>

                                    {" "}and{" "}

                                    <button
                                        type="button"
                                        className="register-terms-link"
                                    >
                                        Privacy Policy
                                    </button>

                                </span>

                            </motion.label>


                            {/* =================================================
                                SUBMIT BUTTON
                            ================================================= */}

                            <motion.button
                                type="submit"
                                className="auth-primary-btn register-submit"
                                disabled={
                                    !formIsValid ||
                                    loading
                                }
                                variants={itemVariants}
                                whileHover={
                                    formIsValid && !loading
                                        ? {
                                            y: -2
                                        }
                                        : {}
                                }
                                whileTap={
                                    formIsValid && !loading
                                        ? {
                                            scale: 0.985
                                        }
                                        : {}
                                }
                            >

                                {loading ? (

                                    <>
                                        <Loader2
                                            size={17}
                                            className="register-loader"
                                        />

                                        Creating Account...
                                    </>

                                ) : (

                                    <>
                                        Create Account

                                        <ArrowRight
                                            size={17}
                                        />
                                    </>

                                )}

                            </motion.button>


                            {/* =================================================
                                LOGIN
                            ================================================= */}

                            <motion.div
                                className="register-login"
                                variants={itemVariants}
                            >

                                <span>
                                    Already have an account?
                                </span>


                                <button
                                    type="button"
                                    className="auth-link register-login-link"
                                    onClick={onLogin}
                                >
                                    Sign In

                                    <ArrowRight
                                        size={14}
                                    />
                                </button>

                            </motion.div>

                        </motion.form>

                    </motion.div>

                </section>

            </motion.section>

        </main>
    );
};


export default Register;