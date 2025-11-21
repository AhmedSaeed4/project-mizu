# Tasks: Main Website Portfolio

**Input**: Design documents from `/specs/001-portfolio-spec/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize backend (FastAPI) project in `backend/`
- [ ] T002 Initialize frontend (Next.js) project in `frontend/`
- [ ] T003 [P] Configure Python 3.12+ and `uv` for backend in `backend/`
- [ ] T004 [P] Configure TypeScript 5+ for frontend in `frontend/`
- [ ] T005 [P] Setup `pytest` for backend unit/integration tests in `backend/tests/`
- [ ] T006 [P] Setup Jest/React Testing Library for frontend component tests in `frontend/tests/`
- [ ] T007 [P] Setup Playwright for E2E tests in `e2e/tests/`
- [ ] T008 Configure Tailwind CSS for frontend in `frontend/tailwind.config.ts` and `frontend/app/globals.css`
- [ ] T009 Install Firebase CLI and dependencies for project

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T010 Define base Pydantic models for `Project`, `Asset`, `User` in `backend/src/models/`
- [ ] T011 Define TypeScript interfaces for `Project`, `Asset`, `User` in `frontend/src/types/`
- [ ] T012 Implement Firebase Admin SDK initialization in `backend/src/firebase_admin.py`
- [ ] T013 Implement Firebase client-side SDK initialization in `frontend/src/lib/firebase.ts`
- [ ] T014 Configure FastAPI CORS to allow requests from frontend URL (`localhost:3000`) in `backend/src/main.py`
- [ ] T015 Create basic API router structure for backend in `backend/src/api/`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Portfolio Home Page (Main Showcase) (Priority: P1) 🎯 MVP

**Goal**: Display hero, project cards from Firestore, GIF on hover from Storage, navigate to details.

**Independent Test**: Can be fully tested by navigating to the home page, scrolling, hovering over project cards, and clicking a card.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T016 [P] [US1] Backend unit test for Firestore `projects` collection fetch logic in `backend/tests/unit/test_project_service.py`
- [ ] T017 [P] [US1] Frontend component test for `ProjectCard` rendering in `frontend/tests/components/ProjectCard.test.tsx`
- [ ] T018 [P] [US1] Frontend E2E test for home page load, card display, and hover effect in `e2e/tests/home_page.spec.ts`

### Implementation for User Story 1

- [ ] T019 [US1] Implement service to fetch `projects` from Firestore in `backend/src/services/project_service.py`
- [ ] T020 [P] [US1] Create `ProjectCard` component in `frontend/src/components/ProjectCard.tsx`
- [ ] T021 [P] [US1] Create `Hero` section component in `frontend/src/components/Hero.tsx`
- [ ] T022 [US1] Implement Project Grid layout in `frontend/app/page.tsx`
- [ ] T023 [US1] Implement hover effect (thumbnail to GIF) for `ProjectCard` in `frontend/src/components/ProjectCard.tsx`
- [ ] T024 [US1] Implement navigation to `/projects/[id]` on card click in `frontend/src/components/ProjectCard.tsx`
- [ ] T025 [US1] Integrate `Hero` and `ProjectCard` components into `frontend/app/page.tsx` with data from backend service.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Project Details Page (Dynamic) (Priority: P1)

**Goal**: Display project details, WebM video from Storage, image gallery, 404 for invalid ID.

**Independent Test**: Can be fully tested by directly navigating to a project details URL (`/projects/[id]`) and verifying content and media playback.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T026 [P] [US2] Backend unit test for Firestore single project fetch logic in `backend/tests/unit/test_project_service.py`
- [ ] T027 [P] [US2] Frontend component test for `ProjectDetails` rendering in `frontend/tests/components/ProjectDetails.test.tsx`
- [ ] T028 [P] [US2] Frontend E2E test for project details page load, video playback, and 404 handling in `e2e/tests/project_details.spec.ts`

### Implementation for User Story 2

- [ ] T029 [US2] Implement service to fetch single project by ID from Firestore in `backend/src/services/project_service.py`
- [ ] T030 [P] [US2] Implement dynamic route `frontend/app/projects/[id]/page.tsx`
- [ ] T031 [P] [US2] Create `ProjectDetails` component to display title, description, client, tools in `frontend/src/components/ProjectDetails.tsx`
- [ ] T032 [US2] Implement custom HTML5 video player for WebM in `frontend/src/components/WebMVideoPlayer.tsx`
- [ ] T033 [US2] Implement image gallery for `stillRenders` in `frontend/src/components/ImageGallery.tsx`
- [ ] T034 [US2] Implement custom 404 page for invalid project IDs in `frontend/app/not-found.tsx`
- [ ] T035 [US2] Integrate `ProjectDetails`, `WebMVideoPlayer`, and `ImageGallery` into `frontend/app/projects/[id]/page.tsx` with data from backend service.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Asset & Tools Library (Priority: P2)

**Goal**: Browse assets, download gated by Firebase Auth (Google Sign-In), download from Storage.

**Independent Test**: Can be tested by visiting the Asset & Tools Library, attempting to download as a guest, logging in with Google, and then downloading.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T036 [P] [US3] Frontend component test for `AssetCard` rendering and download button state in `frontend/tests/components/AssetCard.test.tsx`
- [ ] T037 [P] [US3] Frontend E2E test for Google Sign-In flow and asset download in `e2e/tests/asset_library.spec.ts`

### Implementation for User Story 3

- [ ] T038 [P] [US3] Implement Google Sign-In with Firebase Auth in `frontend/src/lib/auth.ts`
- [ ] T039 [P] [US3] Create `AssetCard` component in `frontend/src/components/AssetCard.tsx`
- [ ] T040 [P] [US3] Implement Asset Grid layout in `frontend/app/library/page.tsx`
- [ ] T041 [US3] Implement download button gating based on authentication status in `frontend/src/components/AssetCard.tsx`
- [ ] T042 [US3] Implement file download logic from Firebase Storage in `frontend/src/lib/storage.ts`
- [ ] T043 [US3] Integrate `AssetCard` components into `frontend/app/library/page.tsx` with data (placeholder or from Firestore if implemented).

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - AI Agent Interface ("The Brain") (Priority: P2)

**Goal**: Chat page, send text to Python Backend (`POST /agent`), Backend uses Gemini, display AI response, "Thinking..." animation.

**Independent Test**: Can be tested by navigating to the Chat Page, sending a message, and observing the "Thinking..." animation and the AI's response.

### Tests for User Story 4 (OPTIONAL - only if tests requested) ⚠️

- [ ] T044 [P] [US4] Backend unit test for `POST /agent` endpoint logic (prompt construction, Gemini call) in `backend/tests/unit/test_agent_api.py`
- [ ] T045 [P] [US4] Frontend component test for `ChatbotUI` rendering and message sending in `frontend/tests/components/ChatbotUI.test.tsx`
- [ ] T046 [P] [US4] Frontend E2E test for chat interaction and AI response display in `e2e/tests/chatbot.spec.ts`

### Implementation for User Story 4

- [X] T047 [P] [US4] Implement `POST /agent` endpoint in `backend/src/api/agent.py`
- [X] T048 [P] [US4] Implement prompt construction with hardcoded system context in `backend/src/services/agent_service.py`
- [X] T049 [US4] Integrate Gemini API (using `openai-agents` or direct SDK) in `backend/src/services/agent_service.py`
- [ ] T050 [P] [US4] Create `ChatbotUI` component in `frontend/src/components/ChatbotUI.tsx`
- [ ] T051 [US4] Implement "Thinking..." animation in `frontend/src/components/ChatbotUI.tsx`
- [X] T052 [US4] Implement API call to `backend/api/agent` from frontend in `frontend/src/lib/agent_api.ts`
- [X] T053 [US4] Integrate `ChatbotUI` into `frontend/app/chat/page.tsx` and display AI responses.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T054 [P] Overall responsiveness and accessibility review and adjustments across all frontend components
- [ ] T055 [P] Image optimization and lazy loading for all images (thumbnails, still renders)
- [ ] T056 Implement centralized error handling and logging for both frontend and backend
- [ ] T057 Code cleanup, refactoring, and adherence to established coding standards
- [ ] T058 Finalize deployment configurations for Firebase Hosting and FastAPI backend (e.g., Cloud Run, Vercel)
- [ ] T059 Run quickstart.md validation (if a `quickstart.md` exists)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models/types before services
- Services before endpoints/components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models/types within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Backend unit test for Firestore `projects` collection fetch logic in `backend/tests/unit/test_project_service.py`"
Task: "Frontend component test for `ProjectCard` rendering in `frontend/tests/components/ProjectCard.test.tsx`"
Task: "Frontend E2E test for home page load, card display, and hover effect in `e2e/tests/home_page.spec.ts`"

# Launch all models/components for User Story 1 together:
Task: "Create `ProjectCard` component in `frontend/src/components/ProjectCard.tsx`"
Task: "Create `Hero` section component in `frontend/src/components/Hero.tsx`"
```

---

## Implementation Strategy

Prefer CLI automations whenever possible. Utilize MCP servers (Firebase MCP, Next.js MCP, GitHub MCP) as needed for enhanced development workflows.

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
