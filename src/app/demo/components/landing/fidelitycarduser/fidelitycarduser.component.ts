import { DatePipe } from '@angular/common';
import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FidelityCard } from 'src/app/models/fidelity-card';
import { User } from 'src/app/models/User';
import { FidelityCardService } from 'src/app/services/FidelityCard/fidelity-card-service.service';

@Component({
  selector: 'app-fidelitycarduser',
  templateUrl: './fidelitycarduser.component.html',
  styleUrls: ['./fidelitycarduser.component.css'],
  providers:[MessageService,DatePipe]
})
export class FidelitycarduserComponent implements OnInit{
  list!: FidelityCard[];
  idfidelityCard!: number;
  cols: any[] = [];

  fidelityCardDialog = false;
  fidelityCardUpdateDialog = false;
  deletefidelityCardDialog = false;
  deletefidelityCardsDialog = false;

  fidelityCards: FidelityCard[] = [];
  fidelityCard = new FidelityCard();
  selectedfidelityCards: FidelityCard[] = [];

  submitted = false;

  rowsPerPageOptions = [5, 10, 20];

  iduser!:number;

  users: User[] = [];
  selectedUser: User | undefined;

  constructor(public layoutService: LayoutService, public router: Router,private fs: FidelityCardService,private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.cols = [
      { field: 'idFidelityCard', header: 'ID' },
      { field: 'cardNumber', header: 'Card Number' },
      { field: 'membershipLevel', header: 'Membership Level' },
      { field: 'totalPoints', header: 'Total Points' },
      { field: 'expirationDate', header: 'Expiration Date' },
      { field: 'user', header: 'User' },
      { field: 'transactions', header: 'Transactions' },
      { field: 'rewards', header: 'Rewards' }
    ];

    this.fs.retrieveAllFidelityCard().subscribe(
      fidelityCards => this.fidelityCards = fidelityCards,
      error => console.error(error)
    );
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


}
