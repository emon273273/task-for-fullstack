import { logintype, loginSchema } from "../schema/userSchema";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [apiError, setApiError] = useState<string>("");

  const [input, setInput] = useState<logintype>({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev:any) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setApiError("");
  };

  // Login API call
  const loginUser = async (credentials: logintype) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw error;
    }
  };

  // Handle form submission
  const loginForm = async (e: FormEvent) => {
    e.preventDefault();
    setApiError("");

    // Validate form data
    const result = loginSchema.safeParse(input);

    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setErrors(fieldError);
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(input);
      
      // Save token to localStorage
      localStorage.setItem('token', response.token);
      
      // Save user email for role checking
      localStorage.setItem('userEmail', input.email);
      
      // Set token for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
      
      // Check email and navigate accordingly
      if (input.email.toLowerCase() === 'admin@gmail.com') {
        navigate('/admin');
      } else {
        navigate('/users');
      }
      
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'An error occurred during login');
      setErrors({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen border bg-red-50">
      <form
        className="md:p-8 md:w-full max-w-md rounded-lg md:border border-gray-700"
        onSubmit={loginForm}
      >
        <h1 className="font-bold text-2xl text-center">Login</h1>

        {apiError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {apiError}
          </div>
        )}

        <div>
          <div className="relative mb-6">
            <label className="pl-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="pl-8 focus-visible:ring-1 w-full border border-gray-300 p-2 rounded"
              onChange={handleChange}
              name="email"
              value={input.email}
            />
            <Mail className="absolute inset-y-7 left-1 text-gray-400 pointer-events-none" />
            {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
          </div>

          <div className="relative">
            <label className="pl-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="pl-8 focus-visible:ring-1 w-full border border-gray-300 p-2 rounded"
              onChange={handleChange}
              value={input.password}
              name="password"
            />
            <LockKeyhole className="absolute inset-y-7 left-1 text-gray-400 pointer-events-none" />
            {errors.password && (
              <p className="text-red-500">{errors.password[0]}</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            className={`w-full rounded-xl p-2 text-white ${
              loading ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600'
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </span>
            ) : (
              'Login'
            )}
          </button>
        </div>

        <hr className="my-6" />
        <p>Don't have an account?</p>
        <div className="mt-6">
          <Link to="/signup">
            <button className="w-full rounded-xl p-2 bg-gray-300 hover:bg-gray-400 transition-colors">
              Sign Up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;