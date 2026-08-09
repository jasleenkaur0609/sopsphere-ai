import React, {
    useEffect,
    useRef,
    useState
} from "react";

import { motion } from "framer-motion";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock3,
    Mail,
    ShieldCheck,
    RotateCcw
} from "lucide-react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import "./AuthBase.css";
import "./VerifyEmailOTP.css";


export default function VerifyEmailOTP() {

    const navigate = useNavigate();

    const location = useLocation();

    const inputRefs = useRef([]);


    /* =====================================================
       EMAIL
       ===================================================== */

    const emailFromState =
        location.state?.email || "";

    const [email] = useState(
        emailFromState || "your-email@company.com"
    );


    /* =====================================================
       OTP
       ===================================================== */

    const [otp, setOtp] = useState([
        "",
        "",
        "",
        "",
        "",
        ""
    ]);


    /* =====================================================
       UI STATE
       ===================================================== */

    const [timer, setTimer] = useState(60);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState(false);


    /* =====================================================
       MASK EMAIL
       ===================================================== */

    const maskEmail = (value) => {

        if (!value) {
            return "your-email@company.com";
        }

        const parts = value.split("@");

        if (parts.length !== 2) {
            return value;
        }

        const username = parts[0];

        const domain = parts[1];


        if (username.length <= 2) {
            return `${username[0] || ""}***@${domain}`;
        }


        return (
            `${username.slice(0, 2)}***@${domain}`
        );
    };


    const maskedEmail = maskEmail(email);


    /* =====================================================
       TIMER
       ===================================================== */

    useEffect(() => {

        if (timer <= 0) {
            return;
        }


        const interval = setInterval(() => {

            setTimer((previous) => {

                if (previous <= 1) {
                    clearInterval(interval);

                    return 0;
                }

                return previous - 1;
            });

        }, 1000);


        return () => {
            clearInterval(interval);
        };

    }, [timer]);


    /* =====================================================
       OTP CHANGE
       ===================================================== */

    const handleOtpChange = (
        value,
        index
    ) => {

        setError("");

        setSuccess(false);


        /*
         * Only allow one numeric digit.
         */

        if (!/^\d?$/.test(value)) {
            return;
        }


        const updatedOtp = [
            ...otp
        ];


        updatedOtp[index] = value;


        setOtp(updatedOtp);


        /*
         * Move to next input automatically.
         */

        if (
            value &&
            index <
                updatedOtp.length - 1
        ) {

            inputRefs
                .current[index + 1]
                ?.focus();
        }
    };


    /* =====================================================
       KEYBOARD HANDLING
       ===================================================== */

    const handleKeyDown = (
        event,
        index
    ) => {

        if (
            event.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {

            inputRefs
                .current[index - 1]
                ?.focus();

            return;
        }


        /*
         * Allow left/right arrow navigation.
         */

        if (
            event.key === "ArrowLeft" &&
            index > 0
        ) {

            inputRefs
                .current[index - 1]
                ?.focus();

            return;
        }


        if (
            event.key === "ArrowRight" &&
            index <
                otp.length - 1
        ) {

            inputRefs
                .current[index + 1]
                ?.focus();
        }
    };


    /* =====================================================
       PASTE OTP
       ===================================================== */

    const handlePaste = (event) => {

        event.preventDefault();

        setError("");

        setSuccess(false);


        const pastedValue =
            event.clipboardData
                .getData("text")
                .replace(/\D/g, "")
                .slice(0, 6);


        if (!pastedValue) {
            return;
        }


        const updatedOtp = [
            "",
            "",
            "",
            "",
            "",
            ""
        ];


        pastedValue
            .split("")
            .forEach(
                (digit, index) => {
                    updatedOtp[index] =
                        digit;
                }
            );


        setOtp(updatedOtp);


        /*
         * Focus the next empty box,
         * or the last box if complete.
         */

        const nextEmptyIndex =
            updatedOtp.findIndex(
                (digit) => !digit
            );


        const focusIndex =
            nextEmptyIndex === -1
                ? 5
                : nextEmptyIndex;


        setTimeout(() => {

            inputRefs
                .current[focusIndex]
                ?.focus();

        }, 0);
    };


    /* =====================================================
       OTP VALUE
       ===================================================== */

    const otpValue =
        otp.join("");


    const otpComplete =
        otpValue.length === 6;


    /* =====================================================
       RESEND OTP
       ===================================================== */

    const handleResend = async () => {

        if (timer > 0 || loading) {
            return;
        }


        try {

            setError("");

            setSuccess(false);


            /*
             * =================================================
             * ADD YOUR EXISTING RESEND API HERE
             * =================================================
             *
             * Example:
             *
             * await resendVerificationCode(email);
             */


            setTimer(60);

            setOtp([
                "",
                "",
                "",
                "",
                "",
                ""
            ]);


            setTimeout(() => {

                inputRefs
                    .current[0]
                    ?.focus();

            }, 50);


        } catch (resendError) {

            console.error(
                "Failed to resend OTP:",
                resendError
            );


            setError(
                resendError?.message ||
                "Unable to resend the verification code. Please try again."
            );
        }
    };


    /* =====================================================
       VERIFY OTP
       ===================================================== */

    const handleVerify = async () => {

        setError("");

        setSuccess(false);


        if (!otpComplete) {

            setError(
                "Please enter the complete 6-digit verification code."
            );

            return;
        }


        try {

            setLoading(true);


            /*
             * =================================================
             * ADD YOUR EXISTING OTP VERIFICATION API HERE
             * =================================================
             *
             * Example:
             *
             * await verifyEmailOtp({
             *     email,
             *     otp: otpValue
             * });
             *
             */


            /*
             * Temporary success state.
             *
             * Replace this with your real API response.
             */

            await new Promise(
                (resolve) =>
                    setTimeout(
                        resolve,
                        1000
                    )
            );


            setSuccess(true);


            /*
             * Continue to Complete Profile
             */

            setTimeout(() => {

                navigate(
                    "/complete-profile",
                    {
                        state: {
                            email
                        }
                    }
                );

            }, 700);


        } catch (verificationError) {

            console.error(
                "OTP verification failed:",
                verificationError
            );


            setError(
                verificationError?.message ||
                "The verification code is invalid or has expired."
            );


            setOtp([
                "",
                "",
                "",
                "",
                "",
                ""
            ]);


            setTimeout(() => {

                inputRefs
                    .current[0]
                    ?.focus();

            }, 50);

        } finally {

            setLoading(false);
        }
    };


    /* =====================================================
       BACK TO REGISTER
       ===================================================== */

    const handleBack = () => {

        navigate(
            "/register",
            {
                state: {
                    email
                }
            }
        );
    };


    /* =====================================================
       CHANGE EMAIL
       ===================================================== */

    const handleChangeEmail = () => {

        navigate(
            "/register",
            {
                state: {
                    email
                }
            }
        );
    };


    /* =====================================================
       FORMAT TIMER
       ===================================================== */

    const formattedTimer =
        `00:${String(timer).padStart(
            2,
            "0"
        )}`;


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

            y: 28,

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

        <main className="auth-page verify-email-page">


            {/* =================================================
                BACKGROUND BLOBS

                These already exist in auth.css.
            ================================================= */}

            <div className="auth-blob auth-blob-1" />

            <div className="auth-blob auth-blob-2" />

            <div className="auth-blob auth-blob-3" />


            {/* =================================================
                MAIN AUTH CONTAINER

                Uses auth.css
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
                    LEFT PANEL
                ================================================= */}

                <section className="auth-left">


                    {/* =================================================
                        BRAND
                    ================================================= */}

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
                        PROGRESS
                    ================================================= */}

                    <motion.div
                        className="verify-progress"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >

                        <div className="verify-progress-header">

                            <span>
                                Registration Progress
                            </span>

                            <strong>
                                Step 2 of 4
                            </strong>

                        </div>


                        <div className="verify-progress-track">

                            <motion.div
                                className="verify-progress-fill"
                                initial={{
                                    width: 0
                                }}
                                animate={{
                                    width: "50%"
                                }}
                                transition={{
                                    duration: 0.9,

                                    delay: 0.3,

                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1
                                    ]
                                }}
                            />

                        </div>


                        <div className="verify-steps">


                            {/* STEP 1 */}

                            <motion.div
                                className="verify-step completed"
                                variants={itemVariants}
                            >

                                <div className="verify-step-circle">

                                    <CheckCircle2
                                        size={15}
                                    />

                                </div>

                                <span>
                                    Create Account
                                </span>

                            </motion.div>


                            {/* STEP 2 */}

                            <motion.div
                                className="verify-step active"
                                variants={itemVariants}
                            >

                                <div className="verify-step-circle">
                                    2
                                </div>

                                <span>
                                    Email Verification
                                </span>

                            </motion.div>


                            {/* STEP 3 */}

                            <motion.div
                                className="verify-step"
                                variants={itemVariants}
                            >

                                <div className="verify-step-circle">
                                    3
                                </div>

                                <span>
                                    Profile Completion
                                </span>

                            </motion.div>


                            {/* STEP 4 */}

                            <motion.div
                                className="verify-step"
                                variants={itemVariants}
                            >

                                <div className="verify-step-circle">
                                    4
                                </div>

                                <span>
                                    Mobile Verification
                                </span>

                            </motion.div>

                        </div>

                    </motion.div>


                    {/* =================================================
                        LEFT HERO
                    ================================================= */}

                    <motion.div
                        className="verify-hero"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >

                        <motion.div
                            className="verify-hero-icon"
                            variants={itemVariants}
                        >

                            <Envelope
                                size={25}
                            />

                        </motion.div>


                        <motion.h1
                            variants={itemVariants}
                        >
                            Verify Your
                            <span>
                                Email Address
                            </span>
                        </motion.h1>


                        <motion.p
                            variants={itemVariants}
                        >
                            We've sent a secure 6-digit
                            verification code to your email.
                            Verify your address to continue
                            setting up your enterprise account.
                        </motion.p>

                    </motion.div>


                    {/* =================================================
                        BENEFITS
                    ================================================= */}

                    <motion.div
                        className="verify-benefits"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >


                        {/* SECURITY */}

                        <motion.div
                            className="verify-benefit"
                            variants={itemVariants}
                            whileHover={{
                                x: 4
                            }}
                        >

                            <div className="verify-benefit-icon">

                                <ShieldCheck
                                    size={17}
                                />

                            </div>


                            <div>

                                <strong>
                                    Secure Verification
                                </strong>

                                <span>
                                    Your verification code helps
                                    protect your account from
                                    unauthorized access.
                                </span>

                            </div>

                        </motion.div>


                        {/* TIME */}

                        <motion.div
                            className="verify-benefit"
                            variants={itemVariants}
                            whileHover={{
                                x: 4
                            }}
                        >

                            <div className="verify-benefit-icon">

                                <Clock3
                                    size={17}
                                />

                            </div>


                            <div>

                                <strong>
                                    Quick & Simple
                                </strong>

                                <span>
                                    Enter the six-digit code to
                                    complete this verification step.
                                </span>

                            </div>

                        </motion.div>


                    </motion.div>


                    {/* FOOTER */}

                    <motion.div
                        className="verify-left-footer"
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 0.8,
                            duration: 0.5
                        }}
                    >

                        <CheckCircle2
                            size={13}
                        />

                        <span>
                            Secure email verification
                        </span>

                    </motion.div>

                </section>


                {/* =================================================
                    RIGHT PANEL
                ================================================= */}

                <section className="auth-right">


                    {/* =================================================
                        OTP CARD
                    ================================================= */}

                    <motion.div
                        className="auth-card verify-card"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >


                        {/* =================================================
                            HEADER
                        ================================================= */}

                        <motion.div
                            className="verify-header"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >

                            <motion.div
                                className="verify-header-badge"
                                variants={itemVariants}
                            >

                                <Envelope
                                    size={14}
                                />

                                <span>
                                    Email Verification
                                </span>

                            </motion.div>


                            <motion.h2
                                className="auth-heading"
                                variants={itemVariants}
                            >
                                Verify Your Email
                            </motion.h2>


                            <motion.p
                                className="auth-description"
                                variants={itemVariants}
                            >
                                Enter the 6-digit verification
                                code we sent to your email address.
                            </motion.p>

                        </motion.div>


                        {/* =================================================
                            EMAIL DISPLAY
                        ================================================= */}

                        <motion.div
                            className="verify-email-banner"
                            variants={itemVariants}
                        >

                            <div className="verify-email-banner-icon">

                                <Envelope
                                    size={17}
                                />

                            </div>


                            <div>

                                <span>
                                    Verification code sent to
                                </span>

                                <strong>
                                    {maskedEmail}
                                </strong>

                            </div>

                        </motion.div>


                        {/* =================================================
                            ERROR
                        ================================================= */}

                        {error && (

                            <motion.div
                                className="verify-message verify-error"
                                initial={{
                                    opacity: 0,
                                    y: -6
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    duration: 0.25
                                }}
                            >

                                {error}

                            </motion.div>

                        )}


                        {/* =================================================
                            SUCCESS
                        ================================================= */}

                        {success && (

                            <motion.div
                                className="verify-message verify-success"
                                initial={{
                                    opacity: 0,
                                    y: -6
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                            >

                                <CheckCircle2
                                    size={15}
                                />

                                Email verified successfully.

                            </motion.div>

                        )}


                        {/* =================================================
                            OTP SECTION
                        ================================================= */}

                        <motion.div
                            className="verify-otp-section"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >

                            <motion.div
                                className="verify-otp-label"
                                variants={itemVariants}
                            >
                                Enter verification code
                            </motion.div>


                            <motion.div
                                className="verify-otp-inputs"
                                variants={itemVariants}
                            >

                                {otp.map(
                                    (
                                        digit,
                                        index
                                    ) => (

                                        <motion.input
                                            key={index}

                                            ref={(element) => {

                                                inputRefs.current[
                                                    index
                                                ] = element;

                                            }}

                                            className={
                                                `verify-otp-input ${
                                                    digit
                                                        ? "filled"
                                                        : ""
                                                }`
                                            }

                                            type="text"

                                            inputMode="numeric"

                                            autoComplete={
                                                index === 0
                                                    ? "one-time-code"
                                                    : "off"
                                            }

                                            maxLength={1}

                                            value={digit}

                                            aria-label={
                                                `Verification digit ${
                                                    index + 1
                                                }`
                                            }

                                            onChange={(event) =>
                                                handleOtpChange(
                                                    event.target.value,
                                                    index
                                                )
                                            }

                                            onKeyDown={(event) =>
                                                handleKeyDown(
                                                    event,
                                                    index
                                                )
                                            }

                                            onPaste={
                                                handlePaste
                                            }

                                            whileFocus={{
                                                y: -2,
                                                scale: 1.03
                                            }}

                                            transition={{
                                                duration: 0.2
                                            }}

                                        />

                                    )
                                )}

                            </motion.div>


                            <motion.p
                                className="verify-otp-hint"
                                variants={itemVariants}
                            >
                                Enter all six digits. You can also
                                paste the complete code.
                            </motion.p>

                        </motion.div>


                        {/* =================================================
                            TIMER / RESEND
                        ================================================= */}

                        <motion.div
                            className="verify-resend-section"
                            variants={itemVariants}
                        >

                            {timer > 0 ? (

                                <div className="verify-timer">

                                    <Clock3
                                        size={14}
                                    />

                                    <span>
                                        Resend code available in
                                    </span>

                                    <strong>
                                        {formattedTimer}
                                    </strong>

                                </div>

                            ) : (

                                <button
                                    type="button"
                                    className="verify-resend-button"
                                    onClick={
                                        handleResend
                                    }
                                    disabled={loading}
                                >

                                    <RotateCcw
                                        size={14}
                                    />

                                    Resend Verification Code

                                </button>

                            )}

                        </motion.div>


                        {/* =================================================
                            ACTIONS
                        ================================================= */}

                        <motion.div
                            className="verify-actions"
                            variants={itemVariants}
                        >

                            <button
                                type="button"
                                className="verify-back-button"
                                onClick={
                                    handleBack
                                }
                                disabled={loading}
                            >

                                <ArrowLeft
                                    size={16}
                                />

                                Back

                            </button>


                            <motion.button
                                type="button"
                                className="auth-primary-btn verify-submit-button"
                                onClick={
                                    handleVerify
                                }
                                disabled={
                                    !otpComplete ||
                                    loading
                                }
                                whileHover={
                                    otpComplete &&
                                    !loading
                                        ? {
                                            y: -2
                                        }
                                        : {}
                                }
                                whileTap={
                                    otpComplete &&
                                    !loading
                                        ? {
                                            scale: 0.985
                                        }
                                        : {}
                                }
                            >

                                {loading ? (

                                    <>
                                        <span className="verify-spinner" />

                                        Verifying...
                                    </>

                                ) : (

                                    <>
                                        Verify Email

                                        <ArrowRight
                                            size={16}
                                        />
                                    </>

                                )}

                            </motion.button>

                        </motion.div>


                        {/* =================================================
                            CHANGE EMAIL
                        ================================================= */}

                        <motion.div
                            className="verify-change-email"
                            variants={itemVariants}
                        >

                            <span>
                                Wrong email address?
                            </span>


                            <button
                                type="button"
                                onClick={
                                    handleChangeEmail
                                }
                            >
                                Change Email
                            </button>

                        </motion.div>

                    </motion.div>

                </section>

            </motion.section>

        </main>
    );
}