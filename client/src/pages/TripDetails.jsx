import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { 
  FaMapMarkerAlt, 
  FaUsers, 
  FaRupeeSign, 
  FaCalendarAlt, 
  FaArrowLeft, 
  FaTrash,
  FaClock,
  FaHotel,
  FaUtensils,
  FaMapMarkedAlt
} from 'react-icons/fa';
import { API_URL } from '../config';

const TripDetails = () => {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/trips/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTrip(response.data);
      } catch (error) {
        toast.error('Failed to load trip details');
        navigate('/trips');
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await axios.delete(`${API_URL}/api/trips/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Trip deleted successfully');
        navigate('/trips');
      } catch (error) {
        toast.error('Failed to delete trip');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Trip not found</h2>
        <Link
          to="/trips"
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 text-lg font-semibold transition-colors"
        >
          <FaArrowLeft className="text-xl" /> Back to Trips
        </Link>
      </div>
    );
  }

  const formatItinerary = (itinerary) => {
    const lines = itinerary.split('\n');
    const formattedLines = [];
    let currentDay = null;

    lines.forEach((line) => {
      if (line.toLowerCase().includes('day')) {
        currentDay = line;
        formattedLines.push({ type: 'day', content: line });
      } else if (line.trim()) {
        formattedLines.push({ type: 'activity', content: line, day: currentDay });
      }
    });

    return formattedLines;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <Link
          to="/trips"
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Trips</span>
        </Link>
        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold transition-colors bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg"
        >
          <FaTrash />
          <span>Delete Trip</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">{trip.destination}</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <FaCalendarAlt className="text-xl" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Duration</p>
                <p className="font-semibold">{trip.days} days</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <FaUsers className="text-xl" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Travel With</p>
                <p className="font-semibold">{trip.companions}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <FaRupeeSign className="text-xl" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Budget</p>
                <p className="font-semibold">₹{trip.budget}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Created On</p>
                <p className="font-semibold">{new Date(trip.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FaMapMarkedAlt className="text-blue-500" />
            Your Itinerary
          </h2>
          <div className="space-y-6">
            {formatItinerary(trip.itinerary).map((item, index) => (
              <div
                key={index}
                className={`${
                  item.type === 'day'
                    ? 'bg-blue-50 p-4 rounded-lg font-bold text-lg text-blue-800'
                    : 'pl-8 border-l-2 border-blue-100 py-2 hover:border-blue-500 transition-colors'
                }`}
              >
                {item.type === 'day' ? (
                  <div className="flex items-center gap-2">
                    <FaClock className="text-blue-500" />
                    {item.content}
                  </div>
                ) : (
                  <div className="text-gray-700 hover:text-gray-900 transition-colors">
                    {item.content.includes('Hotel') || item.content.includes('Stay') ? (
                      <div className="flex items-center gap-2">
                        <FaHotel className="text-blue-500 flex-shrink-0" />
                        <span>{item.content}</span>
                      </div>
                    ) : item.content.includes('Breakfast') || item.content.includes('Lunch') || item.content.includes('Dinner') ? (
                      <div className="flex items-center gap-2">
                        <FaUtensils className="text-blue-500 flex-shrink-0" />
                        <span>{item.content}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                        <span>{item.content}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails; 