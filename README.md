# IntelliDocs – AI-Powered Document Research Assistant

Live app: [intellidocs-liard.vercel.app](https://intellidocs-liard.vercel.app)

## Features

| Page | Features |
| --- | --- |
| Chat | Ask questions about documents, review cited answers, and provide feedback. |
| Documents | Upload PDFs, review indexing status, and manage files. |
| Research Agent | Submit a research topic, review and approve a plan, and follow the research workflow. |
| Reports | Browse saved research, inspect cited sources, and download reports. |
| Security | Monitor blocked events, review protection activity, and filter events by category. |
| Settings | Configure the model, retrieval parameters, guardrails, citations, and workspace name. |

## Tech stack

Next.js, React, TypeScript, Tailwind CSS v4, shadcn/ui, Recharts, and Vercel.

## Run locally

1. Install [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/).
2. Install dependencies: `pnpm install`
3. Start the development server: `pnpm dev`
4. Open [http://localhost:3000](http://localhost:3000).

## Backend roadmap

- [ ] Build FastAPI PDF ingestion.
- [ ] Add a vector database and hybrid search with citations.
- [ ] Implement an agentic research workflow.
- [ ] Add safety guardrails.
- [ ] Create an evaluation suite.
- [ ] Add Docker packaging and monitoring.
