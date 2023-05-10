import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-restaurant-front',
  templateUrl: './restaurant-front.component.html',
  styleUrls: ['./restaurant-front.component.css'],
  providers:[MessageService,DatePipe]
})
export class RestaurantFrontComponent {

  constructor(public layoutService: LayoutService, public router: Router) { }

}
