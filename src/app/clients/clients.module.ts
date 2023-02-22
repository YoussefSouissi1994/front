import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ListComponent } from './list/list.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import { AddComponent } from './add/add.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ViewComponent } from './view/view.component';
import {NgChartsModule} from "ng2-charts";
import {MatGridListModule} from "@angular/material/grid-list";


@NgModule({
  declarations: [
    ClientsComponent,
    ListComponent,
    AddComponent,
    ViewComponent
  ],
  exports: [
    ListComponent
  ],
    imports: [
        CommonModule,
        ClientsRoutingModule,
        MatPaginatorModule,
        MatTableModule,
        MatCardModule,
        MatTabsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatSnackBarModule,
        NgChartsModule,
        MatGridListModule
    ]
})
export class ClientsModule { }
