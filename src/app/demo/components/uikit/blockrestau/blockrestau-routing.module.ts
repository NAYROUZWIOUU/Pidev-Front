import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlockrestauComponent } from './blockrestau.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: BlockrestauComponent }
	])],
	exports: [RouterModule]
})
export class BlockrestauRoutingModule { }
