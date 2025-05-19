import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const { theme } = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const success = await register(formData.name, formData.email, formData.password);
      if (success) {
        toast.success('Registration successful!');
        navigate('/');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 
        className="text-3xl font-bold text-center mb-8"
        style={{ color: theme === 'dark' ? '#ffffff' : '#1f2937' }}
      >
        Create an Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            className="block mb-2" 
            htmlFor="name"
            style={{ color: theme === 'dark' ? '#cbd5e1' : '#4b5563' }}
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter your full name"
              style={{ borderWidth: '1px' }}
            />
          </div>
        </div>

        <div>
          <label 
            className="block mb-2" 
            htmlFor="email"
            style={{ color: theme === 'dark' ? '#cbd5e1' : '#4b5563' }}
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter your email"
              style={{ borderWidth: '1px' }}
            />
          </div>
        </div>

        <div>
          <label 
            className="block mb-2" 
            htmlFor="password"
            style={{ color: theme === 'dark' ? '#cbd5e1' : '#4b5563' }}
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Create a password"
              style={{ borderWidth: '1px' }}
            />
          </div>
        </div>

        <div>
          <label 
            className="block mb-2" 
            htmlFor="confirmPassword"
            style={{ color: theme === 'dark' ? '#cbd5e1' : '#4b5563' }}
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
            </div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Confirm your password"
              style={{ borderWidth: '1px' }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p 
        className="mt-4 text-center"
        style={{ color: theme === 'dark' ? '#cbd5e1' : '#4b5563' }}
      >
        Already have an account?{' '}
        <Link 
          to="/login" 
          className="text-blue-500 hover:text-blue-600 transition-colors hover:underline"
        >
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register; 