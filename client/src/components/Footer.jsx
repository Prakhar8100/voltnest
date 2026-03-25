import { Link } from 'react-router-dom';
import { BsLightningChargeFill } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bg-dark-tech-light border-t border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <BsLightningChargeFill className="text-ev-cyan text-xl" />
            <span className="font-display font-bold text-lg tracking-wider text-slate-400">
              VOLT<span className="text-ev-cyan">NEST</span>
            </span>
          </div>
          <div className="text-slate-500 font-body text-sm">
            &copy; {new Date().getFullYear()} VoltNest Platform. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0 font-body text-sm">
            <Link to="#" className="text-slate-400 hover:text-ev-cyan transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-slate-400 hover:text-ev-cyan transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
