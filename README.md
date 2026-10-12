# MineTrack

A mining operations and safety management system. This is the **frontend** for the ITE 18 midterm project (Caraga State University, College of Computing and Information Sciences).

## What it does

MineTrack helps a mining company track its sites, equipment, workers and safety, replacing paper logs and scattered spreadsheets.

## User roles

- **Admin:** manages users, sites and all records
- **Site Supervisor:** logs production and shifts, assigns equipment and workers
- **Safety Officer:** files incident reports and runs inspections
- **Worker:** views their own schedule and reports hazards

The sidebar menu changes depending on the role that is logged in.

## Built with

- Nuxt 4 (Vue 3)
- Pinia (state management)
- Mock data in `public/mock/` (will be replaced by the backend API at the Final)

## How to run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000 and sign in with any name and a role.

## Team

- Junrie D. Murillo (Frontend)
- Prince Panganiban (Frontend)
