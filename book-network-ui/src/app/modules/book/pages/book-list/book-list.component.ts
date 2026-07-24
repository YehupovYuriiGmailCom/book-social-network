import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  size: number = 3;
  page: number = 0;
  message: string = '';
  level: string = 'success';


  constructor(
    private boosService: BookService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }


  private findAllBooks() {
    this.boosService.findAllBooks({
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

  borrowBook(book: BookResponse) {
    this.message = '';
    this.boosService.borrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book successfully added to your list';
      },
      error: (err)=> {
        this.level = 'error';
        console.log(err);
        this.message = err.error.error;
      }
    })
  }
}
