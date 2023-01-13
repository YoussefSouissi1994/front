import { Injectable } from '@angular/core';
import {Produit} from "./produit.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
export interface Stock {
  id : string;
  product: Produit | null;
  quantity : number
}
export interface StockPage{
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  content: Stock[];
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient : HttpClient) {}

    page(page: number, size: number, ruptureStock: number) : Observable<StockPage>{
    let params = new HttpParams();
    params = params.set("page", page);
    params = params.set("size", size);
    params = params.set("rupture", ruptureStock);
    return this.httpClient.get<StockPage>(`${environment.url}/stock/`, {params})
  }



  add(stock: Stock) : Observable<StockPage>{
    return this.httpClient.put<StockPage>(`${environment.url}/stock/`, stock);
  }

  edit(id: string, stock: Stock) : Observable<StockPage>{
    return this.httpClient.put<StockPage>(`${environment.url}/stock/${id}`, stock);
  }

  delete(id: string) : Observable<any>{
    return this.httpClient.delete<any>(`${environment.url}/stock/${id}`);
  }

  exists(id: string) : Observable<boolean>{
    return this.httpClient.get<boolean>(`${environment.url}/stock/exists/${id}`);
  }
  check(produit: Produit, value: number) : Observable<boolean>{
    return this.httpClient.post<boolean>(`${environment.url}/stock/check/`, {product: produit, quantity: value});
  }
}
