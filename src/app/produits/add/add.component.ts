import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Client, ClientService} from "../../client.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Produit, ProduitService} from "../../produit.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClientEmailValidator} from "../../clients/add/client-email-validator";
import {Categorie, CategorieService} from "../../categorie.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Output()
  close: EventEmitter<Produit> = new EventEmitter<Produit>()
  @Input("edit")
  edit = false;
  @Input("produit")
  produit : Produit | undefined;
  form: FormGroup;
  categories: Categorie[] | [] = [];
  constructor(
    public fb: FormBuilder,
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private snackBar: MatSnackBar) {
    this.form = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      category: new FormControl(),

    });
  }

  ngOnInit(): void {
    this.categorieService.getAll().subscribe(value => {
      this.categories = value;
    })
    this.form = new FormGroup({
      name: new FormControl(this.edit ? this.produit?.name : "", [Validators.required, Validators.minLength(3)]),
      price: new FormControl(this.edit ? this.produit?.price : "", Validators.required),
      category: new FormControl(this.edit ? this.produit?.category : "", Validators.required),

    });
  }

  closeTab() {
    if (this.edit) {
      this.close.emit(this.produit);
    } else {
      this.close.emit();
    }

  }
  get name() { return this.form.get('name'); }
  get price() { return this.form.get('price'); }
  get category() { return this.form.get('category'); }
  save() {
    if (this.produit !== undefined) {
      this.produit.name = this.form.get("name")?.value
      this.produit.price = this.form.get("price")?.value
      this.produit.category = this.form.get("category")?.value
    }
    this.form.reset();
    if (this.edit) {
      if (this.produit !== undefined) {
        this.produitService.edit(this.produit.id, this.produit).subscribe(value => {
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
      if (this.produit !== undefined) {
        this.produitService.add(this.produit).subscribe(value => {
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
  compareCategory(o1: Categorie, o2: Categorie) {
    return o1.id == o2.id;
  }
}
