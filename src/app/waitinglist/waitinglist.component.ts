import { Component, OnInit } from '@angular/core';
import {WaitingListService} from "../services/WaitingList/waitinglist.service";
import {WaitingList} from "../models/waitinglist";
import {Table} from "primeng/table";

@Component({
  selector: 'app-waitinglist',
  templateUrl: './waitinglist.component.html',
  styleUrls: ['./waitinglist.component.css']
})
export class WaitinglistComponent implements OnInit {


  waitingListLIST: WaitingList[] = [];
  list!: WaitingList[];
  idwaitingList!: number;
  cols: any[] = [];

  waitingListDialog: boolean = false;

  waitingListRenewDialog: boolean = false;

  waitingListUpdateDialog: boolean = false;

  deletewaitingListDialog: boolean = false;

  deletewaitingListsDialog: boolean = false;

  waitingLists: WaitingList[] = [];

  waitingList: WaitingList = {};

  selectedwaitingLists: WaitingList[] = [];

  submitted: boolean = false;
  messageService: any;

  iduser!:number;


  rowsPerPageOptions = [5, 10, 20];


  constructor(private fs: WaitingListService) {}

  ngOnInit(): void {

    this.cols = [
      { field: 'waitingList', header: 'waitingList' },
      { field: 'createdDate', header: 'createdDate' },
      { field: 'fNameBlock', header: 'fNameBlock' },
      { field: 'priorityLevel', header: 'priorityLevel' }

    ];
    this.fs.getAllWaitingList().subscribe(waitingLists => {
      this.waitingLists = waitingLists;
    });


  }



  deletewaitingList(idwaitingList: number) {
    if (confirm("do you really want to delete this item ?"))
    {
      this.fs.removeFromWaitingList(idwaitingList).subscribe();

    }
  }

  openNew() {
    this.waitingList = {};
    this.submitted = false;
    this.waitingListDialog = true;
  }

  deleteSelectedwaitingLists() {
    this.deletewaitingListsDialog = true;
  }




///////////////

  // preEditwaitingList(waitingList: waitingList) {
  //   this.waitingList = { ...waitingList };
  //   this.waitingListUpdateDialog = true;
  // }
  //
  // updatewaitingList() {
  //   if (typeof this.waitingList.idwaitingList !== 'undefined'){
  //     this.fs.(this.waitingList,this.waitingList.idwaitingList).subscribe((res) => {
  //       console.log(res);
  //     });}
  // }
  //
  //
  // hidewaitingListUpdateDialog() {
  //   this.waitingListUpdateDialog = false;
  //   this.submitted = false;
  // }



  confirmDeleteSelected() {
    this.deletewaitingListsDialog = false;
    this.waitingLists = this.waitingLists.filter(val => !this.selectedwaitingLists.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'waitingLists Deleted', life: 3000 });
    this.selectedwaitingLists = [];

  }

// confirmDelete() {
//     this.deletewaitingListDialog = false;
//     this.waitingLists = this.waitingLists.filter(val => val.idwaitingList !== this.waitingList.idwaitingList);
//     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'waitingList Deleted', life: 3000 });
//     this.waitingList = {};

// }

  hideDialog() {
    this.waitingListDialog = false;
    this.submitted = false;
  }

  savewaitingList() {
    this.fs.addToWaitingList(this.waitingList,this.iduser).subscribe((res) => {
      console.log(res);
    });}



  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.waitingLists.length; i++) {
      if (this.waitingLists[i].id === id) {
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
