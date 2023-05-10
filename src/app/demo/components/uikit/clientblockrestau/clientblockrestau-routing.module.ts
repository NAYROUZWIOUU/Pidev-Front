import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientblockrestauComponent } from './clientblockrestau.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ClientblockrestauComponent }
	])],
	exports: [RouterModule]
})
export class ClientblockrestauRoutingModule { }
