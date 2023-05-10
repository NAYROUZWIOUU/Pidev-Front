import { Injectable } from '@angular/core';
import {Restaurant} from "../../models/restaurant";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurant/retrieveAllRestaurants`);
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.apiUrl}/restaurant/addRestaurant`, restaurant);
  }

  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.apiUrl}/restaurant/updateRestaurant`, restaurant);
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/restaurant/retrieveRestaurant/${id}`);
  }

  archive(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/restaurant/archive/${id}`, null, { responseType: 'text' });
  }

  unarchive(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/restaurant/unarchive/${id}`, null, { responseType: 'text' });
  }

}

