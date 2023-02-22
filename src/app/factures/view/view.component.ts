import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Facture, FactureReglementDTO} from "../../facture.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  displayedColumns: string[] = ['product', 'quantity', 'unitPrice', 'total'];

  @Output()
  close: EventEmitter<Facture> = new EventEmitter<Facture>()

  @Input("facture")
  facture : FactureReglementDTO | undefined
  constructor() { }

  ngOnInit(): void {
  }

  closeTab() {
    this.close.emit(this.facture?.facture);
  }

  calculateTotal() {
    return this.facture?.facture?.items.map(item => item.quantity * item.unitPrice).reduce((a1,a2) => a1 + a2);
  }
}
