# VoltNest ⚡

VoltNest is a premium, high-tech EV (Electric Vehicle) Charging Station Management and Booking Platform. It features a stunning **dark-tech aesthetic** with a focus on immersive user experience, real-time data, and seamless booking flows.

## 🚀 Recent Updates
*   **Interactive Dark Maps**: Integrated `React-Leaflet` with a custom dark-themed CartoDB map layer, allowing users to visually browse stations alongside directory listings on both desktop and mobile.
*   **Dynamic Responsive UI**: Completely redesigned Login and Register pages with a sophisticated two-column layout for desktop and a fluid, touch-optimized experience for mobile.
*   **Premium Micro-Interactions**: Integrated `Framer Motion` for buttery soft spring physics, creating highly tactile buttons, staggered grid animations, and fluid modal transitions.
*   **Deep Glassmorphism Architect**: Overhauled the UI with intense `backdrop-blur-3xl`, semi-transparent layers, and etched borders over an ambient drifting dot-grid, creating a true "Apple-like" command center aesthetic.
*   **Live Radar Map Markers**: Replaced static pins with bespoke CSS-animated pulsating HTML map orbs indicating live availability directly on the Leaflet map.
*   **Skeleton Loaders**: Drastically improved perceived speed by replacing basic text loaders with sophisticated, shimmering skeleton placeholder cards.
*   **Global Toast Engine**: Migrated all disruptive inline alerts to elegant floating toast notifications using `react-hot-toast`.
*   **Smart Navigation**: The Navbar now dynamically updates based on authentication state, hiding login/signup buttons and showing a context-aware Dashboard (Admin vs. User) and Logout option.
*   **Advanced Data Visualization**: Integrated `Recharts` into the Admin panel for beautiful, interactive analytics charts covering revenue, bookings, and power consumption.
*   **Station Reviews & Ratings**: Implemented a comprehensive review system for charging stations, allowing users to leave star ratings and feedback.
*   **Real-time Charging Simulation**: Integrated robust back-end utilities to simulate live charging progress for active bookings.
*   **PWA Readiness**: Added `manifest.json` for Progressive Web App capabilities, paving the way for installable native-like mobile experiences.
*   **Enhanced Station Discovery**: Improved search logic allowing users to find stations by name, city, or address instantly.

## 🌟 Key Features

**For EV Drivers (Users):**
*   **Interactive Station Finder:** Search and filter stations using a beautiful, real-time map interface paired with live availability and custom marker popups.
*   **Premium Dashboards:** Track active charging progress via animated gauges and manage your booking history.
*   **Seamless Booking:** Reserve specific slots with date/duration mapping tailored to your vehicle.
*   **Community Reviews:** Read and write reviews for charging stations to help the EV community make informed decisions.
*   **Secure Auth:** JWT-based authentication with high-end, responsive form layouts.

**For Station Owners (Admins):**
*   **Full Network Control:** Comprehensive CRUD management for charging locations via interactive modals.
*   **Deep Analytics:** Monitor revenue, site performance, and charger utilization statistics through a high-tech data interface utilizing interactive Recharts.
*   **Auto-Routing:** Intelligent redirection based on user role immediately upon login.

## 🛠️ Tech Stack

**Frontend (`/client`)**
*   **React.js (Vite)**: Lighting fast HMR development.
*   **Tailwind CSS v4**: Utilizing the latest `@theme` engine for custom brand variables.
*   **React Leaflet**: Open-source, high-performance interactive maps with custom markers and CSS overrides.
*   **Glassmorphism & SFX**: Custom backdrop filters and CSS keyframe animations (`animate-blob`, `animate-fade-in`).
*   **React Router v6**: Protected and role-based routing.
*   **Framer Motion**: State-of-the-art physics-based animations and layout transitions.
*   **Lucide & React Icons**: Modern iconography.
*   **React Hot Toast**: Premium, customizable toast notifications.
*   **Recharts**: High-performance, composable charting library built on React components.

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
