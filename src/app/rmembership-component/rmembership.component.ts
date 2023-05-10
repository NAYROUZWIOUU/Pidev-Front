import { Component ,OnInit } from '@angular/core';
import { RMembership } from '../models/rmembership';
import { RmembershipService } from '../services/Rmembership/rmembership.service';
import { MessageService } from 'primeng/api';
import { Duration } from '../models/duration';
import { TypeMembership } from '../models/typeMembership';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';



@Component({
  selector: 'app-rmembership',
  templateUrl: './rmembership.component.html',
  styleUrls: ['./rmembership.component.css'],
  providers: [MessageService,DatePipe]
})
export class RmembershipComponent implements OnInit{

  nbvalides!: number;
  renewalRate!: number;


  stats: any;

  list!: RMembership[];
  idRmembership!: number;
  cols: any[] = [];

  rmembershipDialog: boolean = false;

  rmembershipRenewDialog: boolean = false;

  rmembershipUpdateDialog: boolean = false;

  rmembershipVerifDialog: boolean = false;

  deletermembershipDialog: boolean = false;

  deletermembershipsDialog: boolean = false;

  validatemembershipsDialog: boolean = false;

  unValidatemembershipsDialog: boolean = false;

  rmemberships: RMembership[] = [];

  rmembership: RMembership = {};

  selectedrmemberships: RMembership[] = [];

  submitted: boolean = false;




  rowsPerPageOptions = [5, 10, 20];



  startDate!: any;
  endDate!: any;

  constructor(private rs: RmembershipService,private datePipe: DatePipe, private messageService: MessageService) {}

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

    this.getStats();

  }



  deleteRmembership(idRmembership: number) {
    if (confirm("do you really want to delete this item ?"))
    {
      this.rs.deleteRmembership(idRmembership).subscribe();

    }
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




preValidatemembership(rmembership: RMembership) {
  this.rmembership = { ...rmembership };
  this.validatemembershipsDialog = true;
}

validatemembership() {
  if (typeof this.rmembership.idRMembership !== 'undefined') {
  this.rs.validateRMembership(this.rmembership.idRMembership).subscribe((res) => {
    console.log(res);
  });
}
}

hideRmembershipValidateDialog() {
  this.validatemembershipsDialog = false;
  this.submitted = false;
}



preUnvalidatemembership(rmembership: RMembership) {
  this.rmembership = { ...rmembership };
  this.unValidatemembershipsDialog = true;
}

unValidatemembership() {
  if (typeof this.rmembership.idRMembership !== 'undefined') {
  this.rs.unValidateRMembership(this.rmembership.idRMembership).subscribe((res) => {
    console.log(res);
  });
}
}

hideRmembershipUnvalidateDialog() {
  this.unValidatemembershipsDialog = false;
  this.submitted = false;
}




confirmDeleteSelected() {
    this.deletermembershipsDialog = false;
    this.rmemberships = this.rmemberships.filter(val => !this.selectedrmemberships.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'rmemberships Deleted', life: 3000 });
    this.selectedrmemberships = [];

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
  });
}


findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.rmemberships.length; i++) {
        if (this.rmemberships[i].idRMembership === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): number {
    const min = 0;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
}


onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}


/////////
getGuestMemberships(){
  this.rs.getGuestMemberships().subscribe(rmemberships => {
    this.rmemberships = rmemberships;
  });
}

getTeacherMemberships(){
  this.rs.getTeacherMemberships().subscribe(rmemberships => {
    this.rmemberships = rmemberships;
  });
}

getStudentMemberships(){
  this.rs.getStudentMemberships().subscribe(rmemberships => {
    this.rmemberships = rmemberships;
  });
}

getALLMemberships(){
  this.rs.getRmemberships().subscribe(rmemberships => {
    this.rmemberships = rmemberships;
  });
}



getValidRMemberships(startDate: any, endDate: any): void {
  const formattedstartDate: string = this.datePipe.transform(startDate,'yyyy-MM-dd HH:mm:ss')!;
  const formattedendDate: string = this.datePipe.transform(endDate,'yyyy-MM-dd HH:mm:ss')!;

  this.rs.getValidRMemberships(formattedstartDate, formattedendDate)
    .subscribe(rmemberships => {
      this.rmemberships = rmemberships;
      if (this.rmemberships.length === 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'No valid memberships found.'
        });
      }
    });
}



getRenewalRate(startDate: any, endDate: any) {
  const formattedstartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd HH:mm:ss');
  const formattedendDate = this.datePipe.transform(endDate, 'yyyy-MM-dd HH:mm:ss');

  this.rs.getRenewalRate(formattedstartDate, formattedendDate)
    .subscribe(response => {
      this.renewalRate = response['renewalRate'];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Renewal rate : ${this.renewalRate}`
      });
    });
}



nbRMembershipValides(startDate: any, endDate: any) {
  const formattedstartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd HH:mm:ss');
  const formattedendDate = this.datePipe.transform(endDate, 'yyyy-MM-dd HH:mm:ss');

  if (formattedstartDate && formattedendDate) {
    this.rs.getNbRMembershipValides(formattedstartDate, formattedendDate)
      .subscribe(response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Number of RMembership Valides: ${response}`,
        });
      });
  } else {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Invalid dates'
    });
  }
}




getStats(): void {
  this.rs.getStatsAboutUsersMemberships().subscribe(
    response => {
      this.stats = response;
      console.log(this.stats);
    },
    error => {
      console.log(error);
    }
  );
}




}

