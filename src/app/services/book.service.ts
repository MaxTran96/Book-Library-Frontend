import Book from '../models/book.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  api_url = 'http://localhost:5000';
  bookUrl = `${this.api_url}/api/books`;

  constructor(
    private http: HttpClient
  ) { }


  addBookToRead(book: Book): Observable<any>{
    return this.http.post(`${this.bookUrl}`, book);
  }

  getBooks(): Observable<Book[]>{
    return this.http.get(this.bookUrl)
    .map(res  => {
      return res["data"].docs as Book[];
    })
  }

  editBook(book:Book){
    let editUrl = `${this.bookUrl}`
    return this.http.put(editUrl, book);
  }

  deleteBook(id:string):any{
    let deleteUrl = `${this.bookUrl}/${id}`
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}