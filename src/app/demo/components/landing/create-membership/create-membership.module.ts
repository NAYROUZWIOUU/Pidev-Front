import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { CreateMembershipComponent } from './create-membership.component';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [CreateMembershipComponent],
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
    DatePipe,
    RouterModule,
    StyleClassModule,
    CalendarModule
  ],exports:[CreateMembershipComponent,RouterModule]
})
export class CreateMembershipModule { }
