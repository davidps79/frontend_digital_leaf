import { Author } from "./author";
export type Book = {
    id: string;
    title: string;
    publisher: string;
    author: Author;
    overview: string;
    price: number;
    stock: number;
    isbn: string;
    rating: number;
    category: string;
    ebookCover: string;
  }