import { Component, OnInit } from '@angular/core';
import {WaitingListService} from "../services/WaitingList/waitinglist.service";
import {WaitingList} from "../models/waitinglist";
import {Table} from "primeng/table";
import {MessageService} from "primeng/api";
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

  waitingList1: any[] = [];

  firstOfWaitingList!: WaitingList;

  selectedwaitingLists: WaitingList[] = [];

  submitted: boolean = false;

  iduser!:number;


  rowsPerPageOptions = [5, 10, 20];


  constructor(private fs: WaitingListService, private messageService: MessageService) {}

  ngOnInit() {
    this.cols = [
      { field: 'waitingList', header: 'Waiting List' },
      { field: 'createdDate', header: 'Created Date' },
      { field: 'fNameBlock', header: 'First Name Block' },
      { field: 'priorityLevel', header: 'Priority Level' }
    ];

    this.fs.getAllWaitingList().subscribe((allItems: WaitingList[]) => {
      this.waitingLists = allItems;
    });
  }

  getFirstOfWaitingList1() {
    this.fs.getAllWaitingList().subscribe((allItems: WaitingList[]) => {
      this.waitingLists = allItems;
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


  confirmDeleteSelected() {
    this.deletewaitingListsDialog = false;
    this.waitingLists = this.waitingLists.filter(val => !this.selectedwaitingLists.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'waitingLists Deleted', life: 3000 });
    this.selectedwaitingLists = [];

  }


  hideDialog() {
    this.waitingListDialog = false;
    this.submitted = false;
  }

  savewaitingList() {
    this.fs.addToWaitingList(this.waitingList).subscribe((res) => {
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


  addToWaitingList(waitingList: WaitingList): void {
    this.fs.addToWaitingList(waitingList).subscribe(() => {
      this.getAllWaitingList();
    });
  }

  removeFromWaitingList(waitingListId: number): void {
    this.fs.removeFromWaitingList(waitingListId).subscribe(() => {
      this.getAllWaitingList();
    });
  }

  getFirstOfWaitingList() {
    this.fs.getFirstOfWaitingList().subscribe((firstItem: WaitingList) => {
      this.waitingLists = [firstItem];
    });
  }


  notifyFirstUserOnWaitingList(): void {
    this.fs.notifyFirstUserOnWaitingList().subscribe(() => {
      this.getAllWaitingList();
      this.messageService.add({ severity: 'success', summary: 'Notification Sent', detail: 'Notification has been sent to the first user on the waiting list.' });
    });
  }

  countWaitingList() {
    this.fs.countWaitingList().subscribe((count: number) => {
      this.messageService.add({ severity: 'info', summary: 'Waiting List Count', detail: `The waiting list currently has ${count} items.` });
      this.getAllWaitingList();
    });
  }

  getWaitingListByFoyerAndBlock(idFoyer: number, idBlock: number): void {
    this.fs.getWaitingListByFoyerAndBlock(idFoyer, idBlock).subscribe(() => {
      this.getAllWaitingList();
    });
  }

  getAllWaitingList(): void {
    this.fs.getAllWaitingList().subscribe(data => {
      this.waitingList1 = data;
    });
  }

  estimateWaitTimes(): void {
    this.fs.estimateWaitTimes().subscribe(() => {
      this.getAllWaitingList();
    });
  }

}
