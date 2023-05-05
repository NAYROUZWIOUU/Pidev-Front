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
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { FidelityCardComponent } from 'src/app/fidelity-card-component/fidelity-card-component.component';
import { FidelitycarduserComponent } from './fidelitycarduser.component';



@NgModule({
  declarations: [FidelitycarduserComponent],
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
    StyleClassModule
  ],exports:[FidelitycarduserComponent,RouterModule]
})
export class FidelitycarduserModule { }
