import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdInsertChart, MdEvStation, MdPeople, MdBook, MdAdd, MdEdit, MdDelete, MdClose, MdExitToApp, MdSend } from 'react-icons/md';
import { AuthContext } from '../context/AuthContext';
import { useStations } from '../hooks/useStations';
import api from '../services/api';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, loading: userLoading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && (!user || user.role !== 'admin')) {
      navigate('/login');
    }
  }, [user, userLoading, navigate]);

  const { stations, loading, error } = useStations();
  
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Edit State for Stations
  const [editingStationId, setEditingStationId] = useState(null);
  const [editFormData, setEditFormData] = useState({ totalSlots: 1, pricePerKwh: 0 });

  const handleEditClick = (st) => {
    setEditingStationId(st._id);
    setEditFormData({
      totalSlots: st.totalSlots || 1,
      pricePerKwh: st.pricePerKwh || 0
    });
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/stations/${editingStationId}`, editFormData);
      window.location.reload();
    } catch(err) {
      alert('Failed to update station settings');
    }
  };

  // Chat State
  const [activeChatBooking, setActiveChatBooking] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'user', text: 'Hello, I booked a slot but I might be 5 minutes late.' }
  ]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings');
        setBookings(data.data);
      } catch (err) {} finally {
        setLoadingBookings(false);
      }
    };
    if (user?.role === 'admin') fetchBookings();
  }, [user]);

  if (userLoading || !user || user.role !== 'admin') return null;
  
  
  const [isAddingStation, setIsAddingStation] = useState(false);
  const [formData, setFormData] = useState({
    name: '', address: '', city: '', lat: 0, lng: 0, chargerTypes: 'AC', totalSlots: 1, pricePerKwh: 0, imageBase64: ''
  });
  const [submitError, setSubmitError] = useState('');
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({...prev, imageBase64: reader.result}));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, { sender: 'admin', text: chatMessage }]);
    const currentMessage = chatMessage;
    setChatMessage('');
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        sender: 'user', 
        text: `Driver: Got it, thanks! Appreciate the quick update.` 
      }]);
    }, 1500);
  };
  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
  
      <div className="w-full md:w-64 shrink-0 space-y-2">
        <div className="bg-gradient-to-br from-ev-cyan/20 to-dark-tech-light border border-ev-cyan/30 rounded-xl p-6 mb-6">
          <h2 className="text-center font-display font-bold text-xl text-white">{user?.name || 'Admin Hub'}</h2>
          <p className="text-center text-ev-cyan text-sm font-body uppercase tracking-wider mt-1">Superuser</p>
        </div>

        <nav className="bg-dark-tech-light border border-slate-800 rounded-xl overflow-hidden font-body flex flex-row md:flex-col overflow-x-auto">
          <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 w-full p-4 text-left transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'bg-ev-green/10 text-ev-green border-l-4 border-ev-green' : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'}`}>
            <MdInsertChart className="text-xl shrink-0" /> <span className="hidden sm:inline">Analytics</span>
          </button>
          <button onClick={() => setActiveTab('stations')} className={`flex items-center gap-3 w-full p-4 text-left transition-colors whitespace-nowrap ${activeTab === 'stations' ? 'bg-ev-green/10 text-ev-green border-l-4 border-ev-green' : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'}`}>
            <MdEvStation className="text-xl shrink-0" /> <span className="hidden sm:inline">Manage Stations</span>
          </button>
          <button onClick={() => setActiveTab('bookings')} className={`flex items-center gap-3 w-full p-4 text-left transition-colors whitespace-nowrap ${activeTab === 'bookings' ? 'bg-ev-green/10 text-ev-green border-l-4 border-ev-green' : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'}`}>
            <MdBook className="text-xl shrink-0" /> <span className="hidden sm:inline">All Bookings</span>
          </button>
          <button onClick={() => setActiveTab('users')} className={`flex items-center gap-3 w-full p-4 text-left transition-colors whitespace-nowrap ${activeTab === 'users' ? 'bg-ev-green/10 text-ev-green border-l-4 border-ev-green' : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'}`}>
            <MdPeople className="text-xl shrink-0" /> <span className="hidden sm:inline">Users</span>
          </button>
          <button onClick={logout} className="flex items-center gap-3 w-full p-4 text-left text-red-400 hover:bg-red-400/10 transition-colors whitespace-nowrap border-l-4 border-transparent mt-auto hidden md:flex">
            <MdExitToApp className="text-xl shrink-0" /> <span>Logout</span>
          </button>
        </nav>
      </div>

  
      <div className="flex-1 space-y-8">
        
        
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-6">
                <div className="text-slate-400 font-body uppercase tracking-wider text-xs mb-2">Total Revenue</div>
                <div className="font-display font-bold text-3xl text-white">$45.2k</div>
              </div>
              <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-6">
                <div className="text-slate-400 font-body uppercase tracking-wider text-xs mb-2">Active Users</div>
                <div className="font-display font-bold text-3xl text-white">12.4k</div>
              </div>
              <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-6">
                <div className="text-slate-400 font-body uppercase tracking-wider text-xs mb-2">Total Sessions</div>
                <div className="font-display font-bold text-3xl text-white">84.1k</div>
              </div>
              <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-6">
                <div className="text-slate-400 font-body uppercase tracking-wider text-xs mb-2">Avg Session</div>
                <div className="font-display font-bold text-3xl text-white">42m</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              
              <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-6">
                 <h3 className="text-white font-display font-bold text-lg mb-6">Bookings (Last 7 Days)</h3>
                 <div className="flex items-end justify-between h-48 gap-2 pt-4">
                    {[40, 65, 45, 80, 55, 90, 75].map((val, i) => (
                      <div key={i} className="w-full bg-slate-800 rounded-t relative group">
                        <div className="absolute bottom-0 w-full bg-ev-cyan rounded-t transition-all group-hover:bg-[#00D4FF]" style={{ height: `${val}%` }}></div>
                        <div className="absolute -bottom-6 w-full text-center text-xs text-slate-500">D{i+1}</div>
                      </div>
                    ))}
                 </div>
              </div>
              
            
              <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-6">
                 <h3 className="text-white font-display font-bold text-lg mb-6">Charger Type Usage</h3>
                 <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1 font-body">
                        <span className="text-slate-300">DC Fast (CCS)</span>
                        <span className="text-white font-bold">65%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-ev-green w-[65%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1 font-body">
                        <span className="text-slate-300">Level 2 AC</span>
                        <span className="text-white font-bold">25%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-ev-cyan w-[25%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1 font-body">
                        <span className="text-slate-300">CHAdeMO</span>
                        <span className="text-white font-bold">10%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 w-[10%]"></div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </>
        )}

      
        {activeTab === 'stations' && (
          <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-display font-bold text-xl">{isAddingStation ? 'Create New Station' : 'Manage Stations'}</h3>
              <button 
                onClick={() => setIsAddingStation(!isAddingStation)}
                className={`px-4 py-2 rounded font-bold font-body flex items-center gap-1 transition-colors ${
                  isAddingStation ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-ev-green text-dark-tech hover:bg-[#00e676]'
                }`}
              >
                {isAddingStation ? <><MdClose /> Cancel</> : <><MdAdd /> Add Station</>}
              </button>
            </div>
            
            {isAddingStation ? (
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const payload = { ...formData, coordinates: { lat: formData.lat, lng: formData.lng }, chargerTypes: [formData.chargerTypes] };
                  if (formData.imageBase64) payload.images = [formData.imageBase64];
                  await api.post('/stations', payload);
                  window.location.reload(); // Quick refresh to show new data
                } catch (err) {
                  setSubmitError(err.response?.data?.message || 'Failed to create station');
                }
              }}>
                {submitError && <div className="text-red-500 bg-red-500/10 p-2 rounded">{submitError}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <input required type="text" placeholder="Station Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-dark-tech border border-slate-700 rounded p-2 text-white" />
                   <input required type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="bg-dark-tech border border-slate-700 rounded p-2 text-white" />
                   <input required type="text" placeholder="Full Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="bg-dark-tech border border-slate-700 rounded p-2 text-white col-span-1 md:col-span-2" />
                   <input required type="number" step="any" placeholder="Latitude" value={formData.lat} onChange={(e) => setFormData({...formData, lat: parseFloat(e.target.value)})} className="bg-dark-tech border border-slate-700 rounded p-2 text-white" />
                   <input required type="number" step="any" placeholder="Longitude" value={formData.lng} onChange={(e) => setFormData({...formData, lng: parseFloat(e.target.value)})} className="bg-dark-tech border border-slate-700 rounded p-2 text-white" />
                   <select value={formData.chargerTypes} onChange={(e) => setFormData({...formData, chargerTypes: e.target.value})} className="bg-dark-tech border border-slate-700 rounded p-2 text-white">
                      <option value="AC">Level 2 (AC)</option>
                      <option value="DC">DC Fast</option>
                      <option value="Fast">Ultra Fast</option>
                   </select>
                   <input required type="number" min="1" placeholder="Total Slots" value={formData.totalSlots} onChange={(e) => setFormData({...formData, totalSlots: parseInt(e.target.value)})} className="bg-dark-tech border border-slate-700 rounded p-2 text-white" />
                   <input required type="number" step="0.01" placeholder="Price Per kWh" value={formData.pricePerKwh} onChange={(e) => setFormData({...formData, pricePerKwh: parseFloat(e.target.value)})} className="bg-dark-tech border border-slate-700 rounded p-2 text-white" />
                   <div className="col-span-1 md:col-span-2">
                     <label className="block text-xs text-slate-300 font-body mb-1">Station Image Upload</label>
                     <input type="file" accept="image/*" onChange={handleImageUpload} className="bg-dark-tech border border-slate-700 rounded p-2 text-white w-full" />
                   </div>
                </div>
                <button type="submit" className="mt-4 bg-ev-cyan text-dark-tech px-6 py-2 rounded font-bold w-full md:w-auto hover:bg-[#00D4FF]">Save Station</button>
              </form>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-body text-sm">
                  <thead className="bg-slate-800/50 text-slate-400 uppercase tracking-wider text-xs">
                    <tr>
                      <th className="px-6 py-4">Station Name</th>
                      <th className="px-6 py-4">City</th>
                      <th className="px-6 py-4">Chargers</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {loading ? (
                      <tr><td colSpan="5" className="text-center py-4 text-slate-400">Loading stations...</td></tr>
                    ) : error ? (
                      <tr><td colSpan="5" className="text-center py-4 text-red-400">{error}</td></tr>
                    ) : (
                      stations.map(st => (
                        <tr key={st._id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 font-bold text-white">{st.name}</td>
                          <td className="px-6 py-4 text-slate-300">{st.city}</td>
                          <td className="px-6 py-4 text-slate-300">{st.totalSlots}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              st.isActive ? 'text-ev-green bg-ev-green/10' : 'text-red-400 bg-red-400/10'
                            }`}>
                              {st.isActive ? 'ACTIVE' : 'INACTIVE'}
                            </span>
                          </td>
                          <td className="px-6 py-4 flex justify-end gap-2">
                            <button className="p-2 bg-slate-800 hover:bg-slate-700 text-ev-cyan rounded transition-colors"><MdEdit /></button>
                            <button onClick={async () => {
                              try {
                                await api.delete(`/stations/${st._id}`);
                                window.location.reload();
                              } catch(err) { alert('Failed to delete station'); }
                            }} className="p-2 bg-slate-800 hover:bg-red-500/20 text-red-500 rounded transition-colors"><MdDelete /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-dark-tech-light border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-white font-display font-bold text-xl">All Network Bookings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-sm">
                <thead className="bg-slate-800/50 text-slate-400 uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-6 py-4">Booking ID</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Station</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Status & Chat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {loadingBookings ? (
                    <tr><td colSpan="5" className="text-center py-6 text-slate-400">Loading bookings...</td></tr>
                  ) : bookings.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-6 text-slate-400">No bookings across network yet.</td></tr>
                  ) : (
                    bookings.map(booking => (
                      <tr key={booking._id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-slate-300">{booking._id.substring(0, 8)}</td>
                        <td className="px-6 py-4 text-white">
                          <div className="font-bold">{booking.userId?.name || 'Unknown User'}</div>
                          <div className="text-xs text-slate-500">{booking.userId?.email}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-400">{booking.stationId?.name || 'Unknown Station'}</td>
                        <td className="px-6 py-4 text-slate-400">{new Date(booking.date).toLocaleDateString()} <br/> <span className="text-xs text-slate-500">{booking.startTime}</span></td>
                        <td className="px-6 py-4 flex items-center gap-3">
                          <span className="text-ev-cyan bg-ev-cyan/10 px-2 py-1 rounded text-xs font-bold border border-ev-cyan/20 border-opacity-50">{booking.status?.toUpperCase() || 'UPCOMING'}</span>
                          <button onClick={() => setActiveChatBooking(booking)} className="text-xs bg-slate-700 hover:bg-ev-cyan hover:text-dark-tech px-2 py-1 rounded font-bold transition-colors">
                            💬 Message User
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-8 text-center text-slate-400 font-body">
            User management interface is under active development. Keep an eye out for updates!
          </div>
        )}

      </div>

      {activeChatBooking && (
        <div className="fixed inset-0 z-50 flex justify-end items-end p-4 pointer-events-none">
           <div className="w-full max-w-sm bg-dark-tech border border-slate-700 rounded-t-xl rounded-bl-xl shadow-2xl pointer-events-auto flex flex-col h-[500px] font-body overflow-hidden">
              <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
                 <div>
                   <h3 className="text-white font-bold">{activeChatBooking.userId?.name || 'EV Driver'}</h3>
                   <p className="text-xs text-ev-green flex items-center gap-1"><span className="w-2 h-2 bg-ev-green rounded-full animate-pulse"></span> User Online</p>
                 </div>
                 <button onClick={() => setActiveChatBooking(null)} className="text-slate-400 hover:text-white"><MdClose size={24} /></button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto bg-dark-tech-light/50 space-y-4">
                 {chatHistory.map((msg, i) => (
                   <div key={i} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[80%] rounded-xl p-3 text-sm flex flex-col ${msg.sender === 'admin' ? 'bg-ev-cyan text-dark-tech rounded-br-none font-medium' : 'bg-slate-700 text-white rounded-bl-none'}`}>
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
                   placeholder="Reply to user..."
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

export default AdminPanel;
