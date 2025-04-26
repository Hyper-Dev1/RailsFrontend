import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage';
import JobsPage from './pages/JobsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './styles/main.scss';
import Navbar from './components/NavBar';
import JobDetailsPage from './pages/JobDetailsPage';
import Login from './pages/Vendor/Login';
import Register from './pages/Vendor/Registration';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-secondary">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/vendor/login" element={<Login />} />
            <Route path="/vendor/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;