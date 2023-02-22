import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturesRoutingModule } from './factures-routing.module';
import { FacturesComponent } from './factures.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import { ViewComponent } from './view/view.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {Platform} from "@angular/cdk/platform";
import {AppDateAdapter, AppDateFormats} from "../reglements/reglements.module";


@NgModule({
    declarations: [
        FacturesComponent,
        AddComponent,
        ListComponent,
        ViewComponent
    ],
    exports: [
        ViewComponent
    ],
    imports: [
        CommonModule,
        FacturesRoutingModule,
        MatFormFieldModule,
        MatCardModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatSnackBarModule,
        MatSelectModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        MatGridListModule,
        MatListModule,
        MatDatepickerModule
    ],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: AppDateFormats
    }
  ]
})
export class FacturesModule { }
