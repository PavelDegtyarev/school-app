import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../shared/interface";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListOfLiteratureService} from "../shared/services/listOfLiterature.service";

@Component({
  selector: 'app-book-from-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './book-from-list.component.html',
  styleUrl: './book-from-list.component.css'
})
export class BookFromListComponent {
  constructor(
    private listService: ListOfLiteratureService,
  ){}
@Input() book!: Book
// @Output() remove = new EventEmitter<Book>()

  removeBook(id: string | undefined ) {
    // console.log('Id: ', id)
    this.listService.removeBook(id).subscribe(() => {
      this.listService.listOfBooks = this.listService.listOfBooks.filter(book => {
        return book.id !== id
      })
    })
  }

  changeIsReading(book: Book) {
    const modifiedBook: Book = {
      ...book,
      isReading: !book.isReading,
    }
    // @ts-ignore
    this.listService.updateBook(modifiedBook).subscribe((response: Book): any => {
      // console.log('RSP: ', response)
      this.listService.listOfBooks[this.listService.listOfBooks.findIndex((book) => book.id === response.id)].isReading = response.isReading
    })
    // console.log('mb: ', modifiedBook)
  }
}
