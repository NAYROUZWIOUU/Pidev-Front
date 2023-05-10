import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { UserComponentComponent } from './user-component/user-component.component';
import { RmembershipComponent } from './rmembership-component/rmembership.component';
import { EmptyDemoComponent } from './demo/components/pages/empty/emptydemo.component';
import { FidelityCardComponent } from './fidelity-card-component/fidelity-card-component.component';
import { RewardComponent } from './reward/reward.component';
import { CreateMembershipComponent } from './demo/components/landing/create-membership/create-membership.component';
import { MermbershipsUserComponent } from './demo/components/landing/mermberships-user/mermberships-user.component';
import { FidelitycarduserComponent } from './demo/components/landing/fidelitycarduser/fidelitycarduser.component';
import {UIkitRoutingModule} from "./demo/components/uikit/uikit-routing.module";
import {ClientmealRoutingModule} from "./demo/components/uikit/clientmeal/clientmeal-routing.module";
import {ClientmealModule} from "./demo/components/uikit/clientmeal/clientmeal.module";
import {ClientmenuModule} from "./demo/components/uikit/clientmenu/clientmenu.module";
import {ClientmenuRoutingModule} from "./demo/components/uikit/clientmenu/clientmenu-routing.module";
import {ClientrestaurantModule} from "./demo/components/uikit/clientrestaurant/clientrestaurant.module";
import {ClientrestaurantRoutingModule} from "./demo/components/uikit/clientrestaurant/clientrestaurant-routing.module";
import {ClientblockrestauModule} from "./demo/components/uikit/clientblockrestau/clientblockrestau.module";
import {ClientblockrestauRoutingModule} from "./demo/components/uikit/clientblockrestau/clientblockrestau-routing.module";
import {FoyerComponent} from "./foyer/foyer.component";
import {BlockfoyerComponent} from "./blockfoyer/blockfoyer.component";
import {WaitinglistComponent} from "./waitinglist/waitinglist.component";
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
                    { path: 'clientmeal', loadChildren: () => import('./demo/components/uikit/clientmeal/clientmeal.module').then(m => m.ClientmealModule) },
                    { path: 'clientmenu', loadChildren: () => import('./demo/components/uikit/clientmenu/clientmenu.module').then(m => m.ClientmenuModule) },
                    { path: 'clientrestaurant', loadChildren: () => import('./demo/components/uikit/clientrestaurant/clientrestaurant.module').then(m => m.ClientrestaurantModule) },
                    { path: 'clientblockrestau', loadChildren: () => import('./demo/components/uikit/clientblockrestau/clientblockrestau.module').then(m => m.ClientblockrestauModule) },
                    { path: 'users', component: UserComponentComponent},
                    { path: 'rmemberships', component: RmembershipComponent},
                    { path: 'empty', component: EmptyDemoComponent},
                    { path: 'fidelitycard' , component: FidelityCardComponent},
                    { path: 'reward' , component: RewardComponent},
                    { path: 'foyer', component: FoyerComponent},
                    { path: 'blockfoyer', component:BlockfoyerComponent},
                    { path: 'waiting-list', component:WaitinglistComponent},
                    { path: 'claims', component: ClaimComponent},
                    {path: 'forums', component: ForumComponent},
                    {path: 'threads/:thre', component: ThreadComponent}

                ]
            },
            
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'landing/rmembership', loadChildren: () => import('./demo/components/landing/restaurant-Front/restauRoutingModule.module').then(m => m.RestauRoutingModule) },
            { path: 'landing/rmembership/add',component:CreateMembershipComponent },
            { path: 'landing/rmembership/myMemberships',component:MermbershipsUserComponent},
            { path: 'landing/rmembership/myfc',component:FidelitycarduserComponent},
            { path: 'landing/clientmeal', loadChildren: () => import('./demo/components/uikit/clientmeal/clientmeal-routing.module').then(m => m.ClientmealRoutingModule) },
            { path: 'landing/clientmenu', loadChildren: () => import('./demo/components/uikit/clientmenu/clientmenu-routing.module').then(m => m.ClientmenuRoutingModule) },
            { path: 'landing/clientrestaurant', loadChildren: () => import('./demo/components/uikit/clientrestaurant/clientrestaurant-routing.module').then(m => m.ClientrestaurantRoutingModule) },
            { path: 'landing/clientblockrestau', loadChildren: () => import('./demo/components/uikit/clientblockrestau/clientblockrestau-routing.module').then(m => m.ClientblockrestauRoutingModule) },
            { path: 'landing/dormfront', loadChildren: () => import('./demo/components/landing/dorm-Front/dormRoutingModule.module').then(m => m.DormRoutingModuleModule) },
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
