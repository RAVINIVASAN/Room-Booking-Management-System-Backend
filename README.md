# Room Booking Management System – Backend

## 📌 Project Overview
This is a backend application for a Room Booking Management System.
It allows users to book rooms for specific time slots while ensuring that
the same room cannot be booked for overlapping time periods.

The system supports role-based access for USERS and ADMINS and uses
JWT authentication for security.

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Token)

---

## 👥 User Roles

### USER
- Register and login
- View available rooms
- Book a room for a time slot
- View own booking history

### ADMIN
- Login
- Create and manage rooms
- View all room bookings

---

## 🔐 Authentication & Authorization
- JWT-based authentication
- All protected routes require a valid JWT
- Role-based access control is enforced at the backend

---


## 📦 API Endpoints

### Auth
| Method | Endpoint | Description |
|------|---------|------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

### Rooms
| Method | Endpoint | Access |
|------|---------|--------|
| POST | /api/rooms | ADMIN |
| GET | /api/rooms | USER / ADMIN |

### Bookings
| Method | Endpoint | Access |
|------|---------|--------|
| POST | /api/bookings | USER |
| GET | /api/bookings/my | USER |
| GET | /api/bookings | ADMIN |

---

## 🗄️ Database Schema
- User: name, email, password, role
- Room: roomName, capacity, description
- Booking: user, room, startTime, endTime

---

## 🌍 Live Deployment
Backend URL: https://room-booking-management-system-backend.onrender.com

