import { Component, OnInit } from '@angular/core';
import {ApiService} from '../Services/api.service';
import {Author} from '../Models/author';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  displayedColumns: string[] = ['authorId', 'name', 'lastName', 'country'];
  data: Author[] = [];
  isLoadingResults = true;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAuthors()
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
