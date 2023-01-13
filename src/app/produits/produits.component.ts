import {Component, OnInit, ViewChild} from '@angular/core';
import {Produit} from "../produit.service";
import {ListComponent} from "./list/list.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  tabs : [
    {
      id: string,
      name: string,
      edit: boolean,
      produit: Produit
    }
  ] = [{
    id: "new",
    name: "Add",
    edit: false,
    produit: {
      id: "",
      name: "",
      price: 0,
      category: null,
    }
  }]
  @ViewChild(ListComponent)
  listChild! : ListComponent

  selectedTab = new FormControl(0);

  constructor() { }

  ngOnInit(): void {
  }
  editProduit(produit: Produit) {
    let index = this.tabs.findIndex(value => value.id === produit.id);
    if (index === -1) {
      this.tabs.push({
        id: produit.id,
        name: produit.name,
        edit: true,
        produit
      })
      this.selectedTab.setValue(this.tabs.length)
    } else {
      this.selectedTab.setValue(index + 1)
    }
  }

  closeTab(produit: Produit) {
    if (produit === undefined) {
      this.selectedTab.setValue(0);
      this.listChild?.reload();
      return;
    }
    let index = this.tabs.findIndex(value => value.id === produit?.id);
    this.tabs.splice(index, 1);
    this.selectedTab.setValue(0);
    this.listChild?.reload();
  }

}
