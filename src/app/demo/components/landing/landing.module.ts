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
import { ForumFrontComponent } from './forum-front/forum-front.component';
import {ClaimFrontComponent} from "./claim-front/claim-front.component";
import {ReactiveFormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import { ThreadFrontComponent } from './thread-front/thread-front.component';

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        PanelModule,
        ButtonModule,
        ReactiveFormsModule,
        PaginatorModule
    ],
    declarations: [LandingComponent,RestaurantFrontComponent,ClaimFrontComponent, ForumFrontComponent, ThreadFrontComponent]
})
export class LandingModule { }
