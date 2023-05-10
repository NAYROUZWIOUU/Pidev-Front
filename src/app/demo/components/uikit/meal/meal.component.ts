import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import {Meal} from "../../../../models/meal";
import {MealService} from "../../../../services/meal/meal.service";
import {Menu} from "../../../../models/menu";
import {NutritionInformation} from "../../../../models/nutrition-information";


@Component({
    templateUrl: './meal.component.html',
    providers: [MessageService, ConfirmationService]
})
export class MealComponent implements OnInit {

  public meals: Meal[] = [];
  menu : Menu ={};
  rmeal: Meal = {};
  ermeal: Meal = {};
  mealDialog: boolean = false;
  nutDialog: boolean = false;
  emealDialog: boolean = false;
  submitted: boolean = false;
  esubmitted: boolean = false;
  selectedmeal: Meal = {};
  nutinf: NutritionInformation = {}
  assigneDialog: boolean = false;
  rowVisibility: { [key: number]: boolean } = {};


  @ViewChild('filter') filter!: ElementRef;

  constructor(private customerService: CustomerService, private productService: ProductService,
              private mealService: MealService) {
  }

  ngOnInit() {
    const savedRowVisibility = localStorage.getItem('rowVisibility');
    if (savedRowVisibility) {
      this.rowVisibility = JSON.parse(savedRowVisibility);
    }
      this.getMeals();

  }

  onGlobalFilter(table: Table, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    // check if filter value is a number
    if (!isNaN(+filterValue)) {
      table.filter(filterValue, 'equals', 'id');
      table.filter(filterValue, 'equals', 'nutritionInformation.calories');
      table.filter(filterValue, 'equals', 'nutritionInformation.protein');
      table.filter(filterValue, 'equals', 'nutritionInformation.carbohydrate');
      table.filter(filterValue, 'equals', 'nutritionInformation.fat');
    } else { // filter using contains operator for string fields
      table.filter(filterValue, 'contains', 'nameMeal');
    }
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  private getMeals() {
    this.mealService.getAllMeals().subscribe(
      (data: Meal[]) => {
        this.meals = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openNew() {
    this.rmeal = {};
    this.submitted = false;
    this.mealDialog= true;
  }
  hideDialog() {
    this.mealDialog = false;
    this.submitted = false;
  }
  hideeditDialog() {
    this.emealDialog = false;
    this.esubmitted = false;
  }
  getAllMeals(){
    this.mealService.addMeal(this.rmeal)
      .subscribe(
        (meal: Meal) => {
          console.log(`meal ${meal.idMeal} created successfully`);
          // do something else, e.g. navigate to the menu list page
        },
        (error) => console.error(error)
      );

  }
  createNutrition() {
    const mealId = this.selectedmeal.idMeal;
    const nutritionInformation = {
      "calories": this.nutinf.calories,
      "carbohydrates": this.nutinf.carbohydrates,
      "protein": this.nutinf.protein,
      "fat": this.nutinf.fat
    };
    this.mealService.createNutritionInformation(mealId, nutritionInformation)
      .subscribe(
        response => {
          console.log(this.nutinf);
          // do something with the response if needed
        },
        error => {
          console.log('Error creating nutrition information: ', error);
          // handle the error if needed
        }
      );
  }
  saveMeal() {
    this.getAllMeals();
    this.hideDialog();
  }
  editMeal(){
    var editbody = {
      "idMeal": this.selectedmeal.idMeal,
      "nameMeal": this.selectedmeal.nameMeal,
      "description": this.selectedmeal.description,
      "nutritionInformation": {
        "idNut": this.selectedmeal.nutritionInformation?.idNut,
        "calories": this.selectedmeal.nutritionInformation?.calories,
        "protein": this.selectedmeal.nutritionInformation?.protein,
        "carbohydrates": this.selectedmeal.nutritionInformation?.carbohydrates,
        "fat": this.selectedmeal.nutritionInformation?.fat
      }
    }
    console.log(editbody);

    this.mealService.updateMeal(editbody).subscribe((data)=>{
      this.hideeditDialog();
    })

    console.log(this.selectedmeal);
  }
  editOpen(){
    this.ermeal = {};
    this.esubmitted = false;
    this.emealDialog= true;

  }
  nutopen(meal:any){
    this.selectedmeal = meal;
    this.submitted = false;
    this.nutDialog= true;

  }

  selectMeal (meal:any) {
    this.selectedmeal = meal;
    this.editOpen()
  }

  assignMealToMenu() {
    this.mealService.assignMealtoMenu(this.selectedmeal.idMeal,this.menu?.idMenu)
      .subscribe(
        response => {
          console.log(response);

        },
        error => {
          console.log('Error assigning meal to menu: ', error);
          // handle the error if needed
        }
      );
  }
openassigne(){
  this.submitted = false;
    this.assigneDialog = true;
}
  hideRow(rowId: number) {
    this.rowVisibility[rowId] = true;
    this.saveRowVisibility();
    console.log(rowId);
  }
  saveRowVisibility() {
    localStorage.setItem('rowVisibility', JSON.stringify(this.rowVisibility));
  }



}
