import "./VerifyEmailOTP.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaArrowLeft,
    FaArrowRight,
    FaCheckCircle,
    FaEnvelope,
    FaShieldAlt,
    FaClock
} from "react-icons/fa";

export default function VerifyEmailOTP() {

    const navigate = useNavigate();

    const inputRefs = useRef([]);

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const [timer, setTimer] = useState(60);

    const [loading, setLoading] = useState(false);

    const email = "jas***@company.com";

    /*==================================================
                    TIMER
    ==================================================*/

    useEffect(() => {

        if (timer <= 0) return;

        const interval = setInterval(() => {

            setTimer((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(interval);

    }, [timer]);

    /*==================================================
                    OTP CHANGE
    ==================================================*/

    const handleChange = (value, index) => {

        if (!/^[0-9]?$/.test(value)) return;

        const updatedOTP = [...otp];

        updatedOTP[index] = value;

        setOtp(updatedOTP);

        if (value && index < 5) {

            inputRefs.current[index + 1]?.focus();

        }

    };

    /*==================================================
                    BACKSPACE
    ==================================================*/

    const handleKeyDown = (e, index) => {

        if (

            e.key === "Backspace" &&

            otp[index] === "" &&

            index > 0

        ) {

            inputRefs.current[index - 1]?.focus();

        }

    };

    /*==================================================
                    PASTE
    ==================================================*/

    const handlePaste = (e) => {

        e.preventDefault();

        const pasted = e.clipboardData

            .getData("text")

            .replace(/\D/g, "")

            .slice(0, 6)

            .split("");

        if (!pasted.length) return;

        const updated = [...otp];

        pasted.forEach((digit, index) => {

            updated[index] = digit;

        });

        setOtp(updated);

    };

    /*==================================================
                    VERIFY
    ==================================================*/

    const handleVerify = () => {

        if (otp.join("").length !== 6) {

            alert("Please enter all 6 digits.");

            return;

        }

        setLoading(true);

        setTimeout(() => {

            setLoading(false);

            navigate("/complete-profile");

        }, 1500);

    };

    /*==================================================
                    RESEND
    ==================================================*/

    const handleResend = () => {

        setOtp(["","","","","",""]);

        setTimer(60);

        inputRefs.current[0]?.focus();

    };

    return (

        <div className="verify-page">

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

                    Registration Progress

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

                <div className="hero-icon">

                    <FaEnvelope />

                </div>

                <h1>

                    Verify Your Email

                </h1>

                <p>

                    Your account has been created successfully.

                    We've sent a secure verification code to

                    <strong> {email}</strong>

                </p>

            </div>

            {/*==============================
                    INFO CARD
            ==============================*/}

            <div className="verification-info">

                <div className="info-item">

                    <FaShieldAlt />

                    <div>

                        <h4>Secure Verification</h4>

                        <p>

                            Your email is encrypted and verified securely.

                        </p>

                    </div>

                </div>

                <div className="info-item">

                    <FaClock />

                    <div>

                        <h4>Quick Process</h4>

                        <p>

                            Verification usually takes less than one minute.

                        </p>

                    </div>

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

                        Email Verification

                    </h2>

                    <p>

                        Enter the 6-digit verification code sent to your email.

                    </p>

                </div>

                                {/*==========================================
                        EMAIL DISPLAY
                ==========================================*/}

                <div className="email-display">

                    <FaEnvelope className="email-icon" />

                    <span>{email}</span>

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
                                className="otp-input"
                                onChange={(e) =>
                                    handleChange(
                                        e.target.value,
                                        index
                                    )
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(e, index)
                                }
                                onPaste={handlePaste}
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

                            Resend available in

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

                            Resend Verification Code

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
                        onClick={() =>
                            navigate("/register")
                        }
                    >

                        <FaArrowLeft />

                        Back

                    </button>

                    <button
                        type="button"
                        className="verify-btn"
                        disabled={loading}
                        onClick={handleVerify}
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

                        Entered the wrong email?

                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/register")
                        }
                    >

                        Change Email Address

                    </button>

                </div>

            </div>

        </div>

    </div>

</div>

);

}