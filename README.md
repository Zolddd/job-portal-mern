# Job Portal MERN Project

A full-stack job portal application built with MongoDB, Express.js, React.js, and Node.js (MERN stack).  
Employers can post jobs and manage applications, while applicants can browse jobs, apply, and track their status.

---

## Features

- User registration and login with JWT authentication  
- Role-based dashboards for employers and applicants  
- Employers can post jobs and view/manage applications  
- Applicants can browse jobs, apply with resume links, and track application status  
- Responsive UI with dark/light mode toggle using React and Tailwind CSS  
- Smooth animations with Framer Motion  

---

## Tech Stack

- Frontend: React.js, Tailwind CSS, Framer Motion  
- Backend: Node.js, Express.js, MongoDB, Mongoose  
- Authentication: JWT  

---

## Getting Started

### Prerequisites

- Node.js  
- MongoDB (local or Atlas)  

### Installation

1. Clone the repo  
2. Setup backend:  
   - `cd backend`  
   - `npm install`  
   - Create `.env` with Mongo URI and JWT secret  
   - `npm run dev`  
3. Setup frontend:  
   - `cd ../frontend`  
   - `npm install`  
   - `npm start`  

---

## API Overview

- Register: `POST /api/auth/register`  
- Login: `POST /api/auth/login`  
- Post Job (Employer): `POST /api/jobs`  
- View Jobs (Public): `GET /api/jobs`  
- Apply to Job (Applicant): `POST /api/jobs/:id/apply`  
- View Applications (Employer): `GET /api/employer/applications`  
- Update Application Status (Employer): `PATCH /api/employer/applications/:id/status`  
- View My Applications (Applicant): `GET /api/jobs/my-applications`  

---

## License

MIT License

---

## Contact

Created by Azim Shaikh(https://github.com/zolddd)
