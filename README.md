<div align="center">
  <h1>🔗 OpenLink</h1>
  <p>A free, open-source link-in-bio tool. Better than Linktree — and completely yours.</p>
</div>

---

## ✨ Features

- 🎨 **6 themes** — Default, Light, Midnight, Cyberpunk, Emerald, Minimal
- 🔗 **Drag & drop** link reordering
- 🪩 **Button styles** — Glass, Filled, Outline, Hard Shadow
- ✨ **Hover effects** — Lift, Wiggle, Glow
- 📱 **Live preview** while editing
- 🆓 **Completely free** — your data, your hosting, no branding

---

## 🚀 Deploy in 3 Steps

### Step 1 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up for free
2. Click **New project**, fill in a name and a database password (save it — you'll need it)
3. Wait ~1 minute for it to spin up

### Step 2 — Get your 4 keys

You need 4 values from Supabase. They're in **2 places**:

**Place 1 — Project Overview page → click the Copy button (top right)**

| Variable | Label in dropdown |
|----------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | **Project URL** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Publishable key** |

**Place 2 — Connect → ORM tab (top of dashboard)**

| Variable | Label |
|----------|-------|
| `DATABASE_URL` | The first connection string (port 6543) |
| `DIRECT_URL` | The second connection string (port 5432) |

> In the ORM connection strings, replace `[YOUR-PASSWORD]` with the password you set in Step 1.

### Step 3 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up for free (no GitHub needed)
2. Click **Add New Project** → **Import Git Repository**
3. Paste this URL: `https://github.com/samedigital/openlink`
4. Under **Environment Variables**, add your 4 keys from Step 2
5. Click **Deploy**

Vercel will automatically build the project and create your database tables.

Once it's live, visit **`your-site.vercel.app/register`** to create your account. Done.

---

## 🛠 Local Development

```bash
# 1. Clone the repo
git clone https://github.com/samedigital/openlink.git
cd openlink

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your Supabase keys in .env.local

# 4. Generate Prisma client
npx prisma generate

# 5. Run the app
npm run dev
```

Visit [http://localhost:3000/register](http://localhost:3000/register) to create your account.

---

## 🏗 Tech Stack

| | |
|--|--|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router) |
| **Auth + Database** | [Supabase](https://supabase.com) |
| **ORM** | [Prisma](https://prisma.io) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Drag & Drop** | [@dnd-kit](https://dndkit.com) |
| **Hosting** | [Vercel](https://vercel.com) |

---

## 📄 License

MIT — free to use, modify, and distribute.
