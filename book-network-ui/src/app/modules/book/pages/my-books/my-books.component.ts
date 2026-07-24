import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-book-list',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  size: number = 3;
  page: number = 0;


  constructor(
    private boosService: BookService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }


  private findAllBooks() {
    this.boosService.findAllBooksByOwner({
      size: this.size,
      page: this.page
    }).subscribe({
      next: (books) => {
        this.bookResponse = books;
      }
    })
  }

  protected gotoPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  protected gotoNextPage() {
    this.page++;
    this.findAllBooks();

  }

  protected gotoPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  protected gotoFirstPage() {
    this.page = 0;
    this.findAllBooks();

  }

  protected gotoLastPage() {
    this.page = this.bookResponse.totalPages as number -1;
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number - 1;
  };

  protected archiveBook(book: BookResponse) {
    this.boosService.updateArchivedStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.archived = !book.archived;
      }
    })

  }

  protected shareBook(book: BookResponse) {
    this.boosService.updateShareableStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.shareable = !book.shareable;
      }
    })
  }

  protected editBook(book: BookResponse) {
    this.router.navigate(['books', 'manage', book.id])

  }
}
