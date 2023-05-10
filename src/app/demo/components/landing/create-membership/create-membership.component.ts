import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { RMembership } from 'src/app/models/rmembership';
import { RmembershipService } from 'src/app/services/Rmembership/rmembership.service';

@Component({
  selector: 'app-create-membership',
  templateUrl: './create-membership.component.html',
  styleUrls: ['./create-membership.component.css'],
  providers:[MessageService,DatePipe]
})
export class CreateMembershipComponent {
  rmembership: RMembership = {};
  constructor(public layoutService: LayoutService, public router: Router,private rs: RmembershipService,private datePipe: DatePipe) { }




  saveRMembership() {
    // Format the start date using the date pipe
    const formattedDate = this.datePipe.transform(this.rmembership.startDate, 'yyyy-MM-dd HH:mm:ss');

    // Create a new object with the formatted date and the other form values
    const myPayload = {
      typeMembership: this.rmembership.typeMembership,
      startDate: formattedDate,
      duration: this.rmembership.duration
    };

    // Send the new object to the backend API using an HTTP POST request
    this.rs.addRmembership(myPayload).subscribe((res) => {
      console.log(res);
    });}


}
