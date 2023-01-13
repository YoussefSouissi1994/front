import {Component, OnInit, ViewChild} from '@angular/core';
import {Client} from "../client.service";
import {FormControl} from "@angular/forms";
import {ListComponent} from "./list/list.component";
import {FactureReglementDTO} from "../facture.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  tabs : [
    {
      id: string,
      name: string,
      edit: boolean,
      view: boolean,
      client: Client
    }
  ] = [{
    id: "new",
    name: "Add",
    edit: false,
    view: false,
    client: {
      id: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      email: ""
    }
  }]

  @ViewChild(ListComponent)
  listChild! : ListComponent

  selectedTab = new FormControl(0);
  constructor() { }

  ngOnInit(): void {
  }

  editClient(client: Client) {
    let index = this.tabs.findIndex(value => value.id === client.id);
    if (index === -1) {
      this.tabs.push({
        id: client.id,
        name: client.firstName,
        edit: true,
        view: false,
        client
      })
      this.selectedTab.setValue(this.tabs.length)
    } else {
      this.selectedTab.setValue(index + 1)
    }
  }

  viewClient(client: Client) {
    let index = this.tabs.findIndex(value => value.id === client.id && value.view);
    if (index === -1) {
      this.tabs.push({
        id: client.id,
        name: client.firstName + ' ' + client.lastName,
        edit: false,
        view: true,
        client: client,
      })
      this.selectedTab.setValue(this.tabs.length)
    } else {
      this.selectedTab.setValue(index + 1)
    }
  }


  closeTab(client: Client) {
    if (client === undefined) {
      this.selectedTab.setValue(0);
      this.listChild?.reload();
      return;
    }
    let index = this.tabs.findIndex(value => value.id === client?.id);
    this.tabs.splice(index, 1);
    this.selectedTab.setValue(0);
    this.listChild?.reload();
  }
}
