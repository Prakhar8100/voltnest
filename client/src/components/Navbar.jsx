import { Link } from 'react-router-dom';
import { BsLightningChargeFill } from 'react-icons/bs';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed w-full z-50 bg-[#0F172A]/40 backdrop-blur-2xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.2)] shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <BsLightningChargeFill className="text-ev-green text-2xl" />
            <span className="font-display font-bold text-xl tracking-wider text-white">
              VOLT<span className="text-ev-green">NEST</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8 font-body font-semibold text-lg">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/stations" className="text-slate-300 hover:text-white transition-colors">Stations</Link>
            </motion.div>
            {user && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to={user.role === 'admin' ? "/admin" : "/dashboard"} className="text-slate-300 hover:text-white transition-colors">
                  {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                </Link>
              </motion.div>
            )}
          </div>
          <div className="flex items-center space-x-4 font-body font-semibold">
            {!user ? (
              <>
                <MotionLink 
                  to="/login" 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="text-ev-cyan hover:text-white transition-colors"
                >
                  Log In
                </MotionLink>
                <MotionLink 
                  to="/register" 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="bg-ev-green/10 text-ev-green border border-ev-green px-4 py-1.5 rounded-sm hover:bg-ev-green hover:text-dark-tech transition-colors shadow-[0_0_10px_rgba(0,255,135,0.2)] hover:shadow-[0_0_15px_rgba(0,255,135,0.5)]"
                >
                  Sign Up
                </MotionLink>
              </>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                Log Out
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
