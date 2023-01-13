import {Component, OnInit, ViewChild} from '@angular/core';
import {Client} from "../client.service";
import {Reglement} from "../reglement.service";
import {ListComponent} from "./list/list.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-reglements',
  templateUrl: './reglements.component.html',
  styleUrls: ['./reglements.component.css']
})
export class ReglementsComponent implements OnInit {
  tabs : [
    {
      id: string,
      name: string,
      edit: boolean,
      reglement: Reglement
    }
  ] = [{
    id: "new",
    name: "Add",
    edit: false,
    reglement: {
      id:"",
      amount : 0,
      date : new Date(),
      items :[],
      client: null,
    }

  }]

  @ViewChild(ListComponent)
  listChild! : ListComponent

  selectedTab = new FormControl(0);
  constructor() { }

  ngOnInit(): void {
  }
  editReglement(reglement: Reglement) {
    let index = this.tabs.findIndex(value => value.id === reglement.id);
    if (index === -1) {
      this.tabs.push({
        id: reglement.id,
        name: reglement.date.toISOString(),
        edit: true,
        reglement
      })
      this.selectedTab.setValue(this.tabs.length)
    } else {
      this.selectedTab.setValue(index + 1)
    }
  }

  closeTab(reglement: Reglement) {
    if (reglement === undefined) {
      this.selectedTab.setValue(0);
      this.listChild?.reload();
      return;
    }
    let index = this.tabs.findIndex(value => value.id === reglement?.id);
    this.tabs.splice(index, 1);
    this.selectedTab.setValue(0);
    this.listChild?.reload();
  }

}
