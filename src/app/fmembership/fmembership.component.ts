import { Component, OnInit } from '@angular/core';
import { FmembershipService } from '../services/Fmembership/fmembership.service';
import { Fmembership } from '../models/fmembership';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
import { UsersService } from '../services/Users/users.service';

@Component({
  selector: 'app-fmembership',
  templateUrl: './fmembership.component.html',
  styleUrls: ['./fmembership.component.css'],
  providers: [MessageService, DatePipe],
})
export class FmembershipComponent implements OnInit {
  list!: Fmembership[];
  idFmembership!: number;
  cols: any[] = [];

  fmembershipDialog: boolean = false;

  deletefmembershipDialog: boolean = false;

  deletefmembershipsDialog: boolean = false;

  fmembershipsUpdateDialog: boolean = false;

  fmemberships: Fmembership[] = [];
  listuser!: any;
  listfoyer!: any;
  userid!: number;
  foyerid!: number;
  fmembership: Fmembership = {};

  selectedFmemberships: Fmembership[] = [];

  submitted: boolean = false;
  messageService: any;

  idUser?: any;
  idRoom?: any;

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private fs: FmembershipService,
    private datePipe: DatePipe,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'fmembership', header: 'Fmembership' },
      { field: 'duration', header: 'Duration' },
      { field: 'startDate', header: 'startDate' },
      { field: 'price', header: 'Price' },
      { field: 'room', header: 'Room' },
      { field: 'user', header: 'User' },
    ];
    this.fs.getFmemberships().subscribe((fmemberships) => {
      this.fmemberships = fmemberships;
      console.log(this.fmemberships);
    });
    this.usersService.getUsers().subscribe((data) => {
      this.listuser = data;
      console.log(data);
    });
    this.fs.getfoyers().subscribe((data) => {
      this.listfoyer = data;
      console.log(data);
    });
  }

  openNew() {
    this.fmembership = {};
    this.submitted = false;
    this.fmembershipDialog = true;
  }

  deleteSelectedfmemberships() {
    this.deletefmembershipsDialog = true;
  }

  confirmDeleteSelected() {
    this.deletefmembershipsDialog = false;
    this.fmemberships = this.fmemberships.filter(
      (val) => !this.selectedFmemberships.includes(val)
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'fmemberships Deleted',
      life: 3000,
    });
    this.selectedFmemberships = [];
  }

  hideDialog() {
    this.fmembershipDialog = false;
    this.submitted = false;
  }

  savefmembership() {
    this.fs
      .addFMembership(this.fmembership, this.userid, this.foyerid)
      .subscribe((res) => {
        console.log(res);
      });
      window.location.reload();
  }

  deleteFmembership(idFmembership: number) {
    if (confirm('do you really want to delete this item ?')) {
      this.fs.deleteFmembership(idFmembership).subscribe();
    }
    window.location.reload();
  }

  preEditfmembership(fmembership: Fmembership) {
    this.fmembership = { ...fmembership };
    this.fmembershipsUpdateDialog = true;
  }

  updateMembership() {
    this.fs.updateFMembership(this.fmembership).subscribe((res) => {
      console.log(res);
    });
    window.location.reload();
  }

  hideFmembershipUpdateDialog() {
    this.fmembershipsUpdateDialog = false;
    this.submitted = false;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.fmemberships.length; i++) {
      if (this.fmemberships[i].idFMembership === id) {
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
