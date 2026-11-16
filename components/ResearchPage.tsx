"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Check,
  CheckCircle2,
  FileText,
  FlaskConical,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { PageHeading, StatusBadge } from "./shared";

export function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [running, setRunning] = useState(false);
  const [approval, setApproval] = useState(false);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [reportReady, setReportReady] = useState(false);
  const steps = ["Plan", "Retrieve", "Extract", "Verify", "Draft"];
  useEffect(() => {
    if (!approved || !running) return;
    const timer = window.setTimeout(() => {
      if (currentStep === steps.length - 1) {
        setRunning(false);
        setReportReady(true);
      } else {
        setCurrentStep((step) => step + 1);
      }
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [approved, currentStep, running]);
  return (
    <div className="content">
      <PageHeading
        eyebrow="AUTONOMOUS RESEARCH"
        title="Research agent"
        sub="Turn a research question into a sourced, comprehensive report."
      />
      <div className="research-grid">
        <section className="panel research-form">
          <div className="panel-head">
            <span className="panel-icon violet">
              <FlaskConical size={18} />
            </span>
            <div>
              <h2>Start a research task</h2>
              <p>Tell the agent what you want to investigate.</p>
            </div>
          </div>
          <label className="field-label" htmlFor="research-topic">
            Research topic
          </label>
          <textarea
            id="research-topic"
            className="topic-input"
            placeholder="e.g. Analyze the key trends shaping the SaaS market in 2024, including growth drivers, challenges, and emerging opportunities…"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <div className="research-meta">
            <span>
              <FileText size={13} /> Searching 3 documents
            </span>
            <span>Typically takes 2–3 min</span>
          </div>
          <button
            className="primary-button full-button"
            disabled={!topic.trim() || running}
            onClick={() => {
              setApproved(false);
              setRejected(false);
              setReportReady(false);
              setApproval(true);
            }}
          >
            <Sparkles size={15} />{" "}
            {running ? "Research in progress…" : "Start research"}
            <ArrowUpRight size={15} />
          </button>
          <div className="agent-safety">
            <ShieldCheck size={15} />
            <span>
              Agent follows your security policies and only uses approved
              documents.
            </span>
          </div>
        </section>
        <section className="panel progress-panel">
          <div className="panel-head">
            <span className="panel-icon blue">
              <Activity size={18} />
            </span>
            <div>
              <h2>Research workflow</h2>
              <p>Five steps to a verified report.</p>
            </div>
            <span className="workflow-label">
              <span className="status-dot" />
              {running ? "IN PROGRESS" : "READY"}
            </span>
          </div>
          <div className="step-list">
            {steps.map((step, i) => (
              <div
                key={step}
                className={`step ${running && i === currentStep ? "step-current" : reportReady || (running && i < currentStep) ? "step-done" : ""}`}
              >
                <div className="step-marker">
                  {reportReady || (running && i < currentStep) ? (
                    <Check size={14} />
                  ) : running && i === currentStep ? (
                    <span className="step-pulse" />
                  ) : (
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  )}
                </div>
                <div className="step-copy">
                  <b>{step}</b>
                  <small>
                    {
                      [
                        "Create a research plan",
                        "Search relevant documents",
                        "Extract key insights",
                        "Cross-check sources",
                        "Generate final report",
                      ][i]
                    }
                  </small>
                </div>
                <span className="step-status">
                  {reportReady || (running && i < currentStep)
                    ? "Complete"
                    : running && i === currentStep
                      ? "In progress"
                      : "Waiting"}
                </span>
              </div>
            ))}
          </div>
          <div className="workflow-foot">
            <LockKeyhole size={13} /> Reports require your approval before
            generation
          </div>
        </section>
      </div>
      {approval && (
        <div className="dialog-backdrop" role="presentation">
          <section
            className="approval-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="approval-title"
          >
            <button
              className="icon-button dialog-close"
              aria-label="Close dialog"
              onClick={() => setApproval(false)}
            >
              <X size={17} />
            </button>
            <span className="approval-icon">
              <ShieldCheck size={22} />
            </span>
            <div className="eyebrow">REVIEW REQUIRED</div>
            <h2 id="approval-title">Approve research plan?</h2>
            <p>The agent is ready to research this topic:</p>
            <div className="topic-preview">{topic}</div>
            <div className="plan-preview">
              <b>Proposed approach</b>
              <ul>
                <li>Search all 3 indexed documents for relevant evidence</li>
                <li>Cross-reference findings across sources</li>
                <li>Draft a cited report for your review</li>
              </ul>
            </div>
            <div className="dialog-actions">
              <button
                className="outline-button"
                onClick={() => {
                  setApproval(false);
                  setRunning(false);
                  setRejected(true);
                }}
              >
                <X size={15} /> Reject
              </button>
              <button
                className="primary-button"
                onClick={() => {
                  setApproval(false);
                  setApproved(true);
                  setCurrentStep(0);
                  setReportReady(false);
                  setRunning(true);
                }}
              >
                <Check size={15} /> Approve & continue
              </button>
            </div>
          </section>
        </div>
      )}
      {rejected && (
        <div className="inline-alert">
          Research plan rejected. Update the topic to try again.
        </div>
      )}
      {reportReady && (
        <div className="report-ready-card">
          <span className="ready-check">
            <CheckCircle2 size={17} />
          </span>
          <span>
            <b>Report ready</b>
            <small>Your verified research report is ready to review.</small>
          </span>
          <Link href="/reports" className="outline-button">
            View report <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
