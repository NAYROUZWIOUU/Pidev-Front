import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Menu} from "../../models/menu";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/retrieveAllMenus`);
  }

  addMenu(menu: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addMenu`, menu);
  }

  updateMenu(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/updateMenu`, menu);
  }

  getMenu(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/retrievemenu/${id}`);
  }

  removeMenu(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove-menu/${id}`, { responseType: 'text' });
  }

  assignMenuToRestaurant(idMenu: number, idRestau: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/assignMenutoRestaurant/${idMenu}/${idRestau}`, null, { responseType: 'text' });
  }

  getMenuCalories(idMenu: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/menus/${idMenu}/calories`);
  }

  validateMenu(idMenu: number, minCalories: number, maxCalories: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/menu/validate/${idMenu}?minCalories=${minCalories}&maxCalories=${maxCalories}`);
  }
}
