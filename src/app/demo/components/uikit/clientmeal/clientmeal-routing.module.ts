import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientmealComponent } from './clientmeal.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ClientmealComponent }
	])],
	exports: [RouterModule]
})
export class ClientmealRoutingModule { }
