import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Book} from "../shared/interface";
import {ListOfLiteratureService} from "../shared/services/listOfLiterature.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BookFromListComponent} from "../book-from-list/book-from-list.component";

@Component({
  selector: 'app-list-of-literature',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BookFromListComponent
  ],
  templateUrl: './list-of-literature.component.html',
  styleUrl: './list-of-literature.component.css'
})
export class ListOfLiteratureComponent implements OnInit{

constructor(
  protected listService: ListOfLiteratureService,
){}
  showAddNewBook = false
  titleOfButton = 'Добавить книгу'
  addingNewBookForm!: FormGroup
  errorMessage = ''
  ngOnInit() {
    this.addingNewBookForm = new FormGroup({
      titleOfBook: new FormControl('', Validators.required),
      authorOfBook: new FormControl('', Validators.required)
    })

    this.listService.loadAllBooks().subscribe(response => {
      console.log('Response: ', response)
      this.listService.listOfBooks = response
    },
      error => {
        this.errorMessage = 'List is empty'
      })
  }

  showAddingForm() {
    this.showAddNewBook = !this.showAddNewBook
    this.titleOfButton = this.showAddNewBook ? 'Скрыть' : 'Добавить книгу'
  }

  submitAddingNewBookForm() {
  const data: Book = {
    titleOfBook: this.addingNewBookForm.value.titleOfBook,
    authorOfBook: this.addingNewBookForm.value.authorOfBook,
    isReading: false
  }
    // console.log(this.addingNewBookForm.value)
    // console.log('Data: ', data)
    this.listService.addNewBook(data).subscribe(response => {
      console.log('response: ', response)
      this.listService.listOfBooks.push(response)
      this.addingNewBookForm.reset()
      this.showAddingForm()
    })
  }


}
