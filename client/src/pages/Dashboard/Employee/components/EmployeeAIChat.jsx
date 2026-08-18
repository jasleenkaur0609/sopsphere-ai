import React, { useState } from "react";
import {
  ArrowRight,
  Bot,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";

import "./EmployeeAIChat.css";

const EmployeeAIChat = ({ onNavigate }) => {
  const [message, setMessage] = useState("");

  const suggestedQuestions = [
    "Summarize my recent SOPs",
    "Find a process for me",
    "What training is pending?",
  ];

  const handleOpenAssistant = () => {
    if (typeof onNavigate === "function") {
      onNavigate("/dashboard/ai-assistant");
      return;
    }

    window.location.href = "/dashboard/ai-assistant";
  };

  const handleSuggestion = (question) => {
    setMessage(question);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      handleOpenAssistant();
      return;
    }

    if (typeof onNavigate === "function") {
      onNavigate(
        `/dashboard/ai-assistant?query=${encodeURIComponent(
          trimmedMessage
        )}`
      );
      return;
    }

    window.location.href =
      `/dashboard/ai-assistant?query=${encodeURIComponent(
        trimmedMessage
      )}`;
  };

  return (
    <section className="employee-ai-chat">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="employee-ai-chat-header">
        <div className="employee-ai-chat-heading">
          <div className="employee-ai-chat-icon">
            <Bot
              size={18}
              strokeWidth={1.8}
            />

            <span className="employee-ai-chat-status" />
          </div>

          <div>
            <span className="employee-ai-chat-eyebrow">
              AI WORKSPACE
            </span>

            <h2>Ask AI Assistant</h2>

            <p>
              Get quick answers from your organization's
              knowledge and SOPs.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="employee-ai-chat-open"
          onClick={handleOpenAssistant}
        >
          <span>Open Assistant</span>

          <ArrowRight
            size={13}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* =====================================================
          CHAT AREA
          ===================================================== */}

      <div className="employee-ai-chat-body">
        <div className="employee-ai-chat-message">
          <div className="employee-ai-chat-avatar">
            <Bot
              size={15}
              strokeWidth={1.8}
            />
          </div>

          <div className="employee-ai-chat-bubble">
            <div className="employee-ai-chat-bubble-heading">
              <strong>AI Assistant</strong>

              <span>Just now</span>
            </div>

            <p>
              Hi! I can help you find SOPs, understand
              processes, summarize documents or answer
              questions about your workspace.
            </p>
          </div>
        </div>

        {/* ===================================================
            SUGGESTED QUESTIONS
            =================================================== */}

        <div className="employee-ai-chat-suggestions">
          <div className="employee-ai-chat-suggestions-label">
            <Sparkles
              size={11}
              strokeWidth={1.9}
            />

            <span>Try asking</span>
          </div>

          <div className="employee-ai-chat-suggestion-list">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                className="employee-ai-chat-suggestion"
                onClick={() =>
                  handleSuggestion(question)
                }
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* ===================================================
            INPUT
            =================================================== */}

        <form
          className="employee-ai-chat-form"
          onSubmit={handleSubmit}
        >
          <div className="employee-ai-chat-input-wrapper">
            <MessageCircle
              size={15}
              strokeWidth={1.8}
              className="employee-ai-chat-input-icon"
            />

            <input
              type="text"
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Ask anything about your SOPs..."
              aria-label="Ask AI Assistant"
            />

            <button
              type="submit"
              className="employee-ai-chat-send"
              aria-label="Send question"
            >
              <Send
                size={14}
                strokeWidth={2}
              />
            </button>
          </div>
        </form>

        <div className="employee-ai-chat-disclaimer">
          <span>
            AI responses may require verification for
            critical business decisions.
          </span>
        </div>
      </div>
    </section>
  );
};

export default EmployeeAIChat;