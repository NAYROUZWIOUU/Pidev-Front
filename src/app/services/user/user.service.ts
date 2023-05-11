import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl =  'http://localhost:8082/test/';

  constructor(private http: HttpClient) { }



  listOfUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'get-all-users');
  }
  updateuser(user: User,id:String):Observable<any>{

    return this.http.post( 'http://localhost:8082/test/updateUser/'+id,user);

  }

  getUserById(userId:string): Observable<any> {
    return this.http.get(this.baseUrl + 'getUserById/'+userId);
  }

  getUserByusername(username:string): Observable<any> {
    return this.http.get(this.baseUrl + 'getUserByusername/'+username);
  }


  getnumberofusers(): Observable<any> {
    return this.http.get(this.baseUrl + 'numberofusers');
  }

  getnumberofactiveusers(): Observable<any> {
    return this.http.get(this.baseUrl + 'numberofactiveusers');
  }

  getUserPostStats(): Observable<any> {
    return this.http.get(this.baseUrl + 'displayChart');
  }

  delete(id: number) {
    console.log(id);
    return this.http.delete(this.baseUrl + 'delete-user/'+id);

  }
}
