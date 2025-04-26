import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import JobCard from '../components/JobCard';
import { Search } from 'lucide-react';
import { jobsApi } from '../services/api';
import Pagination from '../components/Pagination';

const JobsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const jobsPerPage = 6;

  // Fetch jobs from API
  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => jobsApi.getJobs(),
  });

  // Filter jobs based on search term
  const filteredJobs = jobs?.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="bg-secondary min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Available Jobs
          </h1>
          <p className="text-gray-600 text-lg">
            Find your perfect role from our curated job listings
          </p>
        </div>

        {/* Simple Search */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for jobs by title, company, or location"
              className="form-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-600">Loading jobs...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            Error loading jobs. Please try again later.
          </div>
        ) : currentJobs.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No jobs found matching your criteria.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        )}

        {filteredJobs.length > jobsPerPage && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        )}
      </div>
    </div>
  );
};

export default JobsPage;