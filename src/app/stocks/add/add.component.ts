import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Stock, StockService} from "../../stock.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Produit} from "../../produit.service";


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Output()
  close: EventEmitter<Stock> = new EventEmitter<Stock>()
  @Input("edit")
  edit = false;
  @Input("stock")
  stock : Stock | undefined;
  form: FormGroup;

  constructor(public fb: FormBuilder, private stockService: StockService, private snackBar: MatSnackBar) {
    this.form = new FormGroup({
      quantity: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      quantity: new FormControl(this.edit ? this.stock?.quantity : "", Validators.required),
    });
  }
  closeTab() {
    if (this.edit) {
      this.close.emit(this.stock);
    } else {
      this.close.emit();
    }

  }

  get product() { return this.form.get('product'); }

  get quantity() { return this.form.get('quantity'); }

  save() {
    if (this.stock !== undefined) {
      this.stock.quantity = this.form.get("quantity")?.value
    }
    this.form.reset();
    if (this.edit) {
      if (this.stock !== undefined) {
        this.stockService.edit(this.stock.id, this.stock).subscribe(value => {
          this.closeTab();
          this.snackBar.open("Element edited succesfully", "ok", {
            duration: 2000,
          });
        }, error => {
          this.snackBar.open("Error occured", "ok", {
            duration: 2000,
          });
        })
      }
    } else {
      if (this.stock !== undefined) {
        this.stockService.add(this.stock).subscribe(value => {
          this.snackBar.open("Element added succesfully", "ok", {
            duration: 2000,
          });
          this.closeTab();
        }, error => {
          this.snackBar.open("Error occured", "ok", {
            duration: 2000,
          });
        })
      }
    }

  }
  compareProduct(o1 : Produit, o2 : Produit){
    return o1.id==o2.id;
  }



}
