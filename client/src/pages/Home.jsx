import { Link } from 'react-router-dom';
import { BsLightningChargeFill, BsLightningCharge } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { FiClock } from 'react-icons/fi';
import { AiOutlineSafety } from 'react-icons/ai';

const Home = () => {
  return (
    <div className="w-full">
    
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Placeholder - simple CSS gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-tech via-slate-900 to-[#002f1a] animate-pulse opacity-50 z-0"></div>
      
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ev-green/20 rounded-full blur-[120px] z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ev-cyan/20 rounded-full blur-[120px] z-0"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <BsLightningChargeFill className="text-ev-green text-6xl drop-shadow-[0_0_15px_rgba(0,255,135,0.8)]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
            Power Your Journey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-ev-green to-ev-cyan">Anywhere.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-body mb-10 max-w-2xl mx-auto">
            Find, book, and track next-generation EV charging stations in real-time. Join the revolution of seamless electric mobility.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/stations" className="bg-ev-green text-dark-tech font-bold font-body text-lg px-8 py-4 rounded hover:bg-[#00e676] transition-all shadow-[0_0_15px_rgba(0,255,135,0.4)] hover:shadow-[0_0_25px_rgba(0,255,135,0.6)] flex items-center justify-center gap-2">
              <MdLocationOn className="text-xl" /> Find a Station
            </Link>
            <Link to="/register" className="bg-dark-tech border border-ev-cyan text-ev-cyan font-bold font-body text-lg px-8 py-4 rounded hover:bg-ev-cyan/10 transition-all flex items-center justify-center gap-2">
              Get Started <BsLightningChargeFill />
            </Link>
          </div>
        </div>
      </section>


      <section className="border-y border-slate-800 bg-dark-tech-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-display font-bold text-ev-green mb-2">1,240+</div>
              <div className="text-slate-400 font-body uppercase tracking-wider text-sm">Total Stations</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-ev-cyan mb-2">4,800+</div>
              <div className="text-slate-400 font-body uppercase tracking-wider text-sm">Active Chargers</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-ev-green mb-2">85+</div>
              <div className="text-slate-400 font-body uppercase tracking-wider text-sm">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-ev-cyan mb-2">50k+</div>
              <div className="text-slate-400 font-body uppercase tracking-wider text-sm">Happy EV Users</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-dark-tech">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Why Choose VoltNest?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Experience the fastest, most reliable charging network designed for the modern electric vehicle driver.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-dark-tech-light p-8 rounded-lg border border-slate-800 hover:border-ev-green/50 transition-colors group">
              <div className="w-14 h-14 bg-ev-green/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-ev-green/20 transition-colors">
                <BsLightningCharge className="text-ev-green text-3xl" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Ultra-Fast Charging</h3>
              <p className="text-slate-400 text-sm">Access to premium DC fast chargers capable of adding 100 miles of range in just 10 minutes.</p>
            </div>
            
            <div className="bg-dark-tech-light p-8 rounded-lg border border-slate-800 hover:border-ev-cyan/50 transition-colors group">
              <div className="w-14 h-14 bg-ev-cyan/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-ev-cyan/20 transition-colors">
                <MdLocationOn className="text-ev-cyan text-3xl" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Live Availability</h3>
              <p className="text-slate-400 text-sm">See real-time station status. Never drive to a station only to find all chargers are occupied or broken.</p>
            </div>
            
            <div className="bg-dark-tech-light p-8 rounded-lg border border-slate-800 hover:border-ev-green/50 transition-colors group">
              <div className="w-14 h-14 bg-ev-green/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-ev-green/20 transition-colors">
                <FiClock className="text-ev-green text-3xl" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Advance Booking</h3>
              <p className="text-slate-400 text-sm">Reserve your charging slot ahead of time. Arrive, plug in, and charge instantly with zero waiting time.</p>
            </div>
            
            <div className="bg-dark-tech-light p-8 rounded-lg border border-slate-800 hover:border-ev-cyan/50 transition-colors group">
              <div className="w-14 h-14 bg-ev-cyan/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-ev-cyan/20 transition-colors">
                <AiOutlineSafety className="text-ev-cyan text-3xl" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Secure & Safe</h3>
              <p className="text-slate-400 text-sm">All our selected locations are well-lit, secure, and offer amenities while you wait for your vehicle to charge.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-24 bg-dark-tech-light border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-16">Trusted by Drivers</h2>
             <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-dark-tech p-8 rounded-lg border border-slate-800 relative">
                  <div className="text-ev-cyan text-4xl absolute top-4 left-4 opacity-20">"</div>
                  <p className="text-slate-300 italic mb-6 relative z-10 font-body text-lg">VoltNest completely changed my road trips. The ability to book a slot in advance means zero range anxiety.</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
                    <div>
                      <h4 className="font-display font-bold text-white text-sm">Sarah Jenkins</h4>
                      <p className="text-ev-green text-xs uppercase tracking-wider">Tesla Model 3 Owner</p>
                    </div>
                  </div>
                </div>
                <div className="bg-dark-tech p-8 rounded-lg border border-slate-800 relative">
                  <div className="text-ev-cyan text-4xl absolute top-4 left-4 opacity-20">"</div>
                  <p className="text-slate-300 italic mb-6 relative z-10 font-body text-lg">Sleek interface, super fast reliable updates on charger status. This is the app the EV community needed.</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
                    <div>
                      <h4 className="font-display font-bold text-white text-sm">Michael Chang</h4>
                      <p className="text-ev-cyan text-xs uppercase tracking-wider">Ford Mustang Mach-E</p>
                    </div>
                  </div>
                </div>
                <div className="bg-dark-tech p-8 rounded-lg border border-slate-800 relative">
                  <div className="text-ev-cyan text-4xl absolute top-4 left-4 opacity-20">"</div>
                  <p className="text-slate-300 italic mb-6 relative z-10 font-body text-lg">As a daily commuter, the real-time tracking gives me peace of mind. Simply the best charging app out there.</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
                    <div>
                      <h4 className="font-display font-bold text-white text-sm">Elena Rodriguez</h4>
                      <p className="text-ev-green text-xs uppercase tracking-wider">Hyundai Ioniq 5</p>
                    </div>
                  </div>
                </div>
             </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
