import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Client, ClientService} from "../../client.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Categorie, CategorieService} from "../../categorie.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClientEmailValidator} from "../../clients/add/client-email-validator";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Output()
  close: EventEmitter<Categorie> = new EventEmitter<Categorie>()
  @Input("edit")
  edit = false;
  @Input("categorie")
  categorie : Categorie | undefined;
  form: FormGroup;

  constructor(public fb: FormBuilder, private categorieService: CategorieService, private snackBar: MatSnackBar) {
    this.form = new FormGroup({
      name: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.edit ? this.categorie?.name : "", [Validators.required, Validators.minLength(3)]),
    });

  }
  closeTab() {
    if (this.edit) {
      this.close.emit(this.categorie);
    } else {
      this.close.emit();
    }

  }
  get name() { return this.form.get('name'); }
  save() {
    if (this.categorie !== undefined) {
      this.categorie.name = this.form.get("name")?.value
    }
    this.form.reset();
    if (this.edit) {
      if (this.categorie !== undefined) {
        this.categorieService.edit(this.categorie.id, this.categorie).subscribe(value => {
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
      if (this.categorie !== undefined) {
        this.categorieService.add(this.categorie).subscribe(value => {
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

}
