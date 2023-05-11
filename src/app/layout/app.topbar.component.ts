import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AppComponent } from '../app.component';
import { AuthService } from '../services/authservice/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{
    static instance: AppTopBarComponent;
    currentUser!:any;
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;


    constructor(public layoutService: LayoutService, private authService: AuthService, private router:Router) { }

    ngOnInit() {
        AppTopBarComponent.instance = this;
        this.currentUser = AppComponent.instance.getCurrentUser();
        console.log(this.currentUser);
      }

      logout() {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}
