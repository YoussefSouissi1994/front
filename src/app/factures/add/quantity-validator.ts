import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ClientService} from "../../client.service";
import {StockService} from "../../stock.service";
import {Produit} from "../../produit.service";

export class QuantityValidator {
  static createValidator(stockService: StockService, original: number, product: Produit | null): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (product === null) return Observable.create(null);
      const value = control.value - original;
      if (value <= 0) return Observable.create(null);
      // @ts-ignore
      return stockService
        .check(product, value)
        .pipe(
          map((result: boolean) =>
            result ? null : { quantityOutOfStock: true }
          )
        );
    };
  }
}
