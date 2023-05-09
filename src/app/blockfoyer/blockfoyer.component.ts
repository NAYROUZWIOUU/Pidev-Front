import { Component ,OnInit } from '@angular/core';
import { BlockFoyer } from '../models/blockfoyer';
import { BlockfoyerService } from '../services/BlockFoyer/blockfoyer.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {FNameBlock} from "../models/fnameblock";
import {Foyer} from "../models/foyer";
import {FoyerService} from "../services/Foyer/foyer.service";

@Component({
  selector: 'app-blockfoyer',
  templateUrl: './blockfoyer.component.html',
  styleUrls: ['./blockfoyer.component.css'],
  providers: [MessageService]
})
export class BlockfoyerComponent implements OnInit{
  fnameblock = FNameBlock; // declare FNameBlock as a property
  blockfoyer: BlockFoyer = new BlockFoyer();

  list!: BlockFoyer[];
  idBlock!: number;
  cols: any[] = [];
  foyers: Foyer[] = [];


  blockfoyerDialog: boolean = false;
  blockFoyerUpdateDialog: boolean=false;

  deleteblockfoyerDialog: boolean = false;

  deleteblockfoyersDialog: boolean = false;

  blockfoyers: BlockFoyer[] = [];

  //blockfoyer: BlockFoyer = {};
 // blockFoyer: any = { foyer: { idFoyer: null } };

  selectedblockfoyers: BlockFoyer[] = [];

  submitted: boolean = false;
  messageService: any;
  nameBlockOptions = Object.values(FNameBlock);



  rowsPerPageOptions = [5, 10, 20];


  constructor(private bf: BlockfoyerService) {
    this.blockfoyer.foyer = {}; // initialize the foyer property to an empty object

  }

  ngOnInit(): void {

    this.cols = [
      { field: 'blockfoyer', header: 'blockfoyer' },
      { field: 'nameblock', header: 'nameblock' },
      { field: 'roomnbr', header: 'roomnbr' },
      { field: 'placement', header: 'placement' }


    ];

    this.bf.getAllBlockFoyers().subscribe(blockfoyers => {
      this.blockfoyers = blockfoyers;
    });


  }

  deleteBlockfoyer(idBlock: number) {
    if (confirm("Do you really want to delete this item?")) {
      this.bf.removeBlockFoyer(idBlock).subscribe(() => {
        this.blockfoyers = this.blockfoyers.filter(bf => bf.idBlock !== idBlock);
      });
    }
  }


  openNew() {
    this.blockfoyer = {};
    this.submitted = false;
    this.blockfoyerDialog = true;
  }

  deleteSelectedblockfoyers() {
    this.deleteblockfoyersDialog = true;
  }




///////////////

  preEditblockfoyer(blockfoyer: BlockFoyer) {
    this.blockfoyer = { ...blockfoyer };
    this.blockFoyerUpdateDialog = true;
  }



  updateblockFoyer() {
    if (typeof this.blockfoyer.idBlock !== 'undefined') {
      this.bf.updateBlockFoyer(this.blockfoyer,this.idBlock).subscribe((updatedblockFoyer) => {
        console.log(updatedblockFoyer);
      });
      this.hideblockfoyerUpdateDialog();
      location.reload();

    }
  }


  hideblockfoyerUpdateDialog() {
    this.blockFoyerUpdateDialog = false;
    this.submitted = false;
  }



  confirmDeleteSelected() {
    this.deleteblockfoyersDialog = false;
    this.blockfoyers = this.blockfoyers.filter(val => !this.selectedblockfoyers.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'foyers Deleted', life: 3000 });
    this.selectedblockfoyers = [];

  }

  confirmDelete() {
    this.deleteblockfoyersDialog = false;
    this.blockfoyers = this.blockfoyers.filter(val => val.idBlock !== this.blockfoyer.idBlock);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'foyer Deleted', life: 3000 });
    this.blockfoyer = {};

  }


  hideDialog() {
    this.blockfoyerDialog = false;
    this.submitted = false;
  }

  saveblockfoyer() {
    const myPayload = {
      nameBlock: this.blockfoyer.nameBlock,
      roomNbr: this.blockfoyer.roomNbr,
      placement: this.blockfoyer.placement,
      rooms:this.blockfoyer.rooms,
      foyer:this.blockfoyer.foyer

    };

    // Send the new object to the backend API using an HTTP POST request
    this.bf.addBlockFoyer(myPayload).subscribe((res) => {
      console.log(res);
      this.hideDialog();
      location.reload(); // Add this line to reload the page
    });
  }


  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.blockfoyers.length; i++) {
      if (this.blockfoyers[i].idBlock === id) {
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
