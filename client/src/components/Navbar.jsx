import { Link } from 'react-router-dom';
import { BsLightningChargeFill } from 'react-icons/bs';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-dark-tech/80 backdrop-blur-md border-b border-ev-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <BsLightningChargeFill className="text-ev-green text-2xl" />
            <span className="font-display font-bold text-xl tracking-wider text-white">
              VOLT<span className="text-ev-green">NEST</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8 font-body font-semibold text-lg">
            <Link to="/stations" className="text-slate-300 hover:text-white transition-colors">Stations</Link>
            <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</Link>
          </div>
          <div className="flex items-center space-x-4 font-body font-semibold">
            <Link to="/login" className="text-ev-cyan hover:text-white transition-colors">Log In</Link>
            <Link to="/register" className="bg-ev-green/10 text-ev-green border border-ev-green px-4 py-1.5 rounded-sm hover:bg-ev-green hover:text-dark-tech transition-colors shadow-[0_0_10px_rgba(0,255,135,0.2)] hover:shadow-[0_0_15px_rgba(0,255,135,0.5)]">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
