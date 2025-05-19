import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTrip } from '../context/TripContext';
import { useTheme } from '../context/ThemeContext';
import { 
  FaMapMarkerAlt, 
  FaUsers, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaTrash, 
  FaEye,
  FaMoon,
  FaSun,
  FaWallet
} from 'react-icons/fa';

const TripHistory = () => {
  const { trips, loading, error, fetchTrips, deleteTrip } = useTrip();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const loadTrips = async () => {
      try {
        await fetchTrips();
      } catch (err) {
        toast.error('Failed to load trips. Please try again.');
      }
    };
    loadTrips();
  }, [fetchTrips]);

  const handleDelete = async (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      const success = await deleteTrip(tripId);
      if (success) {
        toast.success('Trip deleted successfully');
      }
    }
  };

  const calculateTotalBudget = () => {
    return trips.reduce((total, trip) => total + trip.budget, 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-4">Error Loading Trips</h2>
        <p className="text-red-500 mb-8 text-lg">{error}</p>
        <button
          onClick={() => fetchTrips()}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!trips || trips.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">No Trips Found</h2>
        <p className="text-lg mb-8 text-secondary">Start planning your next adventure today!</p>
        <Link
          to="/plan-trip"
          className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Plan Your First Trip
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-bold mb-2">Your Adventures</h2>
          <p className="text-secondary">Discover and manage your travel memories</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-opacity-80 transition-colors"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>
          <Link
            to="/plan-trip"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
          >
            <span>Plan New Trip</span>
          </Link>
        </div>
      </div>

      {/* Total Budget Card */}
      <div className="mb-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-lg">
            <FaWallet size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold opacity-90">Total Budget</h3>
            <p className="text-3xl font-bold">₹{calculateTotalBudget().toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trips.map((trip) => (
          <div
            key={trip._id}
            className="rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold">
                  {trip.destination}
                </h3>
                <button
                  onClick={() => handleDelete(trip._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-1 rounded-full hover:bg-red-50"
                  aria-label="Delete trip"
                >
                  <FaTrash size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <FaCalendarAlt className="text-blue-500" size={18} />
                  <span>{trip.days} days</span>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <FaUsers className="text-green-500" size={18} />
                  <span>{trip.companions}</span>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <FaRupeeSign className="text-purple-500" size={18} />
                  <span>{trip.budget}</span>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <FaMapMarkerAlt className="text-orange-500" size={18} />
                  <span>{new Date(trip.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <Link
                to={`/trips/${trip._id}`}
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg text-center font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <FaEye size={18} />
                <span>View Details</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHistory; 