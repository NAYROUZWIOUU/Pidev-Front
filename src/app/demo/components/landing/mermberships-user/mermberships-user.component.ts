import { DatePipe } from '@angular/common';
import { Component ,OnInit,OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription, interval } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { RMembership } from 'src/app/models/rmembership';
import { RmembershipService } from 'src/app/services/Rmembership/rmembership.service';

@Component({
  selector: 'app-mermberships-user',
  templateUrl: './mermberships-user.component.html',
  styleUrls: ['./mermberships-user.component.css'],
  providers:[MessageService,DatePipe]
})
export class MermbershipsUserComponent implements OnInit, OnDestroy {

  private refreshSubscription!: Subscription;


  rmembershipDialog: boolean = false;
  rmembershipRenewDialog: boolean = false;
  rmembershipUpdateDialog: boolean = false;
  deletermembershipsDialog: boolean = false;
  rmembership: RMembership = {};
  rmemberships: RMembership[] = [];
  list!: RMembership[];
  idRmembership!: number;
  cols: any[] = [];
  selectedrmemberships: RMembership[] = [];
  rowsPerPageOptions = [5, 10, 20];

  submitted: boolean = false;
  messageService: any;



  constructor(public layoutService: LayoutService, public router: Router,private rs: RmembershipService,private datePipe: DatePipe) { }
  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }


  ngOnInit(): void {

    this.cols = [
      { field: 'rmembership', header: 'Rmembership' },
      { field: 'typemembership', header: 'TypeMembership' },
      { field: 'duration', header: 'Duration' },
      { field: 'startdate', header: 'Startdate' },
      { field: 'endDate', header: 'Enddate' },

  ];
    this.rs.getRmemberships().subscribe(rmemberships => {
      this.rmemberships = rmemberships;
    });

    this.refreshSubscription = interval(30000) // 30 seconds
    .subscribe(() => {
      location.reload();
    });

  }
  hideDialog() {
    this.rmembershipDialog = false;
    this.submitted = false;
}

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



  deleteRmembership(idRmembership: number) {
    if (confirm("do you really want to delete this item ?"))
    {
      this.rs.deleteRmembership(idRmembership).subscribe();

    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  openNew() {
    this.rmembership = {};
    this.submitted = false;
    this.rmembershipDialog = true;
}

deleteSelectedrmemberships() {
    this.deletermembershipsDialog = true;
}




///////////////

preEditrmembership(rmembership: RMembership) {
    this.rmembership = { ...rmembership };
    this.rmembershipUpdateDialog = true;
}

updateMembership() {
  const formattedDate = this.datePipe.transform(this.rmembership.startDate, 'yyyy-MM-dd HH:mm:ss');

  const myPayload = {
    typeMembership: this.rmembership.typeMembership,
    startDate: formattedDate,
    duration: this.rmembership.duration,
    id : this.rmembership.idRMembership
  };

  if (typeof myPayload.id !== 'undefined' && typeof myPayload.typeMembership !== 'undefined' && typeof myPayload.duration !== 'undefined') {
  this.rs.updateRmembership(myPayload.id,myPayload.startDate,myPayload.typeMembership,myPayload.duration).subscribe((res) => {
    console.log(res);
  });
}
}


hideRmembershipUpdateDialog() {
  this.rmembershipUpdateDialog = false;
  this.submitted = false;
}

PreRenewMembership(rmembership: RMembership) {
  this.rmembership = { ...rmembership };
  this.rmembershipRenewDialog = true;
}

renewMembership() {
  if (typeof this.rmembership.idRMembership !== 'undefined') {
  this.rs.renewRmembership(this.rmembership, this.rmembership.idRMembership).subscribe((res) => {
    console.log(res);
  });
}
}

hideRmembershipRenewDialog() {
  this.rmembershipRenewDialog = false;
  this.submitted = false;
}



}
