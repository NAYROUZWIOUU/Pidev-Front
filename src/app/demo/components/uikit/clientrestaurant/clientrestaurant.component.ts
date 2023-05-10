import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import {Meal} from "../../../../models/meal";
import {MealService} from "../../../../services/meal/meal.service";
import {Menu} from "../../../../models/menu";
import {Restaurant} from "../../../../models/restaurant";
import {RestaurantService} from "../../../../services/Restaurant/restaurant.service";
import {Router} from "@angular/router";
import {LayoutService} from "../../../../layout/service/app.layout.service";


@Component({
    templateUrl: './clientrestaurant.component.html',
    providers: [MessageService, ConfirmationService]
})
export class ClientrestaurantComponent implements OnInit {

  public restaurant: Restaurant[] = [];
  rrestaurant: Restaurant = {};
  errestaurant: Restaurant = {};
  restDialog: boolean = false;
  erestDialog: boolean = false;
  submitted: boolean = false;
  esubmitted: boolean = false;
  selectedrestau: Restaurant = {};

  @ViewChild('filter') filter!: ElementRef;

  constructor(private customerService: CustomerService, private productService: ProductService,
              private restauService: RestaurantService,public router: Router,public layoutService: LayoutService) {
  }

  ngOnInit() {
      this.getRestau();

  }

  onGlobalFilter(table: Table, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    // check if filter value is a number
   /* if (!isNaN(+filterValue)) {
      table.filter(filterValue, 'equals', 'id');
      table.filter(filterValue, 'equals', 'nutritionInformation.calories');
      table.filter(filterValue, 'equals', 'nutritionInformation.protein');
      table.filter(filterValue, 'equals', 'nutritionInformation.carbohydrate');
      table.filter(filterValue, 'equals', 'nutritionInformation.fat');
    } else { // filter using contains operator for string fields
      table.filter(filterValue, 'contains', 'nameMeal');
    }*/
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  private getRestau() {
    this.restauService.getAllRestaurants().subscribe(
      (data: Restaurant[]) => {
        this.restaurant = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openNew() {
    this.rrestaurant = {};
    this.submitted = false;
    this.restDialog= true;
  }
  hideDialog() {
    this.restDialog = false;
    this.submitted = false;
  }
  hideeditDialog() {
    this.erestDialog = false;
    this.esubmitted = false;
  }
  addrestau(){
    this.restauService.addRestaurant(this.rrestaurant)
      .subscribe(
        (restau: Restaurant) => {
          console.log(`meal ${restau.idRestau} created successfully`);
          // do something else, e.g. navigate to the menu list page
        },
        (error) => console.error(error)
      );

  }
  saveRestau() {
    this.addrestau();
    this.hideDialog();
  }
  editrestau(){
    var editbody = {
      "idRestau": this.selectedrestau.idRestau,
      "nameRestau": this.selectedrestau.nameRestau,
      "phoneNumber":this.selectedrestau.phoneNumber,
      "email": this.selectedrestau.email,
      "adress": this.selectedrestau.adress,
      "archived": this.selectedrestau.archived
    }
    this.restauService.updateRestaurant(editbody).subscribe((data)=>{
      this.hideeditDialog();
    })

    console.log(this.selectedrestau);
  }
  editOpen(){
    this.errestaurant = {};
    this.esubmitted = false;
    this.erestDialog= true;

  }
  selectrestau (restau:any){
    this.selectedrestau = restau;
    this.editOpen()
    console.log(this.selectedrestau);

  }


}
