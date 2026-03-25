const StatCard = ({ label, value, unit, icon, color = 'ev-green' }) => {
  return (
    <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-6 relative overflow-hidden group">

      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20 ${color === 'ev-cyan' ? 'bg-ev-cyan' : color === 'red-400' ? 'bg-red-400' : 'bg-ev-green'}`}></div>
      
      <div className="flex justify-between items-start mb-2 relative z-10">
        <div className="text-slate-400 text-xs sm:text-sm font-body uppercase tracking-wider">{label}</div>
        {icon && (
          <div className={`text-xl ${color === 'ev-cyan' ? 'text-ev-cyan' : color === 'red-400' ? 'text-red-400' : 'text-ev-green'}`}>
            {icon}
          </div>
        )}
      </div>
      <div className="text-2xl sm:text-3xl font-display font-bold text-white relative z-10">
        {value} {unit && <span className="text-lg text-slate-500 font-bold">{unit}</span>}
      </div>
    </div>
  );
};

export default StatCard;
