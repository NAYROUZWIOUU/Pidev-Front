import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { RMembership } from 'src/app/models/rmembership';
import { TypeMembership } from 'src/app/models/typeMembership';
import { Duration } from 'src/app/models/duration';

interface RenewalRateResponse {
  [key: string]: number;
}

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

  apiUrl = "http://localhost:8082/test/RMembership";

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
      this.apiUrl + "/addRMembershipWithVerify/1",
      rmembership,
      this.httpOptions
    );
  }

  updateRmembership(idRmembership: number,startDate : any,tm : TypeMembership ,d : Duration ): Observable<RMembership> {
    return this.http.put<RMembership>(
      this.apiUrl + "/updateRMembership/"+idRmembership+"/"+startDate+"/"+tm+"/"+d,
      RMembership,
      this.httpOptions
    );
  }

  renewRmembership(rmembership: RMembership, idRmembership: number): Observable<RMembership> {
    return this.http.put<RMembership>(
      this.apiUrl + "/renewMembership/" + idRmembership + "/"+rmembership.duration+"/"+rmembership.typeMembership,
      RMembership,
      this.httpOptions
    );
  }

  getRmembershipById(idRmembership: number): Observable<RMembership> {
    return this.http.get<RMembership>(this.apiUrl + "/retrieveRMembership/" + idRmembership);
  }


  validateRMembership(idRmembership: number): Observable<RMembership> {
    return this.http.post<RMembership>(
      this.apiUrl + "/validateRMembership/"+idRmembership,
      RMembership,
      this.httpOptions
    );
  }



  unValidateRMembership(idRmembership: number): Observable<RMembership> {
    return this.http.post<RMembership>(
      this.apiUrl + "/unValidateRMembership/"+idRmembership,
      RMembership,
      this.httpOptions
    );
  }



  ////////////////////////////////


getGuestMemberships() : Observable<RMembership[]> {
  return this.http.get<RMembership[]>(this.apiUrl +"/listeRMembershipsGUESTS/1");
}


getTeacherMemberships()  : Observable<RMembership[]> {
  return this.http.get<RMembership[]>(this.apiUrl +"/listeRMembershipsTEACHERS/1");
}

getStudentMemberships()  : Observable<RMembership[]> {
  return this.http.get<RMembership[]>(this.apiUrl +"/listeRMembershipsSTUDENTS/1");
}


getValidRMemberships(startDate: string, endDate: string): Observable<RMembership[]> {
  return this.http.get<RMembership[]>(this.apiUrl + "/RMembershipValides/" + startDate + "/" + endDate);
}


getRenewalRate(startDate: any, endDate: any): Observable<RenewalRateResponse> {
  return this.http.get<RenewalRateResponse>(this.apiUrl + "/getRenewalRate/" + startDate + "/" + endDate);
}

}
