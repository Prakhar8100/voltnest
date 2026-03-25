# VoltNest

VoltNest is a modern, high-tech EV (Electric Vehicle) Charging Station Management and Booking Platform. It provides a sleek, dark-tech aesthetic interface for EV drivers to locate active charging stations, view real-time charger availability, and securely reserve booking slots. For Station Owners, it features a comprehensive Admin panel to manage stations, track analytics, and handle users.

## Features

**For EV Drivers (Users):**
* **Station Finder:** Search and filter stations by city, charger type (AC/DC/Fast), and live availability status.
* **Real-time Availability:** View specific station slot details.
* **Advance Booking:** Reserve an exact EV charging slot for a specific date and duration mapping to your vehicle model.
* **Personal Dashboard:** Track upcoming/active reservations, past history, and active charging progress via an animated progress gauge.
* **Authentication:** Secure JWT-based user login and registration with Bcrypt password hashing.

**For Station Owners (Admins):**
* **Station Management:** Full CRUD (Create, Read, Update, Delete) capability over charging locations via an interactive modal table.
* **Network Analytics:** Monitor real-time system performance, total revenue, aggregated network charging statistics, and charger type distribution.
* **Advanced Routing:** Distinct automatic redirection from login to `/admin` utilizing protected routes.

## Tech Stack

**Frontend (`/client`)**
* React.js (Vite)
* Tailwind CSS v4 (Custom Dark-Tech theme with Orbitron & Rajdhani fonts)
* React Router DOM (v6)
* React Icons
* Axios (Custom API Interceptors)

**Backend (`/server`)**
* Node.js & Express
* MongoDB & Mongoose ORM
* JSON Web Tokens (JWT) for stateless authentication
* Bcryptjs for secure password hashing

## Getting Started

### Prerequisites
* Node.js (v18+ recommended)
* MongoDB (running locally on `localhost:27017` or a MongoDB Atlas URI)

### Installation

1. **Clone or Extract the Repository:**
   Navigate into the project root:
   ```bash
   cd voltnest
   ```

2. **Backend Setup:**
   Navigate to the server directory, install dependencies, and configure your environment.
   ```bash
   cd server
   npm install
   ```
   *Note: Ensure your `.env` contains `MONGO_URI=mongodb://localhost:27017/voltnest` and `JWT_SECRET`.*

3. **Frontend Setup:**
   Navigate to the client directory and install dependencies.
   ```bash
   cd ../client
   npm install
   ```

### Seeding the Database (Optional but Recommended)
To populate the database with realistic administrative profiles and diverse EV stations:
```bash
cd server
npm run seed
```

This generates two sample accounts covering the authorization scope:
* **Admin:** `admin@voltnest.com` | pass: `password123`
* **Driver:** `driver@voltnest.com` | pass: `password123`

### Running the Application Structure

The project runs in disparate node instances across terminal sessions.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```


**Terminal 2 (Frontend Proxy):**
```bash
cd client
npm run dev
```

## License
MIT License.
