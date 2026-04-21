import { MdLocationPin } from 'react-icons/md';

const MapView = ({ stations = [] }) => {
  return (
    <div className="w-full h-full relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 min-h-[400px]">

      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
      <div className="absolute inset-0 bg-dark-tech/60 backdrop-blur-[2px]"></div>
      
      {stations.map((station, i) => {
        const top = `${20 + (i * 15 % 60)}%`;
        const left = `${10 + (i * 25 % 80)}%`;
        
        return (
          <div 
            key={station.id || i} 
            className="absolute transform -translate-x-1/2 -translate-y-full flex flex-col items-center group cursor-pointer z-10 hover:z-20"
            style={{ top, left }}
          >
            <div className="bg-[#0F172A]/80 backdrop-blur-3xl border border-white/10 p-3 rounded-xl shadow-lg mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-2 whitespace-nowrap hidden sm:block pointer-events-none">
              <p className="font-bold text-white text-sm tracking-wide">{station.name}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`w-1.5 h-1.5 rounded-full ${station.available ? 'bg-ev-green animate-pulse' : 'bg-red-500'}`}></span>
                <p className={`text-xs font-bold ${station.available ? 'text-ev-green' : 'text-red-400'}`}>{station.available ? 'Available' : 'Busy'}</p>
              </div>
            </div>
            
            <div className="relative flex items-center justify-center w-8 h-8 group-hover:scale-110 transition-transform duration-300">
              <div className={`absolute w-full h-full rounded-full ${station.available ? 'bg-ev-green' : 'bg-red-500'} opacity-40 animate-ping`}></div>
              <div className={`relative w-4 h-4 rounded-full ${station.available ? 'bg-ev-green' : 'bg-red-500'} border-2 border-slate-900 shadow-[0_0_10px_${station.available ? 'rgba(0,255,135,0.8)' : 'rgba(239,68,68,0.8)'}]`}></div>
            </div>
          </div>
        );
      })}
      
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
         <button className="w-10 h-10 bg-dark-tech-light border border-slate-700 rounded text-white flex items-center justify-center hover:bg-slate-700 transition-colors shadow-lg">+</button>
         <button className="w-10 h-10 bg-dark-tech-light border border-slate-700 rounded text-white flex items-center justify-center hover:bg-slate-700 transition-colors shadow-lg">-</button>
      </div>
    </div>
  );
};

export default MapView;
