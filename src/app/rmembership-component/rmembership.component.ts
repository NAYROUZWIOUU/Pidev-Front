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

  list!: RMembership[];
  idRmembership!: number;
  cols: any[] = [];

  rmembershipDialog: boolean = false;

  deletermembershipDialog: boolean = false;

  deletermembershipsDialog: boolean = false;

  rmemberships: RMembership[] = [];

  rmembership: RMembership = {};

  selectedrmemberships: RMembership[] = [];

  submitted: boolean = false;
  messageService: any;



  rowsPerPageOptions = [5, 10, 20];


  constructor(private rs: RmembershipService,private datePipe: DatePipe) {}

  ngOnInit(): void {

    this.cols = [
      { field: 'rmembership', header: 'Rmembership' },
      { field: 'typemembership', header: 'TypeMembership' },
      { field: 'duration', header: 'Duration' },
      { field: 'startdate', header: 'Startdate' },
      { field: 'endDate', header: 'Enddate' }
  ];
    this.rs.getRmemberships().subscribe(rmemberships => {
      this.rmemberships = rmemberships;
    });


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

preEditrmembership(rmembership: RMembership) {
    this.rmembership = { ...rmembership };
    this.rmembershipDialog = true;
}



confirmDeleteSelected() {
    this.deletermembershipsDialog = false;
    this.rmemberships = this.rmemberships.filter(val => !this.selectedrmemberships.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'rmemberships Deleted', life: 3000 });
    this.selectedrmemberships = [];

}

// confirmDelete() {
//     this.deletermembershipDialog = false;
//     this.rmemberships = this.rmemberships.filter(val => val.idRMembership !== this.rmembership.idRMembership);
//     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'rmembership Deleted', life: 3000 });
//     this.rmembership = {};

// }

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



  // this.rmembership.idRMembership = this.createId();
  // this.rmemberships.push(this.rmembership);
  // this.messageService.add({
  //   severity: 'success',
  //   summary: 'Successful',
  //   detail: 'rmembership Created',
  //   life: 3000
  // });

  // this.submitted = true;

  // if (this.rmembership.typeMembership?.trim()) {
  //   if (this.rmembership.idRMembership) {
  //     this.rmemberships[this.findIndexById(this.rmembership.idRMembership)] = this.rmembership;
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Successful',
  //       detail: 'rmembership Updated',
  //       life: 3000
  //     });
  //   } else {
  //     this.rmembership.idRMembership = this.createId();
  //     this.rmemberships.push(this.rmembership);
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Successful',
  //       detail: 'rmembership Created',
  //       life: 3000
  //     });
  //   }

  //   this.rmemberships = [...this.rmemberships];
  //   this.rmembershipDialog = false;
  //   this.rmembership = new RMembership();
  // }
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
}
