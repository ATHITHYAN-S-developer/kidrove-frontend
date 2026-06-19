# 🌐 Kidrove Frontend — Interactive Family Activities & STEM Platform

This repository contains the premium, Apple-style frontend client for the **Kidrove** platform. Built with a modern tech stack, it features highly interactive layouts, glassmorphism designs, fluid page transitions, search filtering, and multi-page routing connected to a backend database.

---

## 🚀 Tech Stack
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite v8](https://vite.dev/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router v7](https://reactrouter.com/)

---

## 🎨 Core Design & Features
1. **Premium Aesthetics**: outfit/sans typography, soft borders, clean grids, and card-based structures.
2. **Glassmorphism**: UI sections styled with frosted transparent backdrops (`backdrop-blur-xl bg-white/80`).
3. **Multi-page Routing**: Dedicated pages for:
   - `/` — HomePage (curated activities categories, instructors, reviews, etc.)
   - `/summer-2026` — Summer Campaign listing packages
   - `/login` — Hashed email/password authorization
   - `/register` — Sign up page with client validations
   - `/about` — Our mission, history, core values, and stats
   - `/contact` — Secure contact page with inquiry category pre-fills
   - `/activities` — Grid list of all weekend venues & STEM workshops
   - `/activities/:id` — Detail view showing schedule, highlights, facilities, and maps
4. **Cross-Page Scrolling**: Dynamic logic detects if you click a section-anchor button (e.g. FAQ) on another page, redirects to home first, and then executes smooth scrolling to the target element.
5. **Interactive Filtering**: Real-time filtering by category cards (Venues, Nature, Culture, STEM) and keywords, synchronized with URL query params.

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Installation
Navigate to your project directory and install the packages:
```bash
npm install
```

### 3. Environment Variable Config
Create a `.env` file in the root of the `frontend` folder:
```env
VITE_API_URL=http://localhost:5000
```
*(This tells Vite where your local running Node/Express backend resides.)*

### 4. Start Dev Server
Run the local dev command:
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:5173`**.

---

## ☁️ Step-by-Step Online Hosting Guide

The frontend is a static single-page application (SPA). You can deploy it for free on **Netlify** or **Vercel**.

### Option A: Deploying on Netlify (Recommended)
1. Sign up/Log in at [Netlify](https://www.netlify.com/).
2. Click **Add new site** > **Import an existing project**.
3. Select **GitHub** and authorize access to your repository.
4. Select your **`kidrove-frontend`** repository.
5. Configure the build parameters:
   - **Branch to deploy**: `main`
   - **Base directory**: Leave blank (since the repo contains only the frontend root).
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **Environment variables** > **Add a single variable**:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com` (Your hosted backend URL)
7. Click **Deploy kidrove-frontend**.
8. Go to **Site Configuration** > **Domain Management** to customize your domain name.

> ⚠️ **IMPORTANT NETLIFY SPA ROUTING RULE**:
> Since React Router handles routing in the browser, visiting routes directly (like `/about` or `/activities`) might return a `404 Not Found` page when refreshed.
> **Fix**: Create a file named `_redirects` inside the `public/` folder with this line:
> `/*    /index.html   200`
> This redirects all server hits back to `index.html` so React Router can process the path.

---

### Option B: Deploying on Vercel
1. Sign up/Log in at [Vercel](https://vercel.com/).
2. Click **Add New** > **Project** and import your repository.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Build & Development Settings**: Keep defaults (`npm run build`, `dist`).
4. Expand **Environment Variables** and add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com`
5. Click **Deploy**.
6. Vercel automatically handles fallback redirects for single-page apps, so no extra redirect file is needed.
