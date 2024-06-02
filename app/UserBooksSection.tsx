import { useEffect, useState } from 'react';
import { Profile } from '../redux/authSlice';
import { getAuthorProfile, getBooksByAuthor, getBooksByReader, getMyBooks, getReaderProfile } from './API/api';
import { Book } from '@/lib/book';
import EbookBar from './EbookBar';

const UserBooksSection = ({ user }: { user: Profile }) => {

    const profile = user;
    const [books, setBooks] = useState<Book[] | null>(null);


    useEffect(()=>{

        async function fetchBooks(){
            if(profile.author==null){
                const data = await getMyBooks()
                setBooks(data);
            }else{
                const data = await getBooksByAuthor(profile.author?.id,1,10);
                setBooks(data);
            }
        }

        fetchBooks()
    },[profile])

    return (
    <div>
        <h3>Tus Libros:</h3>
        <ul>
        {profile.author === null? (
            books && books.map((book) => (
                <EbookBar book={book}></EbookBar>
            ))
        ) : (
            books && books.length > 0 ? (
            books.map((book) => (
                <EbookBar book={book}></EbookBar>
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