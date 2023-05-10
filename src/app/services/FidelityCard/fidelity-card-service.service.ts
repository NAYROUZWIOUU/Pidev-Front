import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FidelityCard } from 'src/app/models/fidelity-card';
import { Observable } from 'rxjs';
import { MembershipLevel } from 'src/app/models/membership-level';

@Injectable({
  providedIn: 'root'
})
export class FidelityCardService{
  ttpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  b: boolean = false;
  text: string = "";

  apiUrl = "http://localhost:8082/test/FidelityCard";


  constructor(private http: HttpClient) { }


  getFidelityCardByUser(idUser: number): Observable<FidelityCard> {
    return this.http.get<FidelityCard>(this.apiUrl + "/retrieveFidelityCard/" + idUser);
  }

  addFidelityCard(fidelityCard: FidelityCard, idUser: number): Observable<FidelityCard> {
    return this.http.post<FidelityCard>(
      this.apiUrl + "/addFidelityCard/"+idUser,
      fidelityCard
    );
  }

  retrieveFidelityCard(idFidelityCard: number): Observable<FidelityCard> {
    return this.http.get<FidelityCard>(this.apiUrl + "/retrieveFidelityCard/" + idFidelityCard);
  }

  retrieveAllFidelityCard(): Observable<FidelityCard[]> {
    return this.http.get<FidelityCard[]>(this.apiUrl +"/retrieveAllFidelityCard");
  }

  updateFidelityCard(fidelityCard: FidelityCard, userId: number): Observable<FidelityCard> {
    return this.http.put<FidelityCard>(
      this.apiUrl + "/updateFidelityCard/"+userId,
      fidelityCard
    );
  }

  removeFidelityCard(idFidelityCard: number): Observable<FidelityCard> {
    return this.http.delete<FidelityCard>(
      this.apiUrl + "/removeFidelityCard/" + idFidelityCard
    );
  }

  public getUserFullName(fidelityCardId: number): Observable<string> {
    return this.http.get<string>(this.apiUrl + "/showUserFullNameOfAFidelityCard/" + fidelityCardId);
  }


  getMembershipLevel(fidelityCardId: number): Observable<MembershipLevel> {
    return this.http.get<MembershipLevel>(`${this.apiUrl}/getMembershipLevel/${fidelityCardId}`);
  }

  getMembershipLevelByUser(userId: number): Observable<MembershipLevel> {
    return this.http.get<MembershipLevel>(`${this.apiUrl}/getMembershipLevelByUser/${userId}`);
  }

  getTotalPointsByUser(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/getTotalPointsByUser/${userId}`);
  }

  getHashmapLevelAndPointsParUser(userId: number): Observable<Map<string, string>> {
    return this.http.get<Map<string, string>>(`${this.apiUrl}/getHashmapLevelAndPointsParUser/${userId}`);
  }

  updateMemberShipLevelFidelityCard(fidelityCardId: number): Observable<FidelityCard> {
    return this.http.put<FidelityCard>(`${this.apiUrl}/updateMemberShipLevelFidelityCard/${fidelityCardId}`, null);
  }

  showTotalPointsByUser(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/showTotalPointsByUser/${userId}`);
  }
}
