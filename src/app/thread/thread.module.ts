import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CrudComponent } from '../demo/components/pages/crud/crud.component';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { DatePipe } from '@angular/common';
import {ThreadComponent} from "./thread.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [ThreadComponent],
  imports: [CommonModule,
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
    DatePipe],
  exports: [ThreadComponent,RouterModule]
})
export class ThreadComponentModule {
}
