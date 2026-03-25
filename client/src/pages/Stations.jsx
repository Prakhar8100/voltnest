import { useState } from 'react';
import { MdSearch, MdFilterList } from 'react-icons/md';
import StationCard from '../components/StationCard';
import { useStations } from '../hooks/useStations';

const Stations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const { stations, loading, error } = useStations(filters);

  // Fallback to dummy if empty to prevent empty screen on first boot
  const dummyStations = [
    { id: 1, name: 'VoltHub Downtown', address: '124 Main St, City Center', rating: 4.8, chargerCount: 12, price: 0.35, available: true, targetImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938cb?auto=format&fit=crop&q=80&w=800' },
  ];
  
  const displayData = stations.length > 0 ? stations.map(s => ({
      id: s._id,
      name: s.name,
      address: s.address,
      rating: s.rating || 4.5,
      chargerCount: s.totalSlots,
      price: s.pricePerKwh,
      available: s.isActive,
      targetImage: s.images && s.images[0] ? s.images[0] : dummyStations[0].targetImage
  })) : dummyStations;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Find a Station</h1>
          <p className="text-slate-400 font-body">Locate and book available charging slots near you.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
      
        <div className="w-full lg:w-64 shrink-0 bg-dark-tech-light border border-slate-800 rounded-xl p-6 h-fit sticky top-24">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
            <MdFilterList className="text-ev-cyan text-xl" />
            <h2 className="font-display font-bold text-lg text-white">Filters</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-300 mb-3 font-body uppercase tracking-wider">Charger Type</h3>
              <div className="space-y-2">
                {['DC Fast (Level 3)', 'AC Fast (Level 2)', 'AC Standard'].map(type => (
                  <label key={type} className="flex items-center gap-2 text-slate-400 font-body cursor-pointer hover:text-white transition-colors">
                    <input type="checkbox" className="form-checkbox bg-dark-tech border-slate-600 rounded text-ev-green focus:ring-ev-green focus:ring-offset-dark-tech" />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-300 mb-3 font-body uppercase tracking-wider">Availability</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-slate-400 font-body cursor-pointer hover:text-white transition-colors">
                  <input type="checkbox" className="form-checkbox bg-dark-tech border-slate-600 rounded text-ev-green focus:ring-ev-green focus:ring-offset-dark-tech" />
                  Available Now
                </label>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-slate-300 font-body uppercase tracking-wider">Max Price</h3>
                <span className="text-ev-green text-sm">$0.80/kWh</span>
              </div>
              <input type="range" min="0.1" max="1.5" step="0.1" className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-ev-cyan" />
            </div>
            
            <button className="w-full py-2 mt-4 bg-slate-800 hover:bg-slate-700 text-white rounded font-body transition-colors">
              Reset Filters
            </button>
          </div>
        </div>


        <div className="flex-1">
      
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MdSearch className="h-6 w-6 text-slate-400" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-12 pr-4 py-4 bg-dark-tech-light border border-slate-700 rounded-xl leading-5 bg-transparent placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-ev-green focus:border-ev-green text-white transition-colors font-body text-lg shadow-inner" 
              placeholder="Search by location, zip code, or station name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

    
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {loading ? (
              <div className="text-white col-span-3 text-center py-10 font-display">Loading Stations...</div>
            ) : error ? (
              <div className="text-red-400 col-span-3 text-center py-10 font-display">{error}</div>
            ) : (
              displayData.map(station => (
                <StationCard key={station.id} station={station} />
              ))
            )}
          </div>
          
        
          <div className="flex justify-center mt-12 mb-8">
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50">&lt;</button>
              <button className="w-10 h-10 rounded border border-ev-green bg-ev-green/10 flex items-center justify-center text-ev-green font-bold">1</button>
              <button className="w-10 h-10 rounded border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">2</button>
              <button className="w-10 h-10 rounded border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">3</button>
              <button className="w-10 h-10 rounded border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stations;
