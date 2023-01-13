import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Client, ClientService} from "../../client.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Reglement, ReglementItem, ReglementService} from "../../reglement.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClientEmailValidator} from "../../clients/add/client-email-validator";
import {Produit} from "../../produit.service";
import {Facture, FactureReglementDTO, FactureService} from "../../facture.service";
import {QuantityValidator} from "../../factures/add/quantity-validator";
import {MatOptionSelectionChange} from "@angular/material/core";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @Output()
  close: EventEmitter<Reglement> = new EventEmitter<Reglement>()
  @Input("edit")
  edit = false;
  @Input("reglement")
  reglement : Reglement | undefined;

  clients : Client[] | [] = []
  facturesOnlyOptions : Facture[] | [] = []
  facturesReglementOptions : FactureReglementDTO[] | [] = []
  form: FormGroup;


  constructor(
    public fb: FormBuilder,
    private reglementService: ReglementService,
    private clientService: ClientService,
    private factureService: FactureService,
    private snackBar: MatSnackBar) {
    this.form = new FormGroup({
      amount: new FormControl(),
      date: new FormControl(),
      factures: new FormControl(),
      client: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.clientService.getAll().subscribe(value => this.clients = value)
    if (this.edit) {

    } else {
      this.form = new FormGroup({
        amount: new FormControl(this.edit ? this.reglement?.amount : "", Validators.required),
        date: new FormControl(this.edit ? this.reglement?.date : "", Validators.required),
        items: new FormArray([]),
        client: new FormControl(this.edit ? this.reglement?.client : "", Validators.required),
      });
    }

  }
  closeTab() {
    if (this.edit) {
      this.close.emit(this.reglement);
    } else {
      this.close.emit();
    }

  }

  get amount() { return this.form.get('amount'); }

  get date() { return this.form.get('date'); }

  get factures() { return this.form.get('factures'); }
  get client() { return this.form.get('client'); }
  save() {
    if (this.reglement !== undefined) {
      this.reglement.client = this.form.get("client")?.value
      this.reglement.amount = this.form.get("amount")?.value
      this.reglement.date = this.form.get("date")?.value;
      this.reglement.items = (<FormArray>this.form.get("items")).controls.map(value => {
        return {
          amount: value.get("amount")?.value,
          facture: value.get("facture")?.value
        }
      });

    }
    this.form.reset();
    if (this.edit) {
      if (this.reglement !== undefined) {
        this.reglementService.edit(this.reglement.id, this.reglement).subscribe(value => {
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
      if (this.reglement !== undefined) {
        this.reglementService.add(this.reglement).subscribe(value => {
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
  compareFacture(o1 : Facture, o2 : Facture){
    return o1.id == o2.id;
  }

  get formItems(): FormArray {
    return this.form.get("items") as FormArray
  }

  compareClient(o1 : Client, o2 : Client){
    return o1.id == o2.id;
  }

  addItem() {
    let formGroup = this.fb.group({
      facture: this.fb.control(null , [Validators.required, Validators.nullValidator]),
      amount: this.fb.control(0 , [Validators.required, Validators.min(0)])
    });
    this.formItems.push(formGroup)

  }

  clientChanged(event: MatSelectChange) {
    this.factureService.getByClient(event.source.value, true).subscribe(value => {
      this.facturesReglementOptions = value
      this.facturesOnlyOptions = value.map(value1 => value1.facture);
    })
  }

  amountChanged() {
    let value = this.form.get("amount")?.value;
    let items : ReglementItem[] = [];
    this.facturesReglementOptions.forEach(factureReglementDTO => {
      const factureTotale = factureReglementDTO.needToPay;
      if (value > 0) {
        if (value > factureTotale) {
          const reglementItem : ReglementItem = {
            facture: factureReglementDTO.facture,
            amount: factureTotale
          }
          value -= factureTotale;
          items.push(reglementItem);
        } else {
          const reglementItem : ReglementItem = {
            facture: factureReglementDTO.facture,
            amount: value
          }
          value = 0;
          items.push(reglementItem);
        }
      }
    })
    this.form.get("items")?.reset([]);
    items.forEach(item => {

      (this.form.get("items") as FormArray).push(this.fb.group({
        facture: this.fb.control(item.facture , [Validators.required, Validators.nullValidator]),
        amount: this.fb.control(item.amount , [Validators.required, Validators.min(0)])
      }))
    })
  }
}
