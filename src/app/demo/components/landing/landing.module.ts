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
import { CreateMembershipComponent } from './create-membership/create-membership.component';
import { CreateMembershipModule } from './create-membership/create-membership.module';

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        DividerModule,
        StyleClassModule,
        CreateMembershipModule,
        ChartModule,
        PanelModule,
        ButtonModule
    ],
    declarations: [LandingComponent,RestaurantFrontComponent]
})
export class LandingModule { }
