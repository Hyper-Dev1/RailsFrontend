import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { Building2, Mail, Phone, Globe, User, Lock } from 'lucide-react';
import { authApi } from '../../services/api';

// Registration form schema
const registerSchema = yup.object({
  name: yup.string()
    .required('Company name is required')
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must not exceed 100 characters'),
  contact_person: yup.string()
    .required('Contact person name is required')
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
  website: yup.string()
    .url('Please enter a valid URL')
    .nullable(),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match')
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema)
  });

  // API mutation
  const mutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      // Remove confirmPassword as it's not needed for the API
      const { confirmPassword, ...registerData } = data;
      return await authApi.register(registerData);
    },
    onSuccess: (data) => {
      // Store token in localStorage for future API calls
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      alert('Registration successful! You can now log in.');
      navigate(`http://localhost:3000/admin/dashboard?token=${data.token}`);
    },
    onError: () => {
      alert('Registration failed. Please try again.');
    }
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-primary">Vendor Registration</h1>
            <p className="text-gray-600 mt-2">Create your employer account to post jobs and find talent</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="form-label">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    className={`form-input pl-10 ${errors.name ? 'border-red-500' : ''}`}
                    {...register('name')}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact_person" className="form-label">Contact Person</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="contact_person"
                    className={`form-input pl-10 ${errors.contact_person ? 'border-red-500' : ''}`}
                    {...register('contact_person')}
                  />
                </div>
                {errors.contact_person && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact_person.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    className={`form-input pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone_number" className="form-label">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    id="phone_number"
                    className={`form-input pl-10 ${errors.phone_number ? 'border-red-500' : ''}`}
                    {...register('phone_number')}
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="website" className="form-label">Company Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    id="website"
                    className={`form-input pl-10 ${errors.website ? 'border-red-500' : ''}`}
                    placeholder="https://"
                    {...register('website')}
                  />
                </div>
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="form-label">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    id="password"
                    className={`form-input pl-10 ${errors.password ? 'border-red-500' : ''}`}
                    {...register('password')}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    id="confirmPassword"
                    className={`form-input pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    {...register('confirmPassword')}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-center text-gray-600 mt-4">
              Already have an account?{' '}
              <Link to="/vendor/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;