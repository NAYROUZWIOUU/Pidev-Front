import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FidelityCard } from 'src/app/models/fidelity-card';
import { Observable } from 'rxjs';

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

  apiUrl = "http://localhost:8083/test/FidelityCard";


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


}
