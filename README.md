# VoltNest ⚡

VoltNest is a premium, high-tech EV (Electric Vehicle) Charging Station Management and Booking Platform. It features a stunning **dark-tech aesthetic** with a focus on immersive user experience, real-time data, and seamless booking flows.

## 🚀 Recent Updates
*   **Dynamic Responsive UI**: Completely redesigned Login and Register pages with a sophisticated two-column layout for desktop and a fluid, touch-optimized experience for mobile.
*   **Advanced Mini-Animations**: Integrated custom CSS "blob" animations and blurred glassmorphism effects for a premium "Apple-like" feel.
*   **Smart Navigation**: The Navbar now dynamically updates based on authentication state, hiding login/signup buttons and showing a context-aware Dashboard (Admin vs. User) and Logout option.
*   **Enhanced Station Discovery**: Improved search logic allowing users to find stations by name, city, or address instantly.

## 🌟 Key Features

**For EV Drivers (Users):**
*   **Station Finder:** Search and filter stations by name, city, or charger type (AC/DC/Fast) with live availability.
*   **Premium Dashboards:** Track active charging progress via animated gauges and manage your booking history.
*   **Seamless Booking:** Reserve specific slots with date/duration mapping tailored to your vehicle.
*   **Secure Auth:** JWT-based authentication with high-end, responsive form layouts.

**For Station Owners (Admins):**
*   **Full Network Control:** Comprehensive CRUD management for charging locations via interactive modals.
*   **Deep Analytics:** Monitor revenue, site performance, and charger utilization statistics through a high-tech data interface.
*   **Auto-Routing:** Intelligent redirection based on user role immediately upon login.

## 🛠️ Tech Stack

**Frontend (`/client`)**
*   **React.js (Vite)**: Lighting fast HMR development.
*   **Tailwind CSS v4**: Utilizing the latest `@theme` engine for custom brand variables.
*   **Glassmorphism & SFX**: Custom backdrop filters and CSS keyframe animations (`animate-blob`, `animate-fade-in`).
*   **React Router v6**: Protected and role-based routing.
*   **Lucide & React Icons**: Modern iconography.

**Backend (`/server`)**
*   **Node.js & Express**: High-performance RESTful API.
*   **MongoDB & Mongoose**: Flexible document storage.
*   **Stateless Auth**: JWT (JSON Web Tokens) with secure cookie/header storage.
*   **Security**: Bcryptjs hashing and CORS protection.

## 🏁 Getting Started

### Prerequisites
*   Node.js (v18+ recommended)
*   MongoDB Instance (Local or Atlas)

### Installation

1.  **Clone the Repo:**
    ```bash
    git clone <repository-url>
    cd voltnest
    ```

2.  **Backend Setup:**
    ```bash
    cd server
    npm install
    # Create .env with MONGO_URI and JWT_SECRET
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../client
    npm install
    ```

### ⚡ Running Locally

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

## 📜 License
MIT License.
