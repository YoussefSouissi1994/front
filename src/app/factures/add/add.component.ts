import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {Client, ClientService} from "../../client.service";
import {
  AbstractControl,
  FormArray,
  FormBuilder, FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {Facture, FactureService} from "../../facture.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Categorie} from "../../categorie.service";
import {Produit, ProduitService} from "../../produit.service";
import {MatOptionSelectionChange} from "@angular/material/core";
import {ClientEmailValidator} from "../../clients/add/client-email-validator";
import {QuantityValidator} from "./quantity-validator";
import {StockService} from "../../stock.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Output()
  close: EventEmitter<Facture> = new EventEmitter<Facture>()
  @Input("edit")
  edit = false;
  @Input("facture")
  facture : Facture | undefined
  clients: Client[] | [] = []
  products: Produit[] | [] = []
  form: FormGroup;
  constructor(
    public fb: FormBuilder,
    private factureService: FactureService,
    private produitService: ProduitService,
    private clientService: ClientService,
    private stockService: StockService,
    private ngZone: NgZone,
    private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      code: this.fb.control( "", Validators.required),
      date: new FormControl(this.edit ? this.facture?.date : new Date(), Validators.required),
      client: this.fb.control("", Validators.required),
      items: this.fb.array([])
    });
  }

  getFormGroup(index: number): FormGroup {
    return <FormGroup>(<FormArray>this.form.get("items")).at(index);
  }

  getFormsGroup(): FormGroup[] {
    return <FormGroup[]>(<FormArray>this.form.get("items")).controls;
  }

  ngOnInit(): void {
    this.clientService.getAll().subscribe(value => this.clients = value)
    this.produitService.getAll().subscribe(value => this.products = value)
    if (this.edit && this.facture) {
      let config = this.facture.items.map(item => {
        return this.fb.group({
          product: this.fb.control(item.product , [Validators.required, Validators.nullValidator]),
          quantity: this.fb.control(item.quantity , [Validators.required, Validators.min(1)], [QuantityValidator.createValidator(this.stockService, item.quantity, item.product)]),
          unitPrice: this.fb.control(item.unitPrice , [Validators.required, Validators.min(0)]),
        })
      });
      this.form = this.fb.group({
        code: this.fb.control(this.edit ? this.facture?.code : "", Validators.required),
        date: new FormControl(this.edit ? this.facture?.date : this.facture.date, Validators.required),
        client: this.fb.control(this.edit ? this.facture?.client : null, [Validators.required, Validators.nullValidator]),
        items: this.fb.array(config, [Validators.required])
      });
    } else {
      this.form = this.fb.group({
        code: this.fb.control( "", Validators.required),
        date: new FormControl(new Date(), Validators.required),
        client: this.fb.control("", Validators.required),
        items: this.fb.array([],  [Validators.required])
      });
    }


  }
  closeTab() {
    if (this.edit) {
      this.close.emit(this.facture);
    } else {
      this.close.emit();
    }

  }

  get code() { return this.form.get('code'); }

  get client() { return this.form.get('client'); }

  save() {
    if (this.facture !== undefined) {
      this.facture.code = this.form.get("code")?.value
      this.facture.client = this.form.get("client")?.value
      this.facture.date = this.form.get("date")?.value
      this.facture.items = this.formItems.controls.map(value => {
        return {
          product: value.get("product")?.value,
          quantity: value.get("quantity")?.value,
          unitPrice: value.get("unitPrice")?.value
        }
      })
    }

    if (this.edit) {
      if (this.facture !== undefined) {
        this.factureService.edit(this.facture.id, this.facture).subscribe(value => {
          this.closeTab();

          this.form.reset();
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
      if (this.facture !== undefined) {
        this.factureService.add(this.facture).subscribe(value => {
          this.snackBar.open("Element added succesfully", "ok", {
            duration: 2000,
          });
          this.form.reset();
          this.closeTab();
        }, error => {
          this.snackBar.open("Error occured", "ok", {
            duration: 2000,
          });
        })
      }
    }

  }

  compareClient(o1: Categorie, o2: Categorie) {
    return o1.id == o2.id;
  }

  get formItems(): FormArray {
    return this.form.get("items") as FormArray
  }
  addItem() {
    this.ngZone.runTask(() => {
      let formGroup = this.fb.group({
        product: this.fb.control(null , [Validators.required, Validators.nullValidator]),
        quantity: this.fb.control(0 , [Validators.required, Validators.min(1)], [QuantityValidator.createValidator(this.stockService, 0, null)]),
        unitPrice: this.fb.control(0 , [Validators.required, Validators.min(0)]),
      });
      this.formItems.push(formGroup)
    })

  }

  convertItem(item: AbstractControl): FormGroup {
    return item as FormGroup;
  }
  compareProduit(o1: Produit, o2: Produit): boolean {
    return !!(o1 && o1.id && o2 && o2.id && o1.id == o2.id);
  }

  clientChanged() {
    let value = this.form.get('client')?.value;
    let date = new Date().toISOString().substring(0,10);
    let code = `FACT-${value.firstName.charAt(0)}-${value.lastName.charAt(0)}-${date}`
    this.form.get("code")?.setValue(code)
  }

  productChanged(index: number, event: MatOptionSelectionChange<Produit>) {
    const line = (this.form.get('items') as FormArray).at(index) as FormGroup;
    const price = event.source.value.price;
    line.get('quantity')?.clearAsyncValidators();
    line.get('quantity')?.addAsyncValidators([QuantityValidator.createValidator(this.stockService, 0, event.source.value)]);
    line.get('unitPrice')?.setValue(price);
    line.get('quantity')?.setValue(1);
  }

  calculateTotal(index: number) {
    const line = (this.form.get('items') as FormArray).at(index) as FormGroup;
    return line.get('unitPrice')?.value * line.get('quantity')?.value;
  }

  calculateTotalFacture() {
    let total = 0;
    for (let i = 0; i < (this.form.get('items') as FormArray).length; i++) {
      total += this.calculateTotal(i);
    }
    return total;

  }
}
