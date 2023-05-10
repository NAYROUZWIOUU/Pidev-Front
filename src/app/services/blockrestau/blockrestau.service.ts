import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Blockrestau} from "../../models/blockrestau";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BlockrestauService {


  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  retrieveAllBlockRestau(): Observable<Blockrestau[]> {
    return this.http.get<Blockrestau[]>(`${this.apiUrl}/retrieveAllBlockRestau`);
  }

  addBlockRestau(blockRestau: Blockrestau): Observable<Blockrestau> {
    return this.http.post<Blockrestau>(`${this.apiUrl}/addBlockRestau`, blockRestau);
  }

  updateBlockRestau(blockRestau: Blockrestau): Observable<Blockrestau> {
    return this.http.put<Blockrestau>(`${this.apiUrl}/updateBlockRestau`, blockRestau);
  }

  retrieveBlockRestau(id: number): Observable<Blockrestau> {
    return this.http.get<Blockrestau>(`${this.apiUrl}/retrieveBlockRestau/${id}`);
  }

  archiveBlock(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/archive/${id}`, null, { responseType: 'text' });
  }

  unarchiveBlock(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/unarchive/${id}`, null, { responseType: 'text' });
  }

  assignBlockRtoRestaurant(blockId: any, restauId: any): Observable<any> {
    const body = { blockrestauId: blockId, restauId };
    return this.http.put(`${this.apiUrl}/assigneBtoRes/${blockId}/${restauId}`, body, { responseType: 'text' });
  }

}
