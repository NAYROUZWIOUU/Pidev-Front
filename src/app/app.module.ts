import { NgModule } from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { RestaurantService } from './services/Restaurant/restaurant.service';
import { UsersService } from './services/Users/users.service';
import { UserComponentModule } from './user-component/user-component.module';
import { RmembershipComponentModule } from './rmembership-component/rmembership.module';
import { RmembershipService } from './services/Rmembership/rmembership.service';
import { RestauRoutingModule } from './demo/components/landing/restaurant-Front/restauRoutingModule.module';
import { FormsModule } from '@angular/forms';
import { FoyerModule} from "./foyer/foyer.module";
import {WaitingListService} from "./services/WaitingList/waitinglist.service";
import { MessageService } from 'primeng/api';
import {WaitinglistModule} from "./waitinglist/waitinglist.module";
import {StyleClassModule} from "primeng/styleclass";
import {DividerModule} from "primeng/divider";
import {TableModule} from "primeng/table";
import {DormRoutingModuleModule} from "./demo/components/landing/dorm-Front/dormRoutingModule.module";
import {DormFrontComponent} from "./demo/components/landing/dorm-Front/dorm-front.component";
import { ClaimComponent } from './claim-component/claim.component';
import {ClaimComponentModule} from "./claim-component/claim.module";
import {ClaimService} from "./services/Claim/claim.service";
import {ForumService} from "./services/Forum/forum.service";
import {ThreadService} from "./services/Thread/thread.service";
import {ReactionService} from "./services/Reaction/reaction.service";
import { ForumComponent } from './forum/forum.component';
import {ForumComponentModule} from "./forum/forum.module";
import { ThreadComponent } from './thread/thread.component';
import {ThreadComponentModule} from "./thread/thread.module";
import {claimRoutingModule} from "./demo/components/landing/claim-front/claimRoutingModule";
import {ThreadRoutingModule} from "./demo/components/landing/thread-front/threadRoutingModule";

@NgModule({
  declarations: [
    AppComponent, NotfoundComponent,DormFrontComponent
  ],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    UserComponentModule,
    RmembershipComponentModule,
    RestauRoutingModule,
    FormsModule,
    FoyerModule,
    WaitinglistModule,
    StyleClassModule,
    DividerModule,
    CommonModule,
    DormRoutingModuleModule,
    TableModule,
        ClaimComponentModule,
        ForumComponentModule,
        ThreadComponentModule,
      claimRoutingModule,
      ThreadRoutingModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CountryService, CustomerService, EventService, IconService, NodeService,
    PhotoService, ProductService,RestaurantService,UsersService,RmembershipService,WaitingListService,MessageService,
    ClaimService,ForumService,
      ThreadService,ReactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
