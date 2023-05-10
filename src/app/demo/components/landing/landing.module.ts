import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { RestaurantFrontComponent } from './restaurant-Front/restaurant-front.component';
import {MenubarModule} from "primeng/menubar";

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    DividerModule,
    StyleClassModule,
    ChartModule,
    PanelModule,
    ButtonModule,
    MenubarModule
  ],
    declarations: [LandingComponent,RestaurantFrontComponent]
})
export class LandingModule { }
