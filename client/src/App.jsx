import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PlanTrip from './pages/PlanTrip';
import TripHistory from './pages/TripHistory';
import TripDetails from './pages/TripDetails';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <TripProvider>
            <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/plan-trip"
                    element={
                      <PrivateRoute>
                        <PlanTrip />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/trips"
                    element={
                      <PrivateRoute>
                        <TripHistory />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/trips/:id"
                    element={
                      <PrivateRoute>
                        <TripDetails />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <ToastContainer 
                position="bottom-right"
                theme="colored"
              />
            </div>
          </TripProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
