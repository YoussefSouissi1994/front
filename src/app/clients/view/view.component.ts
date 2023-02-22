import {Component, EventEmitter, Input, OnInit, Output, ViewRef} from '@angular/core';
import {Client, ClientDetailsDTO, ClientService} from "../../client.service";

import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input("client")
  client : Client | undefined
  clientDetails : ClientDetailsDTO | undefined

  @Output()
  close: EventEmitter<Client> = new EventEmitter<Client>()
  labelsParAn = [2020, 2021,2022,2023];
  dataParAn = {
    labels: this.labelsParAn,
    datasets: [{
      label: 'Chiffre affaire par an',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };
  labels= [
    'Red',
    'Blue',
    'Yellow'
  ];
  data = [{
    label: 'By Quantity',
    data: [300, 50, 100],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)',
  }]

  dataPrice = [{
    label: 'By price',
    data: [28, 48, 40, 19, 96, 27, 100],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    if (this.client && this.client.id) {
      this.clientService.details(this.client.id).subscribe(value => {
        this.clientDetails = value;
        this.labels = value.produitSollicite.map(soll => {
          return soll.product.name
        });
        this.data[0].data = value.produitSollicite.map(soll => {
          return soll.quantity
        });
        this.dataPrice[0].data = value.produitSollicite.map(soll => {
          return soll.quantity * soll.product.price
        });


        this.labelsParAn = [];
        this.dataParAn.datasets[0].data = [];
        Object.keys(value.chiffreAffaireParAn).forEach(key => {

          this.labelsParAn.push(parseInt(key));
          this.dataParAn.datasets[0].data.push(parseInt(value.chiffreAffaireParAn[parseInt(key)].toString()));
        });
      })
    }
  }
  closeTab() {
    this.close.emit(this.client);
  }



}
