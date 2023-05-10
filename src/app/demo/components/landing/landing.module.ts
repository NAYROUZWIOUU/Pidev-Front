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
import {MenubarModule} from "primeng/menubar";
import { ForumFrontComponent } from './forum-front/forum-front.component';
import {ClaimFrontComponent} from "./claim-front/claim-front.component";
import {ReactiveFormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import { ThreadFrontComponent } from './thread-front/thread-front.component';
import {FieldsetModule} from "primeng/fieldset";

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
        ReactiveFormsModule,
        PaginatorModule,
        FieldsetModule,
      MenubarModule
    ],
    declarations: [LandingComponent,RestaurantFrontComponent,ClaimFrontComponent, ForumFrontComponent, ThreadFrontComponent]
})
export class LandingModule { }
