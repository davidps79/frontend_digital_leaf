'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { registerUser } from '@/redux/authSlice';

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  role: string;
  favoriteGenre: string;
  penName: string;
  biography: string;
}

export default function RegisterPage() {
  const [userType, setUserType] = useState<string>('Reader');
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: 'Reader',
    favoriteGenre: '',
    penName: '',
    biography: '',
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authStatus = useAppSelector((state) => state.auth.status);
  const authError = useAppSelector((state) => state.auth.error);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newUserType = e.target.value;
    setUserType(newUserType);
    setFormData({
      ...formData,
      role: newUserType,
      favoriteGenre: '',
      penName: '',
      biography: '',
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await dispatch(registerUser({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: formData.role,
        favoriteGenre: formData.favoriteGenre,
        penName: formData.penName,
        biography: formData.biography,
      })).unwrap();
      router.push('/');
    } catch (err) {
      console.error('Error details:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-900">Register</h2>
        {authStatus === 'failed' && <p className="text-red-500 text-center">{authError}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">User Type</label>
              <select
                id="userType"
                name="userType"
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={userType}
                onChange={handleUserTypeChange}
              >
                <option value="Reader">Reader</option>
                <option value="Author">Author</option>
              </select>
            </div>
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {userType === 'Reader' && (
              <div>
                <label htmlFor="favoriteGenre" className="block text-sm font-medium text-gray-700">Favorite Genre</label>
                <select
                  id="favoriteGenre"
                  name="favoriteGenre"
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={formData.favoriteGenre}
                  onChange={handleChange}
                >
                  <option value="">Select a genre</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Horror">Horror</option>
                </select>
              </div>
            )}
            {userType === 'Author' && (
              <>
                <div>
                  <label htmlFor="penName" className="sr-only">Pen Name</label>
                  <input
                    id="penName"
                    name="penName"
                    type="text"
                    className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Pen Name"
                    value={formData.penName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="biography" className="sr-only">Biography</label>
                  <textarea
                    id="biography"
                    name="biography"
                    className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Biography"
                    value={formData.biography}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
          <div className="flex items-center justify-center text-sm">
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              I have an account
            </a>
          </div>
        </form>
        {authError && <p className="text-red-500 text-center mt-2">{authError}</p>}
        {authStatus === 'loading' && <p className="text-center mt-2">Loading...</p>}
      </div>
    </div>
  );
}

function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

