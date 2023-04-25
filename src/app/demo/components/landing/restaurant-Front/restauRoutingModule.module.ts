import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RestaurantFrontComponent } from './restaurant-front.component';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from '../landing-routing.module';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
      CommonModule,
      DividerModule,
      StyleClassModule,
      ChartModule,
      PanelModule,
      ButtonModule,
      RouterModule.forChild([
        { path: '', component: RestaurantFrontComponent }
    ])],
    exports: [RouterModule]
})
export class RestauRoutingModule { }
