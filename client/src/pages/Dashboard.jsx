import { useState } from 'react';
import { MdDashboard, MdHistory, MdPerson, MdSettings, MdExitToApp } from 'react-icons/md';
import { BsLightningChargeFill } from 'react-icons/bs';
import ChargingProgress from '../components/ChargingProgress';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Sessions', value: '24', unit: '' },
    { label: 'Energy Consumed', value: '840.5', unit: 'kWh' },
    { label: 'Money Spent', value: '$285.40', unit: '' },
    { label: 'CO₂ Saved', value: '312', unit: 'kg' },
  ];

  const bookings = [
    { id: 'VN-A4B7D2', station: 'VoltHub Downtown', date: '2026-03-22', time: '14:30', status: 'Completed', cost: '$12.40' },
    { id: 'VN-C9M2R1', station: 'TechPark Superchargers', date: '2026-03-18', time: '09:00', status: 'Completed', cost: '$18.50' },
    { id: 'VN-X8L5Y0', station: 'EcoCharge Mall', date: '2026-03-26', time: '16:00', status: 'Upcoming', cost: 'Est. $15.00' },
    { id: 'VN-P2K9J4', station: 'City Plaza Charging', date: '2026-03-10', time: '11:15', status: 'Cancelled', cost: '$0.00' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return <span className="text-ev-green bg-ev-green/10 px-2 py-1 rounded text-xs font-bold border border-ev-green/20">COMPLETED</span>;
      case 'Upcoming': return <span className="text-ev-cyan bg-ev-cyan/10 px-2 py-1 rounded text-xs font-bold border border-ev-cyan/20">UPCOMING</span>;
      case 'Cancelled': return <span className="text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs font-bold border border-red-400/20">CANCELLED</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
  
      <div className="w-full md:w-64 shrink-0 space-y-2">
        <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-6 mb-6">
          <div className="w-16 h-16 bg-slate-700 rounded-full mx-auto mb-4 border-2 border-ev-cyan overflow-hidden">
            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-center font-display font-bold text-lg text-white">Alex Mercer</h2>
          <p className="text-center text-slate-400 text-sm font-body">Premium Member</p>
        </div>

        <nav className="bg-dark-tech-light border border-slate-800 rounded-xl overflow-hidden font-body flex flex-row md:flex-col overflow-x-auto">
          <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 w-full p-4 text-left transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'bg-ev-cyan/10 text-ev-cyan border-l-4 border-ev-cyan' : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'}`}>
            <MdDashboard className="text-xl shrink-0" /> <span className="hidden sm:inline">Overview</span>
          </button>
          <button onClick={() => setActiveTab('history')} className={`flex items-center gap-3 w-full p-4 text-left transition-colors whitespace-nowrap ${activeTab === 'history' ? 'bg-ev-cyan/10 text-ev-cyan border-l-4 border-ev-cyan' : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'}`}>
            <MdHistory className="text-xl shrink-0" /> <span className="hidden sm:inline">Booking History</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 w-full p-4 text-left transition-colors whitespace-nowrap ${activeTab === 'profile' ? 'bg-ev-cyan/10 text-ev-cyan border-l-4 border-ev-cyan' : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'}`}>
            <MdPerson className="text-xl shrink-0" /> <span className="hidden sm:inline">Profile Details</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 w-full p-4 text-left transition-colors whitespace-nowrap ${activeTab === 'settings' ? 'bg-ev-cyan/10 text-ev-cyan border-l-4 border-ev-cyan' : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'}`}>
            <MdSettings className="text-xl shrink-0" /> <span className="hidden sm:inline">Settings</span>
          </button>
          <button className="flex items-center gap-3 w-full p-4 text-left text-red-400 hover:bg-red-400/10 transition-colors whitespace-nowrap border-l-4 border-transparent mt-auto hidden md:flex">
            <MdExitToApp className="text-xl shrink-0" /> <span>Logout</span>
          </button>
        </nav>
      </div>


      <div className="flex-1 space-y-8">
        
        
        {activeTab === 'overview' && (
          <div className="bg-gradient-to-br from-[#0a1520] to-dark-tech-light border border-ev-green/30 rounded-xl p-6 sm:p-8 shadow-[0_0_20px_rgba(0,255,135,0.05)] relative overflow-hidden">
            <div className="absolute -right-10 -top-10 text-ev-green/5">
              <BsLightningChargeFill className="text-9xl" />
            </div>
            <h3 className="text-white font-display font-bold text-xl mb-6 flex items-center gap-2 relative z-10">
              Active Session <span className="w-2 h-2 bg-ev-green rounded-full animate-ping"></span>
            </h3>
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div>
                <div className="text-slate-400 font-body text-sm mb-1 uppercase tracking-wider">Station</div>
                <div className="text-white font-bold text-lg mb-4">VoltHub Downtown - Slot A2</div>
                <div className="text-slate-400 font-body text-sm mb-1 uppercase tracking-wider">Energy Delivered</div>
                <div className="text-ev-cyan font-bold text-2xl">45.2 kWh</div>
              </div>
              <div className="flex flex-col justify-center">
                 <ChargingProgress percentage={68} timeRemaining="12m" />
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-700/50 flex justify-end">
              <button className="text-red-400 border border-red-400/30 hover:bg-red-400/10 px-4 py-2 rounded text-sm font-bold font-body transition-colors">
                Stop Charging
              </button>
            </div>
          </div>
        )}

        
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-dark-tech-light border border-slate-800 rounded-xl p-6">
                <div className="text-slate-400 text-xs sm:text-sm font-body uppercase tracking-wider mb-2">{stat.label}</div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {stat.value} <span className="text-lg text-slate-500 font-bold">{stat.unit}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        
        {(activeTab === 'overview' || activeTab === 'history') && (
          <div className="bg-dark-tech-light border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-white font-display font-bold text-xl">Recent Bookings</h3>
              {activeTab === 'overview' && (
                <button onClick={() => setActiveTab('history')} className="text-ev-cyan text-sm hover:text-white transition-colors">View All</button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-sm">
                <thead className="bg-slate-800/50 text-slate-400 uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-6 py-4">Booking ID</th>
                    <th className="px-6 py-4">Station</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {bookings.map((booking, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-slate-300">{booking.id}</td>
                      <td className="px-6 py-4 text-white">{booking.station}</td>
                      <td className="px-6 py-4 text-slate-400">{booking.date} <br/> <span className="text-xs text-slate-500">{booking.time}</span></td>
                      <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                      <td className="px-6 py-4 text-right font-bold text-white">{booking.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
    
        {(activeTab === 'profile' || activeTab === 'settings') && (
          <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-8 text-center text-slate-400 font-body">
            This section is currently under development.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
