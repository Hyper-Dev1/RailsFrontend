import React, { useState } from 'react';
import { Search, MapPin, Building2, Filter } from 'lucide-react';
import { JobFilters as JobFiltersType } from '../services/api';

interface JobFiltersProps {
  onFilter: (filters: JobFiltersType) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<JobFiltersType>({
    keyword: '',
    location: '',
    category: '',
    jobType: '',
    experienceLevel: '',
    salaryRange: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="keyword"
            placeholder="Job title or keywords"
            className="form-input pl-10"
            value={filters.keyword}
            onChange={handleChange}
          />
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="form-input pl-10"
            value={filters.location}
            onChange={handleChange}
          />
        </div>
        
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            name="category"
            className="form-input pl-10"
            value={filters.category}
            onChange={handleChange}
          >
            <option value="">All Categories</option>
            <option value="it">Information Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary flex items-center justify-center">
          <Filter className="w-5 h-5 mr-2" />
          Filter Jobs
        </button>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <select
          name="jobType"
          className="form-input"
          value={filters.jobType}
          onChange={handleChange}
        >
          <option value="">Job Type</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
        </select>
        
        <select
          name="experienceLevel"
          className="form-input"
          value={filters.experienceLevel}
          onChange={handleChange}
        >
          <option value="">Experience Level</option>
          <option value="entry">Entry Level</option>
          <option value="mid">Mid Level</option>
          <option value="senior">Senior Level</option>
        </select>
        
        <select
          name="salaryRange"
          className="form-input"
          value={filters.salaryRange}
          onChange={handleChange}
        >
          <option value="">Salary Range</option>
          <option value="0-30000">$0 - $30,000</option>
          <option value="30000-60000">$30,000 - $60,000</option>
          <option value="60000-90000">$60,000 - $90,000</option>
          <option value="90000+">$90,000+</option>
        </select>
      </div>
    </form>
  );
};

export default JobFilters;