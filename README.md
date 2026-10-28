# ZapRide

A full-stack ride-booking web app where customers book rides and drivers manage their profiles and vehicles. Built with Next.js, Express, Prisma and MySQL, with JWT authentication and role-based access.

**Live demo:** [zap-ride-rho.vercel.app](https://zap-ride-rho.vercel.app)

---

## Features

**Customers**
- Register, log in, and stay authenticated with JWT
- Browse available rides and vehicles
- Book a ride and view booking details

**Drivers**
- Separate driver authentication and profile management
- Add and manage vehicle information

**Security**
- Passwords hashed with bcrypt
- JWT auth middleware protecting API routes
- Role-based access (customer vs driver)

---

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | Next.js (App Router), React, Tailwind CSS, shadcn/ui |
| Backend | Node.js, Express.js, REST API |
| Database | MySQL, Prisma ORM |
| Auth | JWT, bcrypt |
| Tooling | Git, Postman, Vercel, XAMPP (local MySQL) |

---

## Architecture

```text
Next.js frontend  ──REST──▶  Express API  ──▶  JWT middleware
                                  │
                                  ▼
                             Prisma ORM
                                  │
                                  ▼
                               MySQL
```

**Data models:** `User`, `Driver`, `Vehicle`, `Ride`. A driver owns vehicles, and a ride links a customer, a driver and a vehicle.

---

## Project Structure

```text
ZapRide/
├── frontend/          # Next.js app (app/, components/, public/)
└── backend/           # Express API (controllers/, routes/, middleware/, prisma/)
```

---

## Getting Started

**Prerequisites:** Node.js 18+, MySQL (or XAMPP)

### 1. Clone and install

```bash
git clone https://github.com/Mency/ZapRide.git
cd ZapRide

cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment variables

Copy the example files and fill in your own values:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```


### 3. Set up the database

Start MySQL, create a database named `zapride`, then from `backend/`:

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Run

```bash
# terminal 1 - backend
cd backend && npm run dev

# terminal 2 - frontend
cd frontend && npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## API Overview

All protected routes need the header `Authorization: Bearer <token>`.


| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Create an account | No |
| POST | `/api/auth/login` | Log in, receive JWT | No |

A Postman collection can be exported into the repo for easy testing.

---

## Roadmap

- [ ] Online payments
- [ ] Real-time driver tracking and map/route integration
- [ ] Real-time notifications
- [ ] Ride cancellation and fare calculation
- [ ] Ratings and reviews
- [ ] Admin dashboard
- [ ] Automated tests

---

## What I Learned

Building ZapRide gave me hands-on practice with REST API design, JWT authentication and authorization, relational modelling with Prisma, the Next.js App Router, deploying a split frontend/backend, and debugging production issues.

---

## Author

**Mency** — Full Stack Developer
[GitHub](https://github.com/Mency) · [LinkedIn](www.linkedin.com/in/little-mency-c-j-a69312250) · [Portfolio](https://personal-portfolio-three-woad-53.vercel.app/)
