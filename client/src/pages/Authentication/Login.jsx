import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [rememberMe, setRememberMe] = useState(false);

    const [loading, setLoading] = useState(false);


    /* =====================================================
       LOGIN
       ===================================================== */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            return;
        }

        setLoading(true);

        try {

            /*
             * Keep your actual authentication/API logic here.
             *
             * Example:
             *
             * await login(email, password, rememberMe);
             *
             * After successful authentication:
             *
             * navigate("/dashboard");
             *
             * The role-based routing can be connected here later.
             */

            console.log("Login:", {
                email,
                password,
                rememberMe,
            });

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="auth-page auth-login">

            {/* =================================================
                BACKGROUND ELEMENTS
            ================================================= */}

            <div className="auth-blob auth-blob-1"></div>

            <div className="auth-blob auth-blob-2"></div>

            <div className="auth-blob auth-blob-3"></div>


            {/* =================================================
                MAIN AUTH CONTAINER
            ================================================= */}

            <main className="auth-container login-container">


                {/* =================================================
                    LEFT — BRAND / PLATFORM INTRODUCTION
                ================================================= */}

                <section className="auth-left login-left">


                    {/* BRAND */}

                    <div className="auth-brand login-brand">

                        <div className="auth-brand-logo">
                            AI
                        </div>

                        <div className="auth-brand-content">

                            <h1 className="auth-brand-title">
                                AI SOP Portal
                            </h1>

                            <p className="auth-brand-subtitle">
                                Enterprise Knowledge Platform
                            </p>

                        </div>

                    </div>


                    {/* LEFT CONTENT */}

                    <div className="login-intro">

                        <div className="login-eyebrow">

                            <FaRobot />

                            <span>
                                Intelligent Enterprise Workspace
                            </span>

                        </div>


                        <h2 className="login-hero-title">

                            Welcome back to your

                            <span>
                                intelligent workspace.
                            </span>

                        </h2>


                        <p className="login-hero-description">

                            Sign in to access your organization's
                            Standard Operating Procedures, AI-powered
                            knowledge tools, workflows, reports and
                            collaboration workspace.

                        </p>


                        {/* =================================================
                            PLATFORM HIGHLIGHTS
                        ================================================= */}

                        <div className="login-highlights">


                            <div className="login-highlight">

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

                            </div>


                            <div className="login-highlight">

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

                            </div>


                            <div className="login-highlight">

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

                            </div>


                        </div>


                        {/* =================================================
                            SECURITY NOTE
                        ================================================= */}

                        <div className="login-security-note">

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

                        </div>

                    </div>


                    {/* LEFT FOOTER */}

                    <div className="login-left-footer">

                        <FaCheckCircle />

                        <span>
                            Secure access to your enterprise workspace
                        </span>

                    </div>


                </section>



                {/* =================================================
                    RIGHT — LOGIN FORM
                ================================================= */}

                <section className="auth-right login-right">


                    <div className="auth-card login-card">


                        {/* =================================================
                            CARD HEADER
                        ================================================= */}

                        <div className="login-card-header">


                            <div className="login-card-badge">

                                <FaLock />

                                <span>
                                    Secure Sign In
                                </span>

                            </div>


                            <h2 className="auth-heading">

                                Welcome back

                            </h2>


                            <p className="auth-description">

                                Sign in to continue to your AI SOP
                                Management Portal.

                            </p>


                        </div>



                        {/* =================================================
                            LOGIN FORM
                        ================================================= */}

                        <form
                            className="login-form"
                            onSubmit={handleSubmit}
                        >


                            {/* EMAIL */}

                            <div className="auth-field login-field">

                                <label
                                    className="auth-label"
                                    htmlFor="login-email"
                                >
                                    Email Address
                                </label>


                                <div className="auth-input-wrapper">

                                    <FaEnvelope className="auth-input-icon" />


                                    <input
                                        id="login-email"
                                        className="auth-input"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter your work email"
                                        autoComplete="email"
                                    />

                                </div>

                            </div>



                            {/* PASSWORD */}

                            <div className="auth-field login-field">

                                <label
                                    className="auth-label"
                                    htmlFor="login-password"
                                >
                                    Password
                                </label>


                                <div className="auth-input-wrapper">

                                    <FaLock className="auth-input-icon" />


                                    <input
                                        id="login-password"
                                        className="auth-input"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                    />


                                    <button
                                        type="button"
                                        className="login-password-toggle"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >

                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}

                                    </button>

                                </div>

                            </div>



                            {/* =================================================
                                LOGIN OPTIONS
                            ================================================= */}

                            <div className="login-options">


                                <label className="login-remember">

                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) =>
                                            setRememberMe(
                                                e.target.checked
                                            )
                                        }
                                    />

                                    <span>
                                        Remember me
                                    </span>

                                </label>


                                <button
                                    type="button"
                                    className="login-forgot"
                                    onClick={() =>
                                        navigate(
                                            "/forgot-password"
                                        )
                                    }
                                >
                                    Forgot password?
                                </button>


                            </div>



                            {/* =================================================
                                LOGIN BUTTON
                            ================================================= */}

                            <button
                                type="submit"
                                className="auth-primary-btn login-submit"
                                disabled={
                                    loading ||
                                    !email ||
                                    !password
                                }
                            >

                                {loading ? (

                                    <>
                                        <span className="login-spinner"></span>

                                        Signing in...

                                    </>

                                ) : (

                                    <>
                                        Sign In

                                        <FaArrowRight />

                                    </>

                                )}

                            </button>


                        </form>



                        {/* =================================================
                            DIVIDER
                        ================================================= */}

                        <div className="login-divider">

                            <span></span>

                            <small>
                                NEW TO THE PLATFORM?
                            </small>

                            <span></span>

                        </div>



                        {/* =================================================
                            REGISTER CTA
                        ================================================= */}

                        <div className="login-register">

                            <div>

                                <strong>
                                    Don't have an account?
                                </strong>

                                <span>
                                    Create your enterprise account
                                    and get started.
                                </span>

                            </div>


                            <button
                                type="button"
                                className="auth-secondary-btn login-register-btn"
                                onClick={() =>
                                    navigate("/register")
                                }
                            >

                                Create Account

                                <FaArrowRight />

                            </button>

                        </div>



                        {/* =================================================
                            SECURITY FOOTER
                        ================================================= */}

                        <div className="login-card-footer">

                            <FaShieldAlt />

                            <span>
                                Protected enterprise authentication
                            </span>

                        </div>


                    </div>


                </section>


            </main>

        </div>

    );

}