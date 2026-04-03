import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BsLightningChargeFill } from 'react-icons/bs';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (loading) return;

    setLoading(true);
    setError('');
    try {
      const res = await login(email, password);
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/stations');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. The server may be waking up — please try again in 30 seconds.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-dark-tech-light/30 backdrop-blur-xl rounded-3xl shadow-[0_0_50px_rgba(0,212,255,0.05)] border border-slate-700/50 flex flex-col-reverse lg:flex-row overflow-hidden relative">
        
        {/* Decorative elements for mobile */}
        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-ev-cyan opacity-20 rounded-full blur-3xl lg:hidden"></div>

        {/* Left Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10">
          <div className="text-center lg:text-left mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-dark-tech border border-slate-700 shadow-[0_0_15px_rgba(0,212,255,0.2)] mb-6 lg:hidden">
              <BsLightningChargeFill className="h-7 w-7 text-ev-cyan" />
            </div>
            <h2 className="text-4xl font-display font-extrabold text-white tracking-tight">
              Welcome back
            </h2>
            <p className="mt-3 text-sm text-slate-400 font-body">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-ev-cyan hover:text-[#00e5ff] transition-all duration-300">
                Sign up for free
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 text-sm p-4 rounded-r-md font-body animate-pulse">
                {error}
              </div>
            )}
            
            <div className="group">
              <label className="block text-sm font-medium text-slate-300 font-body mb-2 transition-colors group-focus-within:text-ev-cyan">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3.5 border border-slate-600/50 rounded-xl shadow-inner placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ev-cyan/50 focus:border-ev-cyan sm:text-sm bg-dark-tech/80 text-white font-body transition-all duration-300 ease-in-out"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-slate-300 font-body mb-2 transition-colors group-focus-within:text-ev-cyan">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3.5 border border-slate-600/50 rounded-xl shadow-inner placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ev-cyan/50 focus:border-ev-cyan sm:text-sm bg-dark-tech/80 text-white font-body transition-all duration-300 ease-in-out pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <AiOutlineEyeInvisible className="h-5 w-5" /> : <AiOutlineEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between font-body pt-2">
              <div className="flex items-center group cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="peer h-4 w-4 text-ev-cyan focus:ring-ev-cyan/50 border-slate-600 rounded bg-dark-tech/80 cursor-pointer transition-all appearance-none checked:bg-ev-cyan checked:border-ev-cyan"
                  />
                  <svg className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block text-dark-tech p-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400 group-hover:text-slate-200 transition-colors cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" title="Forgot password?" className="font-medium text-slate-400 hover:text-ev-cyan transition-colors duration-300">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold font-body text-dark-tech bg-gradient-to-r from-ev-cyan to-[#00b4d8] hover:from-[#00e5ff] hover:to-ev-cyan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-tech focus:ring-ev-cyan transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,212,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-dark-tech" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : 'Sign In'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Graphic Section (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#0B1A2C] to-[#050A11] items-center justify-center p-12 overflow-hidden border-l border-slate-800">
          {/* Animated Background Gradients */}
          <div className="absolute top-[20%] left-[20%] w-64 h-64 bg-ev-cyan/20 rounded-full mix-blend-screen filter blur-[80px] animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[20%] w-72 h-72 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative z-10 w-full max-w-md text-center flex flex-col items-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-dark-tech border border-slate-700 shadow-[0_0_30px_rgba(0,212,255,0.3)] mb-8 transform hover:scale-105 transition-transform duration-500">
              <BsLightningChargeFill className="h-12 w-12 text-ev-cyan drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-4 leading-tight">
              Power Your Journey
            </h3>
            <p className="text-slate-400 font-body text-lg leading-relaxed">
              Connect to our global network of fast charging stations. Intelligent routing and instant payments at your fingertips.
            </p>
            
            {/* Minimalist abstract charging grid visual */}
            <div className="mt-12 w-full flex justify-center gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`h-2 rounded-full bg-ev-cyan ${i === 2 ? 'w-12 opacity-100' : 'w-4 opacity-40'} transition-all duration-500`}></div>
              ))}
            </div>
          </div>
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCA0MEwwIDBMMDAgME00MCA0MEw0MCAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgo8cGF0aCBkPSJNNDAgMEwwIDBNNDAgNDBMMCA0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-50 z-0"></div>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
