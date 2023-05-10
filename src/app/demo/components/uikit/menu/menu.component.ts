import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../../../services/menu/menu.service";
import {Menu} from "../../../../models/menu";
import { MessageService, ConfirmationService } from 'primeng/api';


@Component({

  templateUrl: './menu.component.html',
  providers: [MessageService, ConfirmationService]

})
export class MenuComponent implements OnInit {

  cols: any[] = [];
  menus: Menu[] = [];
  rmenu: Menu = {};
  ermenu: Menu = {};
  menuDialog: boolean = false;
  emenuDialog: boolean = false;
  submitted: boolean = false;
  esubmitted: boolean = false;
  deletemenuDialog: boolean = false;
  selectedmenu: Menu = {};
  dselectedmenu: Menu = {};
  rowVisibility: { [key: number]: boolean } = {};

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    const savedRowVisibility = localStorage.getItem('rowVisibility');
    if (savedRowVisibility) {
      this.rowVisibility = JSON.parse(savedRowVisibility);
    }

    this.cols = [
      { field: 'idMenu', header: 'idMenu' },
      { field: 'dateMenu', header: 'dateMenu' },
      { field: 'priceMenu', header: 'priceMenu' },
      { field: 'typeMenu', header: 'typeMenu' },
      { field: 'restaurant', header: 'restaurant' },
      { field: 'action', header: 'action' }

    ];
    this.menuService.getAllMenus().subscribe((data: Menu[]) => {
      console.log(data)
      this.menus = data;
    });
  }
  openNew() {
    this.rmenu = {};
    this.submitted = false;
    this.menuDialog= true;
  }
  deleteSelectedmenu() {
    this.deletemenuDialog = true;
  }
  saveMenu() {
    this.getAllMenus();
    this.hideDialog();

    };
  hideDialog() {
    this.menuDialog = false;
    this.submitted = false;
  }
  hideeditDialog(){
    this.emenuDialog = false;
    this.esubmitted = false;
  }
  getAllMenus(){
    this.menuService.addMenu(this.rmenu)
      .subscribe(
        (menu: Menu) => {
          console.log(`Menu ${menu.idMenu} created successfully`);
          // do something else, e.g. navigate to the menu list page
        },
        (error) => console.error(error)
      );

  }
  selectMenu (menu:any){
    this.selectedmenu = menu;
    this.editOpen()

  }
  deleteselectMenu(){
    var editbody = {
      "idMenu": this.dselectedmenu.idMenu
    }
    this.menuService.removeMenu(editbody)
      .subscribe(
        response => {
          console.log(response);
          // refresh the list of menus after successful deletion
          this.getAllMenus();
        },
        error => {
          console.log(error);
        }
      );
  }
  editOpen(){
    this.ermenu = {};
    this.esubmitted = false;
    this.emenuDialog= true;

  }

  editMenu(){
    var editbody = {
      "idMenu": this.selectedmenu.idMenu,
      "priceMenu": this.selectedmenu.priceMenu,
      "typeMenu": this.selectedmenu.typeMenu,
      "dateMenu": this.selectedmenu.dateMenu
    }
    this.menuService.updateMenu(editbody).subscribe((data)=>{
      this.getAllMenus();
      this.hideeditDialog();
    })

    console.log(this.selectedmenu);
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
