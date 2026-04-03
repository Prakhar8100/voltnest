import { useState } from 'react';
import { MdClose, MdEvStation } from 'react-icons/md';
import { BsLightningChargeFill } from 'react-icons/bs';
import api from '../services/api';

const BookingModal = ({ isOpen, onClose, station, slot }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [chargerType, setChargerType] = useState('css');
  const [vehicle, setVehicle] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState('');
  
  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  
  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await api.post('/bookings', {
        stationId: station._id,
        slotId: slot || '1',
        date,
        startTime: time,
        endTime: 'TBD',
        chargerType,
        vehicleInfo: { model: vehicle },
        totalCost: 15.00
      });
      setBookingId(response.data.data._id.substring(0, 8).toUpperCase());
      setStep(4);
    } catch(err) {
      alert(err.response?.data?.message || 'Failed to book slot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      <div className="absolute inset-0 bg-dark-tech/80 backdrop-blur-sm" onClick={onClose}></div>
      
  
      <div className="relative bg-dark-tech-light border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <MdClose className="text-2xl" />
        </button>
        
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-white mb-2">Book a Charging Slot</h2>
          <div className="flex items-center gap-2 text-slate-400 font-body">
            <MdEvStation className="text-ev-cyan" />
            <span>{station?.name || 'VoltNest Station'}</span>
            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
            <span>Slot {slot || 'A1'}</span>
          </div>
        </div>

    
        {step < 4 && (
          <div className="flex items-center mb-8">
            <div className={`flex-1 h-1 rounded-l-full ${step >= 1 ? 'bg-ev-green' : 'bg-slate-700'}`}></div>
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-ev-green shadow-[0_0_10px_rgba(0,255,135,0.8)]' : 'bg-slate-700'}`}></div>
            
            <div className={`flex-1 h-1 ${step >= 2 ? 'bg-ev-green' : 'bg-slate-700'}`}></div>
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-ev-green shadow-[0_0_10px_rgba(0,255,135,0.8)]' : 'bg-slate-700'}`}></div>
            
            <div className={`flex-1 h-1 rounded-r-full ${step >= 3 ? 'bg-ev-green' : 'bg-slate-700'}`}></div>
          </div>
        )}


        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-lg font-bold text-slate-200 mb-4 font-body">Step 1: Select Date & Time</h3>
            <div className="space-y-4 font-body">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-dark-tech border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-ev-green transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Estimated Arrival Time</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-dark-tech border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-ev-green transition-colors" />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button onClick={handleNext} disabled={!date || !time} className="bg-ev-green text-dark-tech px-6 py-2 rounded font-bold font-body hover:bg-[#00e676] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h3 className="text-lg font-bold text-slate-200 mb-4 font-body">Step 2: Vehicle Information</h3>
            <div className="space-y-4 font-body">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Charger Connector Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setChargerType('css')} className={`p-3 rounded border ${chargerType === 'css' ? 'border-ev-green bg-ev-green/10 text-white' : 'border-slate-700 text-slate-400'}`}>
                    CCS (DC Fast)
                  </button>
                  <button onClick={() => setChargerType('chademo')} className={`p-3 rounded border ${chargerType === 'chademo' ? 'border-ev-cyan bg-ev-cyan/10 text-white' : 'border-slate-700 text-slate-400'}`}>
                    CHAdeMO
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Vehicle Model (Optional)</label>
                <input type="text" placeholder="e.g. Tesla Model 3" value={vehicle} onChange={(e) => setVehicle(e.target.value)} className="w-full bg-dark-tech border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-ev-green transition-colors" />
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={handleBack} className="text-slate-400 hover:text-white px-6 py-2 transition-colors font-body">
                Back
              </button>
              <button onClick={handleNext} className="bg-ev-green text-dark-tech px-6 py-2 rounded font-bold font-body hover:bg-[#00e676] transition-colors">
                Review Booking
              </button>
            </div>
          </div>
        )}

  
        {step === 3 && (
          <div className="animate-fade-in">
            <h3 className="text-lg font-bold text-slate-200 mb-4 font-body">Step 3: Review & Confirm</h3>
            <div className="bg-dark-tech p-4 rounded border border-slate-700 space-y-3 font-body text-sm mb-6">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Station</span>
                <span className="text-white font-semibold">{station?.name || 'VoltNest Station'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Date & Time</span>
                <span className="text-white font-semibold">{date} at {time}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Connector</span>
                <span className="text-white font-semibold uppercase">{chargerType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Price Estimate</span>
                <span className="text-ev-green font-semibold">$0.35 / kWh</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-body mb-8">
              By confirming, you agree that your slot will be held for 15 minutes past the arrival time. A no-show fee of $5 may apply.
            </p>
            <div className="flex justify-between">
              <button onClick={handleBack} disabled={loading} className="text-slate-400 hover:text-white px-6 py-2 transition-colors font-body disabled:opacity-50">
                Back
              </button>
              <button onClick={handleConfirm} disabled={loading} className="bg-ev-cyan text-dark-tech px-6 py-2 rounded font-bold font-body hover:bg-[#00b8e6] shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all disabled:opacity-50">
                {loading ? 'Confirming...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in text-center py-6">
            <div className="w-20 h-20 bg-ev-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BsLightningChargeFill className="text-ev-green text-4xl drop-shadow-[0_0_10px_rgba(0,255,135,1)]" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">Booking Confirmed!</h3>
            <p className="text-slate-400 font-body mb-6">
              Your slot has been reserved. Check your dashboard for live updates.
            </p>
            <div className="bg-dark-tech border border-ev-green/30 p-4 rounded mb-8 inline-block">
              <div className="text-sm text-slate-500 font-body uppercase tracking-wider mb-1">Booking ID</div>
              <div className="text-xl font-display font-bold text-ev-green">{bookingId}</div>
            </div>
            <button onClick={() => { onClose(); window.location.href = '/dashboard'; }} className="w-full bg-slate-800 text-white px-6 py-3 rounded font-bold font-body hover:bg-slate-700 transition-colors">
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
