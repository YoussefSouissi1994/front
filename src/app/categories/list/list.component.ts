import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Client, ClientPage, ClientService} from "../../client.service";
import {ProduitPage} from "../../produit.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Categorie, CategoriePage, CategorieService} from "../../categorie.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: CategoriePage = {
    number: 0,
    numberOfElements: 0,
    totalElements: 0,
    totalPages: 0,
    content: []
  };
  pageSize = 5;
  @Output()
  edit: EventEmitter<Categorie> = new EventEmitter<Categorie>()

  constructor(private categorieService: CategorieService, private snackBar: MatSnackBar) { }



  ngOnInit(): void {
    this.reload();
  }
  public reload(): void {
    this.categorieService.page(0, this.pageSize).subscribe(value => {
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
    this.categorieService.page($event.pageIndex ,$event.pageSize).subscribe(value => {
      this.dataSource = value;
    }, error => {
      this.snackBar.open("Error occured", "ok", {
        duration: 2000,
      });
    })
  }

  editElement(element: Categorie) {
    this.edit.emit(element);
  }

  deleteElement(element: Categorie) {
    this.categorieService.delete(element.id).subscribe(value => {
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
