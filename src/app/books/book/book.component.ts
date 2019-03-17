import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../Services/api.service';
import {Book} from '../../Models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  book: Book = { bookId: null, title: '', availableNum: null, releaseYear: null, rentalPrice: null, authorId: null };
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  getBook(bookId) {
    this.api.getBook(bookId)
      .subscribe(data => {
        this.book = data;
        console.log(this.book);
        this.isLoadingResults = false;
      });
  }
  deleteBook(bookId) {
    this.isLoadingResults = true;
    this.api.deleteBook(bookId)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/books']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
  ngOnInit() {
    this.getBook(this.route.snapshot.params['id']);
  }

}
