# 📝 Smart Note App

A simple yet powerful Note Management System with AI-powered summarization and secure user authentication.

## 🚀 Objective

Build a RESTful API using **Node.js** and **Express.js** that allows users to:
- Register and log in securely
- Manage personal notes (Create, Read, Delete)
- Get smart summaries of notes using an AI model (OpenAI)
- Upload and manage profile pictures

---

## 📚 Features

- 🔐 **JWT Authentication** (Asymmetric RSA)
- 📓 **Note Management** (CRUD)
- 🧠 **AI Summarization** using OpenAI
- 📨 **Email Verification** & OTP via Nodemailer
- 🖼️ **Profile Picture Upload** with Multer
- 🌐 **GraphQL Support** (in progress/optional)
- 🧪 Clean modular structure for services, controllers, and middlewares

---

## 🛠️ Tech Stack

| Technology     | Purpose                         |
|----------------|----------------------------------|
| **Express.js** | Backend framework                |
| **MongoDB** + Mongoose | Database & ORM           |
| **JWT (RSA)**  | Secure token-based auth         |
| **bcrypt**     | Password hashing                |
| **dotenv**     | Environment variable management |
| **nodemailer** | Sending emails & OTPs           |
| **Multer**     | File uploads                    |
| **OpenAI API** | Note summarization              |
| **GraphQL**    | (Optional) flexible querying    |

---

## 🧪 Postman Collection

You can test all API endpoints using this public Postman collection:

🔗 [Smart Note API Documentation on Postman](https://documenter.getpostman.com/view/39725396/2sB3B7MtHe)

---

## 🔗 GraphQL Collection (Postman)

You can test the Smart Note App GraphQL API using Postman:

🧠 [GraphQL Postman Collection](https://www.postman.com/asmaaraafat/workspace/my-workspace/graphql-request/688613d37e7f7820e541934b?action=share&creator=39725396&ctx=documentation&active-environment=39725396-cc083cc7-682b-40f4-a386-b7eb0405c6c5)

---

## 🧾 Installation & Setup

```bash
git clone https://github.com/asmaaraafat27/Smart-Note-App.git
cd Smart-Note-App
npm install
