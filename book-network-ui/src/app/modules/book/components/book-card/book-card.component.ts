import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  private _book: BookResponse = {}

  get book(): BookResponse {
    return this._book;
  }

  @Input()
  set book(value: BookResponse) {
    this._book = value;
  }

  private _manage = false;

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  private _bookCover: string | undefined;

  get bookCover(): string | undefined {
    if (this._book.cover){
      return 'data:image/jpg;base64,' + this.book.cover;
    }
    return 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  }

  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  protected onShowDetails() {
    this.details.emit(this._book);
  }

  protected onBorrow() {
    this.borrow.emit(this._book);
  }

  protected onAddToWaitingList() {
    this.addToWaitingList.emit(this._book);
  }

  protected onEdit() {
    this.edit.emit(this._book);
  }

  protected onShare() {
    this.share.emit(this._book);
  }

  protected onArchive() {
    this.archive.emit(this._book);
  }
}
