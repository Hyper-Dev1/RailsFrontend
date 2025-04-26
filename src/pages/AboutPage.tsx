import { Shield, Users, Globe, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary text-center mb-8">
            About Elevate Workforce Solutions
          </h1>
          
          <div className="bg-white/50 rounded-lg p-8 mb-12">
            <p className="text-lg text-gray-700 mb-6">
              Elevate Workforce Solutions is Nepal's leading employment agency, dedicated to connecting talented professionals with outstanding career opportunities. We bridge the gap between employers and job seekers, facilitating meaningful connections that drive success for both parties.
            </p>
            <p className="text-lg text-gray-700">
              Founded with a vision to transform Nepal's employment landscape, we leverage technology and industry expertise to make job searching and recruitment more efficient, transparent, and successful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/50 rounded-lg p-6">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-700">
                To empower Nepal's workforce by providing accessible, quality job opportunities and helping businesses find exceptional talent.
              </p>
            </div>
            <div className="bg-white/50 rounded-lg p-6">
              <Globe className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-gray-700">
                To be the most trusted and innovative workforce solutions provider in Nepal, driving economic growth through employment.
              </p>
            </div>
          </div>

          <div className="bg-white/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <Award className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Industry Expertise</h3>
                  <p className="text-gray-700">Deep understanding of Nepal's job market and industry trends</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Users className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Personalized Approach</h3>
                  <p className="text-gray-700">Tailored solutions for both employers and job seekers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;