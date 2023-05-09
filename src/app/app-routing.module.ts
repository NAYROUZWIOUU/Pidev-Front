import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { UserComponentComponent } from './user-component/user-component.component';
import { RmembershipComponent } from './rmembership-component/rmembership.component';
import {FoyerComponent} from "./foyer/foyer.component";
import {BlockfoyerComponent} from "./blockfoyer/blockfoyer.component";
import {WaitinglistComponent} from "./waitinglist/waitinglist.component";
import {DormfrontComponent} from "./demo/components/landing/dormfront/dormfront.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'users', component: UserComponentComponent},
                    { path: 'rmemberships', component: RmembershipComponent},
                    { path: 'foyer', component: FoyerComponent},
                    { path: 'blockfoyer', component:BlockfoyerComponent},
                    { path: 'waiting-list', component:WaitinglistComponent}




                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'landing/rmembership', loadChildren: () => import('./demo/components/landing/restaurant-Front/restauRoutingModule.module').then(m => m.RestauRoutingModule) },
          { path: 'landing/dorm', loadChildren: () => import('./demo/components/landing/dormfront/dormfrontrouting.module').then(m => m.DormfrontroutingModule) },

          { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
