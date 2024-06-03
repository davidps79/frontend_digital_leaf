'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { uploadEbook } from '@/crudEbok/uploadEbook';
import { uploadEbookCover } from '../../crudImageEbook/uploadEbookCover';
import { addNewEbook } from '@/redux/authSlice';
import { InfoEbookDto } from '@/lib/ebook';
import LogoLoader from '../../LogoLoader';

const CreateEbookPage: React.FC = () => {
  const authorId = useAppSelector((state) => state.auth.user?.id );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({
    title: '',
    publisher: '',
    overview: '',
    price: '',
    stock: '',
    fileData: null as File | null,
    numVotes:0,
    isbn: '',
    version: '',
    rating: 0,
    category: '',
    ebookCover: null as File | null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      const files = e.target.files;
      if (files && files.length > 0) {
        setFormData({
          ...formData,
          [name]: files[0],
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError('Token is missing');
      router.push('/login');
      return;
    }

    try {
      const dataEbook = await uploadEbook(formData.title, formData.fileData);
      const dataCover = await uploadEbookCover(formData.ebookCover);

      const ebookData = {
        title: formData.title,
        publisher: formData.publisher,
        authorId: authorId, 
        overview: formData.overview,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        fileData: dataEbook.path,
        isbn: formData.isbn,
        version: formData.version,
        rating: formData.rating,
        category: formData.category,
        ebookCover: dataCover.path,
      };
      console.log(ebookData)
      await dispatch(addNewEbook({ token, ebookData })).unwrap();
      router.push('/profile');
    } catch (err: any) {
      if (err === 'Unauthorized') {
        router.push('/login');
      } else if (err.message === 'The resource already exists') {
        setError('An ebook with this title already exists. Please choose a different title.');
      } else {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <LogoLoader />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white shadow-md rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-900">Create New eBook</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">Publisher</label>
              <input
                id="publisher"
                name="publisher"
                type="text"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.publisher}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="overview" className="block text-sm font-medium text-gray-700">Overview</label>
              <textarea
                id="overview"
                name="overview"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.overview}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                id="stock"
                name="stock"
                type="number"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="fileData" className="block text-sm font-medium text-gray-700">File</label>
              <input
                id="fileData"
                name="fileData"
                type="file"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">ISBN</label>
              <input
                id="isbn"
                name="isbn"
                type="text"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.isbn}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="version" className="block text-sm font-medium text-gray-700">Version</label>
              <input
                id="version"
                name="version"
                type="text"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.version}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category"
                name="category"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="Fantasía">Fantasia</option>
                <option value="Comedia">Comedia</option>
                <option value="Horror">Horror</option>
                <option value="Historia">Historia</option>
                <option value="Ciencia ficción">Ciencia Ficcion</option>
                <option value="Romance">Romance</option>
                <option value="Misterio">Misterio</option>
              </select>
            </div>
            <div>
              <label htmlFor="ebookCover" className="block text-sm font-medium text-gray-700">eBook Cover</label>
              <input
                id="ebookCover"
                name="ebookCover"
                type="file"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between space-x-5">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create eBook
            </button>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEbookPage;
