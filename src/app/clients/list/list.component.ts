import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Client, ClientPage, ClientService} from "../../client.service";
import {PageEvent} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FactureReglementDTO} from "../../facture.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Output()
  view: EventEmitter<Client> = new EventEmitter<Client>()
  displayedColumns: string[] = ['firstName', 'lastName', 'email','address','phoneNumber', 'actions'];
  dataSource: ClientPage = {
    number: 0,
    numberOfElements: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false,
    content: []
  };

  pageSize = 5;

  @Output()
  edit: EventEmitter<Client> = new EventEmitter<Client>()

  constructor(private clientService: ClientService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.reload();
  }

  public reload(): void {
    this.clientService.page(0, this.pageSize).subscribe(value => {
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
    this.clientService.page($event.pageIndex ,$event.pageSize).subscribe(value => {
      this.dataSource = value;
    }, error => {
      this.snackBar.open("Error occured", "ok", {
        duration: 2000,
      });
    })
  }

  editElement(element: Client) {
    this.edit.emit(element);
  }

  deleteElement(element: Client) {
    this.clientService.delete(element.id).subscribe(value => {
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
  viewElement(element: Client) {

    this.view.emit(element);
  }
}
