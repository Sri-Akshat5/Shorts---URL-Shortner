# Shorts - URL Shortner
A full-stack Link Shortener + Analytics Dashboard built with:

- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express + MongoDB
- Charts: Chart.js / Recharts
- Authentication: JWT
  
## Features
- 🔐 User Authentication (Login/Register)
- 🔗 Shorten long URLs with optional custom alias
- 🧾 Dashboard for viewing:
  - Most clicked link
  - Click trends
  - Device usage pie chart
  - Engagement trends

- 📅 Link expiration support
- 📉 Analytics for each link
- 📸 QR Code generation per link
- ✏️ Edit & Delete links
- 📱 Fully responsive UI

## Deployment
- Backend: Render
- Frontend: Vercel

## Authentication Flow
- JWT-based login/register
- Protected routes using authMiddleware on the backend
- Token stored in localStorage

## Test Credentials
- email: test@gmail.com
- password: Test@123

## Setup Instructions
### Clone the repo
```
git clone https://github.com/Sri-Akshat5/Shorts---URL-Shortner.git
cd link-analytics-dashboard
```
### Environment Variables
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BASE_URL=https://your-app.onrender.com
```
### Install dependencies
- Backend:
```
cd server
npm install
```
- Frontend:
```
cd client
npm install
```
### Run locally
```
Backend: node server.js
Frontend: npm run dev
```
