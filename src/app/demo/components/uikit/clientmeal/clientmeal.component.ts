import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import {Meal} from "../../../../models/meal";
import {MealService} from "../../../../services/meal/meal.service";
import {Menu} from "../../../../models/menu";
import {Router} from "@angular/router";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {NutritionInformation} from "../../../../models/nutrition-information";


@Component({
    templateUrl: './clientmeal.component.html',
    providers: [MessageService, ConfirmationService]
})
export class ClientmealComponent implements OnInit {

  public meals: Meal[] = [];
  rmeal: Meal = {};
  ermeal: Meal = {};
  mealDialog: boolean = false;
  emealDialog: boolean = false;
  submitted: boolean = false;
  esubmitted: boolean = false;
  selectedmeal: Meal = {};
  dailyinfoweight = {};
  dailyinfoheight = {};
  dailyinfoage = {};
  dailyinfogendre = {};
  messageService: any;
  radarData: any;
  radarOptions: any;
  responsenut : NutritionInformation = {};
  rowVisibility: { [key: number]: boolean } = {};

  @ViewChild('filter') filter!: ElementRef;

  constructor(private customerService: CustomerService, private productService: ProductService,
              private mealService: MealService,public router: Router,public layoutService: LayoutService ) {
  }

  ngOnInit() {
    const savedRowVisibility = localStorage.getItem('rowVisibility');
    if (savedRowVisibility) {
      this.rowVisibility = JSON.parse(savedRowVisibility);
    }
    this.initCharts();
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
  calculatedailynut(){
    this.mealService.getDailyNutrition(this.dailyinfoweight,this.dailyinfoheight,this.dailyinfoage,this.dailyinfogendre).subscribe((response:NutritionInformation) => {
      console.log(response);
      this.responsenut = response;
      console.log(this.responsenut)
      this.initCharts();


    });
  }
  saveMeal() {
   this.calculatedailynut();
    this.hideDialog();
  }
  editMeal(){
    var editbody = {
      "idMeal": this.selectedmeal.idMeal,
      "nameMeal": this.selectedmeal.nameMeal,
      "description": this.selectedmeal.description,
    }
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
  selectMeal (meal:any) {
    this.selectedmeal = meal;
    this.editOpen()
  }
  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.radarData = {
      labels: ['Calories', 'fat', 'Carb', 'Proteine', 'Drink water', '8 hour sleep', 'Give your body vitamines'],
      datasets: [
        /*{
          label: 'My First dataset',
          borderColor: documentStyle.getPropertyValue('--indigo-400'),
          pointBackgroundColor: documentStyle.getPropertyValue('--indigo-400'),
          pointBorderColor: documentStyle.getPropertyValue('--indigo-400'),
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: documentStyle.getPropertyValue('--indigo-400'),
          data: [65, 59, 90, 81, 56, 55, 40]
        },*/
        {
          label: 'Your Daily Nutrition',
          borderColor: documentStyle.getPropertyValue('--purple-400'),
          pointBackgroundColor: documentStyle.getPropertyValue('--purple-400'),
          pointBorderColor: documentStyle.getPropertyValue('--purple-400'),
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: documentStyle.getPropertyValue('--purple-400'),
          data: [this.responsenut.calories, this.responsenut.fat, this.responsenut.carbohydrates, this.responsenut.protein, this.responsenut.calories, this.responsenut.calories, this.responsenut.calories]

        }
      ]
    };console.log(this.radarData);
    this.radarOptions = {
      plugins: {
        legend: {
          labels: {
            fontColor: textColor
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: textColorSecondary
          }
        }
      }
    };


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
