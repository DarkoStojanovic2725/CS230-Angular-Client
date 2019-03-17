import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService} from '../../Services/api.service';
import {Author} from '../../Models/author';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  author: Author = { authorId: null, name: '', lastName: '', dateOfBirth: null, country: '' };
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  getAuthor(authorId) {
    this.api.getAuthor(authorId)
      .subscribe(data => {
        this.author = data;
        console.log(this.author);
        this.isLoadingResults = false;
      });
  }
  deleteAuthor(authorId) {
    this.isLoadingResults = true;
    this.api.deleteAuthor(authorId)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/authors']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
  ngOnInit() {
    this.getAuthor(this.route.snapshot.params['id']);
  }

}
