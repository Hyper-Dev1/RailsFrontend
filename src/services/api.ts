import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1'; // Updated to use local backend

// Retrieve CSRF token from the meta tag in the HTML
const getCsrfToken = () => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  return csrfToken;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': getCsrfToken(),  // Include CSRF token in the request headers
  },
});

export interface JobFilters {
  keyword?: string;
  location?: string;
  category?: string;
  jobType?: string;
  experienceLevel?: string;
  salaryRange?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  postedDate: string;
  requirements?: string[];
  responsibilities?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  jobId: string;
}

export const jobsApi = {
  getJobs: async (filters?: JobFilters) => {
    const response = await api.get<Job[]>('/jobs', { params: filters });
    return response.data;
  },
  
  getJobById: async (id: string) => {
    const response = await api.get<Job>(`/jobs/${id}`);
    return response.data;
  },
  
  submitApplication: async (data: ApplicationFormData) => {
    const response = await api.post('/applications', data);
    return response.data;
  }
};

export const contactApi = {
  submitContact: async (data: ContactFormData) => {
    const response = await api.post('/contacts', data);
    return response.data;
  },
};

export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/login', data);
    return response.data;
  },
  
  register: async (data: any) => {
    const response = await api.post('/register', data);
    return response.data;
  }
};

export default api;
