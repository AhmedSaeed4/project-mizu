<!--
Sync Impact Report:
Version change: 0.0.0 → 1.0.0
Modified principles:
- PRINCIPLE_1_NAME → Project Architecture & Scope
- PRINCIPLE_2_NAME → Technology Stack
- PRINCIPLE_3_NAME → Coding Standards
- PRINCIPLE_4_NAME → Specific Implementation Rules
Added sections: None
Removed sections:
- PRINCIPLE_5_NAME
- PRINCIPLE_6_NAME
- SECTION_2_NAME
- SECTION_3_NAME
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
Follow-up TODOs: None
-->
# main-website Constitution

## Core Principles

### I. Project Architecture & Scope
- **Frontend:** Next.js 16 (App Router) + TypeScript. Handles UI, Routing, and Firebase interactions.
- **Backend (AI Service):** Python 3.12 + FastAPI. **Strictly** for running the AI Agent logic.
- **BaaS:** Firebase (Authentication, Firestore, Storage).
- **Data Flow:**
  - User Auth & Content Data → Direct connection from Frontend to Firebase.
  - Chat Requests → Frontend calls Python API (`POST /agent`).
  - **Rule:** Do not route media or auth traffic through the Python backend.

### II. Technology Stack
#### Frontend
- **Framework:** Next.js 16 (App Router), React 19.
- **Styling:** Tailwind CSS (Structure) + Framer Motion (Animations).
- **Data:** Firebase SDK for Web.
- **State:** React Hooks.

#### Backend (AI Agent)
- **Runtime:** Python 3.12+.
- **Framework:** FastAPI + Uvicorn.
- **Dependency Manager:** `uv`.
- **AI SDK:** `openai-agents` (Custom Python implementation).

### III. Coding Standards
#### TypeScript (Frontend)
- Use strict TypeScript interfaces for all data (Firestore docs, API responses).
- Use Functional Components.
- Abstract Firebase logic into `src/lib/firebase.ts`. Do not put SDK initialization in UI components.

#### Python (Backend)
- Use strict Type Hints.
- Use `Pydantic` models for request/response validation.
- Follow PEP 8 style.
- **File Structure:** Keep logic modular (e.g., `src/backend/agent.py`, `src/backend/api.py`). Avoid monolithic `main.py`.

### IV. Specific Implementation Rules
- **Media:** All images/videos use Lazy Loading. Videos must be muted/autoplay on hover.
- **Auth:** Python endpoints must verify the Firebase ID Token in the header before processing.
- **Error Handling:**
  - If Python API fails → Frontend shows "AI Offline" fallback.
  - If Media fails → Show placeholder image.
- **Testing:**
  - Write tests for the Python Agent logic using `pytest`.
  - Ensure the Frontend builds without TypeScript errors.

## Governance
This Constitution is the single source of truth for project-level architectural and development standards. All code, PRs, and architectural decisions must comply with these principles. Amendments require a documented proposal, team consensus, and an update to this file, incrementing the version number according to SemVer.

**Version**: 1.0.0 | **Ratified**: 2025-11-20 | **Last Amended**: 2025-11-20