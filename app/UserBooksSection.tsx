import { useEffect, useState } from 'react';
import { Profile } from '../redux/authSlice';
import { getAuthorProfile, getBooksByAuthor, getBooksByReader, getMyBooks, getReaderProfile, deleteBook } from './API/api';
import { IconTrash } from '@tabler/icons-react'
import { Book } from '@/lib/book';
import EbookBar from './EbookBar';
import { Button } from '@/components/ui/button';

const UserBooksSection = ({ user }: { user: Profile }) => {
    const profile = user;
    const [books, setBooks] = useState<Book[] | null>(null);
    const [shopBooks, setShopBooks] = useState<Book[] | null>(null);

    useEffect(() => {
        async function fetchBooks() {
            if (profile.author == undefined) {
                const data = await getMyBooks();
                setBooks(data);
            } else {
                const data = await getBooksByAuthor(profile.author?.id, 1, 10);
                const data1 = await getMyBooks();
                setBooks(data);
                setShopBooks(data1);
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
            <div>
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
                                    <div>
                                        <EbookBar book={book}></EbookBar>
                                    </div>
                                    <div className='flex items-center justify-center ml-4'>
                                        <Button onClick={() => deleteEbook(book.id)} className='bg-black'>
                                            <IconTrash />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay libros escritos aún.</p>
                        )
                    )}
                </ul>
            </div>
            <div>
                <h3 className='font-bold'>Tus Libros Comprados</h3>
                <ul>
                    {profile.author === undefined ? (
                        <></>
                    ) : (
                        shopBooks && shopBooks.length > 0 ? (
                            shopBooks.map((book) => (
                                <div key={book.id} className='flex flex-row'>
                                    <EbookBar book={book}></EbookBar>
                                </div>
                            ))
                        ) : (
                            <p>No has comprado libros aún.</p>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
};

export default UserBooksSection;
