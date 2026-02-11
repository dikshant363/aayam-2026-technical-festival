
# AAYAM 2026 Technical Festival

Official sponsorship and event portal for AAYAM 2026 Technical Festival organized by Bhagwan Mahavir University.

## Project Overview

- **Live Demo:** [https://aayam-2026-technical-festival.netlify.app/](https://aayam-2026-technical-festival.netlify.app/)
- **Repository:** [https://github.com/dikshant363/aayam-2026-technical-festival](https://github.com/dikshant363/aayam-2026-technical-festival)

AAYAM is the annual national-level technical festival featuring 20+ events across various engineering domains. This web application facilitates:

- Event showcasing and information.
- Sponsorship package details and applications.
- Photo gallery from past events.
- Team information and contact channels.
- **Admin Panel** for managing applications, messages, team members, and FAQs.

## Tech Stack

- **Frontend:** React.js (v18+)
- **Styling:** Tailwind CSS (via CDN for simplicity/demo)
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **SEO:** React Helmet Async

## Setup Instructions

1. **Clone the repository.**
2. **Install dependencies** (if moving to a local build environment):

   ```bash
   npm install
   ```

3. **Run locally:**
   Since this project uses ES Modules via CDN/import maps in `index.html` for the demo environment, simply serve the root directory using a static file server (e.g., Live Server in VS Code, `http-server`, or `python -m http.server`).

## How to Run Locally

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

3. **Build for Production**

   ```bash
   npm run build
   ```

4. **Preview Production Build**

   ```bash
   npm run preview
   ```

## Admin Credentials

- **URL:** `/admin`
- **Email:** `admin@aayam.com`
- **Password:** `admin123`

## Project Structure

- `src/pages`: Individual route components (Home, Gallery, Admin, etc.)
- `src/components`: Reusable UI components
- `src/services`: Data management (localStorage wrapper)
- `public/assets`: Static assets like images

## Admin Guide

### Accessing the Admin Panel

1. Navigate to `/admin` or click "Admin Login" in the footer.
2. **Credentials:**
   - **Email:** `admin@aayam.com`
   - **Password:** `admin123`

### Features

- **Dashboard:** Overview of applications, revenue estimates, and messages.
- **Applications:** View, filter, and manage status (Confirm, Reject, Contacted) of sponsorship applications. Export data to CSV.
- **Messages:** Read and manage contact form inquiries.
- **Content Manager:**
  - **Team:** Add, edit, or delete team members dynamically.
  - **FAQs:** Add or modify frequently asked questions.
- **Settings:** Mock settings for profile and notifications.

## User Guide

### For Sponsors

1. Navigate to "Packages" to view available tiers.
2. Click "Apply Now" on a specific package or use the global "Become a Sponsor" button.
3. Fill out the inquiry form.
4. You will receive a confirmation message on screen.

### For Students/Visitors

- Browse "Events" to see technical and non-technical competitions.
- Use the "Contact" page for queries regarding registration or logistics.

## Backup & Data

Currently, data is persisted in the browser's `localStorage` for demonstration purposes. In a full production environment, this would be connected to a PostgreSQL or Firebase database.

---
© 2026 AAYAM Technical Festival. All rights reserved.
