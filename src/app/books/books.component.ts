import { Component, OnInit } from '@angular/core';
import {ApiService} from '../Services/api.service';
import {Book} from '../Models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  displayedColumns: string[] = ['bookId', 'title', 'rentalPrice', 'availableNum', 'authorId'];
  data: Book[] = [];
  isLoadingResults = true;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getBooks()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
