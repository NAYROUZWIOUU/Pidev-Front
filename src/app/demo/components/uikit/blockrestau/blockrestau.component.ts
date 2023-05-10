import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import {Meal} from "../../../../models/meal";
import {MealService} from "../../../../services/meal/meal.service";
import {Menu} from "../../../../models/menu";
import {BlockrestauService} from "../../../../services/blockrestau/blockrestau.service";
import {Blockrestau} from "../../../../models/blockrestau";
import {Restaurant} from "../../../../models/restaurant";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";


@Component({
    templateUrl: './blockrestau.component.html',
    providers: [MessageService, ConfirmationService]
})
export class BlockrestauComponent implements OnInit {

  public blocks: Blockrestau[] = [];
  rblocks: Blockrestau = {};
  restaurant: Restaurant = {};
  erblocks: Blockrestau = {};
  blockDialog: boolean = false;
  eblockDialog: boolean = false;
  submitted: boolean = false;
  esubmitted: boolean = false;
  selectedblock: Blockrestau = {};
  filteredbRestaurants: Blockrestau[] = [];
  blockrestau$: Observable<Blockrestau[]> | null = null;
  assigneDialog: boolean = false;

  @ViewChild('filter') filter!: ElementRef;

  constructor(private customerService: CustomerService, private productService: ProductService,
              private blockrestauService: BlockrestauService) {
  }

  ngOnInit() {
    this.filterArchivedblockrestau();
      this.getbr();

  }

  onGlobalFilter(table: Table, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    // check if filter value is a number
    /*if (!isNaN(+filterValue)) {
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
  */
  }

  private getbr() {
    this.blockrestauService.retrieveAllBlockRestau().subscribe(
      (data: Blockrestau[]) => {
        this.blocks = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openNew() {
    this.rblocks = {};
    this.submitted = false;
    this.blockDialog= true;
  }
  hideDialog() {
    this.blockDialog = false;
    this.submitted = false;
  }
  hideeditDialog() {
    this.eblockDialog = false;
    this.esubmitted = false;
  }
  addblock(){
    this.blockrestauService.addBlockRestau(this.rblocks)
      .subscribe(
        (block: Blockrestau) => {
          console.log(`block ${block.idBlock} created successfully`);
          // do something else, e.g. navigate to the menu list page
        },
        (error) => console.error(error)
      );

  }
  saveblock() {
    this.addblock();
    this.hideDialog();
  }
  editblock(){
    var editbody = {
      "idBlock": this.selectedblock.idBlock,
      "nameBlock": this.selectedblock.nameBlock,
      "tableNbr":this.selectedblock.tableNbr,
      "placement": this.selectedblock.placement,
      "archived": this.selectedblock.archived
    }
    this.blockrestauService.updateBlockRestau(editbody).subscribe((data)=>{
      this.hideeditDialog();
    })

    console.log(this.selectedblock);
  }
  editOpen(){
    this.erblocks = {};
    this.esubmitted = false;
    this.eblockDialog= true;

  }
  selectblock (block:any) {
    this.selectedblock = block;
    this.editOpen()
  }
  filterArchivedblockrestau() {
    this.blockrestauService.retrieveAllBlockRestau().pipe(
      map(blockrestau => blockrestau.filter(blockrestau => !blockrestau.archived))
    ).subscribe(filteredbRestaurants => {
      this.blockrestau$ = of(filteredbRestaurants);
      localStorage.setItem('filteredbRestaurants', JSON.stringify(filteredbRestaurants));
    });
  }
  assignBlockToRestau() {
    this.blockrestauService.assignBlockRtoRestaurant(this.selectedblock.idBlock,this.restaurant.idRestau)
      .subscribe(
        response => {
          console.log(response);
          // do something with the response if needed
        },
        error => {
          console.log('Error assigning block to restau: ', error);
          // handle the error if needed
        }
      );
  }
  openassigne(){
    this.submitted = false;
    this.assigneDialog = true;
  }


}
