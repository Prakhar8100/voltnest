import { useState, useEffect } from 'react';
import { BsLightningChargeFill } from 'react-icons/bs';

const ChargingProgress = ({ percentage = 65, timeRemaining = '15m', isLive = false }) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    setCurrentProgress(percentage);
  }, [percentage]);

  useEffect(() => {
    if (isLive && currentProgress < 99) {
      const interval = setInterval(() => {
        setCurrentProgress(prev => Math.min(prev + 0.1, 99.9));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLive, currentProgress]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-ev-green/20 flex items-center justify-center animate-pulse">
            <BsLightningChargeFill className="text-ev-green text-sm drop-shadow-[0_0_8px_rgba(0,255,135,1)]" />
          </div>
          <span className="font-display font-bold text-lg text-white">Charging...</span>
        </div>
        <div className="text-right">
          <span className="font-display font-bold text-2xl text-ev-green">{currentProgress}%</span>
          <span className="text-slate-400 text-sm font-body block">Est. Time: {timeRemaining}</span>
        </div>
      </div>
      
      
      <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
      
        <div 
          className="absolute top-0 left-0 h-full bg-ev-green/50 blur-[8px] transition-all duration-1000 ease-out"
          style={{ width: `${currentProgress}%` }}
        ></div>
        
  
        <div 
          className="h-full bg-gradient-to-r from-[#00b35f] to-ev-green rounded-full relative z-10 transition-all duration-1000 ease-out flex items-center justify-end overflow-hidden"
          style={{ width: `${currentProgress}%` }}
        >
      
          <div className="h-full w-20 bg-white/30 transform skew-x-[-20deg] animate-[shine_2s_infinite]"></div>
        </div>
      </div>
      
      <div className="flex justify-between mt-3 text-xs text-slate-500 font-body uppercase tracking-wider">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default ChargingProgress;
