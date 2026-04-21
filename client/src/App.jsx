import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stations from './pages/Stations';
import StationDetail from './pages/StationDetail';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-[#0a0f18] text-slate-100 relative overflow-hidden">
            {/* Animated Dot-Grid Overlay */}
            <div className="fixed inset-0 z-0 bg-dot-grid animate-grid-drift opacity-60 pointer-events-none"></div>
            
            {/* Ambient Background Mesh for Glassmorphism */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-ev-green/5 blur-[120px] mix-blend-screen animate-blob"></div>
              <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-ev-cyan/5 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-blue-900/10 blur-[130px] mix-blend-screen animate-blob" style={{ animationDelay: '4s' }}></div>
            </div>
            
            <div className="relative z-10 flex flex-col min-h-screen">
            <Toaster 
              position="bottom-right" 
              toastOptions={{ 
                duration: 4000,
                style: { 
                  background: 'rgba(15, 23, 42, 0.8)', 
                  backdropFilter: 'blur(12px)',
                  color: '#fff', 
                  border: '1px solid rgba(0, 255, 135, 0.2)', 
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)' 
                },
                success: {
                  iconTheme: { primary: '#00FF87', secondary: '#0F172A' },
                  style: { borderColor: 'rgba(0, 255, 135, 0.4)' }
                },
                error: {
                  iconTheme: { primary: '#EF4444', secondary: '#0F172A' },
                  style: { borderColor: 'rgba(239, 68, 68, 0.4)' }
                }
              }} 
            />
            <Navbar />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stations" element={<Stations />} />
                <Route path="/stations/:id" element={<StationDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/resetpassword/:token" element={<ResetPassword />} />
              </Routes>
            </main>
            <Footer />
            </div>
          </div>
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
