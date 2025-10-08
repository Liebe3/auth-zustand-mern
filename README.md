# Auth Zustand MERN

This project is an authentication system built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Zustand** for client-side state management. It provides a simple, secure, and scalable foundation for handling user authentication in modern web apps.

---

## 🚀 Features

- User Registration & Login
- Password hashing with **bcrypt**
- Authentication using **JWT (JSON Web Token)**
- Protected API routes
- Global state management with **Zustand**
- React Router for navigation
- MongoDB with Mongoose for database
- Error handling and validation
- Logout & persistent auth state

---

## 🛠 Tech Stack

**Frontend**  
- React  
- Zustand (state management)  
- Axios (API requests)  
- React Router DOM  

**Backend**  
- Node.js  
- Express  
- MongoDB + Mongoose  
- JWT (jsonwebtoken)  
- bcrypt  

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/Liebe3/auth-zustand-mern.git
cd auth-zustand-mern

cd server
npm install


cd ../client
npm install

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

cd server
npm run dev

cd ../client
npm start


