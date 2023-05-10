import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientrestaurantComponent } from './clientrestaurant.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ClientrestaurantComponent }
	])],
	exports: [RouterModule]
})
export class ClientrestaurantRoutingModule { }
