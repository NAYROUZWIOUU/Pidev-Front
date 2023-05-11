import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthLoginInfo } from 'src/app/models/login-info';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { TokenStorageService } from 'src/app/services/tokenstorageservice/token-storage.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    form: any={};
  currentUser!: User;
  isLoginFailed =false;
  errorMessage = '';




    valCheck: string[] = ['remember'];

    password!: string;

    constructor(private authService: AuthService, private router: Router,private ts:TokenStorageService) { }

    login(){
        console.log(this.form.password)
        console.log(this.form.username)

        this.authService.login(new AuthLoginInfo(this.form.username, this.form.password))
        .subscribe(

    (data:any) =>{
      this.isLoginFailed = false;
      const id=this.ts.getId()+"";
    this.authService.getcurrentuser(id).subscribe((data:any) =>{
        this.currentUser = data;
    AppComponent.instance.setCurrentUser(this.currentUser);
    if (this.ts.getAuthorities()=="ROLE_ADMIN"){
      this.router.navigate(['/admin']);
    }else{
    this.router.navigate(['/']);
    }
  },
    (error:any) => {
      this.isLoginFailed = true;
    }
        )

    },
    (error:any) => {
      this.errorMessage = error.error.message;
      this.isLoginFailed = true;
    }
        )

    }
    getcurrentuser(){
        const id=this.ts.getId()+"";
        this.authService.getcurrentuser(id,).subscribe((r:any)=>{
          console.log(r);
        },(error:any) => console.log(error));

        }

        ngOnInit(): void {
        }



}
