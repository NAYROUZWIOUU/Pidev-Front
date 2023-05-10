import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit{
  tieredItems: MenuItem[] = [];

    constructor(public layoutService: LayoutService, public router: Router) { }

  ngOnInit(): void {


    this.tieredItems =[
      {
        label: 'Shipments',
        icon: 'pi pi-fw pi-envelope',
        items: [
          {
            label: 'Tracker',
            icon: 'pi pi-fw pi-compass',


          },
          {
            label: 'Map',
            icon: 'pi pi-fw pi-map-marker',

          },
          {
            label: 'Manage',
            icon: 'pi pi-fw pi-pencil'
          }
        ]
      }

    ]


  }
  goToMeal() {
    this.router.navigateByUrl('/landing/clientmeal');
  }

  goToMenu() {
    this.router.navigateByUrl('/landing/clientmenu');
  }

}
