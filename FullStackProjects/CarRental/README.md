# CarRental - FullStack MERN Application

This repository contains a full-stack car rental application built with the MERN stack (MongoDB, Express, React, Node). It includes a React frontend (`client/`) and an Express/MongoDB backend (`server/`).

> Repository: https://github.com/KUMARANKIT3012/CarRental-FullStack-MERN-application.git

## Contents

- `client/` - React frontend (Vite, Tailwind CSS)
- `server/` - Express backend (Mongoose, JWT, nodemailer, etc.)

## Features

- Browse and search cars with filters and sorting
- View detailed car pages with images, reviews, and booking
- Book cars with pickup/return dates and prices
- User dashboard for bookings
- Owner dashboard to manage bookings
- Authentication and role-based access

## Quick Setup (Windows PowerShell)

Prerequisites:
- Node.js >= 16
- npm or yarn
- MongoDB connection (Atlas or local)
- A GitHub account and git configured locally

1) Clone (if you haven't already):

```powershell
git clone https://github.com/KUMARANKIT3012/CarRental-FullStack-MERN-application.git
cd CarRental
```

2) Install dependencies

Client:

```powershell
cd client
npm install
# or
# yarn install
```

Server:

```powershell
cd ..\server
npm install
```

3) Environment variables

Create `.env` in `server/` with at least the following (example):

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

4) Run locally (in separate terminals)

Client:

```powershell
cd client
npm run dev
```

Server:

```powershell
cd server
npm run dev
```

5) Build and deploy (optional)

- Build frontend: `cd client && npm run build`
- Serve frontend from a static server or integrate into Express static middleware

## GitHub Push (from this workspace)

If you want me to push the current workspace to the GitHub repo you provided, ensure your local environment has credentials set (SSH or HTTPS PAT). I will attempt to add `origin` and push to `main`. If authentication fails, you'll need to authorize the push (or provide a token).

## Contributing

- Open issues for bugs/feature requests
- Send PRs against `main`

## License

This project does not include a license file. Add one (e.g., MIT) if you want.

---

If you want, I can also:
- Add a `.github/workflows` CI file to run tests/builds on push
- Add a `.env.example` and `CONTRIBUTING.md`
- Create a release or tag before pushing

Tell me which of these you'd like next, or I can proceed to push the current workspace to the GitHub URL you provided.