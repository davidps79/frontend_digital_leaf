export type InfoEbookDto = {
    id: string;
    title: string;
    publisher: string;
    author: Author;
    overview: string;
    price: number;
    stock: number;
    fileUrl: string;
    isbn: string;
    version: string;
    rating: number;
    numVotes: number;
    category:string;
    ebookCover:string;
}

export type Author = {
    id: string;
    name: string;
}