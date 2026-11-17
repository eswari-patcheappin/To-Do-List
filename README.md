# To-Do List Application

A full-stack To-Do List application built using **Next.js, TypeScript, MongoDB, and Mongoose**. The application allows users to manage daily tasks with CRUD operations, search and filtering, form validation, and loading states.

## Features

- **Add Tasks:** Create new tasks with title validation.
- **View Tasks:** Display tasks stored in MongoDB.
- **Edit Tasks:** Update existing task titles.
- **Delete Tasks:** Remove tasks from the database.
- **Task Status:** Mark tasks as Completed or Pending.
- **Search:** Search tasks by title.
- **Filter:** Filter tasks by All, Pending, or Completed.
- **Task Statistics:** Display total, completed, and pending task counts.
- **Form Validation:** Validate task titles using Zod.
- **Loading States:** Disable the submit button and display a loading message during submission.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js (App Router) | Full-stack application framework |
| React | User interface |
| TypeScript | Type safety |
| MongoDB | Database |
| Mongoose | Database models and operations |
| Zod | Input validation |
| CSS | Styling |

## Project Structure

```text
to-do-list/
├── app/
│   ├── action.ts
│   ├── globals.css
│   └── page.tsx
├── components/
│   ├── TodoClient.tsx
│   └── SubmitButton.tsx
├── lib/
│   └── mongodb.ts
├── models/
│   └── Task.ts
├── type.ts
├── package.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/To-Do-List.git
cd To-Do-List
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
```

Never commit `.env.local` or your database credentials to GitHub.

### 4. Start the development server

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

## Concepts Practiced

- React hooks (`useState`, `useFormStatus`)
- Client and Server Components
- Next.js Server Actions
- CRUD operations with Mongoose
- Form handling and Zod validation
- `revalidatePath()` for refreshing server-rendered data
- React Suspense and fallback UI
- TypeScript interfaces and asynchronous functions

## Future Improvements

- User authentication and authorization
- Task due dates
- Responsive UI improvements

