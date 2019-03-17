import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import {Author} from '../Models/author';
import {Book} from '../Models/book';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/xml'})
};
const apiUrl = 'http://localhost:8080/CS230-Projekat/webresources/com.cs230.projekat';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
  getAuthors (): Observable<Author[]> {
    return this.http.get<Author[]>(apiUrl + '.author').pipe(
      tap(_ => console.log('Fetched authors')),
      catchError(this.handleError('getAuthors', []))
    );
  }
  getBooks (): Observable<Book[]> {
    return this.http.get<Book[]>(apiUrl + '.book').pipe(
      tap(_ => console.log('Fetched books')),
      catchError(this.handleError('getBooks', []))
    );
  }
  getAuthor(id: number): Observable<Author> {
    console.log(`fetched author id=${id}`);
    const url = `${apiUrl + '.author'}/${id}`;
    return this.http.get<Author>(url).pipe(
      tap(_ => console.log(`fetched author id=${id}`)),
      catchError(this.handleError<Author>(`getAuthor id=${id}`))
    );
  }
  getBook(id: number): Observable<Book> {
    console.log(`fetched book id=${id}`);
    const url = `${apiUrl + '.book'}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => console.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  addAuthor (author): Observable<Author> {
    return this.http.post<Author>(apiUrl + '.author', author, httpOptions).pipe(
      tap((author: Author) => console.log(`added author w/ id=`)),
      catchError(this.handleError<Author>('addAuthor'))
    );
  }

  addBook (book): Observable<Book> {
    return this.http.post<Book>(apiUrl + '.book', book, httpOptions).pipe(
      tap((book: Book) => console.log(`added book w/ id=`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  updateAuthor (id, author): Observable<any> {
    const url = `${apiUrl + '.author'}/${id}`;
    return this.http.put(url, author, httpOptions).pipe(
      tap(_ => console.log(`updated author id=${id}`)),
      catchError(this.handleError<any>('updateAuthor'))
    );
  }

  deleteAuthor (id): Observable<Author> {
    const url = `${apiUrl + '.author'}/${id}`;

    return this.http.delete<Author>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted author id=${id}`)),
      catchError(this.handleError<Author>('deleteAuthor'))
    );
  }

  deleteBook (id): Observable<Book> {
    const url = `${apiUrl + '.book'}/${id}`;

    return this.http.delete<Book>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted book id=${id}`)),
      catchError(this.handleError<Book>('deleteBook'))
    );
  }
}
