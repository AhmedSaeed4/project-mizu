# Feature Specification: Main Website Portfolio

**Feature Branch**: `001-portfolio-spec`
**Created**: 2025-11-20
**Status**: Draft
**Input**: User description: "# Project Specifications ## 1. Portfolio Home Page (Main Showcase) **User Journeys:** - User lands on the page and sees a high-impact "Hero" section (Personal Branding). - User scrolls through a Grid of Project Cards fetched from **Firebase Firestore**. - **Interaction:** When hovering over a project card, the thumbnail swaps to a **GIF preview** (hosted on Firebase Storage). - User clicks a card to navigate to the Dynamic Details Page. **Acceptance Criteria:** - **Data Source:** Query Firestore collection `projects` for fields: `title`, `thumbnailUrl`, `gifUrl`, `id`, `category`. - **Performance:** GIFs must be optimized/sized correctly. Use Next.js `<Image>` component where possible or optimized `<img>` tags for GIFs. - **Layout:** Responsive Grid (1 column mobile, 2 tablet, 3 desktop). - **Animation:** Smooth transition when hovering (thumbnail -> GIF). ## 2. Project Details Page (Dynamic) **User Journeys:** - User arrives via `/projects/[id]`. - User views the full Project Title, Description, Client, and Tools Used. - User watches the **High-Resolution WebM** video (hosted on Firebase Storage). - User can view a gallery of still renders (images) below the video. **Acceptance Criteria:** - **Routing:** Next.js Dynamic Route: `app/projects/[id]/page.tsx`. - **Data Fetching:** Fetch single document from Firestore using the `id` param. - **Media Player:** Custom HTML5 Video Player for WebM files. Must support Play/Pause, Volume, and Fullscreen. - **Error State:** If `id` is invalid, show a custom 404 component ("Project Not Found"). ## 3. Asset & Tools Library **User Journeys:** - User browses free/premium assets (Blender Scripts, AE Plugins, Project Files). - **Gating:** "Download" buttons are disabled or hidden for guests. - User logs in via **Google Sign-In** (Firebase Auth). - Authenticated User clicks "Download" and receives the file from Firebase Storage. **Acceptance Criteria:** - **Authentication:** Firebase Auth (Google Provider) integration. - **State:** UI updates immediately upon login to unlock download buttons. - **Security:** Ensure download links are valid Firebase Storage references. ## 4. AI Agent Interface ("The Brain") **User Journeys:** - User opens the Chat Page. - User asks about the brand (e.g., "Do you use Cinema 4D?"). - **Processing:** 1. Frontend sends text to Python Backend (`POST /agent`). 2. Python Backend constructs a prompt with **Hardcoded Context** (System Message containing your bio, tools, and rules). 3. Agent generates response via Gemini. - User receives the text response. **Acceptance Criteria:** - **Context Strategy:** The Python code will contain a `system_prompt` string variable with all necessary brand info (Bio, Skills, Rates, etc.). No database lookup for this version. - **API Contract:** - Input: `{"text": "string", "userId": "string (optional)"}` - Output: `{"response": "string"}` - **Latency:** Show a "Thinking..." animation while waiting for the API. ## 5. Technical & Non-Functional Requirements - **Frontend (Next.js):** - Use **TypeScript** for all components and Firestore data models. - **Tailwind CSS** for styling. - **Framer Motion** for page transitions. - **Backend (Python):** - **FastAPI** framework. - **Pydantic** models for API request/response validation. - **CORS:** Allow requests only from the Frontend URL (or `localhost:3000`). - **Media Handling:** - Home Page: GIFs (Lazy loaded). - Details Page: WebM (High Res). - **Admin:** None required for this project (content managed via Firebase Console). ## 6. Success Metrics - **Visuals:** Animations run at 60fps; GIFs load without layout shift (CLS). - **Reliability:** Python API successfully handles valid requests and returns readable errors for invalid ones. - **Type Safety:** `npm run build` passes with zero TypeScript errors."

## User Scenarios & Testing

### User Story 1 - Portfolio Home Page (Main Showcase) (Priority: P1)

User lands on the page and sees a high-impact "Hero" section. User scrolls through a Grid of Project Cards fetched from Firebase Firestore. When hovering over a project card, the thumbnail swaps to a GIF preview (hosted on Firebase Storage). User clicks a card to navigate to the Dynamic Details Page.

**Why this priority**: This is the primary entry point and showcases the user's work, crucial for initial engagement.

**Independent Test**: Can be fully tested by navigating to the home page, scrolling, hovering over project cards, and clicking a card.

**Acceptance Scenarios**:

1.  **Given** a user navigates to the home page, **When** the page loads, **Then** a "Hero" section is prominently displayed and a grid of project cards is visible.
2.  **Given** a user hovers over a project card, **When** the hover event occurs, **Then** the project thumbnail is replaced by a GIF preview.
3.  **Given** a user clicks on a project card, **When** the card is clicked, **Then** the user is navigated to the Project Details Page for that project.

---

### User Story 2 - Project Details Page (Dynamic) (Priority: P1)

User arrives via `/projects/[id]`. User views the full Project Title, Description, Client, and Tools Used. User watches the High-Resolution WebM video (hosted on Firebase Storage). User can view a gallery of still renders (images) below the video.

**Why this priority**: Provides in-depth information about individual projects, essential for a portfolio.

**Independent Test**: Can be fully tested by directly navigating to a project details URL (`/projects/[id]`) and verifying content and media playback.

**Acceptance Scenarios**:

1.  **Given** a user navigates to `/projects/[id]` with a valid ID, **When** the page loads, **Then** the project's title, description, client, tools, a WebM video, and an image gallery are displayed.
2.  **Given** a user is on the Project Details Page, **When** they interact with the WebM video player, **Then** they can play/pause, adjust volume, and enter/exit fullscreen.
3.  **Given** a user navigates to `/projects/[id]` with an invalid ID, **When** the page loads, **Then** a custom "Project Not Found" 404 component is displayed.

---

### User Story 3 - Asset & Tools Library (Priority: P2)

User browses free/premium assets. "Download" buttons are disabled or hidden for guests. User logs in via Google Sign-In (Firebase Auth). Authenticated User clicks "Download" and receives the file from Firebase Storage.

**Why this priority**: Adds value by providing additional resources, but relies on core portfolio functionality.

**Independent Test**: Can be tested by visiting the Asset & Tools Library, attempting to download as a guest, logging in with Google, and then downloading.

**Acceptance Scenarios**:

1.  **Given** a guest user is on the Asset & Tools Library page, **When** they view download buttons, **Then** the buttons are disabled or hidden.
2.  **Given** a guest user logs in via Google Sign-In, **When** authentication is successful, **Then** the UI updates to show download buttons enabled.
3.  **Given** an authenticated user clicks a download button, **When** the button is clicked, **Then** the corresponding file is downloaded from Firebase Storage.

---

### User Story 4 - AI Agent Interface ("The Brain") (Priority: P2)

User opens the Chat Page. User asks about the brand. Frontend sends text to Python Backend via `POST /agent` with `{"text": "string", "userId": "string (optional)"}`. Python Backend constructs a prompt with Hardcoded Context. Agent generates response via Gemini. User receives the text response. A "Thinking..." animation is shown while waiting for the API.

**Why this priority**: Provides an interactive element but is not core to the initial portfolio display.

**Independent Test**: Can be tested by navigating to the Chat Page, sending a message, and observing the "Thinking..." animation and the AI's response.

**Acceptance Scenarios**:

1.  **Given** a user opens the Chat Page, **When** they type and send a message, **Then** a "Thinking..." animation is displayed.
2.  **Given** a user sends a message, **When** the backend processes the request and receives a response from Gemini, **Then** the AI's text response is displayed to the user.

---

### Edge Cases

- What happens if a project GIF/WebM URL is broken or missing? (Fallback to placeholder or error message)
- How does the system handle very large numbers of project cards? (Pagination or infinite scroll)
- What happens if Firebase services (Firestore, Storage, Auth) are temporarily unavailable? (Graceful degradation, user-friendly error messages)
- What if the AI agent's response is inappropriate or empty? (Error handling, retry logic)

## Requirements

### Functional Requirements

- **FR-001**: System MUST display a "Hero" section and a responsive grid of project cards on the home page.
- **FR-002**: System MUST fetch project data (`title`, `thumbnailUrl`, `gifUrl`, `id`, `category`) from Firebase Firestore `projects` collection for the home page.
- **FR-003**: System MUST swap project thumbnails to GIF previews on hover, using GIFs from Firebase Storage.
- **FR-004**: System MUST navigate users to a dynamic project details page (`/projects/[id]`) when a project card is clicked.
- **FR-005**: System MUST display full project details (Title, Description, Client, Tools Used) on the project details page.
- **FR-006**: System MUST play high-resolution WebM videos from Firebase Storage on the project details page using a custom HTML5 video player with play/pause, volume, and fullscreen controls.
- **FR-007**: System MUST display a gallery of still renders (images) below the video on the project details page.
- **FR-008**: System MUST display a custom "Project Not Found" 404 component if an invalid project `id` is provided.
- **FR-009**: System MUST allow users to browse free/premium assets in an "Asset & Tools Library".
- **FR-010**: System MUST disable or hide "Download" buttons for unauthenticated (guest) users in the "Asset & Tools Library".
- **FR-011**: System MUST integrate Google Sign-In via Firebase Auth for user authentication.
- **FR-012**: System MUST enable "Download" buttons for authenticated users in the "Asset & Tools Library" and facilitate file downloads from Firebase Storage.
- **FR-013**: System MUST provide an AI Agent Interface (Chat Page) where users can ask questions.
- **FR-014**: Frontend MUST send user queries to a Python Backend via `POST /agent` with `{"text": "string", "userId": "string (optional)"}`.
- **FR-015**: Python Backend MUST construct a prompt with hardcoded system context (bio, tools, rules) and generate a response using Gemini.
- **FR-016**: Frontend MUST display a "Thinking..." animation while waiting for the AI Agent's response.
- **FR-017**: Python Backend MUST use FastAPI framework and Pydantic models for API request/response validation.
- **FR-018**: Python Backend MUST configure CORS to allow requests only from the Frontend URL (or `localhost:3000`).
- **FR-019**: GIFs on the Home Page MUST be optimized and lazy-loaded.
- **FR-020**: The Python backend's `system_prompt` string variable MUST contain all necessary brand information (Bio, Skills, Rates).
- **FR-021**: Frontend MUST use TypeScript, Tailwind CSS, and Framer Motion.

### Key Entities

-   **Project**: Represents a portfolio project. Attributes: `title`, `thumbnailUrl`, `gifUrl`, `id`, `category`, `description`, `client`, `toolsUsed`, `webmVideoUrl`, `stillRenders` (array of image URLs).
-   **Asset**: Represents a downloadable item in the library. Attributes: `name`, `type` (free/premium), `downloadUrl` (Firebase Storage reference).
-   **User**: Represents an authenticated user. Attributes: `id`, `email`, `displayName`.

## Success Criteria

### Measurable Outcomes

-   **SC-001**: Portfolio Home Page loads within 3 seconds on a standard broadband connection.
-   **SC-002**: GIF previews on project card hover animate smoothly at 60fps without layout shifts.
-   **SC-003**: High-resolution WebM videos play without buffering delays on project details pages.
-   **SC-004**: Users can successfully log in via Google Sign-In within 5 seconds.
-   **SC-005**: Authenticated users can download assets from the library reliably.
-   **SC-006**: AI Agent responds to user queries within 10 seconds.
-   **SC-007**: The Python API handles valid requests with a success rate of 99% and provides clear error messages for invalid requests.
-   **SC-008**: The entire application compiles with zero TypeScript errors.