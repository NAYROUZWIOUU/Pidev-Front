import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-restaurant-front',
  templateUrl: './restaurant-front.component.html',
  styleUrls: ['./restaurant-front.component.css']
})
export class RestaurantFrontComponent {

  constructor(public layoutService: LayoutService, public router: Router) { }

}
