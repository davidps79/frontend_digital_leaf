import { useEffect, useState } from 'react';
import { Profile } from '../redux/authSlice';
import { getAuthorProfile, getBooksByAuthor, getBooksByReader, getMyBooks, getReaderProfile, deleteBook } from './API/api';
import { Book } from '@/lib/book';
import EbookBar from './EbookBar';

const UserBooksSection = ({ user }: { user: Profile }) => {
    const profile = user;
    const [books, setBooks] = useState<Book[] | null>(null);

    useEffect(() => {
        async function fetchBooks() {
            if (profile.author == undefined) {
                const data = await getMyBooks();
                setBooks(data);
            } else {
                const data = await getBooksByAuthor(profile.author?.id, 1, 10);
                setBooks(data);
            }
        }

        fetchBooks();
    }, [profile]);

    const deleteEbook = async (ebookId: string) => {
        const data = await deleteBook(ebookId);
        setBooks(books?.filter(book => book.id !== ebookId) || null);
    };

    return (
        <div className="flex flex-col justify-center">
            <h3 className='font-bold'>Tus Libros</h3>
            <ul>
                {profile.author === undefined ? (
                    books && books.map((book) => (
                        <EbookBar key={book.id} book={book}></EbookBar>
                    ))
                ) : (
                    books && books.length > 0 ? (
                        books.map((book) => (
                            <div key={book.id} className='flex flex-row'>
                                <EbookBar book={book}></EbookBar>
                                <button onClick={() => deleteEbook(book.id)}>Eliminar</button>
                            </div>
                        ))
                    ) : (
                        <p>No hay libros escritos aún.</p>
                    )
                )}
            </ul>
        </div>
    );
};

export default UserBooksSection;
