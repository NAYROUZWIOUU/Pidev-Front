import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ClaimComponent} from "./claim.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {FileUploadModule} from "primeng/fileupload";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {RatingModule} from "primeng/rating";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {DialogModule} from "primeng/dialog";




@NgModule({
  declarations: [ClaimComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    FileUploadModule,
    ToastModule,ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    DatePipe
  ],
  exports:[ClaimComponent]
})
export class ClaimComponentModule { }
