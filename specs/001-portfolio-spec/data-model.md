# Data Model for 001-portfolio-spec

## 1. Project

Represents a portfolio project displayed on the home page and its details page. Stored in Firebase Firestore in the `projects` collection.

**Firestore Collection**: `projects`

**JSON Structure (Example Document)**:

```json
{
  "id": "uniqueProjectId123",
  "title": "Innovative 3D Animation Project",
  "category": "3D Design",
  "thumbnailUrl": "https://firebasestorage.googleapis.com/v0/b/your-bucket.appspot.com/o/projects%2Fproj1_thumb.jpg?alt=media",
  "gifUrl": "https://firebasestorage.googleapis.com/v0/b/your-bucket.appspot.com/o/projects%2Fproj1_preview.gif?alt=media",
  "description": "A detailed description of the project, including challenges, solutions, and creative process.",
  "client": "Client Company Name",
  "toolsUsed": [
    "Blender",
    "Substance Painter",
    "After Effects"
  ],
  "webmVideoUrl": "https://firebasestorage.googleapis.com/v0/b/your-bucket.appspot.com/o/projects%2Fproj1_final.webm?alt=media",
  "stillRenders": [
    "https://firebasestorage.googleapis.com/v0/b/your-bucket.appspot.com/o/projects%2Fproj1_render1.jpg?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/your-bucket.appspot.com/o/projects%2Fproj1_render2.jpg?alt=media"
  ]
}
```

**Fields**:

-   `id`: `string` (Unique identifier, Firestore Document ID)
-   `title`: `string` (Project title)
-   `category`: `string` (e.g., "3D Design", "Motion Graphics", "Web Development")
-   `thumbnailUrl`: `string` (URL to a static image thumbnail, Firebase Storage)
-   `gifUrl`: `string` (URL to a GIF preview, Firebase Storage, shown on hover)
-   `description`: `string` (Detailed project description)
-   `client`: `string` (Client name, optional)
-   `toolsUsed`: `string[]` (Array of tools/software used, e.g., ["Blender", "Framer Motion"])
-   `webmVideoUrl`: `string` (URL to the high-resolution WebM video, Firebase Storage)
-   `stillRenders`: `string[]` (Array of URLs to still render images, Firebase Storage)

---

## 2. Asset

Represents a downloadable asset in the Asset & Tools Library. Stored in Firebase Firestore in the `assets` collection (implied, not explicitly stated in spec but a logical choice for metadata).

**Firestore Collection**: `assets`

**JSON Structure (Example Document)**:

```json
{
  "id": "uniqueAssetId456",
  "name": "Blender Geometry Nodes Pack",
  "description": "A collection of reusable Blender Geometry Nodes for procedural generation.",
  "type": "premium",
  "downloadUrl": "https://firebasestorage.googleapis.com/v0/b/your-bucket.appspot.com/o/assets%2Fblender_nodes.zip?alt=media"
}
```

**Fields**:

-   `id`: `string` (Unique identifier, Firestore Document ID)
-   `name`: `string` (Name of the asset)
-   `description`: `string` (Short description of the asset)
-   `type`: `string` ("free" or "premium")
-   `downloadUrl`: `string` (URL to the downloadable file, Firebase Storage)

---

## 3. User

Represents an authenticated user. Managed by Firebase Authentication. User data (if any needs to be stored beyond basic auth info) could be in a `users` Firestore collection, but for this spec, basic auth information from Firebase Auth is sufficient.

**Firebase Authentication Attributes**:

-   `uid`: `string` (Unique user ID)
-   `email`: `string` (User's email address)
-   `displayName`: `string` (User's display name)
-   `photoURL`: `string` (URL to user's profile picture)

**Note**: For this project, a dedicated `users` Firestore collection is not strictly required unless additional user-specific data beyond Firebase Auth's default attributes needs to be stored (e.g., purchased assets, custom preferences). If needed, it would follow a similar structure to `Project` or `Asset`.
