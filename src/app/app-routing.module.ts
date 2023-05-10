import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { UserComponentComponent } from './user-component/user-component.component';
import { RmembershipComponent } from './rmembership-component/rmembership.component';
import {ClaimComponent} from "./claim-component/claim.component";
import {ForumComponent} from "./forum/forum.component";
import {ThreadComponent} from "./thread/thread.component";
import {ForumRoutingModule} from "./demo/components/landing/forum-front/forumRoutingModule";
import {ThreadRoutingModule} from "./demo/components/landing/thread-front/threadRoutingModule";
import {ThreadFrontComponent} from "./demo/components/landing/thread-front/thread-front.component";

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
                    { path: 'claims', component: ClaimComponent},
                    {path: 'forums', component: ForumComponent},
                    {path: 'threads/:thre', component: ThreadComponent}

                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'landing/rmembership', loadChildren: () => import('./demo/components/landing/restaurant-Front/restauRoutingModule.module').then(m => m.RestauRoutingModule) },
            {path:  'landing/claim',       loadChildren: () => import('./demo/components/landing/claim-front/claimRoutingModule').then(m=>m.claimRoutingModule)},
            {path:  'landing/forum',       loadChildren: () => import('./demo/components/landing/forum-front/forumRoutingModule').then(m=>m.ForumRoutingModule)},
            {path:  'landing/thread/:three',       loadChildren: () => import('./demo/components/landing/thread-front/threadRoutingModule').then(m=>m.ThreadRoutingModule)},
            { path: 'notfound', component: NotfoundComponent },



            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
