import {Typemenu} from "./typemenu";
import {Restaurant} from "./restaurant";
import {Meal} from "./meal";

export interface Menu {
  idMenu?: number;
  priceMenu?: number;
  typeMenu?:Typemenu;
  dateMenu?: any;
  restaurant?:Restaurant[];
  meals?:Meal[];



}
