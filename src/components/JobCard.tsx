import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Building2, DollarSign } from 'lucide-react';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  posted_on: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  location,
  type,
  salary,
  description,
  posted_on,
}) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-primary">{title}</h3>
          <div className="flex items-center mt-2">
            <Building2 className="w-4 h-4 mr-1 text-gray-500" />
            <span className="text-gray-700">{company}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
          <span className="text-gray-700">{location}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1 text-gray-500" />
          <span className="text-gray-700">{type}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
          <span className="text-gray-700">{salary}</span>
        </div>
      </div>
      
      <p className="mt-4 text-gray-600 line-clamp-2">{description}</p>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-500">{posted_on}</span>
        <Link to={`/jobs/${id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
};

export default JobCard;