import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Stock, StockPage, StockService} from "../../stock.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['product', 'quantity', 'actions'];
  dataSource: StockPage = {
    number: 0,
    numberOfElements: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false,
    content: []
  };
  ruptureStock = 5
  ruptureStockBool = false
  pageSize = 5;
  @Output()
  edit: EventEmitter<Stock> = new EventEmitter<Stock>()

  constructor(private stockService: StockService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.reload();
  }
  public reload(): void {
    this.stockService.page(0, this.pageSize, this.ruptureStockBool ? this.ruptureStock : -1).subscribe(value => {
      console.log(value)
      this.dataSource = value;
    }, error => {
      this.snackBar.open("Error occured", "ok", {
        duration: 2000,
      });
    })
  }

  changePage($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this.stockService.page($event.pageIndex, $event.pageSize, this.ruptureStock).subscribe(value => {
      this.dataSource = value;
    }, error => {
      this.snackBar.open("Error occured", "ok", {
        duration: 2000,
      });
    })
  }

  editElement(element: Stock) {
    this.edit.emit(element);
  }

  rupture() {
    this.reload()
  }
}
