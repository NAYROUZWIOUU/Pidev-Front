import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ResetService {
  private baseURL = "http://localhost:8082/test/forgot-password/";

  constructor(private _http:HttpClient) { }

  reset(id:String,password: string){
    return this._http.post(this.baseURL+"forgot_password?idUser="+id+"&password="+password,{responseType:'text'});
  }
}