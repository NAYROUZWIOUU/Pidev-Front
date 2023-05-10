import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientmenuComponent } from './clientmenu.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ClientmenuComponent }
	])],
	exports: [RouterModule]
})
export class ClientmenuRoutingModule { }
