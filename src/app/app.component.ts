import { Response } from '@angular/http';
import { BookService } from './services/book.service';
import Book from './models/book.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private bookService: BookService
  ) { }

  public newBook: Book = new Book()

  booksList: Book[];
  editBooks: Book[] = [];

  ngOnInit(): void {
    this.bookService.getBooks()
      .subscribe(books => {
        this.booksList = books
        console.log(books)
      })
  }


  create() {
    this.bookService.addBookToRead(this.newBook)
      .subscribe((res) => {
        this.booksList.push(res.data)
        this.newBook = new Book()
      })
  }

  editBook(book: Book) {
    console.log(book)
    if(this.booksList.includes(book)){
      if(!this.editBooks.includes(book)){
        this.editBooks.push(book)
      }else{
        this.editBooks.splice(this.editBooks.indexOf(book), 1)
        this.bookService.editBook(book).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editBook(book)
          console.error('Update Unsuccesful')

        })
      }
    }
  }

  doneBook(book:Book){
    book.status = 'Done'
    this.bookService.editBook(book).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.editBook(book)
      console.error('Update Unsuccesful')
    })
  }

  submitBook(event, book:Book){
    if(event.keyCode ==13){
      this.editBook(book)
    }
  }

  deleteBook(book: Book) {
    this.bookService.deleteBook(book._id).subscribe(res => {
      this.booksList.splice(this.booksList.indexOf(book), 1);
    })
  }


  title = 'app';


}