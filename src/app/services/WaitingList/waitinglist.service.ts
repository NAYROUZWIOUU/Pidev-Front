import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WaitingList } from '../../models/waitinglist';

@Injectable({
  providedIn: 'root'
})
export class WaitingListService {

  private baseUrl = 'http://localhost:8082/waitinglist';

  constructor(private http: HttpClient) { }

  addToWaitingList(waitingList: WaitingList, userId: number): Observable<WaitingList> {
    return this.http.post<WaitingList>(`${this.baseUrl}/${userId}`, waitingList);
  }

  removeFromWaitingList(waitingListId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${waitingListId}`);
  }

  getWaitingListByFoyerAndBlock(idFoyer: number, idBlock: number): Observable<WaitingList[]> {
    return this.http.get<WaitingList[]>(`${this.baseUrl}/foyer/${idFoyer}/block/${idBlock}`);
  }

  getAllWaitingList(): Observable<WaitingList[]> {
    return this.http.get<WaitingList[]>(`${this.baseUrl}/all`);
  }

  getFirstOfWaitingList(): Observable<WaitingList> {
    return this.http.get<WaitingList>(`${this.baseUrl}/first`);
  }

  sendFreePlaceEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/email/${email}`, null);
  }

  notifyFirstUserOnWaitingList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/notify`);
  }

  countWaitingList(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  estimateWaitTimes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/estimate`);
  }
  createWaitingList(waitingList: WaitingList): Observable<WaitingList> {
    return this.http.post<WaitingList>(`${this.baseUrl}`, waitingList);
  }
  updateWaitingList(id: number, waitingList: WaitingList): Observable<WaitingList> {
    return this.http.put<WaitingList>(`${this.baseUrl}/${id}`, waitingList);
  }

  deleteWaitingList(id: number): Observable<WaitingList> {
    return this.http.delete<WaitingList>(`${this.baseUrl}/${id}`);
  }
  getWaitingListById(id: number): Observable<WaitingList> {
    return this.http.get<WaitingList>(`${this.baseUrl}/${id}`);
  }
}
