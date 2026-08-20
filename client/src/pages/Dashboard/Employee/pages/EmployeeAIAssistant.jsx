import React, { useRef, useState } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaPlus,
  FaHistory,
  FaFileAlt,
  FaSearch,
  FaLightbulb,
  FaTimes,
  FaRegCopy,
  FaCheck,
} from "react-icons/fa";

import "./EmployeeAIAssistant.css";

const EmployeeAIAssistant = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const inputRef = useRef(null);

  const suggestions = [
    "Summarize an SOP for me",
    "Find the SOP for a process",
    "Explain a compliance requirement",
    "Help me understand my tasks",
  ];

  const recentChats = [
    {
      id: 1,
      title: "Information Security SOP",
      time: "Today",
    },
    {
      id: 2,
      title: "Compliance requirements",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Training guidance",
      time: "Aug 18",
    },
  ];

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: trimmedMessage,
    };

    const assistantMessage = {
      id: Date.now() + 1,
      type: "assistant",
      text:
        "I can help you find, understand, and work with your organization's SOPs, tasks, training, and compliance information. This response area can be connected to the AI service to provide answers based on your organization's approved knowledge base.",
    };

    setMessages((current) => [
      ...current,
      userMessage,
      assistantMessage,
    ]);

    setMessage("");
  };

  const handleSuggestion = (suggestion) => {
    setMessage(suggestion);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch (error) {
      console.error("Unable to copy response:", error);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setMessage("");

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <div className="employee-ai-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="employee-ai-header">

        <div className="employee-ai-title">

          <div className="employee-ai-title-icon">
            <FaRobot />
          </div>

          <div>
            <span className="employee-ai-eyebrow">
              AI KNOWLEDGE ASSISTANT
            </span>

            <h1>AI Assistant</h1>

            <p>
              Ask questions and get guidance from your
              organization's approved knowledge base.
            </p>
          </div>

        </div>


        <div className="employee-ai-header-actions">

          <button
            type="button"
            onClick={handleNewChat}
          >
            <FaPlus />
            New Chat
          </button>

          <button
            type="button"
            onClick={() =>
              setShowHistory((current) => !current)
            }
          >
            <FaHistory />
            History
          </button>

        </div>

      </header>


      {/* =====================================================
          MAIN AI WORKSPACE
          ===================================================== */}

      <div className="employee-ai-workspace">

        {/* =================================================
            CHAT AREA
            ================================================= */}

        <main className="employee-ai-chat">

          {messages.length === 0 ? (

            <div className="employee-ai-welcome">

              <div className="employee-ai-welcome-icon">
                <FaRobot />
              </div>

              <span className="employee-ai-welcome-label">
                KNOWLEDGE ASSIST
              </span>

              <h2>
                How can I help you today?
              </h2>

              <p>
                Ask about SOPs, compliance requirements,
                employee tasks, training, or approved
                process information.
              </p>


              <div className="employee-ai-suggestions">

                {suggestions.map((suggestion) => (

                  <button
                    type="button"
                    key={suggestion}
                    onClick={() =>
                      handleSuggestion(suggestion)
                    }
                  >
                    <FaLightbulb />
                    <span>{suggestion}</span>
                  </button>

                ))}

              </div>

            </div>

          ) : (

            <div className="employee-ai-message-list">

              {messages.map((item) => (

                <div
                  className={`employee-ai-message ${
                    item.type === "user"
                      ? "user"
                      : "assistant"
                  }`}
                  key={item.id}
                >

                  <div className="employee-ai-message-avatar">

                    {item.type === "user" ? (
                      "JK"
                    ) : (
                      <FaRobot />
                    )}

                  </div>


                  <div className="employee-ai-message-body">

                    <div className="employee-ai-message-name">
                      {item.type === "user"
                        ? "You"
                        : "AI Assistant"}
                    </div>

                    <div className="employee-ai-message-text">
                      {item.text}
                    </div>


                    {item.type === "assistant" && (

                      <button
                        type="button"
                        className="employee-ai-copy"
                        onClick={() =>
                          handleCopy(item.text, item.id)
                        }
                      >

                        {copiedId === item.id ? (
                          <>
                            <FaCheck />
                            Copied
                          </>
                        ) : (
                          <>
                            <FaRegCopy />
                            Copy
                          </>
                        )}

                      </button>

                    )}

                  </div>

                </div>

              ))}

            </div>

          )}


          {/* =================================================
              INPUT
              ================================================= */}

          <div className="employee-ai-input-area">

            <div className="employee-ai-input-wrapper">

              <textarea
                ref={inputRef}
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask the AI Assistant..."
                rows={1}
              />

              <button
                type="button"
                className="employee-ai-send"
                onClick={handleSend}
                disabled={!message.trim()}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>

            </div>

            <span className="employee-ai-input-hint">
              AI responses should be verified against the
              latest approved organizational documentation.
            </span>

          </div>

        </main>


        {/* =================================================
            HISTORY PANEL
            ================================================= */}

        {showHistory && (

          <aside className="employee-ai-history">

            <div className="employee-ai-history-header">

              <div>
                <span>CONVERSATIONS</span>
                <h3>Recent Chats</h3>
              </div>

              <button
                type="button"
                onClick={() => setShowHistory(false)}
                aria-label="Close history"
              >
                <FaTimes />
              </button>

            </div>


            <div className="employee-ai-history-search">

              <FaSearch />

              <input
                type="text"
                placeholder="Search conversations..."
              />

            </div>


            <div className="employee-ai-history-list">

              {recentChats.map((chat) => (

                <button
                  type="button"
                  className="employee-ai-history-item"
                  key={chat.id}
                >

                  <div className="employee-ai-history-icon">
                    <FaFileAlt />
                  </div>

                  <div>

                    <strong>
                      {chat.title}
                    </strong>

                    <span>
                      {chat.time}
                    </span>

                  </div>

                </button>

              ))}

            </div>

          </aside>

        )}

      </div>

    </div>
  );
};

export default EmployeeAIAssistant;