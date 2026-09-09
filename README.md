# LearnLoop - AI Powered Credit-Based Learning Platform

MERN stack project with React + Tailwind CSS frontend and Node.js + Express + MongoDB backend.

## Quick Start

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

## Demo Login Credentials

Demo accounts are created automatically when the backend starts:

| Role    | Email                   | Password     |
|---------|-------------------------|--------------|
| Learner | learner@learnloop.com   | password123  |
| Tutor   | tutor@learnloop.com     | password123  |
| Admin   | admin@learnloop.com     | password123  |

On the login page, click any demo account to auto-fill credentials.

## Forgot Password

1. Go to `/forgot-password`
2. Enter a registered email (e.g. `learner@learnloop.com`)
3. Click **Open Reset Password Page** from the success message
4. Set a new password and login again

> In production, the reset link would be sent via email. For demo, it is shown on screen.
