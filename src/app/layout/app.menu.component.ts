import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Restaurant Managment',///uikit/floatlabel
                items: [
                    { label: 'Restaurant Memberships', icon: 'pi pi-fw pi-check-square', routerLink: ['/rmemberships'] },
                    { label: 'Fidelity Card', icon: 'pi pi-fw pi-id-card', routerLink: ['fidelitycard'] },
                    { label: 'Restaurant', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Blocks', icon: 'pi pi-fw pi-sitemap', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Menus', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Meals', icon: 'pi pi-fw pi-caret-up', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Rewards', icon: 'pi pi-fw pi-gift', routerLink: ['/reward'] }
                ]
            },
            {
                label: 'Dorm Managment',
                items: [
                    { label: 'Dorm Memberships', icon: 'pi pi-fw pi-check-square', routerLink: ['/blocks'], badge: 'NEW' },
                    { label: 'Dorm', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Blocks', icon: 'pi pi-fw pi-sitemap', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                    { label: 'Rooms', icon: 'pi pi-fw pi-briefcase', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                    { label: 'Waiting List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/invalidstate'] }
                ]
            },
            {
                label: 'Forum Managment',
                items: [
                    { label: 'Forum', icon: 'pi pi-fw pi-comments', routerLink: ['/utilities/icons'] },
                    { label: 'Thread', icon: 'pi pi-fw pi-comment', routerLink: ['/utilities/icons'] }
                ]
            },
            {
              label: 'Claim Managment',
              items: [
                  { label: 'Claim', icon: 'pi pi-fw pi-comment', routerLink: ['/utilities/icons'] }
              ]
          },
            {
                label: 'User Managment',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Users', icon: 'pi pi-fw pi-user-edit', routerLink: ['/users']}
                ]
            }
        ];
    }
}
