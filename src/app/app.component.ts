import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './services/authservice/auth.service';
import { TokenStorageService } from './services/tokenstorageservice/token-storage.service';
import { UserService } from './services/user/user.service';
import { DOCUMENT } from '@angular/common';
import { User } from './models/User';
import { AppTopBarComponent } from './layout/app.topbar.component';
import { AppLayoutComponent } from './layout/app.layout.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    public static instance: AppComponent;

    gettingUser: boolean = true;
    currentUser!: any;
    constructor(
      private authService: AuthService,
      private ts:TokenStorageService,
      private userService:UserService,
      private renderer: Renderer2,
      @Inject(DOCUMENT) document: any,
      private primengConfig: PrimeNGConfig
    )
    {
      AppComponent.instance = this;
    }
    getCurrentUser(): User {
      return this.currentUser;
    }
    setCurrentUser(user:User){
        this.currentUser = user;
        if(AppTopBarComponent.instance != null) {
            AppTopBarComponent.instance.currentUser = this.currentUser

        }
        if(AppLayoutComponent.instance != null) {
            AppLayoutComponent.instance.currentUser = this.currentUser

        };

      }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.gettingUser = true;
    if(this.ts.getId()==null) {
      this.gettingUser = false;
    } else {
    this.authService.getcurrentuser(this.ts.getId()+"").subscribe((data:any) =>{
    this.setCurrentUser(data);
    this.gettingUser = false;
    },
    (error:any) => {
      this.gettingUser = false;
    })

  }
    }
}
