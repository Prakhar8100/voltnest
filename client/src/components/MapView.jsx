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
            <div className="bg-dark-tech border border-slate-700 p-2 rounded shadow-lg mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
              <p className="font-bold text-white text-sm">{station.name}</p>
              <p className="text-ev-green text-xs">{station.available ? 'Available' : 'Busy'}</p>
            </div>
            <MdLocationPin className={`text-4xl drop-shadow-md transition-transform group-hover:scale-125 ${station.available ? 'text-ev-green drop-shadow-[0_0_10px_rgba(0,255,135,0.8)]' : 'text-red-500'}`} />
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
