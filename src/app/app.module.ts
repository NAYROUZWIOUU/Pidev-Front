import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
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

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        UserComponentModule,
        RmembershipComponentModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,RestaurantService,UsersService,RmembershipService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
