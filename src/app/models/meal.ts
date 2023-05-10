import {NutritionInformation} from "./nutrition-information";
import {Menu} from "./menu";

export interface Meal {
  idMeal?: number;
  nameMeal?: string;
  description?: string;
  nutritionInformation?: NutritionInformation;
  menu?:Menu;


}
