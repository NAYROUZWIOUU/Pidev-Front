import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fmembership } from '../../models/fmembership';

@Injectable({
  providedIn: 'root'
})
export class FmembershipService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  b: boolean = false;
  text: string = "";

  apiUrl = "http://localhost:8092/test/fMembership";
  getFmemberships(): Observable<Fmembership[]> {
    return this.http.get<Fmembership[]>(this.apiUrl +"/retrieveFMembership");
  }

  getFMembership(id: number) {
    return this.http.get(this.apiUrl +'/retrieveFMembership/' + id);
  }

  addFMembership(fMembership: Fmembership, idUser?: number, idRoom?: number) {
      return this.http.post(this.apiUrl +'/addFMembership/' + idUser + '/' + idRoom, fMembership);
  }

  
  deleteFmembership(idFmembership: number): Observable<Fmembership> {
    return this.http.delete<Fmembership>(
      this.apiUrl + "/deleteFMembership/" + idFmembership
    );
  }
  updateFMembership(fMembership: Fmembership) {
    return this.http.put(this.apiUrl +'/updateFMembership', fMembership);
  }
}

