import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pagesCount: number = 12;
  @Input() currentPage: number = 1;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  pages: Array<number> = [];

  ngOnInit(): void {
    this.createPages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('pagesCount' in changes || 'currentPage' in changes) {
      this.createPages();
    }
  }

  createPages() {
    this.pages = [];

    if (this.pagesCount && this.pagesCount > 10) {
      if (this.currentPage > 5) {
        for (let i = this.currentPage - 4; i <= this.currentPage + 5; i++) {
          this.pages.push(i);
          if (i === this.pagesCount) break;
        }
      } else {
        for (let i = 1; i <= 10; i++) {
          this.pages.push(i);
          if (i === this.pagesCount) break
        }
      }
    } else {
      if (this.pagesCount) {
        for (let i = 1; i <= this.pagesCount; i++) {
          this.pages.push(i);
        }
      }
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.pageChanged.emit(page);
    this.clickToTop();
  }

  clickToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
