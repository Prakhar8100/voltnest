import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsLightningChargeFill, BsArrowLeft, BsCheckCircleFill } from 'react-icons/bs';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { data } = await axios.post('/api/v1/auth/forgotpassword', { email });
      setMessage('A reset link has been sent to your email address.');
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
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
              <BsLightningChargeFill className="h-8 w-8 text-ev-cyan" />
            </div>
            <h2 className="text-3xl font-display font-extrabold text-white tracking-tight">
              Forgot Password?
            </h2>
            <p className="mt-3 text-sm text-slate-400 font-body">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          {submitted ? (
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-ev-cyan/10 rounded-full flex items-center justify-center border border-ev-cyan/30">
                  <BsCheckCircleFill className="h-10 w-10 text-ev-cyan" />
                </div>
              </div>
              <div className="bg-ev-cyan/5 border border-ev-cyan/20 p-4 rounded-xl">
                <p className="text-ev-cyan text-sm font-medium leading-relaxed">
                  {message}
                </p>
              </div>
              <p className="text-slate-400 text-sm font-body">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-ev-cyan hover:underline font-medium"
                >
                  try again
                </button>
              </p>
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors pt-4"
              >
                <BsArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 text-sm p-4 rounded-r-md font-body">
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
                      Sending...
                    </>
                  ) : 'Send Reset Link'}
                </button>
              </div>

              <div className="text-center mt-6">
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-ev-cyan transition-colors duration-300 text-sm font-medium"
                >
                  <BsArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
