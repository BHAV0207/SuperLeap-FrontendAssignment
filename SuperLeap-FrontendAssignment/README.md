# SuperLeap Mini Lead CRM

A polished, single-page Lead Management CRM built for the Frontend Engineering Intern assessment.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the mock API (json-server):**
   ```bash
   npm run mock
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173`.

## 🛠 Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| **Framework** | React 19 + TypeScript | Strongly preferred by spec; ensures type safety and performance. |
| **State Management** | TanStack Query v5 | Handles server state with ease (loading/error/optimistic updates) while leaving UI state to simple React hooks. |
| **Routing** | React Router v7 | Enables deep-linkable URLs so refreshing on `/leads/:id/edit` works perfectly. |
| **Styling** | Vanilla CSS | Full control over the design system using CSS Custom Properties (Variables) without extra build-time dependencies. |
| **Icons** | Lucide React | Lightweight, tree-shakable icon library. |
| **Mock API** | json-server | Provides a full RESTful contract (`GET/POST/PUT/PATCH/DELETE`) matching the assessment requirements. |

## 📐 Design Decisions

### Component Architecture
The project follows a component-based architecture organized by domain:
- `src/components/leads/`: Domain-specific components like `LeadsTable`, `StatusChanger`, and `LeadForm`.
- `src/components/ui/`: Reusable primitives such as `Modal`, `Toast`, and state indicators (`LoadingSpinner`, `EmptyState`).
- `src/hooks/`: Custom hooks encapsulate data fetching logic (e.g., `useLeads`, `useUpdateStatus`).

### Status Transition Engine
Status rules are enforced both visually and logically:
- **`VALID_TRANSITIONS`** map in `src/types/lead.ts` defines the progression rules.
- The `StatusChanger` component dynamically renders only valid next actions.
- Leads in **CONVERTED** or **LOST** states are automatically locked, preventing further changes and providing clear visual affordance (lock icon).

### State Management & Async Logic
- **Server State:** We use TanStack Query to manage the `leads` cache. This includes automatic cache invalidation on successful mutations, ensuring the UI stays in sync with the server.
- **Form State:** Managed locally with controlled inputs and touched-based validation to keep the code minimal and avoid over-engineering with heavy form libraries.

### Offline & Concurrency Considerations
- **Offline Support:** In a production app, I would implement `offline-first` via TanStack Query's persistence layer and a Service Worker for asset caching. Local changes would be queued and synced when connectivity returns.
- **Concurrent Edits:** To handle two users editing the same lead, I would implement **Optimistic Locking** using a `version` or `updated_at` field. The server would reject edits if the version has changed, prompting the user to refresh or merge.

## 🤖 AI Usage Note
I used Antigravity (AI assistant) to help scaffold the project and implement standard patterns. I manually reviewed every file to ensure it complied with the "no over-engineering" rule, specifically rejecting more complex state management libraries (like Zustand/Redux) in favor of plain React `useState`. I also manually defined the `VALID_TRANSITIONS` logic and the design system's CSS tokens.

## 🎯 What's Next?
Given more time, I would:
- Add a **Kanban Board** view to visualize the pipeline.
- Add comprehensive **Unit Tests** using Vitest and React Testing Library.
- Implement **Dark/Light mode** switching.
