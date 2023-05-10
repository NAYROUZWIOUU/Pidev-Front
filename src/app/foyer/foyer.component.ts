import { Component ,OnInit } from '@angular/core';
import { Foyer } from '../models/foyer';
import { FoyerService } from '../services/Foyer/foyer.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
import {WaitingList} from "../models/waitinglist";



@Component({
  selector: 'app-foyer',
  templateUrl: './foyer.component.html',
  styleUrls: ['./foyer.component.css'],
  providers: [MessageService]
})
export class FoyerComponent implements OnInit{

  list!: Foyer[];
  idFoyer!: number;
  cols: any[] = [];

  foyerDialog: boolean = false;

  foyerUpdateDialog: boolean = false;


  deletefoyerDialog: boolean = false;

  deletefoyersDialog: boolean = false;

  foyers: Foyer[] = [];

  foyer: Foyer = {};

  selectedfoyers: Foyer[] = [];

  submitted: boolean = false;
  messageService: any;

  rowsPerPageOptions = [5, 10, 20];


  constructor(private fs: FoyerService) {}

  ngOnInit(): void {

    this.cols = [
      { field: 'foyer', header: 'foyer' },
      { field: 'name', header: 'Name' },
      { field: 'adress', header: 'Adress' },
      { field: 'capacity', header: 'capacity' }

    ];
    this.fs.getAllFoyers().subscribe(foyers => {
      this.foyers = foyers;
    })
    ;


  }



  deletefoyer(idFoyer: number) {
    if (confirm("Do you really want to delete this item?")) {
      this.fs.removeFoyer(idFoyer).subscribe(() => {
        this.foyers = this.foyers.filter(fs => fs.idFoyer !== idFoyer);
      });
    }
  }


  openNew() {
    this.foyer = {};
    this.submitted = false;
    this.foyerDialog = true;
  }

  deleteSelectedfoyers() {
    this.deletefoyersDialog = true;
  }




///////////////

  preEditfoyer(foyer: Foyer) {
    this.foyer = { ...foyer };
    this.foyerUpdateDialog = true;
  }



  updateFoyer() {
    if (typeof this.foyer.idFoyer !== 'undefined') {
      this.fs.updateFoyer(this.foyer).subscribe((updatedFoyer) => {
        console.log(updatedFoyer);
      });
      this.hidefoyerUpdateDialog();
      location.reload();

    }
  }


  hidefoyerUpdateDialog() {
    this.foyerUpdateDialog = false;
    this.submitted = false;
  }



  confirmDeleteSelected() {
    this.deletefoyersDialog = false;
    this.foyers = this.foyers.filter(val => !this.selectedfoyers.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'foyers Deleted', life: 3000 });
    this.selectedfoyers = [];

  }

 confirmDelete() {
    this.deletefoyerDialog = false;
   this.foyers = this.foyers.filter(val => val.idFoyer !== this.foyer.idFoyer);
   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'foyer Deleted', life: 3000 });
  this.foyer = {};

 }


  hideDialog() {
    this.foyerDialog = false;
    this.submitted = false;
  }

  savefoyer() {
    const myPayload = {
      nameFoyer: this.foyer.nameFoyer,
      phoneNumber: this.foyer.phoneNumber,
      capacity: this.foyer.capacity,
      email:this.foyer.email,
      adress:this.foyer.adress

    };

    // Send the new object to the backend API using an HTTP POST request
    this.fs.addFoyer(myPayload).subscribe((res) => {
      console.log(res);
      this.hideDialog();
      location.reload(); // Add this line to reload the page
    });
  }


  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.foyers.length; i++) {
      if (this.foyers[i].idFoyer === id) {
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
