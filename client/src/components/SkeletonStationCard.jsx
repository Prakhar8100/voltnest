import { motion } from 'framer-motion';

const SkeletonStationCard = ({ index = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="bg-[#0F172A]/30 backdrop-blur-xl relative rounded-2xl border border-white/5 shadow-lg flex flex-col h-[400px]"
    >
      {/* Top Image Skeleton */}
      <div className="h-48 w-full bg-slate-800/50 animate-pulse relative overflow-hidden">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        {/* Top Right Pill Skeleton */}
        <div className="absolute top-4 right-4 w-20 h-6 bg-slate-700/50 rounded-full"></div>
      </div>

      <div className="p-5 flex-grow flex flex-col gap-4">
        {/* Title and Rating Skeleton */}
        <div className="flex justify-between items-start">
          <div className="h-6 w-3/5 bg-slate-800/50 rounded animate-pulse"></div>
          <div className="h-6 w-12 bg-slate-800/50 rounded animate-pulse"></div>
        </div>

        {/* Address Skeleton */}
        <div className="h-4 w-4/5 bg-slate-800/40 rounded animate-pulse mt-2"></div>

        {/* Grid Stats Skeleton */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="h-14 bg-white/5 rounded-xl border border-white/5 animate-pulse"></div>
          <div className="h-14 bg-white/5 rounded-xl border border-white/5 animate-pulse"></div>
        </div>

        {/* Button Skeleton */}
        <div className="mt-auto">
          <div className="h-12 w-full bg-slate-800/60 rounded animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonStationCard;
