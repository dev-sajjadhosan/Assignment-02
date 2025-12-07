<br/>
<br/>
<h1 align='center'>ORDO System Server</h1>
<br/>

# 🚗 Vehicle Rental Management API

A backend service designed to manage vehicles, users, and rental bookings efficiently.

## 🚀 Live API URL

### Base URL: [https://ordov1.vercel.app/api/v1](https://ordov1.vercel.app/api/v1)

## 📌 Features

- **User Authentication** (JWT protected)
  - Register
  - Login
- **Vehicle Management**
  - Fetch/Get vehicles
  - Add
  - Edit
  - Delete
- **Booking Management**

  - Fetch / Get bookings
  - Create booking
    - manage dates
    - total price calculation
  - Update booking status
    - (Pending → Approved/Rejected → Completed)

- **Secure API** with JWT, encrypted passwords, validation layers

- **Centralized Error Handling** for consistent responses

## 🛠️ Technology Stack

### **Backend:**

- **Node.js** + **TypeScript**
- **Express.js** (web framework)
- **PostgreSQL** (database)
- **bcrypt** (password hashing)
- **jsonwebtoken** (JWT authentication)

### **Development Tools:**

- tsx
  - We are using it for to Auto-Run the TS server when something change on code.
- dotenv
  - Loads environment variables from a .env file, ensuring secure and centralized configuration management.
- Postman
  - Used for testing, debugging, and validating all API endpoints during development.

## ⚙️ Setup Instructions

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/your-repo.git

cd your-repo
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Variables**

Create a `.env` file:

```
PORT=5000

DATABASE_URL=your_postgres_connection_url

JWT_SECRET=your_secret_key
```

### **4. Run the Development Server**

```bash
npm run dev
```

### **5. Run Production Server**

```bash
npm start
```
---
---

## 📘 API Usage Guide

### **Base Path:**

```
/api/v1
```
---
---

### **Auth Routes**

#### Login with exgisting User & Get Token
```
POST /api/v1/auth/signin
```
---
#### Create new User

```
POST /api/v1/auth/signup
```

---
---

### **Users Routes**

#### View all users in the system (admin only)

```
GET /api/v1/users
```
---
#### Update User (Admin or Own)

- Admin: Update any user's role or details
- Customer: Update own profile only

```
PUT /api/v1/users/:userId
```
---
#### Delete User (Admin)

- (only if no active bookings exist)

```
DELETE /api/v1/users/:userId
```

---
---

### **Vehicle Routes**

#### Fetch/Get all vehicles

```
GET /api/v1/vehicles
```
---
#### Fetch/Get single vehicle

```
GET /api/v1/vehicle/:vehicleId
```
---
#### Add a new vehicle (admin only)

```
POST /api/v1/vehicles
```
---
#### Update vehicle (admin only)

```
PUT /api/v1/vehicles/:vehicleId
```
---
#### Delete vehicle (admin only)

```
DELETE /api/v1/vehicles/:vehicleId
```
---
---

### **Booking Routes**

#### Fetch/Get all bookings (Role-based)
  - Admin: View all bookings
  - Customer: View own bookings only
```
GET /api/v1/bookings
```
---
#### Create booking (admin / customer only)

- Create booking with start/end dates
  - Validates vehicle availability
  - Calculates total price (daily rate × duration)
  - Updates vehicle status to "booked"

```
POST /api/v1/bookings
```
---
#### Update booking status (Role-based)
  - Customer: Cancel booking (before start date only)
  - Admin: Mark as "returned" (updates vehicle to "available")
  - System: Auto-mark as "returned" when period ends
```
PUT /api/v1/bookings/:bookingId
```
---
---
<br/>

## 📂 Project Folder Structure

```
src/
 │
 ├─ auth/
 │   ├─ auth.routes.ts
 │   ├─ auth.controllers.ts
 │   └─ auth.services.ts
 │
 ├─ config/
 │   ├─ db.ts
 │   └─ index.ts
 │
 ├─ helpers/
 │   ├─ handlePassword.ts
 │   └─ timeFormatter.ts
 │
 ├─ middlewares/
 │   ├─ logger.ts
 │   └─ auth.ts
 │
 ├─ modules/
 │   ├─ vehicles/
 │   │   ├─ vehicles.routes.ts
 │   │   ├─ vehicle.controllers.ts
 │   │   └─ vehicle.services.ts
 │   └─ users/
 │   │   ├─ users.routes.ts
 │   │   ├─ users.controllers.ts
 │   │   └─ users.services.ts
 │   └─ bookings/
 │       ├─ bookings.routes.ts
 │       ├─ bookings.controllers.ts
 │       └─ bookings.services.ts
 │
 ├─ types/
 │   └─ express/
 │      └─ index.d.ts
 │
 ├─ server.ts
 ├─ .env
 │
 ├─ ...

```

## 🧪 Testing

### Use _Postman_ or _Thunder Client_ for testing requests.

Protected routes require:

```
Authorization: Bearer <token>
```

## 📄 License

MIT License – free for personal and commercial use.
