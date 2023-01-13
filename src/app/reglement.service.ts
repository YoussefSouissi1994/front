import { Injectable } from '@angular/core';
import {Facture} from "./facture.service";
import {Client, ClientPage} from "./client.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
export interface Reglement{
  id: string;
  amount: number;
  date: Date;
  items : [] | ReglementItem[]
  client : Client | null
}
export interface ReglementItem {
  amount: number;
  facture : null | Facture;
}
export interface ReglementPage {
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  content: Reglement[];
}


@Injectable({
  providedIn: 'root'
})
export class ReglementService {

  constructor(private httpClient: HttpClient) { }
  page(page: number, size: number) : Observable<ReglementPage>{
    let params = new HttpParams();
    params = params.set("page", page);
    params = params.set("size", size);
    return this.httpClient.get<ReglementPage>(`${environment.url}/reglement/`, {params})
  }
  add(reglement: Reglement) : Observable<ReglementPage>{
    return this.httpClient.put<ReglementPage>(`${environment.url}/reglement/`, reglement);
  }

  edit(id: string, reglement: Reglement) : Observable<ReglementPage>{
    return this.httpClient.put<ReglementPage>(`${environment.url}/reglemnt/${id}`, reglement);
  }

  delete(id: string) : Observable<any>{
    return this.httpClient.delete<any>(`${environment.url}/reglement/${id}`);
  }

  exists(id: string) : Observable<boolean>{
    return this.httpClient.get<boolean>(`${environment.url}/reglement/exists/${id}`);
  }

}
