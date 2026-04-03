import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MdDashboard, MdHistory, MdPerson, MdSettings, MdExitToApp, MdClose, MdSend } from 'react-icons/md';
import { BsLightningChargeFill } from 'react-icons/bs';
import ChargingProgress from '../components/ChargingProgress';
import api from '../services/api';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Form State
  const [profileForm, setProfileForm] = useState({ name: '', phone: '' });
  const [profileMessage, setProfileMessage] = useState('');
  const [profileImageFile, setProfileImageFile] = useState('');

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImageFile(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Chat State
  const [activeChatBooking, setActiveChatBooking] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'admin', text: 'Hello! How can I help you with your session?' }
  ]);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
    if (user) {
      setProfileForm({ name: user.name || '', phone: user.phone || '' });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings/my');
        setBookings(data.data);
      } catch (err) { } finally {
        setLoadingBookings(false);
      }
    };
    if (user) fetchBookings();
  }, [user]);

  if (loading || !user) return null;

  const activeBooking = bookings.find(b => b.status === 'active');
  const upcomingBooking = bookings.find(b => b.status === 'upcoming');

  const totalKwh = bookings.reduce((sum, b) => sum + (b.kwhConsumed || 0), 0);
  const totalMoney = bookings.reduce((sum, b) => sum + (b.totalCost || 0), 0);
  const totalCo2 = (totalKwh * 0.4).toFixed(1);

  const stats = [
    { label: 'Total Sessions', value: bookings.length, unit: '' },
    { label: 'Energy Consumed', value: totalKwh.toFixed(1), unit: 'kWh' },
    { label: 'Money Spent', value: `$${totalMoney.toFixed(2)}`, unit: '' },
    { label: 'CO₂ Saved', value: totalCo2, unit: 'kg' },
  ];

  const handleStartCharging = async (bookingId) => {
    setIsUpdating(true);
    try {
      await api.patch(`/bookings/${bookingId}/status`, { status: 'active' });
      // Refresh bookings
      const { data } = await api.get('/bookings/my');
      setBookings(data.data);
    } catch (err) {
      alert('Failed to start charging');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStopCharging = async (bookingId) => {
    setIsUpdating(true);
    try {
      await api.patch(`/bookings/${bookingId}/status`, { status: 'completed' });
      // Refresh bookings
      const { data } = await api.get('/bookings/my');
      setBookings(data.data);
    } catch (err) {
      alert('Failed to stop charging');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...profileForm };
      if (profileImageFile) payload.profileImage = profileImageFile;
      await api.put('/users/profile', payload);
      setProfileMessage('Profile updated successfully! Refreshing...');
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setProfileMessage('Error updating profile');
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, { sender: 'user', text: chatMessage }]);
    const currentMessage = chatMessage;
    setChatMessage('');
    
    // Auto-responder mock
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        sender: 'admin', 
        text: `Admin received: "${currentMessage}". We will check the station immediately.` 
      }]);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <span className="text-ev-green bg-ev-green/10 px-2 py-1 rounded text-xs font-bold border border-ev-green/20">COMPLETED</span>;
      case 'active': return <span className="text-ev-cyan bg-ev-cyan/10 px-2 py-1 rounded text-xs font-bold border border-ev-cyan/20">ACTIVE</span>;
      case 'upcoming': return <span className="text-blue-400 bg-blue-400/10 px-2 py-1 rounded text-xs font-bold border border-blue-400/20">UPCOMING</span>;
      case 'cancelled': return <span className="text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs font-bold border border-red-400/20">CANCELLED</span>;
      default: return <span className="text-slate-400 bg-slate-400/10 px-2 py-1 rounded text-xs font-bold border border-slate-400/20">{status?.toUpperCase()}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
  
      <div className="w-full md:w-64 shrink-0 space-y-2">
        <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-6 mb-6">
          <div className="w-16 h-16 bg-slate-700 rounded-full mx-auto mb-4 border-2 border-ev-cyan overflow-hidden flex items-center justify-center">
            {user?.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <MdPerson className="text-4xl text-slate-400" />
            )}
          </div>
          <h2 className="text-center font-display font-bold text-lg text-white">{user?.name}</h2>
          <p className="text-center text-slate-400 text-sm font-body">{user?.role === 'admin' ? 'Station Owner' : 'EV Driver'}</p>
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
          <button onClick={logout} className="flex items-center gap-3 w-full p-4 text-left text-red-400 hover:bg-red-400/10 transition-colors whitespace-nowrap border-l-4 border-transparent mt-auto hidden md:flex">
            <MdExitToApp className="text-xl shrink-0" /> <span>Logout</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 space-y-8">
        
        {activeTab === 'overview' && activeBooking && (
          <div className="bg-gradient-to-br from-[#0a1520] to-dark-tech-light border border-ev-green/30 rounded-xl p-6 sm:p-8 shadow-[0_0_20px_rgba(0,255,135,0.05)] relative overflow-hidden transition-all animate-pulse-slow">
            <div className="absolute -right-10 -top-10 text-ev-green/5">
              <BsLightningChargeFill className="text-9xl" />
            </div>
            <h3 className="text-white font-display font-bold text-xl mb-6 flex items-center gap-2 relative z-10">
              Active Session <span className="w-2 h-2 bg-ev-green rounded-full animate-ping"></span>
            </h3>
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div>
                <div className="text-slate-400 font-body text-sm mb-1 uppercase tracking-wider">Station</div>
                <div className="text-white font-bold text-lg mb-4">{activeBooking.stationId?.name || 'VoltNest Station'}</div>
                <div className="text-slate-400 font-body text-sm mb-1 uppercase tracking-wider">Energy Delivered</div>
                <div className="text-ev-cyan font-bold text-2xl">{activeBooking.kwhConsumed?.toFixed(2) || '0.00'} kWh</div>
              </div>
              <div className="flex flex-col justify-center">
                 <ChargingProgress percentage={65} timeRemaining="25m" isLive={true} />
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-700/50 flex justify-end">
              <button 
                onClick={() => handleStopCharging(activeBooking._id)} 
                disabled={isUpdating}
                className="text-red-400 border border-red-400/30 hover:bg-red-400/10 px-4 py-2 rounded text-sm font-bold font-body transition-colors disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Stop Charging'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'overview' && !activeBooking && upcomingBooking && (
          <div className="bg-dark-tech-light border border-blue-500/30 rounded-xl p-6 sm:p-8 relative overflow-hidden transition-all">
             <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h3 className="text-white font-display font-bold text-xl mb-2 items-center gap-2">Next Session</h3>
                  <p className="text-slate-400 font-body">{upcomingBooking.stationId?.name} at {upcomingBooking.startTime}</p>
                </div>
                <button 
                  onClick={() => handleStartCharging(upcomingBooking._id)}
                  disabled={isUpdating}
                  className="bg-ev-green text-dark-tech px-6 py-2 rounded-lg font-bold font-body hover:bg-[#00e676] transition-all shadow-[0_0_15px_rgba(0,255,135,0.3)]"
                >
                  {isUpdating ? 'Starting...' : 'Start Charging Now'}
                </button>
             </div>
          </div>
        )}

        {activeTab === 'overview' && !activeBooking && !upcomingBooking && (
           <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-10 text-center">
              <div className="mb-4 text-slate-500"><MdDashboard className="text-5xl mx-auto" /></div>
              <h3 className="text-white font-display font-bold text-xl mb-2">No Active Sessions</h3>
              <p className="text-slate-400 font-body mb-6">Ready to hit the road? Book your next charge today.</p>
              <button 
                onClick={() => navigate('/stations')}
                className="bg-ev-cyan text-dark-tech px-8 py-3 rounded-xl font-bold font-body hover:bg-[#00D4FF] transition-all shadow-[0_0_20px_rgba(0,212,255,0.2)]"
              >
                Find a Station
              </button>
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
                    <th className="px-6 py-4">Status & Chat</th>
                    <th className="px-6 py-4 text-right">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {loadingBookings ? (
                    <tr><td colSpan="5" className="text-center py-6 text-slate-400">Loading bookings...</td></tr>
                  ) : bookings.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-6 text-slate-400">No recent bookings found.</td></tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-slate-300">{booking._id.substring(0, 8)}</td>
                        <td className="px-6 py-4 text-white">{booking.stationId?.name || 'Unknown Station'}</td>
                        <td className="px-6 py-4 text-slate-400">{new Date(booking.date).toLocaleDateString()} <br/> <span className="text-xs text-slate-500">{booking.startTime}</span></td>
                        <td className="px-6 py-4 flex items-center gap-3">
                          {getStatusBadge(booking.status)}
                          <button onClick={() => setActiveChatBooking(booking)} className="text-xs bg-slate-700 hover:bg-ev-cyan hover:text-dark-tech px-2 py-1 rounded font-bold transition-colors">
                            💬 Chat
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-white">${booking.totalCost}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-8">
            <h3 className="text-white font-display font-bold text-xl mb-6">Profile Details</h3>
            <form onSubmit={handleProfileUpdate} className="max-w-md space-y-4 font-body">
               {profileMessage && <div className="bg-green-500/10 text-green-400 border border-green-500/30 p-3 rounded text-sm">{profileMessage}</div>}
               
               {/* Profile Image Preview & Upload */}
               <div className="flex items-center gap-4 pb-4 border-b border-slate-700/50">
                 <div className="w-20 h-20 rounded-full border-2 border-ev-cyan overflow-hidden bg-slate-700 flex items-center justify-center shrink-0">
                   {profileImageFile ? (
                     <img src={profileImageFile} alt="Preview" className="w-full h-full object-cover" />
                   ) : user?.profileImage ? (
                     <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                   ) : (
                     <MdPerson className="text-4xl text-slate-400" />
                   )}
                 </div>
                 <div className="flex-1">
                   <label className="block text-sm text-slate-400 mb-1">Profile Picture</label>
                   <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="w-full bg-dark-tech border border-slate-700 rounded p-2 text-white text-sm" />
                   <p className="text-xs text-slate-500 mt-1">JPG, PNG or GIF. Recommended: square image.</p>
                 </div>
               </div>

               <div>
                 <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                 <input type="text" className="w-full bg-dark-tech border border-slate-700 rounded p-2 text-white" value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} />
               </div>
               <div>
                 <label className="block text-sm text-slate-400 mb-1">Phone Number</label>
                 <input type="text" className="w-full bg-dark-tech border border-slate-700 rounded p-2 text-white" value={profileForm.phone} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} placeholder="+1 234 567 890" />
               </div>
               <button className="bg-ev-cyan text-dark-tech px-4 py-2 rounded font-bold mt-4 hover:bg-[#00D4FF] transition-colors" type="submit">Update Profile</button>
            </form>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-8">
            <h3 className="text-white font-display font-bold text-xl mb-6">Account Settings</h3>
            <div className="space-y-4 font-body">
              <label className="flex items-center space-x-3 text-slate-300">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-ev-green bg-dark-tech border-slate-700 rounded focus:ring-ev-green focus:ring-2" /> 
                <span>Email Booking Confirmations</span>
              </label>
              <label className="flex items-center space-x-3 text-slate-300">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-ev-green bg-dark-tech border-slate-700 rounded focus:ring-ev-green focus:ring-2" /> 
                <span>SMS Charging Alerts (Session Completed)</span>
              </label>
              <label className="flex items-center space-x-3 text-slate-300">
                <input type="checkbox" className="w-4 h-4 text-ev-green bg-dark-tech border-slate-700 rounded focus:ring-ev-green focus:ring-2" /> 
                <span>Marketing & Promotional Offers</span>
              </label>
              <label className="flex items-center space-x-3 text-slate-300 pb-4 border-b border-slate-700/50">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-ev-green bg-dark-tech border-slate-700 rounded focus:ring-ev-green focus:ring-2" /> 
                <span>Global Dark Mode Interface</span>
              </label>
            </div>
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded font-bold transition-colors mt-6 font-body">Save Configurations</button>
          </div>
        )}
      </div>

      {activeChatBooking && (
        <div className="fixed inset-0 z-50 flex justify-end items-end p-4 pointer-events-none">
           <div className="w-full max-w-sm bg-dark-tech border border-slate-700 rounded-t-xl rounded-bl-xl shadow-2xl pointer-events-auto flex flex-col h-[500px] font-body overflow-hidden">
              <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
                 <div>
                   <h3 className="text-white font-bold">{activeChatBooking.stationId?.name || 'Admin Chat'}</h3>
                   <p className="text-xs text-ev-green flex items-center gap-1"><span className="w-2 h-2 bg-ev-green rounded-full animate-pulse"></span> Station Admin Online</p>
                 </div>
                 <button onClick={() => setActiveChatBooking(null)} className="text-slate-400 hover:text-white"><MdClose size={24} /></button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto bg-dark-tech-light/50 space-y-4">
                 {chatHistory.map((msg, i) => (
                   <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[80%] rounded-xl p-3 text-sm ${msg.sender === 'user' ? 'bg-ev-cyan text-dark-tech rounded-br-none font-medium' : 'bg-slate-700 text-white rounded-bl-none'}`}>
                        {msg.text}
                     </div>
                   </div>
                 ))}
              </div>
              <form onSubmit={handleSendMessage} className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
                 <input 
                   type="text" 
                   value={chatMessage}
                   onChange={e => setChatMessage(e.target.value)}
                   className="flex-1 bg-dark-tech border border-slate-600 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-ev-cyan"
                   placeholder="Message station admin..."
                 />
                 <button type="submit" className="w-10 h-10 rounded-full bg-ev-cyan flex items-center justify-center text-dark-tech hover:bg-[#00D4FF] transition-colors shrink-0">
                    <MdSend size={18} />
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
