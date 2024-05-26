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

import { InfoEbookDto } from "./ebook";

export class EbookCartItem {
  id: string;
  title: string;
  price: number;
  isbn: string;
  ebookCover: string;

  constructor(dto: InfoEbookDto) {
    this.id = dto.id;
    this.title = dto.title;
    this.price = dto.price;
    this.isbn = dto.isbn;
    this.ebookCover = dto.ebookCover;
  }
}