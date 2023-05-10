import {Meal} from "./meal";

export interface NutritionInformation {
  idNut?: number;
  calories?: number;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
  meal?: Meal;
}
