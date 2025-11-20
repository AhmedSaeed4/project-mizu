---
id: 4
title: Create Implementation Plan for Personal Brand Portfolio
stage: plan
date: 2025-11-20
surface: agent
model: gemini-2.5-flash
feature: 001-portfolio-spec
branch: 001-portfolio-spec
user: [USER]
command: /sp.plan
labels: [implementation, plan, portfolio, fastapi, nextjs, firebase]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-portfolio-spec/plan.md
  - specs/001-portfolio-spec/research.md
  - specs/001-portfolio-spec/data-model.md
  - specs/001-portfolio-spec/contracts/agent-api.yaml
  - specs/001-portfolio-spec/quickstart.md
tests: []
---

## Prompt

description: Execute the implementation planning workflow using the plan template to generate design artifacts.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Setup**: Run `.specify/scripts/powershell/setup-plan.ps1 -Json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load context**: Read FEATURE_SPEC and `.specify/memory/constitution.md`. Load IMPL_PLAN template (already copied).

3. **Execute plan workflow**: Follow the structure in IMPL_PLAN template to:
   - Fill Technical Context (mark unknowns as "NEEDS CLARIFICATION")
   - Fill Constitution Check section from constitution
   - Evaluate gates (ERROR if violations unjustified)
   - Phase 0: Generate research.md (resolve all NEEDS CLARIFICATION)
   - Phase 1: Generate data-model.md, contracts/, quickstart.md
   - Phase 1: Update agent context by running the agent script
   - Re-evaluate Constitution Check post-design

4. **Stop and report**: Command ends after Phase 2 planning. Report branch, IMPL_PLAN path, and generated artifacts.

## Phases

### Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```text
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

### Phase 1: Design & Contracts

**Prerequisites:** `research.md` complete

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Agent context update**:
   - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType gemini`
   - These scripts detect which AI agent is in use
   - Update the appropriate agent-specific context file
   - Add only new technology from current plan
   - Preserve manual additions between markers

**Output**: data-model.md, /contracts/*, quickstart.md, agent-specific file

## Key rules

- Use absolute paths
- ERROR on gate failures or unresolved clarifications

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.plan

**Context:**
We are building a high-performance Personal Brand Portfolio (Next.js/TypeScript) connected to a Firebase Backend-as-a-Service (Data/Media) and a specialized Python FastAPI Backend (AI Agent).

**Create a Step-by-Step Implementation Plan containing:**

1.  **Architecture Blueprint:**
    *   Define the data flow: Frontend → Firebase (Media/Content) vs. Frontend → Python (AI Chat).
    *   Define the Directory Structure for the monorepo-style setup (`/frontend`, `/backend`).

2.  **Data & Interface Specifications:**
    *   **Firestore Schema:** JSON structure for the `projects` collection (including `gifUrl`, `videoUrl`, `tools` array).
    *   **TypeScript Interfaces:** Strong types mirroring the Firestore schema and the AI API responses.
    *   **API Contract:** The exact JSON payload for the `POST /agent` endpoint (Next.js -> FastAPI).

3.  **Implementation Phases:**
    *   *Phase 1:* Next.js Setup, UI Skeleton, and Firebase Connection (Read-only).
    *   *Phase 2:* The "Brain" - Python FastAPI setup, `openai-agents` integration, and local testing.
    *   *Phase 3:* Integration - Connecting the Chat UI to the Python API.
    *   *Phase 4:* Auth & Asset Downloads (Firebase Auth + Storage Rules).

4.  **Testing Strategy:**
    *   **Backend:** `pytest` strategy for the Agent logic (mocking the LLM).
    *   **Frontend:** Verification steps for Media Loading (GIF vs WebM) and Routing.

**Technical Constraints:**
*   **Python:** Use Python 3.12+ with Type Hints (`str | None` syntax) and Pydantic for validation.
*   **Frontend:** Use Functional React Components, Tailwind CSS, and Framer Motion.
*   **Media Rule:** Explicitly note that video streams must come from Firebase Storage, NEVER routed through the Python API.
*   **Code Style:** Follow the "Constitution" rules defined previously (Strict Typing, Component modularity).

**Decisions Needing Output:**
*   Should we use `swr` or `react-query` for fetching Firestore data, or stick to native `useEffect`/Server Components?
*   Confirm the specific `openai-agents` class structure for a custom Python implementation.

## Response snapshot

The agent successfully generated a comprehensive implementation plan for the Personal Brand Portfolio project. This involved:
- Populating the `plan.md` file with detailed technical context.
- Performing a `Constitution Check` and confirming adherence to project principles.
- Conducting research and documenting decisions in `research.md` regarding Firestore data fetching strategy and `openai-agents` class structure.
- Defining the data models for `Project`, `Asset`, and `User` in `data-model.md`.
- Creating an OpenAPI specification for the `POST /agent` endpoint in `contracts/agent-api.yaml`.
- Generating a `quickstart.md` guide for project setup.
- Updating the agent's context to reflect the new technical details.

## Outcome

- ✅ Impact: A detailed implementation plan for the Personal Brand Portfolio has been created, covering architecture, data, APIs, implementation phases, and testing strategy. Research decisions have been documented, and project setup instructions are available.
- 🧪 Tests: No explicit tests were run as part of the planning phase, but the plan includes a testing strategy.
- 📁 Files:
    - `specs/001-portfolio-spec/plan.md`
    - `specs/001-portfolio-spec/research.md`
    - `specs/001-portfolio-spec/data-model.md`
    - `specs/001-portfolio-spec/contracts/agent-api.yaml`
    - `specs/001-portfolio-spec/quickstart.md`
- 🔁 Next prompts: The user will likely proceed with implementation tasks based on this plan.
- 🧠 Reflection: The process was smooth, and all required artifacts were generated. The manual PHR creation was necessary due to script execution issues.

## Evaluation notes (flywheel)

- Failure modes observed: PowerShell script execution from `run_shell_command` with relative paths/simple commands. Resolved by manual PHR creation.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Investigate the PowerShell script execution issue for `run_shell_command` more thoroughly for future automation.
