"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileText,
  Filter,
  LockKeyhole,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { PageHeading, StatusBadge } from "./shared";

export function ChatPage() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState("");
  const [source, setSource] = useState(false);
  const [filter, setFilter] = useState("All documents");
  const [feedback, setFeedback] = useState("");
  return (
    <div className="content chat-content">
      <PageHeading
        eyebrow="YOUR RESEARCH COPILOT"
        title="Ask your documents"
        sub="Get clear, cited answers from your knowledge base."
        action={
          <button
            className="outline-button"
            onClick={() => {
              setSent("");
              setMessage("");
            }}
          >
            <Plus size={15} /> New conversation
          </button>
        }
      />
      <div className="chat-layout">
        <section className="conversation">
          <div className="chat-toolbar">
            <div className="live-label">
              <span className="sparkle-dot">
                <Sparkles size={13} />
              </span>{" "}
              Research assistant <span className="live-pill">ONLINE</span>
            </div>
            <label className="filter-select">
              <Filter size={14} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                aria-label="Filter documents"
              >
                <option>All documents</option>
                <option>Q3 Market Analysis</option>
                <option>Annual Report</option>
              </select>
              <ChevronDown size={14} />
            </label>
          </div>
          <div className="messages">
            <div className="date-marker">
              <span />
              TODAY
              <span />
            </div>
            <div className="user-message">
              <div className="user-avatar">SR</div>
              <div>
                <div className="message-meta">
                  <b>You</b>
                  <span>10:24 AM</span>
                </div>
                <div className="user-bubble">
                  What were the main drivers of revenue growth in Q3?
                </div>
              </div>
            </div>
            <div className="assistant-message">
              <div className="assistant-avatar">
                <Sparkles size={15} />
              </div>
              <div className="answer-wrap">
                <div className="message-meta">
                  <b>IntelliDocs</b>
                  <span>10:24 AM</span>
                  <StatusBadge>Verified answer</StatusBadge>
                </div>
                <div className="answer-text">
                  <p>
                    Revenue grew <strong>18% year-over-year</strong> in Q3,
                    driven by three key factors:
                  </p>
                  <ol>
                    <li>
                      <b>Enterprise subscriptions</b> increased 26%,
                      contributing the largest share of growth as more customers
                      moved to annual plans.
                    </li>
                    <li>
                      <b>International expansion</b> added 7 percentage points,
                      led by strong adoption in EMEA and APAC markets.
                    </li>
                    <li>
                      <b>Reduced churn</b> improved net revenue retention to
                      118%, up from 109% in the prior year.
                    </li>
                  </ol>
                  <p>
                    These gains partially offset a 4% decline in professional
                    services revenue as the company continued its shift toward
                    recurring revenue.
                  </p>
                </div>
                <div className="citation-row">
                  <button className="citation" onClick={() => setSource(true)}>
                    <FileText size={12} /> Q3 Market Analysis.pdf{" "}
                    <span>· p.12</span>
                  </button>
                  <button className="citation" onClick={() => setSource(true)}>
                    <FileText size={12} /> 2026 Annual Report.pdf{" "}
                    <span>· p.28</span>
                  </button>
                </div>
                <div className="answer-footer">
                  <span>Was this answer helpful?</span>
                  <button
                    aria-label="Helpful answer"
                    className={feedback === "up" ? "selected-feedback" : ""}
                    onClick={() => setFeedback("up")}
                  >
                    <ThumbsUp size={14} />
                  </button>
                  <button
                    aria-label="Not helpful answer"
                    className={feedback === "down" ? "selected-feedback" : ""}
                    onClick={() => setFeedback("down")}
                  >
                    <ThumbsDown size={14} />
                  </button>
                  <span className="confidence">
                    <CheckCircle2 size={13} /> 96% confidence
                  </span>
                </div>
              </div>
            </div>
            {sent && (
              <div className="user-message new-message">
                <div className="user-avatar">SR</div>
                <div>
                  <div className="message-meta">
                    <b>You</b>
                    <span>Just now</span>
                  </div>
                  <div className="user-bubble">{sent}</div>
                  <div className="low-confidence">
                    <span>Low confidence</span> Sample mode — no live document
                    search is connected.
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="composer">
            <textarea
              aria-label="Ask a question"
              placeholder="Ask a question about your documents…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing &&
                  e.keyCode !== 229
                ) {
                  e.preventDefault();
                  if (message.trim()) {
                    setSent(message.trim());
                    setMessage("");
                  }
                }
              }}
            />
            <div className="composer-bottom">
              <span>
                <LockKeyhole size={12} /> Answers are grounded in your documents
              </span>
              <button
                className="send-button"
                aria-label="Send message"
                disabled={!message.trim()}
                onClick={() => {
                  setSent(message.trim());
                  setMessage("");
                }}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </section>
        <aside className={`sources-panel ${source ? "sources-open" : ""}`}>
          <div className="sources-heading">
            <div>
              <h2>Sources</h2>
              <p>2 references in this answer</p>
            </div>
            <button
              className="icon-button source-close"
              aria-label="Close sources"
              onClick={() => setSource(false)}
            >
              <X size={17} />
            </button>
          </div>
          <div className="source-card">
            <div className="source-file">
              <span className="pdf-icon">PDF</span>
              <div>
                <b>Q3 Market Analysis</b>
                <small>Page 12 · Paragraph 3</small>
              </div>
              <ChevronRight size={14} />
            </div>
            <p>
              “Total revenue increased 18% to $2.4 billion compared to the third
              quarter of 2023, primarily driven by growth in enterprise
              subscriptions...”
            </p>
            <div className="relevance">
              <span>Relevance</span>
              <b>98%</b>
            </div>
            <div className="relevance-track">
              <i style={{ width: "98%" }} />
            </div>
          </div>
          <div className="source-card">
            <div className="source-file">
              <span className="pdf-icon">PDF</span>
              <div>
                <b>2026 Annual Report</b>
                <small>Page 28 · Paragraph 1</small>
              </div>
              <ChevronRight size={14} />
            </div>
            <p>
              “Net revenue retention increased to 118%, reflecting improved
              customer expansion and a reduction in logo churn across all
              segments.”
            </p>
            <div className="relevance">
              <span>Relevance</span>
              <b>91%</b>
            </div>
            <div className="relevance-track">
              <i style={{ width: "91%" }} />
            </div>
          </div>
          <div className="source-note">
            <ShieldCheck size={15} /> Every answer is verified against your
            source documents.
          </div>
        </aside>
      </div>
    </div>
  );
}
