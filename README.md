# MediCare — Client

MediCare is a full-stack doctor appointment and healthcare consultation platform. This repository contains the **frontend** — a Next.js web application that lets patients find and book doctors, lets doctors manage their schedules and patients, and gives admins full control over the platform.

**Live App:** [medicare-client-ruddy.vercel.app](https://medicare-client-ruddy.vercel.app/)
**Backend API:** [medicare-server-isbj.onrender.com](https://medicare-server-isbj.onrender.com/)
**Backend Repo:** [medicare-server](https://github.com/sayedrkhalid-dev/medicare-server)

---

## Overview

MediCare connects patients with verified doctors for online consultations. The platform supports three roles — **Patient**, **Doctor**, and **Admin** — each with a dedicated dashboard and permission set.

### Key Features

- **Authentication** — Email/password and Google OAuth sign-in via Better Auth, with role-based access control
- **Doctor Discovery** — Browse and filter doctors by specialty, view detailed profiles and reviews
- **Appointment Booking** — Real-time available time slots and appointment scheduling
- **Doctor Applications** — Doctors can apply to join the platform; admins review, approve, or reject applications
- **Doctor Schedules** — Doctors create and manage their own availability
- **Prescriptions** — Doctors issue prescriptions; patients view their prescription history
- **Payments** — Secure checkout and payment history powered by Stripe
- **Reviews & Ratings** — Patients leave reviews for doctors after consultations
- **Role-Based Dashboards**
  - **Patient:** appointments, prescriptions, payment history, reviews, profile settings
  - **Doctor:** appointments, schedule management, applications, profile
  - **Admin:** users, doctor applications, appointments, payments, prescriptions, reviews
- **Dark / Light Theme** support
- **Charts & Analytics** on the patient/admin dashboards (via Recharts)
- **Responsive UI** built with Tailwind CSS

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Authentication | [Better Auth](https://www.better-auth.com/) (client) |
| Charts | [Recharts](https://recharts.org/) |
| Notifications | [React Hot Toast](https://react-hot-toast.com/) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |
| Linting | ESLint 9 (flat config) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Project Structure

```
medicare-client/
├── src/
│   ├── app/
│   │   ├── (auth)/            # Login & register routes (route group)
│   │   ├── (main)/            # Public pages: home, about, contact, doctors
│   │   ├── dashboard/
│   │   │   ├── admin/         # Admin dashboard pages
│   │   │   ├── doctor/        # Doctor dashboard pages
│   │   │   └── patient/       # Patient dashboard pages
│   │   ├── payment/           # Payment flow & success pages
│   │   └── layout.js          # Root layout
│   ├── components/            # Shared UI components (Navbar, Footer, Hero, forms)
│   ├── context/                # Auth & theme React context providers
│   ├── hooks/                  # Custom hooks (useAuth, useUser)
│   ├── lib/                    # API client, fetcher, auth client, query helpers
│   └── services/                # Feature-based API service modules
│       ├── appointments/
│       ├── auth/
│       ├── doctor-applications/
│       ├── doctor-schedules/
│       ├── doctors/
│       ├── payments/
│       ├── prescriptions/
│       ├── reviews/
│       └── users/
├── public/                     # Static assets
├── next.config.mjs
├── DESIGN.md                   # UI design system reference
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or later
- A running instance of the [medicare-server](https://github.com/sayedrkhalid-dev/medicare-server) backend

### Installation

```bash
git clone https://github.com/sayedrkhalid-dev/medicare-client.git
cd medicare-client
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_AUTH_URL=http://localhost:8080
```

> Update these values to point to your deployed backend when building for production (e.g. the live API at `https://medicare-server-isbj.onrender.com`).

### Run the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Creates a production build |
| `npm run start` | Runs the production build |
| `npm run lint` | Runs ESLint across the project |

---

## Deployment

The app is deployed on **Vercel** and available at:
🔗 [https://medicare-client-ruddy.vercel.app/](https://medicare-client-ruddy.vercel.app/)

Any push to the main branch is automatically built and deployed by Vercel.

---

## Related Repository

- **Backend / API:** [github.com/sayedrkhalid-dev/medicare-server](https://github.com/sayedrkhalid-dev/medicare-server)

---

## License

This project is currently unlicensed. Add a `LICENSE` file to specify usage terms.

## Author

**Sayed R. Khalid**
GitHub: [@sayedrkhalid-dev](https://github.com/sayedrkhalid-dev)
