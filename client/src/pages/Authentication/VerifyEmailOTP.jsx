import "./VerifyEmailOTP.css";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {

    FaArrowLeft,
    FaArrowRight,
    FaEnvelope,
    FaCheck,
    FaShieldAlt,
    FaClock

} from "react-icons/fa";

export default function VerifyEmailOTP() {

    const navigate = useNavigate();

    const inputRefs = useRef([]);

    const [otp, setOtp] = useState(["","","","","",""]);

    const [timer, setTimer] = useState(60);

    const [loading, setLoading] = useState(false);

    const email = "jas***@company.com";

    /*==========================================================
                        TIMER
    ==========================================================*/

    useEffect(() => {

        if(timer<=0) return;

        const interval = setInterval(()=>{

            setTimer(prev=>prev-1);

        },1000);

        return ()=>clearInterval(interval);

    },[timer]);

    /*==========================================================
                        OTP CHANGE
    ==========================================================*/

    const handleChange=(value,index)=>{

        if(!/^[0-9]?$/.test(value)) return;

        const updated=[...otp];

        updated[index]=value;

        setOtp(updated);

        if(value && index<5){

            inputRefs.current[index+1]?.focus();

        }

    };

    /*==========================================================
                        BACKSPACE
    ==========================================================*/

    const handleKeyDown=(e,index)=>{

        if(

            e.key==="Backspace" &&

            otp[index]==="" &&

            index>0

        ){

            inputRefs.current[index-1]?.focus();

        }

    };

    /*==========================================================
                        PASTE
    ==========================================================*/

    const handlePaste=(e)=>{

        e.preventDefault();

        const value=e.clipboardData

            .getData("text")

            .replace(/\D/g,"")

            .slice(0,6)

            .split("");

        const updated=[...otp];

        value.forEach((digit,index)=>{

            updated[index]=digit;

        });

        setOtp(updated);

    };

    /*==========================================================
                        VERIFY
    ==========================================================*/

    const handleVerify=()=>{

        if(otp.join("").length!==6){

            alert("Please enter the complete OTP.");

            return;

        }

        setLoading(true);

        setTimeout(()=>{

            setLoading(false);

            navigate("/complete-profile");

        },1500);

    };

    return(

        <div className="verify-page">

            <div className="bg-gradient"></div>

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

                            <h2>

                                AI SOP Portal

                            </h2>

                            <span>

                                Enterprise Knowledge Platform

                            </span>

                        </div>

                    </div>

                    {/*==============================
                        REGISTRATION PROGRESS
                    ==============================*/}

                    <div className="progress-wrapper">

                        <h4>

                            Registration Progress

                        </h4>

                        <div className="progress-bar">

                            <div className="progress-fill"></div>

                        </div>

                        <div className="steps">

                            <div className="step completed">

                                <div className="step-circle">

                                    <FaCheck />

                                </div>

                                <span>

                                    Create
                                    <br />
                                    Account

                                </span>

                            </div>

                            <div className="step active">

                                <div className="step-circle">

                                    2

                                </div>

                                <span>

                                    Email
                                    <br />
                                    Verification

                                </span>

                            </div>

                            <div className="step">

                                <div className="step-circle">

                                    3

                                </div>

                                <span>

                                    Profile
                                    <br />
                                    Completion

                                </span>

                            </div>

                            <div className="step">

                                <div className="step-circle">

                                    4

                                </div>

                                <span>

                                    Mobile
                                    <br />
                                    Verification

                                </span>

                            </div>

                        </div>

                    </div>

                    {/*==============================
                            HERO
                    ==============================*/}

                    <div className="hero-card">

                        <div className="hero-icon">

                            <FaEnvelope />

                        </div>

                        <h1>

                            Verify Your Email

                        </h1>

                        <p>

                            Your account has been created successfully.

                            Enter the verification code sent to

                            <strong>

                                {" "}

                                {email}

                            </strong>

                            {" "}to continue registration.

                        </p>

                    </div>

                    {/*==============================
                            FEATURES
                    ==============================*/}

                    <div className="feature-list">

                        <div className="feature">

                            <FaShieldAlt />

                            <div>

                                <h5>

                                    Secure Verification

                                </h5>

                                <p>

                                    Encrypted verification to keep your
                                    account protected.

                                </p>

                            </div>

                        </div>

                        <div className="feature">

                            <FaClock />

                            <div>

                                <h5>

                                    Less than 1 minute

                                </h5>

                                <p>

                                    Most users complete this step in under
                                    sixty seconds.

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

                                Enter the 6-digit verification code.

                            </p>

                        </div>
                                                {/*==========================================
                                EMAIL DISPLAY
                        ==========================================*/}

                        <div className="email-banner">

                            <FaEnvelope className="email-banner-icon" />

                            <span>

                                {email}

                            </span>

                        </div>

                        {/*==========================================
                                OTP INPUTS
                        ==========================================*/}

                        <div className="otp-section">

                            <div className="otp-inputs">

                                {otp.map((digit,index)=>(

                                    <input

                                        key={index}

                                        ref={(element)=>
                                            inputRefs.current[index]=element
                                        }

                                        className="otp-input"

                                        type="text"

                                        inputMode="numeric"

                                        maxLength="1"

                                        value={digit}

                                        onChange={(e)=>
                                            handleChange(
                                                e.target.value,
                                                index
                                            )
                                        }

                                        onKeyDown={(e)=>
                                            handleKeyDown(
                                                e,
                                                index
                                            )
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

                            {

                                timer>0 ?

                                (

                                    <p>

                                        Resend available in

                                        <span>

                                            {" "}

                                            00:

                                            {String(timer).padStart(2,"0")}

                                        </span>

                                    </p>

                                )

                                :

                                (

                                    <button

                                        type="button"

                                        className="resend-btn"

                                        onClick={()=>setTimer(60)}

                                    >

                                        Resend Verification Code

                                    </button>

                                )

                            }

                        </div>

                        {/*==========================================
                                ACTION BUTTONS
                        ==========================================*/}

                        <div className="verify-actions">

                            <button

                                type="button"

                                className="back-btn"

                                onClick={()=>
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

                                type="button"

                                onClick={()=>
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