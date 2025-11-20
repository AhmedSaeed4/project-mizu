# Quickstart Guide for Personal Brand Portfolio

This guide provides instructions to set up and run the Personal Brand Portfolio project locally.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Git**: For cloning the repository.
-   **Node.js** (v18 or higher) and **npm** (v9 or higher) or **Yarn** (v1 or higher) or **pnpm विस्तारासाठी येथे क्लिक करा.)
-   **Python** (v3.12 or higher): For the FastAPI backend.
-   **uv**: Python package manager (install with `pip install uv`).
-   **Firebase Project**: A Firebase project with Firestore, Firebase Storage, and Firebase Authentication (Google Sign-In) enabled.
-   **Firebase CLI**: For interacting with your Firebase project (install with `npm install -g firebase-tools`).
-   **Gemini API Key**: An API key for the Gemini model, configured for the `openai-agents` library.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd main-website
```

### 2. Firebase Configuration

1.  **Create `firebase-config.json`**: In the `frontend` directory, create a file named `firebase-config.json` with your Firebase project's configuration. You can find this in your Firebase project settings -> "General" -> "Your apps" -> "Config".

    ```json
    {
      "apiKey": "YOUR_API_KEY",
      "authDomain": "YOUR_AUTH_DOMAIN",
      "projectId": "YOUR_PROJECT_ID",
      "storageBucket": "YOUR_STORAGE_BUCKET",
      "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
      "appId": "YOUR_APP_ID",
      "measurementId": "YOUR_MEASUREMENT_ID"
    }
    ```

2.  **Firebase Security Rules**: Configure Firestore and Storage security rules in your Firebase project to allow read access for projects and assets, and write access for authenticated users where necessary (e.g., uploading assets).

### 3. Frontend Setup (Next.js)

Navigate to the `frontend` directory and install dependencies:

```bash
cd frontend
npm install # or yarn install or pnpm install
```

### 4. Backend Setup (FastAPI)

Navigate to the `backend` directory and install dependencies using `uv`:

```bash
cd backend
uv sync
```

### 5. Environment Variables for Backend

In the `backend` directory, create a `.env` file with the following:

```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
# Optional: If you need to restrict CORS to a specific frontend URL other than localhost
FRONTEND_URL=http://localhost:3000
```

### 6. Run the Application

#### Start Backend (FastAPI)

In the `backend` directory, run the FastAPI application:

```bash
uvicorn src.backend.main:app --reload
```

The backend will typically run on `http://localhost:8000`.

#### Start Frontend (Next.js)

In the `frontend` directory, run the Next.js development server:

```bash
npm run dev # or yarn dev or pnpm dev
```

The frontend will typically run on `http://localhost:3000`.

### 7. Access the Application

Open your browser and navigate to `http://localhost:3000` to view the Personal Brand Portfolio.
