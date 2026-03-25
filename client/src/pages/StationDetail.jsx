import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdLocationPin, MdEvStation, MdAccessTime, MdSecurity } from 'react-icons/md';
import { BsLightningChargeFill, BsWifi } from 'react-icons/bs';
import { FaCoffee, FaStar } from 'react-icons/fa';
import BookingModal from '../components/BookingModal';

const dummyStationDetails = {
  id: 1,
  name: 'VoltHub Downtown',
  address: '124 Main St, City Center, Metro District',
  rating: 4.8,
  image: 'https://images.unsplash.com/vector-1774445180503-0de698e42cf6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D',
  description: 'Premium downtown charging hub equipped with ultra-fast DC chargers. Located next to major shopping centers with 24/7 security and dedicated EV lounge.',
  amenities: [
    { icon: <FaCoffee />, text: 'Coffee Shop Nearby' },
    { icon: <BsWifi />, text: 'Free Wi-Fi' },
    { icon: <MdSecurity />, text: '24/7 Security' }
  ],
  pricing: '$0.35/kWh',
  hours: '24/7',
  slots: [
    { id: 'A1', type: 'DC Fast 150kW', status: 'Available' },
    { id: 'A2', type: 'DC Fast 150kW', status: 'Charging' },
    { id: 'B1', type: 'DC Fast 350kW', status: 'Booked' },
    { id: 'B2', type: 'DC Fast 350kW', status: 'Available' },
    { id: 'C1', type: 'Level 2 AC', status: 'Available' },
    { id: 'C2', type: 'Level 2 AC', status: 'Maintenance' },
  ]
};

const StationDetail = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const station = dummyStationDetails;

  const handleBook = (slotId) => {
    setSelectedSlot(slotId);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-dark-tech min-h-screen pb-12">
    
      <div className="relative h-64 md:h-96 w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-tech via-dark-tech/60 to-transparent z-10"></div>
        <img src={station.image} alt={station.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 w-full z-20 pb-8 pt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-5xl font-display font-bold text-white">{station.name}</h1>
                  <span className="bg-ev-green/20 text-ev-green border border-ev-green/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-ev-green animate-pulse"></div> OPEN
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 font-body text-lg">
                  <MdLocationPin className="text-ev-cyan" />
                  {station.address}
                </div>
              </div>
              <div className="flex items-center gap-2 bg-dark-tech-light/80 backdrop-blur-md border border-slate-700 px-4 py-2 rounded-lg">
                <FaStar className="text-yellow-400 text-xl" />
                <span className="text-white font-bold text-xl">{station.rating}</span>
                <span className="text-slate-400 text-sm">(128 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
      
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-dark-tech-light border border-slate-800 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-display font-bold text-white mb-4">About Station</h2>
              <p className="text-slate-300 font-body leading-relaxed mb-6">
                {station.description}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-slate-300 font-body">
                  <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center"><BsLightningChargeFill className="text-ev-green" /></div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase">Pricing</div>
                    <div className="font-bold">{station.pricing} + $2 booking fee</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-300 font-body">
                  <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center"><MdAccessTime className="text-ev-cyan" /></div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase">Hours</div>
                    <div className="font-bold">{station.hours}</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-dark-tech-light border border-slate-800 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-display font-bold text-white mb-6">Available Slots</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {station.slots.map((slot) => (
                  <div key={slot.id} className="border border-slate-700 rounded-lg p-4 bg-dark-tech flex justify-between items-center group hover:border-slate-500 transition-colors">
                    <div>
                      <div className="font-display font-bold text-lg text-white mb-1">Slot {slot.id}</div>
                      <div className="text-sm text-slate-400 font-body flex items-center gap-1">
                        <MdEvStation /> {slot.type}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       {slot.status === 'Available' && <span className="text-xs font-bold text-ev-green bg-ev-green/10 px-2 py-1 rounded">AVAILABLE</span>}
                       {slot.status === 'Charging' && <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">CHARGING (45m left)</span>}
                       {slot.status === 'Booked' && <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">RESERVED</span>}
                       {slot.status === 'Maintenance' && <span className="text-xs font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded">OFFLINE</span>}
                       
                       {slot.status === 'Available' && (
                         <button onClick={() => handleBook(slot.id)} className="text-xs bg-ev-cyan hover:bg-[#00b8e6] text-dark-tech font-bold px-3 py-1.5 rounded transition-colors shadow-[0_0_10px_rgba(0,212,255,0.3)]">
                           Book Slot
                         </button>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

      
          <div className="space-y-8">
        
            <div className="bg-slate-800 rounded-xl h-64 border border-slate-700 overflow-hidden relative group cursor-pointer">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute inset-0 bg-dark-tech/40"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                 <MdLocationPin className="text-ev-cyan text-4xl mx-auto mb-2 drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
                 <span className="bg-dark-tech-light/90 text-white font-body text-sm px-3 py-1 rounded border border-slate-600">View on Map</span>
              </div>
            </div>

            
            <div className="bg-dark-tech-light border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-display font-bold text-white mb-4">Amenities</h2>
              <ul className="space-y-3 font-body text-slate-300">
                {station.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center gap-3">
                     <span className="text-slate-500">{amenity.icon}</span>
                     {amenity.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        station={station}
        slot={selectedSlot}
      />
    </div>
  );
};

export default StationDetail;
