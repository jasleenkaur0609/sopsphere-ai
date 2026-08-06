import "../styles/auth-layout.css";
import "../styles/auth-background.css";
import "../styles/auth-card.css";
import "../styles/auth-form.css";
import "../styles/auth-buttons.css";
import "../styles/auth-responsive.css";

import Logo from "../assets/logos/logo.svg";

const features = [
  "AI SOP Generation",
  "AI Chat Assistant",
  "OCR Document Intelligence",
  "Workflow Automation",
  "Compliance Monitoring",
  "Role Based Security",
];

export default function AuthLayout({ children }) {
  return (
    <div className="auth-page">

      {/* Background */}

      <div className="bg-orb-1"></div>
      <div className="bg-orb-2"></div>
      <div className="bg-orb-3"></div>

      <div className="glass-square square-1"></div>
      <div className="glass-square square-2"></div>
      <div className="glass-square square-3"></div>

      <div className="bg-noise"></div>

      {/* Content */}

      <div className="auth-container">

        {/* Left */}

        <div className="auth-left">

          <div className="auth-logo">
            <img src={Logo} alt="AI SOP Portal" />
          </div>

          <h1 className="auth-title">
            Enterprise
            <br />

            <span className="auth-gradient">
              AI Knowledge
            </span>

            <br />

            Platform
          </h1>

          <p className="auth-description">
            A centralized AI-powered platform for intelligent SOP
            creation, document management, approvals, AI search,
            OCR, compliance, analytics and enterprise collaboration.
          </p>

          <div className="auth-features">

            {features.map((item) => (

              <div
                key={item}
                className="auth-feature"
              >
                ✅ {item}
              </div>

            ))}

          </div>

        </div>

        {/* Right */}

        <div className="auth-right">

          {children}

        </div>

      </div>

    </div>
  );
}