import { Injectable } from '@angular/core';
import {Client} from "./client.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Produit} from "./produit.service";
import {ReglementItem} from "./reglement.service";
export interface Facture{
  id : string ;
  code : string;
  date : Date;
  client : Client | null;

  items: FactureItem[] | [];

}

export interface FactureReglementDTO{
  facture : Facture ;
  items: ReglementItem[] | [];

  needToPay: number;

}

export interface FactureItem {
  product : Produit | null ;
  quantity : number;
  unitPrice : number;
}
export interface FacturePage{
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  content: FactureReglementDTO[] | [];
}

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private httpClient : HttpClient) { }
  page(page: number, size: number) : Observable<FacturePage>{
    let params = new HttpParams();
    params = params.set("page", page);
    params = params.set("size", size);
    params = params.set("sort", "needToPay");
    return this.httpClient.get<FacturePage>(`${environment.url}/facture/`, {params})
  }
  getByClient(client: Client, onlyNotPaid: boolean) : Observable<FactureReglementDTO[]> {
    let params = new HttpParams();
    params = params.set("onlyNotPaid", onlyNotPaid);
    return this.httpClient.get<FactureReglementDTO[]>(`${environment.url}/facture/byClient/${client.id}`, {params})
  }
  add(facture: Facture) : Observable<Facture>{
    return this.httpClient.put<Facture>(`${environment.url}/facture/`, facture);
  }

  edit(id: string, facture: Facture) : Observable<FacturePage>{
    return this.httpClient.put<FacturePage>(`${environment.url}/facture/${id}`, facture);
  }

  delete(id: string) : Observable<any>{
    return this.httpClient.delete<any>(`${environment.url}/facture/${id}`);
  }

  exists(id: string) : Observable<boolean>{
    return this.httpClient.get<boolean>(`${environment.url}/facture/exists/${id}`);
  }
}
