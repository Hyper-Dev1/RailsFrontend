import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { Building2, Mail, Lock } from 'lucide-react';
import { authApi } from '../../services/api';

// Login form schema
const loginSchema = yup.object({
  email: yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});

type LoginFormData = yup.InferType<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  });

  // API mutation
  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await authApi.login(data);
    },
    onSuccess: (data) => {
      // Store token in localStorage for future API calls
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      // Redirect to admin dashboard
      navigate(`http://localhost:3000/admin/dashboard?token=${data.token}`);
    },
    onError: () => {
      alert('Login failed. Please check your credentials and try again.');
    }
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-primary">Vendor Login</h1>
            <p className="text-gray-600 mt-2">Access your employer dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="text-center">
              <Link to="/vendor/register" className="text-primary hover:underline">
                Don't have an account? Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;