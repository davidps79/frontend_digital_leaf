'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { addEbook } from '../API/api';
import { uploadEbook } from '@/crudEbok/uploadEbook';

export default function CreateEbookPage() {
  const [formData, setFormData] = useState({
    title: '',
    publisher: '',
    overview: '',
    price: '',
    stock: '',
    fileData: null,
    isbn: '',
    version: '',
    rating: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'fileData') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const authorId = decodedToken.sub;

      const dataEbook = await uploadEbook(formData.title, formData.fileData);

      const ebookData = {
        title: formData.title,
        publisher: formData.publisher,
        authorId: authorId,
        overview: formData.overview,
        price: formData.price,
        stock: formData.stock,
        fileData: dataEbook.path,
        isbn: formData.isbn,
        version: formData.version,
        rating: 0,
      };
      
      console.log(ebookData);

      const data = await addEbook(ebookData);

      console.log(data);

      router.push('/profile');

    } catch (error) {
      setError(error.message);
    }
  };

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
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create eBook
            </button>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
