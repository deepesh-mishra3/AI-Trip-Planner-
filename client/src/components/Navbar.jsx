import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaUser, FaSignOutAlt, FaPlane, FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav style={{ backgroundColor: 'var(--bg-secondary)' }} className="shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
            <FaPlane className="text-blue-500" />
            <span>AI Trip Planner</span>
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/plan-trip"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Plan New Trip
                </Link>
                <Link
                  to="/trips"
                  className="text-blue-500 hover:text-blue-600 transition-colors font-medium"
                >
                  My Trips
                </Link>
                <div className="flex items-center space-x-2" style={{ color: 'var(--text-primary)' }}>
                  <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--bg-primary)' }}>
                    <FaUser className="text-blue-500" />
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-110"
                  style={{ backgroundColor: 'var(--bg-primary)' }}
                >
                  {theme === 'light' ? (
                    <FaMoon className="text-gray-600" size={20} />
                  ) : (
                    <FaSun className="text-yellow-400" size={20} />
                  )}
                </button>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-6">
                <Link
                  to="/login"
                  className="font-medium hover:text-blue-500 transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Register
                </Link>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-110"
                  style={{ backgroundColor: 'var(--bg-primary)' }}
                >
                  {theme === 'light' ? (
                    <FaMoon className="text-gray-600" size={20} />
                  ) : (
                    <FaSun className="text-yellow-400" size={20} />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 