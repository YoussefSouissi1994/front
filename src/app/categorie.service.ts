import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Client, ClientPage} from "./client.service";
export interface Categorie{
id : string;
  name : string;
}
export interface CategoriePage{
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  content : Categorie[]
}
@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private httpClient : HttpClient) {

  }
  page(page: number, size: number) : Observable<CategoriePage> {
    let params = new HttpParams();
    params = params.set("page", page);
    params = params.set("size", size);
    return this.httpClient.get<CategoriePage>(`${environment.url}/produit/categorie`, {params})
  }

  getAll() : Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>(`${environment.url}/produit/categorie/all`)
  }
  add(categorie: Categorie) : Observable<CategoriePage>{
    return this.httpClient.put<CategoriePage>(`${environment.url}/produit/categorie`, categorie);
  }
  edit(id: string, categorie: Categorie) : Observable<CategoriePage>{
    return this.httpClient.put<CategoriePage>(`${environment.url}/produit/categorie/${id}`, categorie);
  }

  delete(id: string) : Observable<any>{
    return this.httpClient.delete<any>(`${environment.url}/produit/categorie/${id}`);
  }

  exists(id: string) : Observable<boolean>{
    return this.httpClient.get<boolean>(`${environment.url}/produit/categorie/exists/${id}`);
  }

}
