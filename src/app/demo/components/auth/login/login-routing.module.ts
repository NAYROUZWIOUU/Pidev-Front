import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthenticationGuard } from 'src/app/guard/authentication.guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginComponent, canActivate : [AuthenticationGuard] }
    ])],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
