import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Client, ClientService} from "../../client.service";
import {EmailValidator, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClientEmailValidator} from "./client-email-validator";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Output()
  close: EventEmitter<Client> = new EventEmitter<Client>()
  @Input("edit")
  edit = false;
  @Input("client")
  client : Client | undefined;
  form: FormGroup;
  constructor(public fb: FormBuilder, private clientService: ClientService, private snackBar: MatSnackBar) {
    this.form = new FormGroup({
      product: new FormControl(),
      quantity: new FormControl(),
      address: new FormControl(),
      phoneNumber: new FormControl(),
      email: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(this.edit ? this.client?.firstName : "", [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(this.edit ? this.client?.lastName : "", Validators.required),
      address: new FormControl(this.edit ? this.client?.address : "", Validators.required),
      phoneNumber: new FormControl(this.edit ? this.client?.phoneNumber : "", Validators.required),
      email: new FormControl(this.edit ? this.client?.email : "", [Validators.required], [ClientEmailValidator.createValidator(this.clientService, this.edit && this.client ? this.client?.email : "")]),
    });
  }

  closeTab() {
    if (this.edit) {
      this.close.emit(this.client);
    } else {
      this.close.emit();
    }

  }

  get firstName() { return this.form.get('firstName'); }

  get lastName() { return this.form.get('lastName'); }

  get email() { return this.form.get('email'); }
  save() {
    if (this.client !== undefined) {
      this.client.firstName = this.form.get("firstName")?.value
      this.client.lastName = this.form.get("lastName")?.value
      this.client.phoneNumber = this.form.get("phoneNumber")?.value
      this.client.address = this.form.get("address")?.value
      this.client.email = this.form.get("email")?.value
    }
    this.form.reset();
    if (this.edit) {
      if (this.client !== undefined) {
        this.clientService.edit(this.client.id, this.client).subscribe(value => {
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
      if (this.client !== undefined) {
        this.clientService.add(this.client).subscribe(value => {
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
