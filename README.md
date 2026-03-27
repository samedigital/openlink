# OpenLink: The Free, Open Source Linktree Alternative

OpenLink is a 100% free, fully open-source alternative to Linktree. It's built with modern web technologies and designed completely without paywalls. All premium features (custom fonts, themes, modular bento grids, video embeds, removal of branding) are included out-of-the-box for everyone.

## Core Features
1. **Zero Paywalls**: Every customization option is available to the end-user for free.
2. **Self-Hostable**: Easily deployable on Vercel or Netlify with a Supabase PostgreSQL backend.
3. **Design Excellence**: Choose between a classic vertical list or a modern "Bento Grid" modular layout. Premium animations powered by Framer Motion.

## 🏗️ System Architecture

Our stack ensures high performance and scalability by utilizing **Next.js 15 (App Router)** and **TypeScript**.

### Infrastructure & ISR Routing

The application utilizes **Incremental Static Regeneration (ISR)** to ensure blazingly fast load times for user profiles (`/[username]`) while allowing dynamic updates.

1. **Routing (`/[username]/page.tsx`)**:
   - The profile pages fetch user data and link blocks directly from the Supabase database via Prisma.
   - Using Next.js `generateStaticParams`, we can optionally pre-build common profiles.
   - Using `export const revalidate = 60;`, the page is cached at the edge (CDN) and regenerated in the background every 60 seconds.
   - **Benefit**: End users get instantly loading static pages (SEO-optimized, no DB query wait time), but updates (like adding a new block) still reflect quickly without a full site rebuild.

2. **Database & Auth (Supabase)**:
   - Supabase replaces Firebase, offering a fully open-source PostgreSQL database.
   - Prisma ORM is used to interface with the database. See `prisma/schema.prisma` for the flexible `Block` and `User` schema tailored to modular layouts.
   
3. **Admin Dashboard (Shadcn/UI)**:
   - Protected routes (`/admin/*`) use Server Actions and rely on Shadcn components for an uncompromising developer and user admin experience.

## 🚀 5-Minute Deployment Guide

Follow these steps to deploy your completely free instance of OpenLink.

### 1. Database Setup (Supabase)
1. Go to [Supabase](https://supabase.com/) and create a free account + new project.
2. Once the project is provisioned, go to **Project Settings -> Database**.
3. Copy the **Transaction connection string (Pooler)** and set it as your `DATABASE_URL`.
4. Copy the **Session connection string (Direct routing)** and set it as your `DIRECT_URL`.

### 2. Prepare the Codebase
1. Fork or clone this repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root based on `.env.example`:
   ```env
   DATABASE_URL="postgres://..."
   DIRECT_URL="postgres://..."
   ```
4. Push the schema to your database: 
   ```bash
   npx prisma db push
   ```

### 3. Deploy to Vercel
1. Log in to [Vercel](https://vercel.com/) and click **Add New... -> Project**.
2. Import your GitHub repository.
3. In the **Environment Variables** section, paste both `DATABASE_URL` and `DIRECT_URL`.
4. Click **Deploy**.

Within 5 minutes, your custom Linktree alternative is live, completely free, and ready to scale effortlessly!
