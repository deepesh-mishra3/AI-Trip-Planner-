import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const TripContext = createContext();

export const useTrip = () => {
  return useContext(TripContext);
};

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  const handleAuthError = () => {
    logout();
    navigate('/login');
  };

  const fetchTrips = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/trips', getAuthHeaders());
      setTrips(response.data);
      setError(null);
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthError();
      } else {
        setError(error.response?.data?.message || 'Failed to fetch trips');
      }
    } finally {
      setLoading(false);
    }
  }, [user, logout, navigate]);

  const createTrip = async (tripData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:5000/api/trips',
        tripData,
        getAuthHeaders()
      );
      setTrips([response.data, ...trips]);
      setError(null);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthError();
      } else {
        setError(error.response?.data?.message || 'Failed to create trip');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (tripId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/trips/${tripId}`, getAuthHeaders());
      setTrips(trips.filter(trip => trip._id !== tripId));
      setError(null);
      return true;
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthError();
      } else {
        setError(error.response?.data?.message || 'Failed to delete trip');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    trips,
    loading,
    error,
    fetchTrips,
    createTrip,
    deleteTrip
  };

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
}; 