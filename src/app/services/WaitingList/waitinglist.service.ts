import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WaitingList } from '../../models/waitinglist';

@Injectable({
  providedIn: 'root'
})
export class WaitingListService {

  private baseUrl = 'http://localhost:8082/test/waiting-list';

  constructor(private http: HttpClient) { }

  addToWaitingList(waitingList: WaitingList): Observable<WaitingList> {
    return this.http.post<WaitingList>(`${this.baseUrl}/addToWaitingList/`+1, waitingList);
  }

  removeFromWaitingList(waitingListId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/removeFromWaitingList/${waitingListId}`);
  }

  getFirstOfWaitingList(): Observable<WaitingList> {
    return this.http.get<WaitingList>(`${this.baseUrl}/getFirstOfWaitingList`);
  }

  notifyFirstUserOnWaitingList(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/notifyFirstUserOnWaitingList`, null);
  }

  countWaitingList(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/countWaitingList`);
  }

  getWaitingListByFoyerAndBlock(idFoyer: number, idBlock: number): Observable<WaitingList[]> {
    return this.http.get<WaitingList[]>(`${this.baseUrl}/getWaitingListByFoyerAndBlock/${idFoyer}/${idBlock}`);
  }

  getAllWaitingList(): Observable<WaitingList[]> {
    return this.http.get<WaitingList[]>(`${this.baseUrl}/getAllWaitingList`);
  }

  estimateWaitTimes(): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/estimateWaitTimes`);
  }
}
