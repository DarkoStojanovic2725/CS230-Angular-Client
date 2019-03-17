import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {ApiService} from '../../Services/api.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit {

  authorForm: FormGroup;
  _authorId: number;
  name: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getAuthor(this.route.snapshot.params['id']);
    this.authorForm = this.formBuilder.group({
      'authorId' : this.route.snapshot.params['id'],
      'name' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'country' : [null, Validators.required],
      'dateOfBirth' : [null, Validators.required],
    });
  }
  getAuthor(id) {
    this.api.getAuthor(id).subscribe(data => {
      this._authorId = data.authorId;
      this.authorForm.setValue({
        authorId: data.authorId,
        name: data.name,
        lastName: data.lastName,
        country: data.country,
        dateOfBirth: data.dateOfBirth
      });
    });
  }
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateAuthor(this._authorId, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/authors']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
  authorDetails() {
    this.router.navigate(['/author', this._authorId]);
  }

}
