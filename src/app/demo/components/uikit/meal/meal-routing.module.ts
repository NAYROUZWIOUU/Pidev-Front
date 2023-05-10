import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MealComponent } from './meal.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MealComponent }
	])],
	exports: [RouterModule]
})
export class MealRoutingModule { }
