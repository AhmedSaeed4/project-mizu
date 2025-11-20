# Research for 001-portfolio-spec

## Decision: Data Fetching Strategy for Firestore in Next.js

-   **Question**: Should we use `swr` or `react-query` for fetching Firestore data, or stick to native `useEffect`/Server Components?

-   **Rationale**: Given the Next.js App Router context and the emphasis on performance, Server Components are the preferred approach for initial data fetching and rendering where possible. For client-side interactions requiring real-time updates or mutations, `swr` or `react-query` offer excellent caching, revalidation, and state management capabilities. `swr` is often a lighter-weight option and integrates well with Next.js due to its focus on data fetching. `react-query` (TanStack Query) provides more advanced features like mutations, optimistic updates, and query invalidation, which might be beneficial for complex client-side interactions or when dealing with a larger scale of data management.

-   **Alternatives considered**:
    -   **Native `useEffect`/Server Components**: Server Components will be used for initial data fetching. `useEffect` is suitable for simple client-side fetches that don't require advanced caching or revalidation.
    -   **`swr`**: Good for client-side data fetching, revalidation, and caching. Lighter than `react-query`.
    -   **`react-query`**: More comprehensive data fetching library with advanced features like mutations, optimistic updates, and query invalidation. Potentially overkill for simpler needs.

-   **Decision**:
    -   Utilize **Next.js Server Components** for initial data fetching from Firestore, especially for static or rarely changing content on pages like the home page (`/`).
    -   For client-side data fetching that requires frequent updates, caching, or mutations (e.g., asset library interactions, real-time updates on project details), implement **`swr`**. This provides a good balance of features, performance, and integrates well with React Hooks.

---

## Decision: `openai-agents` Class Structure for Python Implementation

-   **Question**: Confirm the specific `openai-agents` class structure for a custom Python implementation.

-   **Rationale**: The user has specified using `openai-agents` for the Python FastAPI backend. The `AIAgent` class in `backend/agentic_code/your_ai_agent.py` already provides a basic structure using `Agent`, `OpenAIChatCompletionsModel`, and `Runner` from the `agents` library. This structure is a good starting point. The goal is to extend this to incorporate specific brand information and handle incoming chat messages.

-   **Alternatives considered**: None, as `openai-agents` is explicitly required.

-   **Decision**:
    -   The `AIAgent` class in `backend/agentic_code/your_ai_agent.py` will be used as the foundation.
    -   It will be enhanced to:
        -   Load the `system_prompt` dynamically (e.g., from a configuration file or environment variable) to include hardcoded brand context (bio, tools, rules).
        -   Accept `message` and optionally `userId` for processing.
        -   Utilize the `Runner.run` method to interact with the `main_agent`.
        -   Ensure error handling and logging are in place.
        -   The `example_tool` will be replaced with actual tools relevant to the portfolio (if any are identified during later phases, e.g., to query project data).