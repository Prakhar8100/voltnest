import { useState } from 'react';
import { MdSearch, MdFilterList } from 'react-icons/md';
import StationCard from '../components/StationCard';
import { useStations } from '../hooks/useStations';

const Stations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const { stations, loading, error } = useStations(filters);

  const fallbackImage = 'https://images.unsplash.com/photo-1593941707882-a5bba14938cb?auto=format&fit=crop&q=80&w=800';
  const filteredStations = stations.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.address.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const displayData = filteredStations.map(s => ({
    id: s._id,
    name: s.name,
    address: s.address,
    rating: s.rating || 4.5,
    chargerCount: s.totalSlots,
    price: s.pricePerKwh || 0,
    available: s.isActive,
    targetImage: s.images && s.images[0] ? s.images[0] : fallbackImage
  }));

  const handleFilterToggle = (key, value) => {
    setFilters(prev => {
      if (prev[key] === value) {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      }
      return { ...prev, [key]: value };
    });
  };

  const resetFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Find a Station</h1>
          <p className="text-slate-400 font-body">Locate and book available charging slots near you.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Search and Top Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MdSearch className="h-6 w-6 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-dark-tech-light border border-slate-700 rounded-2xl leading-5 bg-transparent placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ev-green/50 focus:border-ev-green text-white transition-all font-body text-lg shadow-inner"
              placeholder="Search by location, zip code, or station name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-dark-tech-light p-2 rounded-2xl border border-slate-700">
             {['DC', 'AC'].map(type => (
               <button 
                key={type}
                onClick={() => handleFilterToggle('chargerType', type)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filters.chargerType === type ? 'bg-ev-green text-dark-tech shadow-[0_0_15px_rgba(0,255,135,0.4)]' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
               >
                 {type} Chargers
               </button>
             ))}
             <button 
              onClick={() => handleFilterToggle('available', filters.available === 'true' ? undefined : 'true')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filters.available === 'true' ? 'bg-ev-cyan text-dark-tech shadow-[0_0_15px_rgba(0,212,255,0.4)]' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
             >
                Available Only
             </button>
             <div className="w-px h-6 bg-slate-700 mx-2"></div>
             <button onClick={resetFilters} className="px-4 py-2 text-slate-400 hover:text-white text-sm font-bold transition-colors">Reset</button>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex-1">

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    
      {/* Sticky Bottom Mobile Filter Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <div className="bg-dark-tech-light/80 backdrop-blur-xl border border-slate-700 rounded-full px-6 py-3 flex items-center gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
           <button 
            onClick={() => handleFilterToggle('chargerType', filters.chargerType === 'DC' ? 'AC' : 'DC')}
            className={`flex flex-col items-center gap-0.5 ${filters.chargerType ? 'text-ev-green' : 'text-slate-400'}`}
           >
             <MdFilterList size={18} />
             <span className="text-[10px] font-bold uppercase tracking-tighter">{filters.chargerType || 'Type'}</span>
           </button>
           <div className="w-px h-6 bg-slate-700"></div>
           <button 
            onClick={() => handleFilterToggle('available', filters.available === 'true' ? undefined : 'true')}
            className={`flex flex-col items-center gap-0.5 ${filters.available === 'true' ? 'text-ev-cyan' : 'text-slate-400'}`}
           >
              <div className={`w-2 h-2 rounded-full ${filters.available === 'true' ? 'bg-ev-cyan animate-pulse' : 'bg-slate-500'}`}></div>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Live</span>
           </button>
           <div className="w-px h-6 bg-slate-700"></div>
           <button onClick={resetFilters} className="text-slate-400 font-bold text-[10px] uppercase">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Stations;
