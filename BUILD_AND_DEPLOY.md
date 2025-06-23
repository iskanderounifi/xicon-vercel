# Build & Deployment Guide for xi-com-fin (Next.js + Prisma)

## 1. Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Database (PostgreSQL, MySQL, etc.) configured in `.env`
- [Optional] Vercel CLI for Vercel deployment

---

## 2. Install Dependencies

```bash
npm install
# or
yarn install
```

---

## 3. Prepare Environment Variables

- Copy `.env.example` to `.env` and fill in your database and other secrets.

```bash
cp .env.example .env
```

---

## 4. Prisma: Generate & Migrate

```bash
npx prisma generate
npx prisma migrate deploy
# or for development:
# npx prisma migrate dev
```

---

## 5. Build the Project

```bash
npm run build
# or
yarn build
```

---

## 6. Start the Production Server

```bash
npm run start
# or
yarn start
```

---

## 7. Deployment

### Vercel

- Push your code to GitHub/GitLab/Bitbucket.
- Import your repo in [Vercel](https://vercel.com/import).
- Set your environment variables in the Vercel dashboard.
- Vercel will handle build and deployment automatically.

### Custom Server (VPS, Docker, etc.)

- Build as above.
- Set environment variables.
- Use a process manager (pm2, systemd, etc.) to run `npm run start`.
- Make sure your database is accessible from your server.

---

## 8. Useful Commands

- `npx prisma studio` — Visual DB browser
- `npx prisma migrate dev` — Run migrations in dev
- `npm run lint` — Lint your code

---

## 9. Notes

- For static assets, ensure `/public` is deployed.
- For file uploads, configure your storage (local or cloud).
- Review your `.env` for secrets before pushing to public repos.

---

**Your project is now ready for deployment!**
