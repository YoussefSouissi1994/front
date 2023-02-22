import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Client, ClientPage} from "../../client.service";
import {Reglement, ReglementPage, ReglementService} from "../../reglement.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['amount', 'date','client'];
  dataSource: ReglementPage = {
    number: 0,
    numberOfElements: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false,
    content: []
  };
  pageSize=5;
  @Output()
  edit: EventEmitter<Reglement> = new EventEmitter<Reglement>()

  constructor(private reglementService : ReglementService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.reload();
  }
  public reload(): void {
    this.reglementService.page(0, this.pageSize).subscribe(value => {
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
    this.reglementService.page($event.pageIndex ,$event.pageSize).subscribe(value => {
      this.dataSource = value;
    }, error => {
      this.snackBar.open("Error occured", "ok", {
        duration: 2000,
      });
    })
  }

  editElement(element: Reglement) {
    this.edit.emit(element);
  }

  deleteElement(element: Reglement) {
    this.reglementService.delete(element.id).subscribe(value => {
      this.snackBar.open("Element deleted succesfully", "ok", {
        duration: 2000,
      });
      this.reload();
    }, error => {
      this.snackBar.open("Error occured", "ok", {
        duration: 2000,
      });
    })
  }

}
