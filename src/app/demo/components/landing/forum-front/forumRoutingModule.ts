import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DividerModule} from "primeng/divider";
import {StyleClassModule} from "primeng/styleclass";
import {ChartModule} from "primeng/chart";
import {PanelModule} from "primeng/panel";
import {ButtonModule} from "primeng/button";
import {RouterModule} from "@angular/router";
import {ForumFrontComponent} from "./forum-front.component";



@NgModule({
  imports: [
    CommonModule,
    DividerModule,
    StyleClassModule,
    ChartModule,
    PanelModule,
    ButtonModule,
    RouterModule.forChild([
      { path: '', component: ForumFrontComponent }
    ])],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
