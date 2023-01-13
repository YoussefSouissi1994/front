import {Component, OnInit, ViewChild} from '@angular/core';
import {Stock} from "../stock.service";
import {ListComponent} from "./list/list.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  tabs : [
    {
      id: string,
      name: string,
      edit: boolean,
      stock: Stock
    }
  ] = [{
    id: "new",
    name: "Add",
    edit: false,
    stock: {
      id: "",
      product: null,
      quantity: 0
    }
  }]
  @ViewChild(ListComponent)
  listChild! : ListComponent

  selectedTab = new FormControl(0);

  constructor() { }

  ngOnInit(): void {
  }
  editStock(stock: Stock) {
    let index = this.tabs.findIndex(value => value.id === stock.id);
    if (index === -1) {
      this.tabs.push({
        id: stock.id,
        name: stock.product?.name || "",
        edit: true,
        stock
      })
      this.selectedTab.setValue(this.tabs.length)
    } else {
      this.selectedTab.setValue(index + 1)
    }
  }

  closeTab(stock: Stock) {
    if (stock === undefined) {
      this.selectedTab.setValue(0);
      this.listChild?.reload();
      return;
    }
    let index = this.tabs.findIndex(value => value.id === stock?.id);
    this.tabs.splice(index, 1);
    this.selectedTab.setValue(0);
    this.listChild?.reload();
  }

}
