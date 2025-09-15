# 📝 Blog Application

![Status](https://img.shields.io/badge/status-active-success) ![Made with MERN](https://img.shields.io/badge/Made%20with-MERN-blue)

A **full-stack blog application** built with the **MERN** stack, providing users the ability to create, read, update, and delete blog posts with authentication and authorization.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [⚙️ Prerequisites](#%EF%B8%8F-prerequisites)
- [🚀 Installation](#-installation)
- [▶️ Usage](#%EF%B8%8F-usage)
- [📂 Folder Structure](#-folder-structure)
- [🔗 API Endpoints](#-api-endpoints)
- [🖼️ Screenshots](#%EF%B8%8F-screenshots)
- [🤝 Contributing](#-contributing)
- [🌍 Deployment](#-deployment)

---

## ✨ Features

- User authentication with **JWT (httpOnly cookies)**
- Create, read, update, delete (CRUD) blog posts
- Rich text editor for content formatting
- Responsive UI (React + Material-UI)
- Protected routes for logged-in users
- SEO-friendly meta tags setup

---

## 🛠️ Tech Stack

**Frontend:** React, React Router, Axios, Material-UI  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** JWT + httpOnly cookies  
**Other Tools:** ESLint, React Testing Library, Jest

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 18.x)
- npm
- [MongoDB](https://www.mongodb.com/) running locally or cloud (e.g., MongoDB Atlas or compass)

---

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SaiAkshith-2001/Blog-App.git
   cd blog-app
   ```
2. **Install dependencies**

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

3. **Set up environment variables**
   Checkout a .env.sample file in the backend/ directory:

## ▶️ Usage

**Run Backend:**

```bash
cd backend
npm run dev
```

**Run Frontend:**

```bash
cd frontend
npm start
```

By default:

Backend runs at: http://localhost:5000

Frontend runs at: http://localhost:3000

## 📂 Folder Structure

```bash
blog-app/
│
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│
├── backend/
│   ├── src/        # Node.js/Express.js backend
│   │   ├── controllers/
│   │   ├── core/
│   │   ├── helper/
│   │   ├── logs/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── index.js/
│   │   └── server.js/
│
└── README.md
```

---

## 🔗 API Endpoints

For API Endpoints refer **Swagger Docs**
please refer the attached URL: http://localhost:5000/api-docs

---

## 🖼️ Screenshots

---

---

## 🤝 Contributing

Fork the project

Create a new branch (git checkout -b feature/awesome-feature)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature/awesome-feature)

Open a Pull Request

---

## 🌍 Deployment

This project is deployed and accessible online:

**Frontend (React App)**: https://blog-app-frontend-orm8.onrender.com/

**Backend (API)** : https://blog-app-backend-0nmz.onrender.com

**Deployment Options**

**Frontend**: Render

**Backend**: Render

**Database**: MongoDB Compass

---

## Credentials

Try with credentials,
email: test2025@test.com

username: test2025

password: Test@2025
