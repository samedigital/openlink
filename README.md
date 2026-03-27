<div align="center">
  <h1>🔗 OpenLink</h1>
  <p>A free, open-source link-in-bio tool. Better than Linktree — and completely yours.</p>

  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Abdessamed-98/openlink&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,DATABASE_URL,DIRECT_URL&envDescription=Get%20these%20from%20your%20Supabase%20project%20settings&envLink=https://github.com/Abdessamed-98/openlink%23-setup-guide&project-name=openlink&repository-name=openlink)
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
2. Click **New project**, fill in a name and a database password (save the password — you'll need it)
3. Wait ~1 minute for it to spin up

### Step 2 — Get your 4 keys

From your Supabase dashboard:

| Variable | Where to find it |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project Settings → API → **Project URL** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project Settings → API → **anon / public** key |
| `DATABASE_URL` | Project Settings → Database → Connection string → **Transaction** (port 6543) — append `?pgbouncer=true` |
| `DIRECT_URL` | Project Settings → Database → Connection string → **Session** (port 5432) |

> In both connection strings, replace `[YOUR-PASSWORD]` with the database password you set in Step 1.

### Step 3 — Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Abdessamed-98/openlink&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,DATABASE_URL,DIRECT_URL&envDescription=Get%20these%20from%20your%20Supabase%20project%20settings&envLink=https://github.com/Abdessamed-98/openlink%23-setup-guide&project-name=openlink&repository-name=openlink)

Paste your 4 keys when Vercel asks, then hit **Deploy**. Vercel will automatically:
- Clone the repo to your own GitHub account
- Create all database tables
- Deploy your site live

Once it's live, visit **`your-site.vercel.app/register`** to create your account. Done.

---

## 🛠 Local Development

```bash
# 1. Clone the repo
git clone https://github.com/Abdessamed-98/openlink.git
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
