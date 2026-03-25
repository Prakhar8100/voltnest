import { useState } from 'react';
import { MdInsertChart, MdEvStation, MdPeople, MdBook, MdAdd, MdEdit, MdDelete, MdClose } from 'react-icons/md';
import { useStations } from '../hooks/useStations';
import api from '../services/api';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { stations, loading, error } = useStations();
  
  
  const [isAddingStation, setIsAddingStation] = useState(false);
  const [formData, setFormData] = useState({
    name: '', address: '', city: '', lat: 0, lng: 0, chargerTypes: 'AC', totalSlots: 1, pricePerKwh: 0,
  });
  const [submitError, setSubmitError] = useState('');
  
  

  const recentBookings = [
    { id: 'VN-A4B7D2', user: 'alex.mercer@email.com', station: 'VoltHub Downtown', amount: '$12.40', status: 'Completed' },
    { id: 'VN-X8L5Y0', user: 'sarah.j@email.com', station: 'EcoCharge Mall', amount: '$15.00', status: 'Upcoming' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
  
      <div className="w-full md:w-64 shrink-0 space-y-2">
        <div className="bg-gradient-to-br from-ev-cyan/20 to-dark-tech-light border border-ev-cyan/30 rounded-xl p-6 mb-6">
          <h2 className="text-center font-display font-bold text-xl text-white">Admin Hub</h2>
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

        {(activeTab === 'bookings' || activeTab === 'users') && (
          <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-8 text-center text-slate-400 font-body">
            This module is currently partially mocked for visualization purposes.
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;
