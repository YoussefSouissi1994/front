import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReglementsRoutingModule } from './reglements-routing.module';
import { ReglementsComponent } from './reglements.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter} from "@angular/material/core";
import {Platform} from "@angular/cdk/platform";
import * as dayjs from 'dayjs';
import 'dayjs/locale/de';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import {MatCheckboxModule} from "@angular/material/checkbox";
export const AppDateFormats = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}

export class AppDateAdapter extends NativeDateAdapter {

  constructor(matDateLocale: string, platform: Platform) {
    super(matDateLocale, platform)

    // Initalize DayJS-Parser
    dayjs.locale('de')
    dayjs.extend(customParseFormat)
    dayjs.extend(localizedFormat)
  }

  override parse(value: any): Date | null {
    return dayjs(value, 'DD.MM.YYYY').toDate()
  }

  override format(date: Date, displayFormat: any): string {
    return dayjs(date).format(displayFormat)
  }

}

@NgModule({
  declarations: [
    ReglementsComponent,
    AddComponent,
    ListComponent
  ],
    imports: [
        CommonModule,
        ReglementsRoutingModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatPaginatorModule,
        MatIconModule,
        MatTableModule,
        MatTabsModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatCheckboxModule
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
export class ReglementsModule { }
