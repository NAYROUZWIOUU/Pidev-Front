import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { BlockFoyer } from "../../../../models/blockfoyer";
import { BlockfoyerService } from "../../../../services/BlockFoyer/blockfoyer.service";
import { MessageService } from "primeng/api";
import { FNameBlock } from "../../../../models/fnameblock";
import { Foyer } from "../../../../models/foyer";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-dorm-front',
  templateUrl: './dorm-front.component.html',
  providers: [MessageService],
  styleUrls: ['./dorm-front.component.css']
})
export class DormFrontComponent {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  b: boolean = false;
  text: string = "";

  apiUrl = "http://localhost:8082/test/blockfoyer";
  fnameblock = FNameBlock; // declare FNameBlock as a property
  blockfoyer: BlockFoyer = new BlockFoyer();

  list!: BlockFoyer[];
  idBlock!: number;
  cols: any[] = [];
  foyers: Foyer[] = [];
  foyer:Foyer ={};
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
  nameBlockOptions = [
    {label: 'MSTUDENTS', value: 'MSTUDENTS'},
    {label: 'FSTUDENTS', value: 'FSTUDENTS'},
    {label: 'MTEACHERS', value: 'MTEACHERS'},
    {label: 'FTEACHERS', value: 'FTEACHERS'},
    {label: 'GUESTS', value: 'GUESTS'}
  ];

  constructor(public layoutService: LayoutService, public router: Router, private blockFoyerService: BlockfoyerService) { }

  ngOnInit() {
    this.getAllBlockFoyers();
  }

  getAllBlockFoyers() {
    this.blockFoyerService.getAllBlockFoyers().subscribe((data: BlockFoyer[]) => {
      this.list = data;
    });
  }
  getBlockFoyerImage(blockfoyer: BlockFoyer) {
    if (blockfoyer.nameBlock === 'MSTUDENTS') {
      return '/assets/demo/images/landing/icons8-student-male-96.png';
    } else if (blockfoyer.nameBlock === 'FSTUDENTS') {
      return '/assets/demo/images/landing/icons8-graduate-48.png';
    } else if (blockfoyer.nameBlock === 'MTEACHERS') {
      return '/assets/demo/images/landing/icons8-teacher-60 (1).png';
    } else if (blockfoyer.nameBlock === 'FTEACHERS') {
      return '/assets/demo/images/landing/icons8-teacher-60.png';
    } else if (blockfoyer.nameBlock === 'GUESTS') {
      return '/assets/demo/images/landing/icons8-guests-64.png';
    } else {
      return '/assets/demo/images/landing/free.svg';
    }
  }

  getBlockFoyerText(blockfoyer: BlockFoyer) {
    switch(blockfoyer.nameBlock) {
      case 'MSTUDENTS':
        return 'Male students block';
      case 'FSTUDENTS':
        return 'Female students block';
      case 'MTEACHERS':
        return 'Male teachers block';
      case 'FTEACHERS':
        return 'Female teachers block';
      case 'GUESTS':
        return 'Guests block';
      default:
        return '';
    }
  }


}
