import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Facture, FacturePage, FactureReglementDTO, FactureService} from "../../facture.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['code', 'client', 'needToPay', 'actions'];
  dataSource: FacturePage = {
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
  edit: EventEmitter<Facture> = new EventEmitter<Facture>()
  @Output()
  view: EventEmitter<FactureReglementDTO> = new EventEmitter<FactureReglementDTO>()
  constructor(private factureService: FactureService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.reload();
  }
  public reload(): void {
    this.factureService.page(0, this.pageSize).subscribe(value => {
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
    this.factureService.page($event.pageIndex ,$event.pageSize).subscribe(value => {
      this.dataSource = value;
    }, error => {
      this.snackBar.open("Error occured", "ok", {
        duration: 2000,
      });
    })
  }

  editElement(element: Facture) {
    this.edit.emit(element);
  }

  deleteElement(element: Facture) {
    this.factureService.delete(element.id).subscribe(value => {
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

  viewElement(element: FactureReglementDTO) {

    this.view.emit(element);
  }
}
