# Adamofer Portfolio Website

A personal portfolio website built with **Next.js**, **Tailwind CSS**, **Clerk** (authentication), and a **Neon PostgreSQL** database via Drizzle ORM. Deployed on **Netlify**.

## Features

- Portfolio sections: Hero, Experience, Projects, Skills, Photos
- Admin dashboard (Clerk-authenticated) for managing all content
- Database-backed dynamic content via Neon + Drizzle ORM
- Responsive design with dark theme

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Auth | Clerk |
| Database | Neon (PostgreSQL) + Drizzle ORM |
| Deployment | Netlify |

## Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd adamofer-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (from Clerk Dashboard) |
| `CLERK_SECRET_KEY` | Clerk secret key (from Clerk Dashboard) |
| `DATABASE_URL` | Neon PostgreSQL connection string |

### 4. Run database migrations

```bash
npx drizzle-kit push
```

### 5. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

This project is configured for **Netlify** deployment. Push to your connected GitHub repo and Netlify will build and deploy automatically.

Make sure to set the environment variables in your Netlify project settings under **Site Configuration → Environment Variables**.
