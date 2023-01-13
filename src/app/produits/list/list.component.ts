import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Client, ClientPage} from "../../client.service";
import {Produit, ProduitPage, ProduitService} from "../../produit.service";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'categorie', 'actions'];
  dataSource: ProduitPage = {
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
  edit: EventEmitter<Produit> = new EventEmitter<Produit>()
  constructor(private produitService: ProduitService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.reload();
  }
  public reload(): void {
    this.produitService.page(0, this.pageSize).subscribe(value => {
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
    this.produitService.page($event.pageIndex ,$event.pageSize).subscribe(value => {
      this.dataSource = value;
    }, error => {
      this.snackBar.open("Error occured", "ok", {
        duration: 2000,
      });
    })
  }

  editElement(element: Produit) {
    this.edit.emit(element);
  }

  deleteElement(element: Client) {
    this.produitService.delete(element.id).subscribe(value => {
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
