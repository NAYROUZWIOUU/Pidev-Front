import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserComponentComponent } from './user-component.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserComponentComponent],
  imports: [CommonModule, HttpClientModule,FormsModule],
  exports: [UserComponentComponent]
})
export class UserComponentModule {}
