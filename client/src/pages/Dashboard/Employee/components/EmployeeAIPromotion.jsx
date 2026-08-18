import React from "react";
import {
  ArrowRight,
  Bot,
  FileText,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import "./EmployeeAIPromotion.css";

const EmployeeAIPromotion = ({ onNavigate }) => {
  const handleOpenAssistant = () => {
    if (typeof onNavigate === "function") {
      onNavigate("/dashboard/ai-assistant");
      return;
    }

    window.location.href = "/dashboard/ai-assistant";
  };

  const handleGenerateSOP = () => {
    if (typeof onNavigate === "function") {
      onNavigate("/dashboard/generate-sop");
      return;
    }

    window.location.href = "/dashboard/generate-sop";
  };

  return (
    <section className="employee-ai-promotion">
      {/* =====================================================
          DECORATIVE BACKGROUND
          ===================================================== */}

      <div className="employee-ai-promotion-glow employee-ai-promotion-glow-one" />
      <div className="employee-ai-promotion-glow employee-ai-promotion-glow-two" />

      <div className="employee-ai-promotion-content">
        {/* ===================================================
            LEFT CONTENT
            =================================================== */}

        <div className="employee-ai-promotion-main">
          <div className="employee-ai-promotion-badge">
            <Sparkles
              size={12}
              strokeWidth={2}
            />

            <span>AI POWERED</span>
          </div>

          <div className="employee-ai-promotion-heading">
            <h2>
              Work Smarter with
              <span> AI Assistance</span>
            </h2>

            <p>
              Get instant answers, summarize SOPs, generate
              documents and find the information you need
              faster with your AI workplace assistant.
            </p>
          </div>

          <div className="employee-ai-promotion-features">
            <div className="employee-ai-promotion-feature">
              <div className="employee-ai-promotion-feature-icon">
                <Bot
                  size={14}
                  strokeWidth={1.9}
                />
              </div>

              <span>Ask AI</span>
            </div>

            <div className="employee-ai-promotion-feature">
              <div className="employee-ai-promotion-feature-icon">
                <FileText
                  size={14}
                  strokeWidth={1.9}
                />
              </div>

              <span>Summarize SOPs</span>
            </div>

            <div className="employee-ai-promotion-feature">
              <div className="employee-ai-promotion-feature-icon">
                <WandSparkles
                  size={14}
                  strokeWidth={1.9}
                />
              </div>

              <span>Generate Content</span>
            </div>
          </div>

          <div className="employee-ai-promotion-actions">
            <button
              type="button"
              className="employee-ai-promotion-primary"
              onClick={handleOpenAssistant}
            >
              <Bot
                size={15}
                strokeWidth={2}
              />

              <span>Ask AI Assistant</span>

              <ArrowRight
                size={14}
                strokeWidth={2}
              />
            </button>

            <button
              type="button"
              className="employee-ai-promotion-secondary"
              onClick={handleGenerateSOP}
            >
              <WandSparkles
                size={14}
                strokeWidth={1.9}
              />

              <span>Generate SOP</span>
            </button>
          </div>
        </div>

        {/* ===================================================
            AI VISUAL
            =================================================== */}

        <div className="employee-ai-promotion-visual">
          <div className="employee-ai-promotion-orbit employee-ai-promotion-orbit-one" />
          <div className="employee-ai-promotion-orbit employee-ai-promotion-orbit-two" />

          <div className="employee-ai-promotion-ai-card">
            <div className="employee-ai-promotion-ai-icon">
              <Bot
                size={28}
                strokeWidth={1.5}
              />

              <span className="employee-ai-promotion-ai-pulse" />
            </div>

            <div className="employee-ai-promotion-ai-label">
              <span>AI ASSISTANT</span>

              <strong>Ready to help</strong>
            </div>
          </div>

          <div className="employee-ai-promotion-floating-card employee-ai-promotion-floating-card-one">
            <Sparkles
              size={12}
              strokeWidth={1.9}
            />

            <span>Smart Search</span>
          </div>

          <div className="employee-ai-promotion-floating-card employee-ai-promotion-floating-card-two">
            <FileText
              size={12}
              strokeWidth={1.9}
            />

            <span>SOP Insights</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeAIPromotion;