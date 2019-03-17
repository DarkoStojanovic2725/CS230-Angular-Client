import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {ApiService} from '../../Services/api.service';

@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.scss']
})
export class AuthorAddComponent implements OnInit {

  authorForm: FormGroup;
  name: string;
  lastName: string;
  country: string;
  dateOfBirth: string;
  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.authorForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'dateOfBirth' : [null, Validators.required],
      'country' : [null, Validators.required]
    });
  }
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addAuthor(form)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/authors']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
