import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BsLightningChargeFill } from 'react-icons/bs';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  
  const handleImageUpload = (e, setBase64) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Station Details (for Admin)
  const [stationName, setStationName] = useState('');
  const [stationAddress, setStationAddress] = useState('');
  const [stationCity, setStationCity] = useState('');
  const [stationLat, setStationLat] = useState('');
  const [stationLng, setStationLng] = useState('');
  const [stationPrice, setStationPrice] = useState('');
  const [stationImage, setStationImage] = useState('');
  const [stationSlots, setStationSlots] = useState('');

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (loading) return; // prevent double submission
    
    setLoading(true);
    setError('');
    try {
      let stationDetails = null;
      if (role === 'admin') {
        if (!stationName || !stationAddress || !stationCity || !stationLat || !stationLng || !stationPrice) {
          setError('Please fill in all station fields');
          setLoading(false);
          return;
        }
        stationDetails = {
          name: stationName,
          address: stationAddress,
          city: stationCity,
          lat: stationLat,
          lng: stationLng,
          pricePerKwh: stationPrice,
          totalSlots: stationSlots || 1,
          images: stationImage ? [stationImage] : []
        };
      }
      
      const res = await register(name, email, password, role, profileImage, stationDetails);
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/stations');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. The server may be waking up — please try again in 30 seconds.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl bg-dark-tech-light/30 backdrop-blur-xl rounded-3xl shadow-[0_0_50px_rgba(0,255,135,0.05)] border border-slate-700/50 flex flex-col-reverse lg:flex-row overflow-hidden relative">
        
        {/* Decorative elements for mobile */}
        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-ev-green opacity-20 rounded-full blur-3xl lg:hidden"></div>

        {/* Left Form Section */}
        <div className="w-full lg:w-[55%] p-6 sm:p-10 lg:p-12 flex flex-col justify-center relative z-10 max-h-[85vh] overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div className="text-center lg:text-left mb-8 shrink-0">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-dark-tech border border-slate-700 shadow-[0_0_15px_rgba(0,255,135,0.2)] mb-6 lg:hidden">
              <BsLightningChargeFill className="h-7 w-7 text-ev-green" />
            </div>
            <h2 className="text-4xl font-display font-extrabold text-white tracking-tight">
              Join the Network
            </h2>
            <p className="mt-3 text-sm text-slate-400 font-body">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-ev-cyan hover:text-[#00e5ff] transition-all duration-300">
                Sign in
              </Link>
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 text-sm p-4 rounded-r-md font-body animate-pulse">
                {error}
              </div>
            )}
            
            <div className="group">
              <label className="block text-sm font-medium text-slate-300 font-body mb-2 transition-colors group-focus-within:text-ev-green">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-4 py-3.5 border border-slate-600/50 rounded-xl shadow-inner placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ev-green/50 focus:border-ev-green sm:text-sm bg-dark-tech/80 text-white font-body transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-slate-300 font-body mb-2 transition-colors group-focus-within:text-ev-green">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3.5 border border-slate-600/50 rounded-xl shadow-inner placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ev-green/50 focus:border-ev-green sm:text-sm bg-dark-tech/80 text-white font-body transition-all duration-300"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-slate-300 font-body mb-2 transition-colors group-focus-within:text-ev-green">
                Profile Picture
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setProfileImage)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-600/50 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-ev-green/50 focus:border-ev-green sm:text-sm bg-dark-tech/80 text-white font-body transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ev-green/10 file:text-ev-green hover:file:bg-ev-green/20"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-slate-300 font-body mb-2 transition-colors group-focus-within:text-ev-green">
                Account Type
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="appearance-none block w-full px-4 py-3.5 border border-slate-600/50 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-ev-green/50 focus:border-ev-green sm:text-sm bg-dark-tech/80 text-white font-body transition-all duration-300"
                >
                  <option value="user">EV Driver (User)</option>
                  <option value="admin">Station Owner (Admin)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {role === 'admin' && (
              <div className="space-y-4 border-t border-slate-700/50 pt-6 mt-6 animate-fade-in">
                <h3 className="text-white font-display font-medium text-lg">Station Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-xs text-slate-300 font-body mb-1 transition-colors group-focus-within:text-ev-green">Station Name</label>
                    <input type="text" value={stationName} onChange={(e) => setStationName(e.target.value)} className="appearance-none block w-full px-4 py-2.5 border border-slate-600/50 rounded-lg shadow-inner bg-dark-tech/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ev-green/50 focus:border-ev-green transition-all" placeholder="VoltHub Supercharger" />
                  </div>
                  <div className="group">
                    <label className="block text-xs text-slate-300 font-body mb-1 transition-colors group-focus-within:text-ev-green">City</label>
                    <input type="text" value={stationCity} onChange={(e) => setStationCity(e.target.value)} className="appearance-none block w-full px-4 py-2.5 border border-slate-600/50 rounded-lg shadow-inner bg-dark-tech/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ev-green/50 focus:border-ev-green transition-all" placeholder="New York" />
                  </div>
                  <div className="md:col-span-2 group">
                    <label className="block text-xs text-slate-300 font-body mb-1 transition-colors group-focus-within:text-ev-green">Full Address</label>
                    <input type="text" value={stationAddress} onChange={(e) => setStationAddress(e.target.value)} className="appearance-none block w-full px-4 py-2.5 border border-slate-600/50 rounded-lg shadow-inner bg-dark-tech/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ev-green/50 focus:border-ev-green transition-all" placeholder="123 Electric Ave" />
                  </div>
                  <div className="group">
                    <label className="block text-xs text-slate-300 font-body mb-1 transition-colors group-focus-within:text-ev-green">Latitude</label>
                    <input type="number" step="any" value={stationLat} onChange={(e) => setStationLat(e.target.value)} className="appearance-none block w-full px-4 py-2.5 border border-slate-600/50 rounded-lg shadow-inner bg-dark-tech/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ev-green/50 focus:border-ev-green transition-all" placeholder="40.7128" />
                  </div>
                  <div className="group">
                    <label className="block text-xs text-slate-300 font-body mb-1 transition-colors group-focus-within:text-ev-green">Longitude</label>
                    <input type="number" step="any" value={stationLng} onChange={(e) => setStationLng(e.target.value)} className="appearance-none block w-full px-4 py-2.5 border border-slate-600/50 rounded-lg shadow-inner bg-dark-tech/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ev-green/50 focus:border-ev-green transition-all" placeholder="-74.0060" />
                  </div>
                  <div className="group">
                    <label className="block text-xs text-slate-300 font-body mb-1 transition-colors group-focus-within:text-ev-green">Price per Hour/kWh ($)</label>
                    <input type="number" step="0.01" value={stationPrice} onChange={(e) => setStationPrice(e.target.value)} className="appearance-none block w-full px-4 py-2.5 border border-slate-600/50 rounded-lg shadow-inner bg-dark-tech/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ev-green/50 focus:border-ev-green transition-all" placeholder="10.50" />
                  </div>
                  <div className="group">
                    <label className="block text-xs text-slate-300 font-body mb-1 transition-colors group-focus-within:text-ev-green">Total Slots</label>
                    <input type="number" value={stationSlots} onChange={(e) => setStationSlots(e.target.value)} className="appearance-none block w-full px-4 py-2.5 border border-slate-600/50 rounded-lg shadow-inner bg-dark-tech/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ev-green/50 focus:border-ev-green transition-all" placeholder="5" />
                  </div>
                  <div className="md:col-span-2 group">
                    <label className="block text-xs text-slate-300 font-body mb-1 transition-colors group-focus-within:text-ev-green">Station Image Upload</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setStationImage)} className="appearance-none block w-full px-4 py-2 border border-slate-600/50 rounded-lg shadow-inner bg-dark-tech/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ev-green/50 focus:border-ev-green transition-all file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-ev-green/10 file:text-ev-green hover:file:bg-ev-green/20" />
                  </div>
                </div>
              </div>
            )}

            <div className="group pt-2">
              <label className="block text-sm font-medium text-slate-300 font-body mb-2 transition-colors group-focus-within:text-ev-green">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3.5 border border-slate-600/50 rounded-xl shadow-inner placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ev-green/50 focus:border-ev-green sm:text-sm bg-dark-tech/80 text-white font-body transition-all duration-300 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <AiOutlineEyeInvisible className="h-5 w-5" /> : <AiOutlineEye className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-500 font-body text-right">Must be at least 8 characters</p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold font-body text-dark-tech bg-gradient-to-r from-ev-green to-[#00e676] hover:from-[#00e676] hover:to-ev-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-tech focus:ring-ev-green transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,255,135,0.3)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-dark-tech" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : 'Create Account'}
              </button>
            </div>
            
            <p className="text-xs text-slate-500 text-center font-body mt-6 pb-4">
               By registering, you agree to our <a href="#" className="text-slate-400 hover:text-ev-green underline decoration-slate-600 underline-offset-2 transition-colors">Terms of Service</a> and <a href="#" className="text-slate-400 hover:text-ev-green underline decoration-slate-600 underline-offset-2 transition-colors">Privacy Policy</a>.
            </p>
          </form>
        </div>

        {/* Right Graphic Section (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:w-[45%] relative bg-gradient-to-br from-[#05110E] to-[#050A11] items-center justify-center p-12 overflow-hidden border-l border-slate-800">
          {/* Animated Background Gradients */}
          <div className="absolute top-[30%] left-[10%] w-72 h-72 bg-ev-green/10 rounded-full mix-blend-screen filter blur-[90px] animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-[#00e5ff]/10 rounded-full mix-blend-screen filter blur-[90px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="relative z-10 w-full max-w-md text-center flex flex-col items-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-dark-tech border border-slate-700 shadow-[0_0_30px_rgba(0,255,135,0.2)] mb-8 transform hover:scale-105 transition-transform duration-500">
              <BsLightningChargeFill className="h-12 w-12 text-ev-green drop-shadow-[0_0_10px_rgba(0,255,135,0.6)]" />
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-4 leading-tight">
              A Greener Future Starts Here
            </h3>
            <p className="text-slate-400 font-body text-lg leading-relaxed mb-10">
              Become part of the most reliable and extensive EV charging community. Add vehicles, track sessions, and host your own stations.
            </p>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-dark-tech/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 text-left">
                <div className="text-ev-green font-display font-bold text-2xl">10K+</div>
                <div className="text-slate-400 text-sm font-body">Active Stations</div>
              </div>
              <div className="bg-dark-tech/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 text-left">
                <div className="text-ev-cyan font-display font-bold text-2xl">⚡</div>
                <div className="text-slate-400 text-sm font-body">Superfast Charging</div>
              </div>
            </div>
          </div>
          
          {/* Hexagon Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI2MCI+CjxwYXRoIGQ9Ik0yMCAwbDIwIDEwdjIwbC0yMCAxMGwtMjAtMTBWMGwyMCAxMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-60 z-0"></div>
        </div>

      </div>
    </div>
  );
};

export default Register;
