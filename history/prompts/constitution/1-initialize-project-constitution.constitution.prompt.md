---
id: 1
title: Initialize Project Constitution
stage: constitution
date: 2025-11-20
surface: agent
model: gemini-2.5-flash
feature: none
branch: main
user: unknown
command: /sp.constitution
labels: [constitution, project-setup]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - .specify/templates/plan-template.md
tests:
 - none
---

## Prompt

/sp.constitution 

# Project Constitution

## 1. Project Architecture & Scope
- **Frontend:** Next.js 16 (App Router) + TypeScript. Handles UI, Routing, and Firebase interactions.
- **Backend (AI Service):** Python 3.12 + FastAPI. **Strictly** for running the AI Agent logic.
- **BaaS:** Firebase (Authentication, Firestore, Storage).
- **Data Flow:**
  - User Auth & Content Data → Direct connection from Frontend to Firebase.
  - Chat Requests → Frontend calls Python API (`POST /agent`).
  - **Rule:** Do not route media or auth traffic through the Python backend.

## 2. Technology Stack
### Frontend
- **Framework:** Next.js 16 (App Router), React 19.
- **Styling:** Tailwind CSS (Structure) + Framer Motion (Animations).
- **Data:** Firebase SDK for Web.
- **State:** React Hooks.

### Backend (AI Agent)
- **Runtime:** Python 3.12+.
- **Framework:** FastAPI + Uvicorn.
- **Dependency Manager:** `uv`.
- **AI SDK:** `openai-agents` (Custom Python implementation).

## 3. Coding Standards
### TypeScript (Frontend)
- Use strict TypeScript interfaces for all data (Firestore docs, API responses).
- Use Functional Components.
- Abstract Firebase logic into `src/lib/firebase.ts`. Do not put SDK initialization in UI components.

### Python (Backend)
- Use strict Type Hints.
- Use `Pydantic` models for request/response validation.
- Follow PEP 8 style.
- **File Structure:** Keep logic modular (e.g., `src/backend/agent.py`, `src/backend/api.py`). Avoid monolithic `main.py`.

## 4. Specific Implementation Rules
- **Media:** All images/videos use Lazy Loading. Videos must be muted/autoplay on hover.
- **Auth:** Python endpoints must verify the Firebase ID Token in the header before processing.
- **Error Handling:**
  - If Python API fails → Frontend shows "AI Offline" fallback.
  - If Media fails → Show placeholder image.
- **Testing:**
  - Write tests for the Python Agent logic using `pytest`.
  - Ensure the Frontend builds without TypeScript errors.

## Response snapshot

I've updated the project constitution to version 1.0.0, establishing the initial set of guiding principles.

- Wrote the new constitution to `.specify/memory/constitution.md`.
- Updated the "Constitution Check" in `.specify/templates/plan-template.md` to align with the new principles.
- No other files required changes.

Suggested commit message:
`docs: initialize project constitution v1.0.0`

## Outcome

- ✅ Impact: The project constitution was created and dependent files were updated.
- 🧪 Tests: none
- 📁 Files: .specify/memory/constitution.md, .specify/templates/plan-template.md
- 🔁 Next prompts: none
- 🧠 Reflection: The initial shell command to create the PHR failed because `bash` is not available on Windows. The fallback to manual creation worked as expected.

## Evaluation notes (flywheel)

- Failure modes observed: `create-phr.sh` script failed due to missing `bash` on Windows.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Use a powershell script for PHR creation on Windows.
