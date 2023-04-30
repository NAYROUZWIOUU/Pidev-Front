import { Component ,OnInit } from '@angular/core';
import { Room } from '../models/room';
import { RoomService } from '../services/rooms/room.service';
import { MessageService } from 'primeng/api';
import { Duration } from '../models/duration';
import { TypeMembership } from '../models/typeMembership';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';



@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [MessageService,DatePipe]
})
export class RoomComponent implements OnInit{

  list!: Room[];
  idRoom!: number;
  cols: any[] = [];

  roomDialog: boolean = false;

  deleteroomDialog: boolean = false;

  deleteroomsDialog: boolean = false;

  updateroomDialog: boolean = false;

  rooms: Room[] = [];

  room: Room = {};

  selectedrooms: Room[] = [];

  submitted: boolean = false;
  messageService: any;



  rowsPerPageOptions = [5, 10, 20];


  constructor(private rs: RoomService,private datePipe: DatePipe) {}

  ngOnInit(): void {

    this.cols = [
      { field: 'room', header: 'Room' },
      { field: 'bedNbr', header: 'BedNbr' },
      { field: 'archived', header: 'Archived' }
  ];
    this.rs.retrieveAllRooms().subscribe(rooms => {
      this.rooms = rooms;
      console.log(rooms)
    });


  }

  deleteRoom(idRoom: number) {
    if (confirm("do you really want to delete this item ?"))
    {
this.rs.deleteRoom(idRoom).subscribe();

    }
  }

  openNew() {
    this.room = {};
    this.submitted = false;
    this.roomDialog = true;
}

deleteSelectedrooms() {
    this.deleteroomsDialog = true;
}

preEditroom(room: Room) {
  this.room = { ...room };
  this.updateroomDialog = true;
}

updateroom() {

  this.rs.updateRoom(this.room).subscribe((res) => {
    console.log(res);
  });
}

hideroomUpdateDialog() {
  this.updateroomDialog = false;
  this.submitted = false;
}



confirmDeleteSelected() {
    this.deleteroomsDialog = false;
    this.rooms = this.rooms.filter(val => !this.selectedrooms.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'rooms Deleted', life: 3000 });
    this.selectedrooms = [];

}


hideDialog() {
  this.roomDialog = false;
  this.submitted = false;
}


saveroom() {

this.rs.addRoom(this.room).subscribe((res) => {
  console.log(res);
});
}



findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].idRoom === id) {
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
