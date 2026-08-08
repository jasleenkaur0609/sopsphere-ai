import "./VerifyEmailOTP.css";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {

    FaArrowLeft,
    FaArrowRight,
    FaEnvelope,
    FaCheckCircle,
    FaCheck,
    FaLock,
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

        const updated = [...otp];

        updated[index] = value;

        setOtp(updated);

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

        const value = e.clipboardData

            .getData("text")

            .replace(/\D/g, "")

            .slice(0, 6)

            .split("");

        const updated = [...otp];

        value.forEach((digit, index) => {

            updated[index] = digit;

        });

        setOtp(updated);

    };

    /*==================================================
                        VERIFY
    ==================================================*/

    const handleVerify = () => {

        if (otp.join("").length !== 6) {

            alert("Please enter the complete OTP.");

            return;

        }

        setLoading(true);

        setTimeout(() => {

            setLoading(false);

            navigate("/complete-profile");

        }, 1500);

    };
    return (

<div className="verify-page">

    <div className="bg-gradient"></div>

    <div className="blob blob1"></div>
    <div className="blob blob2"></div>
    <div className="blob blob3"></div>

    <div className="verify-container">

        {/*==================================================
                        LEFT PANEL
        ==================================================*/}

        <div className="verify-left">

            {/*==============================================
                        BRAND
            ==============================================*/}

            <div className="brand">

                <div className="brand-logo">

                    AI

                </div>

                <div className="brand-content">

                    <h1>AI SOP Portal</h1>

                    <p>
                        Enterprise Knowledge Platform
                    </p>

                </div>

            </div>

            {/*==============================================
                    REGISTRATION PROGRESS
            ==============================================*/}

            <div className="registration-progress">

                <div className="progress-header">

                    <span>Registration Progress</span>

                    <span>Step 2 of 4</span>

                </div>

                <div className="progress-bar">

                    <div className="progress-fill"></div>

                </div>

                <div className="progress-steps">

                    <div className="progress-step completed">

                        <div className="step-circle">

                            <FaCheck />

                        </div>

                        <span>Create Account</span>

                    </div>

                    <div className="progress-step active">

                        <div className="step-circle">

                            2

                        </div>

                        <span>Email Verification</span>

                    </div>

                    <div className="progress-step">

                        <div className="step-circle">

                            3

                        </div>

                        <span>Profile Completion</span>

                    </div>

                    <div className="progress-step">

                        <div className="step-circle">

                            4

                        </div>

                        <span>Mobile Verification</span>

                    </div>

                </div>

            </div>

            {/*==============================================
                    INFORMATION SECTION
            ==============================================*/}

            <div className="verification-info">

                <div className="info-icon">

                    <FaEnvelope />

                </div>

                <h2>

                    Email Verification

                </h2>

                <p>

                    Verify your email address to activate your account
                    and continue the registration process.

                </p>

                <div className="email-preview">

                    {email}

                </div>

            </div>

            {/*==============================================
                    BENEFITS
            ==============================================*/}

            <div className="verification-benefits">

                <div className="benefit-item">

                    <FaCheckCircle />

                    <span>

                        Secure encrypted verification

                    </span>

                </div>

                <div className="benefit-item">

                    <FaClock />

                    <span>

                        Usually completed in under one minute

                    </span>

                </div>

                <div className="benefit-item">

                    <FaLock />

                    <span>

                        Required before profile completion

                    </span>

                </div>

            </div>

        </div>
                {/*==================================================
                        RIGHT PANEL
        ==================================================*/}

        <div className="verify-right">

            <div className="otp-card">

                {/*==========================================
                            HEADER
                ==========================================*/}

                <div className="otp-header">

                    <div className="otp-header-icon">

                        <FaEnvelope />

                    </div>

                    <h2>Email Verification</h2>

                    <p>

                        We've sent a six-digit verification code to your
                        registered email address.

                    </p>

                </div>

                {/*==========================================
                        EMAIL DISPLAY
                ==========================================*/}

                <div className="email-display">

                    <span className="email-label">

                        Verification Email

                    </span>

                    <span className="email-value">

                        {email}

                    </span>

                </div>

                {/*==========================================
                            OTP
                ==========================================*/}

                <div className="otp-container">

                    {otp.map((digit, index) => (

                        <input

                            key={index}

                            ref={(element) =>
                                (inputRefs.current[index] = element)
                            }

                            className="otp-input"

                            type="text"

                            inputMode="numeric"

                            maxLength="1"

                            value={digit}

                            onChange={(e) =>
                                handleChange(
                                    e.target.value,
                                    index
                                )
                            }

                            onKeyDown={(e) =>
                                handleKeyDown(
                                    e,
                                    index
                                )
                            }

                            onPaste={handlePaste}

                        />

                    ))}

                </div>

                {/*==========================================
                            TIMER
                ==========================================*/}

                <div className="otp-footer">

                    {timer > 0 ? (

                        <p>

                            Resend code in

                            <strong>

                                {" "}
                                00:{String(timer).padStart(2, "0")}

                            </strong>

                        </p>

                    ) : (

                        <button

                            className="resend-btn"

                            onClick={() => setTimer(60)}

                        >

                            Resend Verification Code

                        </button>

                    )}

                </div>

                {/*==========================================
                        ACTION BUTTONS
                ==========================================*/}

                <div className="otp-actions">

                    <button

                        className="secondary-btn"

                        onClick={() =>
                            navigate("/register")
                        }

                    >

                        <FaArrowLeft />

                        Back

                    </button>

                    <button

                        className="primary-btn"

                        disabled={loading}

                        onClick={handleVerify}

                    >

                        {

                            loading ?

                            "Verifying..."

                            :

                            <>

                                Verify Email

                                <FaArrowRight />

                            </>

                        }

                    </button>

                </div>

                {/*==========================================
                        CHANGE EMAIL
                ==========================================*/}

                <div className="change-email">

                    <p>

                        Wrong email address?

                    </p>

                    <button

                        onClick={() =>
                            navigate("/register")
                        }

                    >

                        Change Email

                    </button>

                </div>

            </div>

        </div>

    </div>

</div>

);
}