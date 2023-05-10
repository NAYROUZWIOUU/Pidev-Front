import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {Foyer} from "../../models/foyer";

@Injectable({
  providedIn: 'root'
})
export class FoyerService {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  b: boolean = false;
  text: string = "";

  apiUrl = "http://localhost:8082/test/foyer";

  constructor(private http: HttpClient) {}

  getAllFoyers(): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(this.apiUrl +"/getAllFoyers");
  }

  removeFoyer(idFoyer: number): Observable<Foyer> {
    return this.http.delete<Foyer>(
      this.apiUrl + "/removefoyer/" + idFoyer
    );
  }

  addFoyer(foyer: Foyer): Observable<Foyer> {
    return this.http.post<Foyer>(
      this.apiUrl + "/addFoyer",
      foyer,
      this.httpOptions
    );
  }

  updateFoyer(foyer: Foyer): Observable<Foyer> {
    return this.http.put<Foyer>(
      this.apiUrl + "/updateFoyer",
    foyer,
      this.httpOptions
    );
  }

  getFoyer(idFoyer: number): Observable<Foyer> {
    return this.http.get<Foyer>(this.apiUrl + "/getFoyer/" + idFoyer);
  }

}
