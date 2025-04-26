import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MapPin, Clock, Building2, DollarSign, Calendar, Briefcase, GraduationCap, FileText } from 'lucide-react';
import { jobsApi } from '../services/api';

// Application form schema
const applicationSchema = yup.object({
  name: yup.string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  phone_number: yup.string()
    .required('Phone number is required')
    .matches(/^[0-9+\-\s]+$/, 'Invalid phone number format')
    .min(7, 'Phone number is too short')
    .max(15, 'Phone number is too long'),
  cover_letter: yup.string()
    .required('Cover letter is required')
    .min(50, 'Cover letter must be at least 50 characters')
    .max(1000, 'Cover letter must not exceed 1000 characters')
});

type ApplicationFormData = yup.InferType<typeof applicationSchema>;

const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Fetch job details from API
  const { data: job, isLoading, isError } = useQuery({
    queryKey: ['job', id],
    queryFn: () => jobsApi.getJobById(id || ''),
    enabled: !!id,
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ApplicationFormData>({
    resolver: yupResolver(applicationSchema)
  });

  // API mutation for job application
  const mutation = useMutation({
    mutationFn: (data: ApplicationFormData) => {
      return jobsApi.submitApplication({
        ...data,
        job_id: id || '',
        company_id: job?.company_id || '',
      });
    },
    onSuccess: () => {
      alert('Your application has been submitted successfully!');
      reset();
    },
    onError: () => {
      alert('There was an error submitting your application. Please try again.');
    }
  });

  const onSubmit = (data: ApplicationFormData) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-gray-600">Loading job details...</p>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/jobs')}
            className="btn btn-primary"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">{job.title}</h1>
              <div className="flex items-center mb-4">
                <Building2 className="w-5 h-5 mr-2 text-gray-500" />
                <span className="text-xl text-gray-700">{job.company}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="text-gray-700">{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="text-gray-700">{job.type}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="text-gray-700">{job.salary}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="text-gray-700">Posted {job.postedDate}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0">
              <button 
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary"
              >
                Apply Now
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">Job Description</h2>
            <p className="text-gray-700 mb-6">{job.description}</p>
            
            {job.requirements && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-primary mb-3 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Requirements
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {job.responsibilities && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-primary mb-3 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Responsibilities
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div id="application-form" className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-2" />
            Apply for this Position
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                {...register('name')}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone_number" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phone_number"
                className={`form-input ${errors.phone_number ? 'border-red-500' : ''}`}
                {...register('phone_number')}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="cover_letter" className="form-label">Cover Letter</label>
              <textarea
                id="cover_letter"
                className={`form-input min-h-[150px] ${errors.cover_letter ? 'border-red-500' : ''}`}
                {...register('cover_letter')}
                placeholder="Tell us why you're a good fit for this position..."
              ></textarea>
              {errors.cover_letter && (
                <p className="text-red-500 text-sm mt-1">{errors.cover_letter.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting || mutation.isPending}
            >
              {(isSubmitting || mutation.isPending) ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                  Submitting Application...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;