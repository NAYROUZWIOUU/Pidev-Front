import { Injectable } from '@angular/core';

const ID_KEY='AuthId';
const USERNAME_KEY ='AuthUsername';
const TOKEN_KEY='AuthToken';
const AUTHORITIES_KEY='AuthAuthorities';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
private roles:string []= [];
  constructor() { }


  public saveId(id:string){
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY,id);
  }

  public getId(): string | null{
    return sessionStorage.getItem(ID_KEY);
  }



  public saveUsername(username:string){
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY,username);
  }

  public getUsername(): string| null {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveToken(token:string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public clearLocalStorage() {
    sessionStorage.clear();
  }
  public saveAuthorities(authorities:string){
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY,authorities);
  }

  public getAuthorities(): any{
    return sessionStorage.getItem(AUTHORITIES_KEY);
  }
}
