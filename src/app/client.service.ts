import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Categorie} from "./categorie.service";

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
}

export interface ClientPage {
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  content: Client[];
}


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }

  page(page: number, size: number) : Observable<ClientPage>{
    let params = new HttpParams();
    params = params.set("page", page);
    params = params.set("size", size);
    return this.httpClient.get<ClientPage>(`${environment.url}/client/`, {params})
  }



  add(client: Client) : Observable<ClientPage>{
    return this.httpClient.put<ClientPage>(`${environment.url}/client/`, client);
  }

  edit(id: string, client: Client) : Observable<ClientPage>{
    return this.httpClient.put<ClientPage>(`${environment.url}/client/${id}`, client);
  }

  delete(id: string) : Observable<any>{
    return this.httpClient.delete<any>(`${environment.url}/client/${id}`);
  }

  exists(id: string) : Observable<boolean>{
    return this.httpClient.get<boolean>(`${environment.url}/client/exists/${id}`);
  }

  getAll() : Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${environment.url}/client/all`)
  }
}
