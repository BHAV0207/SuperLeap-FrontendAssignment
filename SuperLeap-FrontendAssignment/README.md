# SuperLeap Mini Lead CRM

A polished, single-page Lead Management CRM built for the Frontend Engineering Intern assessment.

## 🚀 Quick Start
1. **ropo structure**
   ```bash
   cd SuperLeap-FrontendAssignment/
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the mock API (json-server):**
   ```bash
   npm run mock
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173`.

## 📹 Demo Recording

[Link to Loom/Video Recording](https://loom.com/your-recording-id)
*A 1-3 minute walkthrough of the application's major flows and UI interactions.*

## 🛠 Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| **Framework** | React 19 + TypeScript | I chose React 19 for its latest performance improvements and standard ecosystem. TypeScript is used throughout to enforce type safety across components and API responses, catching errors during development rather than at runtime. |
| **State Management** | TanStack Query v5 | TanStack Query provides a robust solution for managing server state, including caching, background refetching, and loading/error states. This allows the application to stay in sync with the mock API without the complexity of a global client-side state manager. |
| **Routing** | React Router v7 | React Router v7 is used to handle client-side routing, enabling deep-linkable URLs for leads and forms. This ensures that users can navigate through the app and refresh the page without losing their place in the UI. |
| **Styling** | Vanilla CSS | I opted for Vanilla CSS with CSS Custom Properties to maintain full control over the design system without extra build-time overhead. This approach keeps the code lean and demonstrates a strong understanding of core web technologies. |
| **Icons** | Lucide React | Lucide React provides a comprehensive, tree-shakable set of icons that align with modern design aesthetics. It is lightweight and easy to integrate with React's component-based architecture. |
| **Mock API** | json-server | `json-server` was selected to provide a full RESTful API contract that supports all standard CRUD operations. It allows the frontend to interact with a realistic backend service during development and testing. |

## 📐 Design Decisions

### Component Architecture
The project follows a domain-driven component architecture. `src/components/leads/` contains logic-heavy components like the table and forms, while `src/components/ui/` houses reusable primitives like modals and toast notifications to ensure a consistent look and feel.

### Status Transition Engine
Status rules are enforced through a centralized `VALID_TRANSITIONS` map in `src/types/lead.ts`. The `StatusChanger` component consumes this map to dynamically render valid transition options, and leads in final states (Converted/Lost) are visually locked to prevent further changes, providing clear feedback to the user.

### State Management & Async Logic
Server state is handled entirely by TanStack Query, which manages the lifecycle of lead data from fetching to mutations. Local form state is managed with controlled components and custom hooks, striking a balance between responsiveness and simplicity without over-engineering with heavy form libraries.

### Offline & Concurrency Considerations
- **Offline Support:** I would implement a service worker for asset caching and leverage TanStack Query's persistent cache layer. This would allow users to view leads while offline and queue status updates to be synced once connectivity is restored.
- **Concurrent Edits:** To handle multiple users editing the same lead, I would implement optimistic locking by including a version number in each record. The server would reject updates if the version has changed since the user last fetched the data, prompting a resolve.

## 🤖 AI Usage Note
I used Antigravity (AI assistant) to scaffold the initial project structure and generate boilerplate for standard UI components. While AI helped speed up the initial development, I manually verified all status transition logic and styling to ensure it adheres to the "no over-engineering" rule. I intentionally wrote the CSS tokens and responsive layout by hand to ensure precise control over the design's "premium" feel and rejected more complex state management suggestions in favor of React Query and simple hooks.

