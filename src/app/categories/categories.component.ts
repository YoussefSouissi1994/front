import {Component, OnInit, ViewChild} from '@angular/core';
import {Categorie, CategorieService, CategoriePage} from "../categorie.service";
import {ListComponent} from "./list/list.component";
import {FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  tabs : [
    {
      id: string,
      name: string,
      edit: boolean,
      categorie: Categorie
    }
  ] = [{
    id: "new",
    name: "Add",
    edit: false,
    categorie: {
      id: "",
      name : ""
    }
  }]

  @ViewChild(ListComponent)
  listChild! : ListComponent

  selectedTab = new FormControl(0);

  constructor() { }

  ngOnInit(): void {

  }


  editCategorie(categorie: Categorie) {
    let index = this.tabs.findIndex(value => value.id === categorie.id);
    if (index === -1) {
      this.tabs.push({
        id: categorie.id,
        name: categorie.name,
        edit: true,
        categorie
      })
      this.selectedTab.setValue(this.tabs.length)
    } else {
      this.selectedTab.setValue(index + 1)
    }
  }
  closeTab(categorie: Categorie) {
    if (categorie === undefined) {
      this.selectedTab.setValue(0);
      this.listChild?.reload();
      return;
    }
    let index = this.tabs.findIndex(value => value.id === categorie?.id);
    this.tabs.splice(index, 1);
    this.selectedTab.setValue(0);
    this.listChild?.reload();
  }

}
