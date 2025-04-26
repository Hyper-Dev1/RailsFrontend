import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Briefcase, Building2} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">Elevate Workforce</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/jobs" className="nav-link">Find Jobs</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <div className="border-l border-gray-300 h-6 mx-2"></div>
            <Link to="http://localhost:3000/admin/dashboard" className="nav-link flex items-center">
              <Building2 className="w-4 h-4 mr-1" />
              Vendor Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link to="/jobs" className="block py-2 px-4 hover:bg-gray-100">Find Jobs</Link>
            <Link to="/about" className="block py-2 px-4 hover:bg-gray-100">About Us</Link>
            <Link to="/contact" className="block py-2 px-4 hover:bg-gray-100">Contact</Link>
            <div className="border-t border-gray-200 my-2"></div>
            <Link to="http://localhost:3000/admin/dashboard" className="block py-2 px-4 hover:bg-gray-100 flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Vendor Portal
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;