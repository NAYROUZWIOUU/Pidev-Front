import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { RMembership } from 'src/app/models/rmembership';

@Injectable({
  providedIn: 'root'
})
export class RmembershipService {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  b: boolean = false;
  text: string = "";

  apiUrl = "http://localhost:8083/test/RMembership";

  constructor(private http: HttpClient) {}

  getRmemberships(): Observable<RMembership[]> {
    return this.http.get<RMembership[]>(this.apiUrl +"/retrieveAllRMemberships");
  }

  deleteRmembership(idRmembership: number): Observable<RMembership> {
    return this.http.delete<RMembership>(
      this.apiUrl + "/removeRMembership/" + idRmembership
    );
  }

  addRmembership(rmembership: RMembership): Observable<RMembership> {
    return this.http.post<RMembership>(
      this.apiUrl + "/addRMembershipWithVerify/6",
      rmembership,
      this.httpOptions
    );
  }

  updateRmembership(rmembership: RMembership, idRmembership: number): Observable<RMembership> {
    return this.http.put<RMembership>(
      this.apiUrl + "/updateRMembership/" + idRmembership,
      RMembership,
      this.httpOptions
    );
  }

  getRmembershipById(idRmembership: number): Observable<RMembership> {
    return this.http.get<RMembership>(this.apiUrl + "/retrieveRMembership/" + idRmembership);
  }


}
