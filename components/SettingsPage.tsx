"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Check,
  CheckCircle2,
  ChevronDown,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageHeading, StatusBadge } from "./shared";

const settingsStorageKey = "intellidocs-settings";
const availableModels = [
  "GPT-4o — Balanced and capable",
  "Claude 3.5 Sonnet — Detailed analysis",
  "GPT-4o mini — Faster responses",
];

export function SettingsPage() {
  const [model, setModel] = useState(availableModels[0]);
  const [temperature, setTemperature] = useState(0.3);
  const [topK, setTopK] = useState(5);
  const [guardrails, setGuardrails] = useState(true);
  const [citations, setCitations] = useState(true);
  const [workspaceName, setWorkspaceName] = useState("Personal workspace");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(settingsStorageKey);
      if (!stored) return;

      const preferences: Record<string, unknown> = JSON.parse(stored);
      if (
        typeof preferences.model === "string" &&
        availableModels.includes(preferences.model)
      ) {
        setModel(preferences.model);
      }
      if (
        typeof preferences.temperature === "number" &&
        Number.isFinite(preferences.temperature) &&
        preferences.temperature >= 0 &&
        preferences.temperature <= 1
      ) {
        setTemperature(preferences.temperature);
      }
      if (
        typeof preferences.topK === "number" &&
        Number.isInteger(preferences.topK) &&
        preferences.topK >= 1 &&
        preferences.topK <= 10
      ) {
        setTopK(preferences.topK);
      }
      if (typeof preferences.guardrails === "boolean") {
        setGuardrails(preferences.guardrails);
      }
      if (typeof preferences.citations === "boolean") {
        setCitations(preferences.citations);
      }
    } catch {
      return;
    }
  }, []);
  return (
    <div className="content settings-content">
      <PageHeading
        eyebrow="PREFERENCES"
        title="Settings"
        sub="Configure how IntelliDocs researches and responds."
      />
      <div className="settings-layout">
        <nav className="settings-nav">
          <a href="#models" className="settings-nav-active">
            <Sparkles size={15} /> AI model
          </a>
          <a href="#retrieval">
            <Search size={15} /> Retrieval
          </a>
          <a href="#safety">
            <ShieldCheck size={15} /> Safety & citations
          </a>
          <a href="#workspace">
            <Activity size={15} /> Workspace
          </a>
        </nav>
        <div className="settings-sections">
          <section className="panel settings-panel" id="models">
            <div className="settings-title">
              <span className="panel-icon violet">
                <Sparkles size={17} />
              </span>
              <div>
                <h2>AI model</h2>
                <p>Choose the model that powers your research assistant.</p>
              </div>
            </div>
            <label className="field-label" htmlFor="model-choice">
              Language model
            </label>
            <div className="select-wrap">
              <select
                id="model-choice"
                value={model}
                onChange={(event) => setModel(event.target.value)}
              >
                {availableModels.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <ChevronDown size={14} />
            </div>
            <small className="field-hint">
              Models are used only to process your queries. Your files are never
              used for training.
            </small>
          </section>
          <section className="panel settings-panel" id="retrieval">
            <div className="settings-title">
              <span className="panel-icon blue">
                <Search size={17} />
              </span>
              <div>
                <h2>Retrieval settings</h2>
                <p>Fine-tune how relevant content is found.</p>
              </div>
            </div>
            <div className="slider-setting">
              <div>
                <label htmlFor="temperature">Temperature</label>
                <span>Controls response creativity</span>
              </div>
              <div className="slider-control">
                <input
                  id="temperature"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                />
                <output>{temperature.toFixed(1)}</output>
              </div>
              <div className="slider-labels">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>
            <div className="slider-setting">
              <div>
                <label htmlFor="top-k">Top-k results</label>
                <span>Maximum document passages to retrieve</span>
              </div>
              <div className="slider-control">
                <input
                  id="top-k"
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={topK}
                  onChange={(e) => setTopK(Number(e.target.value))}
                />
                <output>{topK}</output>
              </div>
              <div className="slider-labels">
                <span>Focused</span>
                <span>Comprehensive</span>
              </div>
            </div>
          </section>
          <section className="panel settings-panel" id="safety">
            <div className="settings-title">
              <span className="panel-icon green">
                <ShieldCheck size={17} />
              </span>
              <div>
                <h2>Safety & citations</h2>
                <p>Keep responses grounded, transparent, and secure.</p>
              </div>
            </div>
            <div className="toggle-setting">
              <span>
                <b>Enable guardrails</b>
                <small>Block prompt injection and mask sensitive data.</small>
              </span>
              <button
                role="switch"
                aria-checked={guardrails}
                aria-label="Enable guardrails"
                className={`switch ${guardrails ? "switch-on" : ""}`}
                onClick={() => setGuardrails(!guardrails)}
              >
                <i />
              </button>
            </div>
            <div className="toggle-setting">
              <span>
                <b>Require citations</b>
                <small>Include source references with every answer.</small>
              </span>
              <button
                role="switch"
                aria-checked={citations}
                aria-label="Require citations"
                className={`switch ${citations ? "switch-on" : ""}`}
                onClick={() => setCitations(!citations)}
              >
                <i />
              </button>
            </div>
          </section>
          <section className="panel settings-panel" id="workspace">
            <div className="settings-title">
              <span className="panel-icon blue">
                <Activity size={17} />
              </span>
              <div>
                <h2>Workspace</h2>
                <p>Manage the name shown for this workspace.</p>
              </div>
            </div>
            <label className="field-label" htmlFor="workspace-name">
              Workspace name
            </label>
            <div className="select-wrap">
              <input
                id="workspace-name"
                type="text"
                value={workspaceName}
                onChange={(event) => setWorkspaceName(event.target.value)}
                aria-label="Workspace name"
              />
            </div>
          </section>
          <div className="save-row">
            {saved && (
              <span className="saved-label">
                <CheckCircle2 size={14} /> Settings saved
              </span>
            )}
            <button
              className="primary-button"
              onClick={() => {
                try {
                  localStorage.setItem(
                    settingsStorageKey,
                    JSON.stringify({
                      model,
                      temperature,
                      topK,
                      guardrails,
                      citations,
                    }),
                  );
                  setSaved(true);
                  window.setTimeout(() => setSaved(false), 2500);
                } catch {
                  setSaved(false);
                }
              }}
            >
              <Check size={15} /> Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
