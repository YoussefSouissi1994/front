import { Injectable } from '@angular/core';
import {Categorie} from "./categorie.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Client, ClientPage} from "./client.service";
export interface Produit {
  id: string;
  name: string;
  price: number;
  category: Categorie | null
}
  export interface ProduitPage{
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  content: Produit[] | [];
}


@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private httpClient : HttpClient) { }
  page(page: number, size: number) : Observable<ProduitPage>{
    let params = new HttpParams();
    params = params.set("page", page);
    params = params.set("size", size);
    return this.httpClient.get<ProduitPage>(`${environment.url}/produit/produit`, {params})
  }
  add(produit: Produit) : Observable<ProduitPage>{
    return this.httpClient.put<ProduitPage>(`${environment.url}/produit/produit`, produit);
  }

  edit(id: string, produit: Produit) : Observable<ProduitPage>{
    return this.httpClient.put<ProduitPage>(`${environment.url}/produit/produit/${id}`, produit);
  }

  delete(id: string) : Observable<any>{
    return this.httpClient.delete<any>(`${environment.url}/produit/produit/${id}`);
  }

  exists(id: string) : Observable<boolean>{
    return this.httpClient.get<boolean>(`${environment.url}/produit/produit/exists/${id}`);
  }

  getAll() : Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(`${environment.url}/produit/produit/all`)
  }
}
