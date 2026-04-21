import { BsLightningChargeFill } from 'react-icons/bs';
import { MdEvStation, MdLocationPin } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StationCard = ({ station, index = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
      className="bg-[#0F172A]/30 backdrop-blur-xl relative rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden hover:border-white/20 transition-all group hover:shadow-[0_15px_40px_rgba(0,212,255,0.15)] flex flex-col h-full"
    >
  
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold font-body z-10 flex items-center gap-1 backdrop-blur-md ${
        station.available 
          ? 'bg-ev-green/20 text-ev-green border border-ev-green/30' 
          : 'bg-red-500/20 text-red-400 border border-red-500/30'
      }`}>
        <div className={`w-2 h-2 rounded-full ${station.available ? 'bg-ev-green animate-pulse' : 'bg-red-500'}`}></div>
        {station.available ? 'AVAILABLE' : 'BUSY'}
      </div>

      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-tech to-transparent z-10"></div>
        <img src={station.targetImage} alt={station.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-bold text-xl text-white truncate pr-2">{station.name}</h3>
          <div className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded text-sm shrink-0">
            <FaStar className="text-xs" />
            <span className="font-bold">{station.rating}</span>
          </div>
        </div>

        <div className="flex items-start gap-1 text-slate-400 text-sm mb-4 font-body line-clamp-2">
          <MdLocationPin className="mt-0.5 shrink-0 text-ev-cyan" />
          <span>{station.address}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/5 flex items-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <MdEvStation className="text-slate-400 text-lg" />
            <div>
              <div className="text-xs text-slate-500">Chargers</div>
              <div className="font-bold text-slate-200">{station.chargerCount}</div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/5 flex items-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <BsLightningChargeFill className="text-ev-green text-lg" />
            <div>
              <div className="text-xs text-slate-500">Price</div>
              <div className="font-bold text-slate-200">${station.price}/kWh</div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to={`/stations/${station.id}`} className="block w-full text-center py-3 bg-slate-800 hover:bg-ev-cyan/20 text-slate-300 hover:text-white border border-transparent hover:border-ev-cyan/50 font-bold rounded transition-colors font-body">
              View Details
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StationCard;
