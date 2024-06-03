'use client'
import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, getBooks, deleteBook } from '../../API/api'; // Asegúrate de tener estos métodos en tu API
import { User } from '@/redux/authSlice';
import { Book } from '@/lib/book';
import { useRouter } from 'next/navigation';
import LogoLoader from '@/app/LogoLoader';
import { InfoEbookDto } from '@/lib/ebook';
import { useAppSelector } from '@/redux/hooks';

const AdminDashboard = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [books, setBooks] = useState<Book[] | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const token = useAppSelector((state) => state.auth.token);
    const user = useAppSelector((state) => state.auth.user) || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null);
  

    

    useEffect(() => {
        async function fetchData() {
            try {
                if (token) {
                    if (user.role === "Admin") {
                        const usersData = await getAllUsers();
                        setUsers(usersData);
                        const booksData = await getBooks(1, 20);
                        setBooks(booksData);
                        setLoading(false);
                      }else{
                        router.push('/');
                      }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } 
        }
        fetchData();
    }, []);

    const handleDeleteUser = async (userId: string) => {
        await deleteUser(userId);
        setUsers(users?.filter(user => user.id !== userId) || null);
    };

    const handleDeleteBook = async (bookId: string) => {
        await deleteBook(bookId);
        setBooks(books?.filter(book => book.id !== bookId) || null);
    };

    const handleEditUser = (userId: string) => {
        router.push(`/admin/form/${userId}`);
    };

    const handleEditBook = (bookId: string) => {
        router.push(`/admin/bookForm/${bookId}`);
    };

    const handleCreateUser = () => {
        router.push('/admin/form/');
    };

    const handleCreateBook = () => {
        router.push('/admin/bookForm/');
    };

    if (loading) {
        return <LogoLoader />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-full max-w-4xl p-8 space-y-8 bg-white shadow-md rounded-lg border border-gray-200">
                <h1 className="text-3xl font-bold text-center text-gray-900">Admin Dashboard</h1>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">Usuarios</h2>
                        <button
                            onClick={handleCreateUser}
                            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700"
                        >
                            Crear Usuario
                        </button>
                    </div>
                    <ul className="space-y-4">
                        {users && users.map(user => (
                            <li key={user.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
                                <span>{user.username}</span>
                                <div className="space-x-4">
                                    <button
                                        onClick={() => handleEditUser(user.id)}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">Libros</h2>
                        <button
                            onClick={handleCreateBook}
                            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700"
                        >
                            Crear Libro
                        </button>
                    </div>
                    <ul className="space-y-4">
                        {books && books.map(book => (
                            <li key={book.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
                                <span>{book.title}</span>
                                <div className="space-x-4">
                                    <button
                                        onClick={() => handleEditBook(book.id)}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
