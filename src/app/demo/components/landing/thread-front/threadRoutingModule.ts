import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DividerModule} from "primeng/divider";
import {StyleClassModule} from "primeng/styleclass";
import {ChartModule} from "primeng/chart";
import {PanelModule} from "primeng/panel";
import {ButtonModule} from "primeng/button";
import {RouterModule} from "@angular/router";
import {ForumFrontComponent} from "../forum-front/forum-front.component";
import {ThreadFrontComponent} from "./thread-front.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DividerModule,
    StyleClassModule,
    ChartModule,
    PanelModule,
    ButtonModule,
    RouterModule.forChild([
      { path: '', component: ThreadFrontComponent }
    ])
  ]

})
export class ThreadRoutingModule { }
