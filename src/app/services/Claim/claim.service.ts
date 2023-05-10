import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from '../../models/Claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  public baseUrl = 'http://localhost:8082/test/claim';

  constructor(private http: HttpClient) { }

  getAllClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.baseUrl}/retrieveAllClaims`);
  }

  addClaim(claim: Claim): Observable<Claim> {
    return this.http.post<Claim>(`${this.baseUrl}/addClaim`, claim);
  }

  updateClaim(claim: Claim): Observable<Claim> {
    return this.http.put<Claim>(`${this.baseUrl}/updateClaim`, claim);
  }

  getClaimById(id: number): Observable<Claim> {
    return this.http.get<Claim>(`${this.baseUrl}/retrieveClaim/${id}`);
  }

  deleteClaim(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteClaim/${id}`, { responseType: 'text' });
  }
}
