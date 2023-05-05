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
import { MermbershipsUserComponent } from './mermberships-user/mermberships-user.component';
import { MermbershipsUserModule } from './mermberships-user/mermberships-user.module';
import { FidelitycarduserComponent } from './fidelitycarduser/fidelitycarduser.component';
import { FidelitycarduserModule } from './fidelitycarduser/fidelitycarduser.module';

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        DividerModule,
        StyleClassModule,
        CreateMembershipModule,
        ChartModule,
        PanelModule,
        ButtonModule,
        MermbershipsUserModule,
        FidelitycarduserModule
    ],
    declarations: [LandingComponent,RestaurantFrontComponent]
})
export class LandingModule { }
