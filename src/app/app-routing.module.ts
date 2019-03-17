import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthorsComponent} from './authors/authors.component';
import {AuthorComponent} from './authors/author/author.component';
import {AuthorAddComponent} from './authors/author-add/author-add.component';
import {AuthorEditComponent} from './authors/author-edit/author-edit.component';
import {BooksComponent} from './books/books.component';
import {BookComponent} from './books/book/book.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'authors', component: AuthorsComponent, data: {title: 'Authors'}},
    {path: 'author/:id', component: AuthorComponent, data: {title: 'Author details'}},
    {path: 'add-author', component: AuthorAddComponent, data: {title: 'Add New Author'}},
    {path: 'edit-author/:id', component: AuthorEditComponent, data: {title: 'Edit Author Data'}},
    {path: 'books', component: BooksComponent, data: {title: 'Books'}},
    {path: 'book/:id', component: BookComponent, data: {title: 'Book details'}}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
