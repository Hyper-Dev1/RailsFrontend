import { Link } from 'react-router-dom';
import { Search, Users, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Your Gateway to Career Success in Nepal
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Connect with top employers and discover opportunities that match your skills and aspirations.
          </p>
          <Link to="/jobs" className="btn btn-primary text-lg px-8 py-3">
            Explore Jobs
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Why Choose Elevate Workforce?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card">
              <Users className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Top Employers</h3>
              <p className="text-gray-700">
                Partner with Nepal's leading companies and organizations
              </p>
            </div>
            <div className="feature-card">
              <Search className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-700">
                Find jobs that perfectly match your skills and experience
              </p>
            </div>
            <div className="feature-card">
              <TrendingUp className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p className="text-gray-700">
                Access resources and opportunities for professional development
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-primary rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Are you an employer?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Join our network of leading companies and find the perfect talent for your organization
          </p>
          <Link to="/vendor/register" className="btn bg-white text-primary hover:bg-secondary">
            Register as Employer
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;