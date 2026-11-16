"use client";

import { useState } from "react";
import {
  ChevronDown,
  CloudUpload,
  FolderOpen,
  LockKeyhole,
  Plus,
  Trash2,
} from "lucide-react";
import { PageHeading, StatusBadge } from "./shared";
const docs = [
  {
    id: "q3-market-analysis",
    name: "Q3 Market Analysis.pdf",
    pages: 38,
    size: "4.2 MB",
    status: "Ready",
    date: "Nov 14, 2026",
  },
  {
    id: "annual-report",
    name: "2026 Annual Report.pdf",
    pages: 112,
    size: "8.6 MB",
    status: "Ready",
    date: "Nov 12, 2026",
  },
  {
    id: "competitor-landscape",
    name: "Competitor Landscape.pdf",
    pages: 24,
    size: "2.1 MB",
    status: "Processing",
    date: "Nov 10, 2026",
  },
];

export function DocumentsPage() {
  const [files, setFiles] = useState(docs);
  const [statusFilter, setStatusFilter] = useState("All");
  const [drag, setDrag] = useState(false);
  const visibleFiles =
    statusFilter === "All"
      ? files
      : files.filter((file) => file.status === statusFilter);
  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const newFiles = Array.from(list)
      .filter((file) => file.type === "application/pdf")
      .map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        pages: 0,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        status: "Processing",
        date: "Just now",
      }));
    setFiles((currentFiles) => [...newFiles, ...currentFiles]);
  };
  return (
    <div className="content">
      <PageHeading
        eyebrow="KNOWLEDGE BASE"
        title="Documents"
        sub="Upload and manage the documents your assistant can reference."
        action={
          <button
            className="primary-button"
            onClick={() => document.getElementById("pdf-upload")?.click()}
          >
            <Plus size={16} /> Upload documents
          </button>
        }
      />
      <div
        className={`upload-zone ${drag ? "drop-active" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => document.getElementById("pdf-upload")?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" && document.getElementById("pdf-upload")?.click()
        }
      >
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf,.pdf"
          multiple
          hidden
          onChange={(e) => addFiles(e.target.files)}
        />
        <div className="upload-icon">
          <CloudUpload size={21} />
        </div>
        <b>
          Drop your PDFs here, or <span>browse files</span>
        </b>
        <p>PDF files up to 50 MB each</p>
        <small>
          <LockKeyhole size={12} /> Your documents are encrypted and private
        </small>
      </div>
      <div className="section-row">
        <div>
          <h2>
            Your documents <span className="count-chip">{files.length}</span>
          </h2>
          <p>Documents indexed and available for research</p>
        </div>
        <label className="filter-select subtle-button">
          <span className="sr-only">Filter documents by status</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter documents by status"
          >
            <option>All</option>
            <option>Ready</option>
            <option>Processing</option>
            <option>Failed</option>
          </select>
          <ChevronDown size={14} />
        </label>
      </div>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>DOCUMENT</th>
              <th>PAGES</th>
              <th>SIZE</th>
              <th>STATUS</th>
              <th>UPLOADED</th>
              <th>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleFiles.map((f) => (
              <tr key={f.id}>
                <td>
                  <div className="document-name">
                    <span className="pdf-icon">PDF</span>
                    <b>{f.name}</b>
                  </div>
                </td>
                <td>{f.pages || "—"}</td>
                <td>{f.size}</td>
                <td>
                  <StatusBadge
                    tone={
                      f.status === "Ready"
                        ? "green"
                        : f.status === "Failed"
                          ? "red"
                          : "blue"
                    }
                  >
                    {f.status}
                  </StatusBadge>
                </td>
                <td>{f.date}</td>
                <td>
                  <button
                    className="icon-button delete-button"
                    aria-label={`Delete ${f.name}`}
                    onClick={() =>
                      setFiles((currentFiles) =>
                        currentFiles.filter((file) => file.id !== f.id),
                      )
                    }
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleFiles.length === 0 && (
          <div className="empty-state">
            <FolderOpen size={22} />
            <b>{files.length === 0 ? "No documents yet" : "No matching documents"}</b>
            <p>
              {files.length === 0
                ? "Upload a PDF to start building your knowledge base."
                : `No documents have the ${statusFilter} status.`}
            </p>
            {files.length === 0 ? (
              <button
                className="outline-button"
                onClick={() => document.getElementById("pdf-upload")?.click()}
              >
                <Plus size={14} /> Upload a document
              </button>
            ) : (
              <button
                className="outline-button"
                onClick={() => setStatusFilter("All")}
              >
                Show all documents
              </button>
            )}
          </div>
        )}
      </div>
      <div className="privacy-note">
        <LockKeyhole size={14} /> Documents are encrypted at rest and never used
        to train AI models.
      </div>
    </div>
  );
}
