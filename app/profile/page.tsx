'use client';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserProfile, logout, updateUserProfile } from '@/redux/authSlice';
import { IconUser, IconBook, IconAt, IconEdit, IconLogout } from '@tabler/icons-react';
import UserBooksSection from '../UserBooksSection'

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  favoriteGenre?: string;
  penName?: string;
  biography?: string;
}

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const profile = useAppSelector((state) => state.auth.profile);
  const authStatus = useAppSelector((state) => state.auth.status);
  const authError = useAppSelector((state) => state.auth.error);

  useEffect(() => {
    console.log(profile)
    
    if (!token) {
      router.push('/login');
      return;
    }

    if (token.split('.').length !== 3) {
      setError('Invalid token format');
      return;
    }

    dispatch(fetchUserProfile(token));
  }, [token, dispatch, router]);

  useEffect(() => {
    if (authError === 'Unauthorized' || authError === 'Rejected') {
      dispatch(logout())
      router.push('/login');
    }
  }, [authError, router]);

  const handleEditClick = () => {
    setEditMode(true);
    if (user && profile) {
      setFormData({
        username: user.username,
        email: user.email,
        password: '',
        confirmPassword: '',
        role: user.role,
        favoriteGenre: profile?.reader?.favoriteGenre || '',
        penName: profile?.author?.penName || '',
        biography: profile?.author?.biography || '',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    router.push('/login');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Token is missing');
      return;
    }

    try {
      await dispatch(updateUserProfile({
        token,
        updateData: {
          username: formData.username,
          email: formData.email,
          password: formData.password || undefined,
          role: formData.role,
          favoriteGenre: formData.favoriteGenre || undefined,
          penName: formData.penName || undefined,
          biography: formData.biography || undefined,
        }
      })).unwrap();
      setEditMode(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (authError && authError !== 'Unauthorized') {
    return <div className="text-center text-red-500">{authError}</div>;
  }

  if (authStatus === 'loading' || !user || !profile) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white shadow-md rounded-lg border border-gray-200">
      <div className="flex items-center justify-between w-full ">
      <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
        <button onClick={handleLogout}>
          <IconLogout className="text-gray-900" size={24} />
        </button>
    </div>
        {editMode ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {user.role === 'Reader' && (
                <div>
                  <label htmlFor="favoriteGenre" className="block text-sm font-medium text-gray-700">Favorite Genre</label>
                  <input
                    id="favoriteGenre"
                    name="favoriteGenre"
                    type="text"
                    className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.favoriteGenre}
                    onChange={handleChange}
                  />
                </div>
              )}
              {user.role === 'Author' && (
                <>
                  <div>
                    <label htmlFor="penName" className="block text-sm font-medium text-gray-700">Pen Name</label>
                    <input
                      id="penName"
                      name="penName"
                      type="text"
                      className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.penName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="biography" className="block text-sm font-medium text-gray-700">Biography</label>
                    <textarea
                      id="biography"
                      name="biography"
                      className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.biography}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center justify-between space-x-5">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <IconUser className="w-6 h-6 text-gray-500" />
              <span className="text-lg font-medium text-gray-900">{user.username}</span>
            </div>
            <div className="flex items-center space-x-2">
              <IconAt className="w-6 h-6 text-gray-500" />
              <span className="text-lg font-medium text-gray-900">{user.email}</span>
            </div>
            {user.role === 'Reader' && (
              <>
                <div className="flex items-center space-x-2">
                  <IconBook className="w-6 h-6 text-gray-500" />
                  <span className="text-lg font-medium text-gray-900">Favorite Genre: {profile.reader?.favoriteGenre}</span>
                </div>
              </>
            )}
            {user.role === 'Author' && (
              <>
                {profile.author && (
                  <><div className="flex items-center space-x-2">
                      <IconUser className="w-6 h-6 text-gray-500" />
                      <span className="text-lg font-medium text-gray-900">Pen Name: {profile.author.penName}</span>
                    </div><div className="flex items-center space-x-2">
                        <IconEdit className="w-6 h-6 text-gray-500" />
                        <span className="text-lg font-medium text-gray-900">Biography: {profile.author.biography}</span>
                      </div></>
                )}
                {profile.booksWritten && profile.booksWritten.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-900">Books Written:</h3>
                    <ul className="list-disc list-inside">
                      {profile.booksWritten.map((book) => (
                        <li key={book.id} className="text-lg font-medium text-gray-900">{book.title}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => router.push('/addEbook')}
                >
                  Create New Ebook
                </button>
              </>
            )}
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
          </div>
        )}

      </div>
      <div >
        {editMode?(
          <></>
        ):(
          <UserBooksSection user={profile}></UserBooksSection>
        )}
      </div>
    </div>
  );
}
function setError(message: any) {
  throw new Error('Function not implemented.');
}
