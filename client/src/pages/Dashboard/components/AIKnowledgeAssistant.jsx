import React, { useState } from "react";

import {
  FaRobot,
  FaExpand,
  FaCompress,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";

const suggestions = [
  "How do I process a distributor request?",
  "Show me the latest finance SOP",
  "Explain the approval workflow",
  "Compare SOP versions",
];

const AIKnowledgeAssistant = ({
  expanded,
  onExpand,
  onCollapse,
  onClose,
}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text:
        "Hi Jasleen! 👋 I can help you with SOPs, policies, processes and work-related questions.",
    },
  ]);

  const [question, setQuestion] = useState("");

  const sendMessage = (text = question) => {
    const cleanText = text.trim();

    if (!cleanText) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        type: "user",
        text: cleanText,
      },
      {
        id: Date.now() + 1,
        type: "bot",
        text:
          "I’ll help you find the relevant SOP, policy or process information.",
      },
    ]);

    setQuestion("");
  };

  return (
    <aside
      className={`ai-assistant-panel ${
        expanded ? "expanded" : ""
      }`}
    >
      <div className="ai-assistant-header">
        <div className="ai-assistant-title-wrapper">
          <div className="ai-assistant-icon">
            <FaRobot />
          </div>

          <div>
            <div className="ai-assistant-title">
              AI Knowledge Assistant
            </div>

            <div className="ai-assistant-status">
              <span className="ai-status-dot" />
              Online
            </div>
          </div>
        </div>

        <div className="ai-assistant-actions">
          <button
            type="button"
            className="ai-assistant-action"
            onClick={
              expanded ? onCollapse : onExpand
            }
            title={
              expanded
                ? "Collapse"
                : "Expand"
            }
          >
            {expanded ? (
              <FaCompress />
            ) : (
              <FaExpand />
            )}
          </button>

          <button
            type="button"
            className="ai-assistant-action"
            onClick={onClose}
            title="Close"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="ai-assistant-body">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`ai-message ${message.type}`}
            style={{ marginBottom: "10px" }}
          >
            {message.text}
          </div>
        ))}

        <div className="ai-suggestions">
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#625a6e",
              marginBottom: "3px",
            }}
          >
            Try asking:
          </div>

          {suggestions.map((suggestion) => (
            <button
              type="button"
              key={suggestion}
              className="ai-suggestion"
              onClick={() =>
                sendMessage(suggestion)
              }
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="ai-assistant-input-area">
        <div className="ai-assistant-input">
          <input
            type="text"
            value={question}
            placeholder="Type your question..."
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            type="button"
            className="ai-send-btn"
            onClick={() => sendMessage()}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AIKnowledgeAssistant;