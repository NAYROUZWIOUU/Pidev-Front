import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RestaurantComponent } from './restaurant.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RestaurantComponent }
	])],
	exports: [RouterModule]
})
export class RestaurantRoutingModule { }
