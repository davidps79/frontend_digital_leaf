'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { uploadEbook } from '@/crudEbok/uploadEbook';
import { uploadEbookCover } from '@/app/crudImageEbook/uploadEbookCover';
import { addNewEbook } from '@/redux/authSlice';
import { updateEbook, getBookById } from '@/app/API/api';
import { InfoEbookDto } from '@/lib/ebook';
import LogoLoader from '@/app/LogoLoader';

const BookForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
    isbn: '',
    version: '',
    rating: '',
    category: '',
    ebookCover: null as File | null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
    const user = useAppSelector((state) => state.auth.user) || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null);
  


  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        if (user.role === "Admin") {
          try {
            const ebookData = await getBookById(id);
            setFormData({
              title: ebookData.title,
              publisher: ebookData.publisher,
              overview: ebookData.overview,
              price: ebookData.price,
              stock: ebookData.stock,
              fileData: null,
              isbn: ebookData.isbn,
              version: ebookData.version,
              rating: ebookData.rating,
              category: ebookData.category,
              ebookCover: null,
            });
            
          } catch (err) {
            setError('Error fetching ebook data');
          }
        }else{
          router.push('/');
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    };

    fetchData();
  }, [token, router, id]);

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
      const dataEbook = formData.fileData ? await uploadEbook(formData.title, formData.fileData) : null;
      const dataCover = formData.ebookCover ? await uploadEbookCover(formData.ebookCover) : null;

      const ebookData: InfoEbookDto = {
        id: id || '',
        title: formData.title,
        publisher: formData.publisher,
        author: { id: '', name: '' }, // Asignar los valores reales del autor
        overview: formData.overview,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        fileUrl: dataEbook ? dataEbook.path : '',
        isbn: formData.isbn || '',
        version: formData.version || '',
        rating: parseInt(formData.rating) || 0,
        category: formData.category || '',
        ebookCover: dataCover ? dataCover.path : '',
        numVotes: 0
      };

      if (id) {
        await updateEbook({ token, ebookData });
      } else {
        await dispatch(addNewEbook({ token, ebookData })).unwrap();
      }

      router.push('/admin/dashboard');
    } catch (err: any) {
      if (err === 'Unauthorized') {
        router.push('/');
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
        <h2 className="text-2xl font-bold text-center text-gray-900">{id ? 'Edit eBook' : 'Create New eBook'}</h2>
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
                <option value="Fantasia">Fantasia</option>
                <option value="Comedia">Comedia</option>
                <option value="Horror">Horror</option>
                <option value="Historia">Historia</option>
                <option value="Ciencia Ficcion">Ciencia Ficcion</option>
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
              {id ? 'Update eBook' : 'Create eBook'}
            </button>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={() => router.push('/admin/dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
