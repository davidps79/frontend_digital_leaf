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