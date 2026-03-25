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
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      const res = await register(name, email, password, role);
      setError('');
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <BsLightningChargeFill className="mx-auto h-12 w-auto text-ev-green" />
        <h2 className="mt-6 text-center text-3xl font-display font-bold text-white">
          Join the Network
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400 font-body">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-ev-cyan hover:text-white transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-dark-tech-light py-8 px-4 shadow-[0_0_30px_rgba(0,255,135,0.05)] border border-slate-800 sm:rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-400/10 border border-red-400/30 text-red-500 text-sm p-3 rounded text-center font-body">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-300 font-body mb-2">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-slate-700 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-ev-green focus:border-ev-green sm:text-sm bg-dark-tech text-white font-body transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 font-body mb-2">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-slate-700 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-ev-green focus:border-ev-green sm:text-sm bg-dark-tech text-white font-body transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 font-body mb-2">
                Account Type
              </label>
              <div className="mt-1">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-ev-green focus:border-ev-green sm:text-sm bg-dark-tech text-white font-body transition-colors"
                >
                  <option value="user">EV Driver (User)</option>
                  <option value="admin">Station Owner (Admin)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 font-body mb-2">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-slate-700 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-ev-green focus:border-ev-green sm:text-sm bg-dark-tech text-white font-body transition-colors pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <AiOutlineEyeInvisible className="h-5 w-5" /> : <AiOutlineEye className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-500 font-body text-right">Must be at least 8 characters</p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold font-body text-dark-tech bg-ev-green hover:bg-[#00e676] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ev-green transition-all shadow-[0_0_15px_rgba(0,255,135,0.4)] hover:shadow-[0_0_25px_rgba(0,255,135,0.6)]"
              >
                Create Account
              </button>
            </div>
            
            <p className="text-xs text-slate-500 text-center font-body mt-4">
               By registering, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
