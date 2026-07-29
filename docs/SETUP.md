# Setup & Installation Guide

## Prerequisites

- **Node.js** v20+ (LTS recommended)
- **npm** or **yarn** as package manager
- Basic knowledge of React and Next.js concepts

## Step-by-Step Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd next_notes
```

### 2. Install Dependencies

Install all required packages listed in `package.json`:

```bash
npm install
```

This installs:

- **next**: Web framework (v16)
- **react** & **react-dom**: UI library (v19)
- **react-hook-form**: Form handling utility
- **tailwindcss**, **@tailwindcss/postcss-plugin**, **autoprefixer**: Styling system v4
- **@prisma/client**: ORM for database interactions
- **better-sqlite3**: SQLite adapter for Prisma

### 3. Verify Installation

Check that all modules are correctly installed:

```bash
npm ls react next tailwindcss prisma
```

All packages should be listed without errors.

### 4. Run the Development Server

Start the app in development mode:

```bash
npm run tailwind:css
npm run dev
```

The application will automatically open at [http://localhost:3000](http://localhost:3000).

## Project Structure Overview

```
next_notes/
├── app/                 # Next.js App Router pages and API routes
│   ├── layout.js       # Root layout component
│   ├── page.js         # Home page (NotesList)
│   └── api/login/route.ts  # Authentication endpoint
├── components/         # Reusable React components
│   ├── Header.jsx      # Navigation header
│   ├── InputArea.jsx   # Text input area
│   ├── NotesList.jsx   # List of all notes
│   └── Login.jsx       # Login form component
├── prisma/             # Database schema and seed scripts
│   ├── schema.prisma   # Prisma ORM model definitions
│   └── seed.ts         # Initial data seeding script
├── public/             # Static assets (icons, images)
├── test/               # Testing infrastructure
│   ├── cypress/        # E2E tests with Cypress
│   └── lighthouse-config.js
├── docs/               # Documentation files
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── tailwind.config.ts # Tailwind CSS v4 configuration
└── next.config.mjs    # Next.js configuration
```

## Common Issues & Solutions

### Module Not Found Errors

If you encounter errors like `Cannot find module 'next'`, ensure that:

1. You are in the project root directory (`cd next_notes`)
2. Run `npm install` again to re-install dependencies
3. Check that Node.js version is compatible (v20+)

### Database Connection Issues

If the database file does not appear at `dev.db`:

- Ensure you ran `npm run tailwind:css` successfully
- Ensure you ran `npm run dev` successfully
- The SQLite database is created automatically on first use
- If using a custom path, adjust in `prisma/schema.prisma`

## Production Deployment Notes

For production builds:

```bash
npm run tailwind:css
npm run build
npm start
```

⚠️ **Critical for production**: Update the login API route to hash passwords before storing them. The current implementation stores plain-text passwords, which is a security risk for any public-facing application.