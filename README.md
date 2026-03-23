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

## Admin Role Configuration

The `/admin` route is protected by a role-based access check. Only users with `role: "admin"` in their Clerk `publicMetadata` can access the admin dashboard. Follow these steps to configure it:

### 1. Customize the Clerk session token

1. Go to the [Clerk Dashboard](https://dashboard.clerk.com/)
2. Navigate to **Sessions → Customize session token**
3. Add the following JSON to the session token template:

```json
{
  "metadata": "{{user.public_metadata}}"
}
```

This maps `user.publicMetadata` to `sessionClaims.metadata`, making the `role` field available in the middleware.

### 2. Assign the admin role to a user

1. In the Clerk Dashboard, go to **Users** and select the user you want to make an admin
2. Scroll to **Public Metadata**
3. Set the metadata to:

```json
{
  "role": "admin"
}
```

4. Save the changes

Users without `role: "admin"` in their public metadata will be redirected to an `/unauthorized` page when attempting to access `/admin`.

## Deployment

This project is configured for **Netlify** deployment. Push to your connected GitHub repo and Netlify will build and deploy automatically.

Make sure to set the environment variables in your Netlify project settings under **Site Configuration → Environment Variables**.
