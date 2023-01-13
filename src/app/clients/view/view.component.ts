import {Component, EventEmitter, Input, OnInit, Output, ViewRef} from '@angular/core';
import {Client} from "../../client.service";

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

  @Output()
  close: EventEmitter<Client> = new EventEmitter<Client>()
  labels= ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  data= [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]

  constructor(private viewRef: ViewRef) { }

  ngOnInit(): void {


  }

}
