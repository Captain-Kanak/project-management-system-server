# 🧩 Role-Based Admin & Project Management System – SERVER

- Invite-Based User Onboarding

A secure, modular backend API built as part of a Mid-Level Full Stack Developer assessment.
The system demonstrates invite-only user onboarding, role-based access control (RBAC), and admin-managed project lifecycle.

---

## 📌 Overview

This backend system supports:

- Invite-based user registration (no self-signup)
- JWT-based authentication
- Role-based access control (ADMIN, MANAGER, STAFF)
- Admin-controlled user management
- Project creation by all authenticated users
- Admin-only project update & soft delete
- Clean, scalable, modular architecture

---

## 🛠 Technology Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL (Neon)
- Prisma ORM
- bcryptjs (password hashing)
- JSON Web Tokens (JWT)

---

## Database Schema

### User Table

| Field     | Description                    |
| --------- | ------------------------------ |
| id        | UUID (primary key)             |
| name      | Required                       |
| email     | Unique, required               |
| password  | Hashed                         |
| role      | ADMIN / MANAGER / STAFF        |
| status    | ACTIVE / INACTIVE              |
| invitedAt | Timestamp when invite accepted |
| createdAt | Record creation time           |
| updatedAt | Last update timestamp          |

### Invite Table

| Field      | Description                     |
| ---------- | ------------------------------- |
| id         | UUID (primary key)              |
| email      | Email address being invited     |
| role       | Role assigned on invited        |
| token      | Unique, single-use invite token |
| expiresAt  | Invite expiration time          |
| acceptedAt | Set when invite is used         |
| createdAt  | Invite creation timestamp       |

- Multiple invites can be sent to the same email, but each token is unique and single-use.

### Project Table

| Field       | Description                 |
| ----------- | --------------------------- |
| id          | UUID (primary key)          |
| name        | Project name                |
| description | Project description         |
| status      | ACTIVE / ARCHIVED / DELETED |
| isDeleted   | Soft delete flag            |
| createdBy   | User ID of creator (FK)     |
| createdAt   | Creation timestamp          |
| updatedAt   | Last update timestamp       |

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. Admin generates an invite link
2. User registers using invite token
3. Password is hashed using bcryptjs
4. User logs in and receives JWT
5. Protected routes require the header:  
   `Authorization: Bearer <token>`

### Role-Based Access Control (RBAC)

- **ADMIN** – Full system access
- **MANAGER** – Create & view projects
- **STAFF** – Create & view projects

---

## 🔗 API Endpoints

---

## Authentication

| Method | Endpoint                  | Access | Description                |
| ------ | ------------------------- | ------ | -------------------------- |
| POST   | /auth/login               | Public | Login User & receive token |
| POST   | /auth/invite              | ADMIN  | Generate invite link       |
| POST   | /auth/register-via-invite | Public | Register using invite      |

---

## Users (ADMIN Only)

| Method | Endpoint          | Access | Description               |
| ------ | ----------------- | ------ | ------------------------- |
| GET    | /users            | ADMIN  | Get all users (paginated) |
| PATCH  | /users/:id/role   | ADMIN  | Update user role          |
| PATCH  | /users/:id/status | ADMIN  | ACTIVE / INACTIVE user    |

---

## Projects

| Method | Endpoint      | Access             | Description                  |
| ------ | ------------- | ------------------ | ---------------------------- |
| POST   | /projects     | Authenticated User | Create a Project             |
| GET    | /projects     | Authenticated User | Get all Projects             |
| PATCH  | /projects/:id | ADMIN              | Update Project               |
| DELETE | /projects/:id | ADMIN              | Delete Project (soft delete) |

---

## 🔒 Security Considerations

- Passwords hashed with bcrypt
- JWT-based stateless authentication
- Role-based middleware enforcement
- Invite tokens generated using crypto.randomBytes
- Token uniqueness enforced at DB level
- PostgreSQL SSL enforced (sslmode=verify-full)
- Soft delete prevents data loss

---

## ⚙️ Installation & Setup

Prerequisites:

- Node.js (v20.19+)
- PostgreSQL / Neon DB
- npm

Clone Repository:

```bash
git clone < repository link >
cd project-management-system-server
```

Install Dependencies:

```bash
npm install
```

Environment Variables:
Create a `.env` file in the root of your project and add the following:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/db?sslmode=verify-full
JWT_SECRET=your_secure_jwt_secret
PORT=5000
```

---

Run Prisma:

```bash
npx prisma migrate dev
npx prisma generate
```

---

Start Server:

```bash
npm run dev
```

## 🧪 Application Flow (Quick Test)

1. Seed or create an ADMIN user
2. Login as ADMIN
3. Generate invite link
4. Register new user via invite
5. Login as invited user
6. Create project
7. Manage users/projects as ADMIN

---

## 👤 Author

Kanak Ray

- Full Stack Developer
- (Node.js · Express.js · TypeScript · PostgreSQL · Prisma)

---

## 📄 License

This project is intended for educational and demonstration purposes.
