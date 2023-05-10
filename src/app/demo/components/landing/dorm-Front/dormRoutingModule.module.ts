import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from '../landing-routing.module';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import {DormFrontComponent} from "./dorm-front.component";
import {TableModule} from "primeng/table";
import {BlockfoyerModule} from "../../../../blockfoyer/blockfoyer.module";

@NgModule({
  imports: [
    CommonModule,
    DividerModule,
    StyleClassModule,
    ChartModule,
    PanelModule,
    ButtonModule,
    TableModule,
    BlockfoyerModule,
    RouterModule.forChild([
      { path: '', component: DormFrontComponent }
    ])],
  exports: [RouterModule]
})
export class DormRoutingModuleModule { }
