import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from 'src/app/models/user';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  b: boolean = false;
  text: string = "";

  apiUrl = "http://localhost:8083/test/";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl +"get-all-users");
  }

  deleteUser(idUser: number): Observable<User> {
    return this.http.delete<User>(
      this.apiUrl + "/removeUser/" + idUser
    );
  }

  addUser(User: User): Observable<User> {
    return this.http.post<User>(
      this.apiUrl + "/addUser",
      User,
      this.httpOptions
    );
  }

  updateUser(User: User, idUser: number): Observable<User> {
    return this.http.put<User>(
      this.apiUrl + "/updateUser/" + idUser,
      User,
      this.httpOptions
    );
  }

  getUserById(idUser: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + "/User/" + idUser);
  }



}
