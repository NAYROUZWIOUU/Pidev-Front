import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RmembershipComponent } from './rmembership.component';
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


@NgModule({
  declarations: [RmembershipComponent],
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
  exports: [RmembershipComponent]
})
export class RmembershipComponentModule {
}
