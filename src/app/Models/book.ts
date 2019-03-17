import {Author} from './author';

export class Book {
  bookId: number;
  authorId: Author;
  title: string;
  availableNum: number;
  releaseYear: Date;
  rentalPrice: number;
}
