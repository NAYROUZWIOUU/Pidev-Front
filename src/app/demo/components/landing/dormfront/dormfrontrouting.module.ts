import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DormfrontComponent} from "./dormfront.component";
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from '../landing-routing.module';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';


@NgModule({

  imports: [
    CommonModule,
    DividerModule,
    StyleClassModule,
    ChartModule,
    PanelModule,
    FormsModule,
    ButtonModule,
    RouterModule.forChild([
      { path: '', component: DormfrontComponent }
    ])],
  exports: [RouterModule]
})
export class DormfrontroutingModule { }
