import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Meal} from "../../models/meal";
import {NutritionInformation} from "../../models/nutrition-information";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class MealService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.apiUrl}/retrieveAllMeals`);
  }

  addMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(`${this.apiUrl}/addMeal`, meal);
  }

  updateMeal(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.apiUrl}/updateMeal`, meal);
  }

  getMeal(id: number): Observable<Meal> {
    return this.http.get<Meal>(`${this.apiUrl}/retrievemeal/${id}`);
  }

  removeMeal(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove-meal/${id}`);
  }

  assignMealtoMenu(mealId: any, menuId: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/assignMealtoMenu/${mealId}/${menuId}`, null);
  }

  createNutritionInformation(idMeal: any, nutritionInformation: any): Observable<NutritionInformation> {
    return this.http.post<NutritionInformation>(`${this.apiUrl}/createNutritionInformation/${idMeal}`, nutritionInformation);
  }

  updateNutritionInformation(idMeal: number, nutritionInformation: NutritionInformation): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateNutritionInformation/${idMeal}`, nutritionInformation);
  }

  getDailyNutrition(weight: any, height: any, age: any, gender: any): Observable<NutritionInformation> {
    return this.http.get<NutritionInformation>(`${this.apiUrl}/daily?weight=${weight}&height=${height}&age=${age}&gender=${gender}`);
  }

}
