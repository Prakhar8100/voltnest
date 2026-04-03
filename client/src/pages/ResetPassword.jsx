import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BsLightningChargeFill, BsShieldLockFill } from 'react-icons/bs';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await axios.put(`/api/v1/auth/resetpassword/${token}`, { password });
      
      if (data.success) {
        // Automatic login after reset
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        
        if (data.data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/stations');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired token. Please request a new link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-dark-tech-light/30 backdrop-blur-xl rounded-3xl shadow-[0_0_50px_rgba(0,212,255,0.05)] border border-slate-700/50 p-8 sm:p-12 relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-ev-cyan opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-40 h-40 bg-blue-600 opacity-10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-dark-tech border border-slate-700 shadow-[0_0_15px_rgba(0,212,255,0.2)] mb-6">
              <BsShieldLockFill className="h-8 w-8 text-ev-cyan" />
            </div>
            <h2 className="text-3xl font-display font-extrabold text-white tracking-tight">
              Reset Password
            </h2>
            <p className="mt-3 text-sm text-slate-400 font-body">
              Please enter your new password below.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 text-sm p-4 rounded-r-md font-body">
                {error}
              </div>
            )}
            
            <div className="group">
              <label className="block text-sm font-medium text-slate-300 font-body mb-2 transition-colors group-focus-within:text-ev-cyan">
                New Password
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

            <div className="group">
              <label className="block text-sm font-medium text-slate-300 font-body mb-2 transition-colors group-focus-within:text-ev-cyan">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3.5 border border-slate-600/50 rounded-xl shadow-inner placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-ev-cyan/50 focus:border-ev-cyan sm:text-sm bg-dark-tech/80 text-white font-body transition-all duration-300 ease-in-out pr-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold font-body text-dark-tech bg-gradient-to-r from-ev-cyan to-[#00b4d8] hover:from-[#00e5ff] hover:to-ev-cyan transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-dark-tech" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Updating...
                  </>
                ) : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
