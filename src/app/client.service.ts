import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Facture, FactureReglementDTO} from "./facture.service";
import {Produit} from "./produit.service";
import {ChartType} from "chart.js/dist/types";
export interface ClientDetailsDTO {
  chiffreAffaire: number,
  chiffreAffaireParAn: {[key: number]: number},
  montantNonPaye: number,
  factureRegle: FactureReglementDTO[],
  factureNonRegle: FactureReglementDTO[],
  produitSollicite: [
    {
      "product": Produit,
      "quantity": number
    },
  ],
  client: Client
}
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


  details(id: string) : Observable<ClientDetailsDTO>{
    return this.httpClient.get<ClientDetailsDTO>(`${environment.url}/client/details/${id}`)
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
