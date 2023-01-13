import {Component, OnInit, ViewChild} from '@angular/core';
import {Facture, FactureReglementDTO} from "../facture.service";
import {ListComponent} from "./list/list.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent implements OnInit {
  tabs : [
    {
      id: string,
      name: string,
      edit: boolean,
      view: boolean,
      facture: Facture
      dto: FactureReglementDTO | undefined
    }
  ] = [{
    id: "new",
    name: "Add",
    edit: false,
    view: false,
    facture: {
      id: "",
      code: "",
      client : null,
      items: []
    },
    dto: undefined
  }]
  @ViewChild(ListComponent)
  listChild! : ListComponent

  selectedTab = new FormControl(0);
  constructor() { }

  ngOnInit(): void {
  }
  editFacture(facture: Facture) {
    let index = this.tabs.findIndex(value => value.id === facture.id && !value.view);
    if (index === -1) {
      this.tabs.push({
        id: facture.id,
        name: facture.code,
        edit: true,
        view: false,
        facture,
        dto: undefined
      })
      this.selectedTab.setValue(this.tabs.length)
    } else {
      this.selectedTab.setValue(index + 1)
    }
  }

  viewFacture(facture: FactureReglementDTO) {
    let index = this.tabs.findIndex(value => value.id === facture.facture.id && value.view);
    if (index === -1) {
      this.tabs.push({
        id: facture.facture.id,
        name: facture.facture.code,
        edit: false,
        view: true,
        facture: facture.facture,
        dto: facture
      })
      this.selectedTab.setValue(this.tabs.length)
    } else {
      this.selectedTab.setValue(index + 1)
    }
  }

  closeTab(facture: Facture) {
    if (facture === undefined) {
      this.selectedTab.setValue(0);
      this.listChild?.reload();
      return;
    }
    let index = this.tabs.findIndex(value => (value.id === facture.id) && !value.view);
    if (index > 0) {
      this.tabs.splice(index, 1);
      this.selectedTab.setValue(0);
      this.listChild?.reload();
    }
  }

  closeTabView(facture: Facture) {
    let index = this.tabs.findIndex(value => (value.id === facture.id) && value.view);
    if (index > 0) {
      this.tabs.splice(index, 1);
      this.selectedTab.setValue(0);
      this.listChild?.reload();
    }

  }


}
