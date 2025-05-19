import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTrip } from '../context/TripContext';
import { useTheme } from '../context/ThemeContext';
import { FaMapMarkerAlt, FaUsers, FaRupeeSign, FaCalendarAlt } from 'react-icons/fa';

const PlanTrip = () => {
  const [formData, setFormData] = useState({
    destination: '',
    days: 1,
    companions: 'Solo',
    budget: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { createTrip } = useTrip();
  const { theme } = useTheme();

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) || '' : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const trip = await createTrip(formData);
      if (trip) {
        toast.success('Trip itinerary generated successfully!');
        navigate(`/trips/${trip._id}`);
      }
    } catch (error) {
      toast.error('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 
        className="text-3xl font-bold text-center mb-8"
        style={{ color: theme === 'dark' ? '#ffffff' : '#1f2937' }}
      >
        Plan Your Trip
      </h2>

      <form onSubmit={handleSubmit} className={`space-y-6 p-6 rounded-lg shadow-md ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div>
          <label 
            className="block mb-2" 
            htmlFor="destination"
            style={{ color: theme === 'dark' ? '#cbd5e1' : '#4b5563' }}
          >
            Destination
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
            </div>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter destination (e.g., Manali)"
              style={{ borderWidth: '1px' }}
            />
          </div>
        </div>

        <div>
          <label 
            className="block mb-2" 
            htmlFor="days"
            style={{ color: theme === 'dark' ? '#cbd5e1' : '#4b5563' }}
          >
            Number of Days
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
            </div>
            <input
              type="number"
              id="days"
              name="days"
              min="1"
              max="14"
              value={formData.days}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              style={{ borderWidth: '1px' }}
            />
          </div>
        </div>

        <div>
          <label 
            className="block mb-2" 
            htmlFor="companions"
            style={{ color: theme === 'dark' ? '#cbd5e1' : '#4b5563' }}
          >
            Travel With
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUsers className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
            </div>
            <select
              id="companions"
              name="companions"
              value={formData.companions}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ borderWidth: '1px' }}
            >
              <option value="Solo">Solo</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
            </select>
          </div>
        </div>

        <div>
          <label 
            className="block mb-2" 
            htmlFor="budget"
            style={{ color: theme === 'dark' ? '#cbd5e1' : '#4b5563' }}
          >
            Budget (₹)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaRupeeSign className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
            </div>
            <input
              type="number"
              id="budget"
              name="budget"
              min="1000"
              value={formData.budget}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter your budget"
              style={{ borderWidth: '1px' }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Generating Itinerary...' : 'Generate AI Itinerary'}
        </button>
      </form>

      <p 
        className="mt-4 text-center"
        style={{ color: theme === 'dark' ? '#cbd5e1' : '#4b5563' }}
      >
        Our AI will create a personalized itinerary based on your preferences
      </p>
    </div>
  );
};

export default PlanTrip; 