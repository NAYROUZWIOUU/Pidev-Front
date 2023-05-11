import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { FidelityCard } from '../models/fidelity-card';
import { FidelityCardService } from '../services/FidelityCard/fidelity-card-service.service';
import { User } from '../models/User';
import { UsersService } from '../services/Users/users.service';
import { RewardService } from '../services/Reward/reward.service';

@Component({
selector: 'app-fidelity-card-component',
templateUrl: './fidelity-card-component.component.html',
styleUrls: ['./fidelity-card-component.component.css'],
providers: [MessageService, DatePipe]
})
export class FidelityCardComponent implements OnInit {

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

constructor(private rs: RewardService,private us: UsersService ,private fs: FidelityCardService, private datePipe: DatePipe, private messageService: MessageService) {}

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






// this.fs.retrieveAllFidelityCard().subscribe((fidelityCards: FidelityCard[]) => {
//   const userObservables = fidelityCards.map((fidelityCard) =>
//     this.fs.getUserFullName(fidelityCard.idFidelityCard)
//   );
//   forkJoin(userObservables).subscribe((userFullNames) => {
//     fidelityCards.forEach((fidelityCard, index) => {
//       fidelityCard.user = userFullNames[index];
//     });
//     this.fidelityCards = fidelityCards;
//   });
// });


openNew(): void {
  this.fidelityCard = new FidelityCard();
  this.submitted = false;
  this.fidelityCardDialog = true;
  }


    savefidelityCard(): void {


      const formattedDate = this.datePipe.transform(this.fidelityCard.expirationDate, 'yyyy-MM-dd HH:mm:ss');
      // Create a new object with the formatted date and the other form values
      const myPayload = {
        cardNumber:this.fidelityCard.cardNumber,
        membershipLevel: this.fidelityCard.membershipLevel,
        expirationDate: formattedDate,
        totalPoints: this.fidelityCard.totalPoints
      };
      const newFidelityCard: FidelityCard = {
        cardNumber: myPayload.cardNumber,
        membershipLevel: myPayload.membershipLevel,
        expirationDate: myPayload.expirationDate,
        totalPoints: myPayload.totalPoints,
        transactions: [],
        rewards: [],
        idFidelityCard: 0,
        user: new User
      };

      // Send the new object to the backend API using an HTTP POST request
      this.fs.addFidelityCard(newFidelityCard,this.iduser).subscribe((res) => {
        console.log(res);
      });
    }

hideDialog() {
  this.fidelityCardDialog = false;
  this.submitted = false;
}


///////////////

preEditfidelityCard(fidelityCard: FidelityCard) {
    this.fidelityCard = { ...fidelityCard };
    this.fidelityCardUpdateDialog = true;
}

updateMembership() {
  const formattedDate = this.datePipe.transform(this.fidelityCard.expirationDate, 'yyyy-MM-dd HH:mm:ss');

  const myPayload: FidelityCard = {
    idFidelityCard: this.fidelityCard.idFidelityCard,
    cardNumber: this.fidelityCard.cardNumber,
    user: this.fidelityCard.user,
    membershipLevel: this.fidelityCard.membershipLevel,
    expirationDate: formattedDate,
    totalPoints: this.fidelityCard.totalPoints,
    transactions: this.fidelityCard.transactions,
    rewards: this.fidelityCard.rewards
  };

  this.fs.updateFidelityCard(myPayload,this.iduser).subscribe((res) => {
    console.log(res);
  });
}




hidefidelityCardUpdateDialog() {
  this.fidelityCardUpdateDialog = false;
  this.submitted = false;
}


/////////////////////////////

deleteSelectedfidelityCards() {
  this.deletefidelityCardsDialog = true;
}


confirmDeleteSelected() {
    this.deletefidelityCardsDialog = false;
    this.fidelityCards = this.fidelityCards.filter(val => !this.selectedfidelityCards.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'fidelityCards Deleted', life: 3000 });
    this.selectedfidelityCards = [];

}


deletefidelityCard(idfidelityCard: number) {
  if (confirm("do you really want to delete this item ?"))
  {
    this.fs.removeFidelityCard(idfidelityCard).subscribe();

  }
}
/////////////////

findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.fidelityCards.length; i++) {
        if (this.fidelityCards[i].idFidelityCard === id) {
            index = i;
            break;
        }
    }

    return index;
}


onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}



onGoldMembershipClicked(fidelityCardId: number) {
  this.rs.addRewardIfGoldMembership(fidelityCardId)
    .subscribe(() => {
      console.log('Reward added for gold membership');
    }, error => {
      console.error('Failed to add reward for gold membership', error);
    });
}

onSilverMembershipClicked(fidelityCardId: number) {
  this.rs.addRewardIfSILVERMembership(fidelityCardId)
    .subscribe(() => {
      console.log('Reward added for silver membership');
    }, error => {
      console.error('Failed to add reward for silver membership', error);
    });
}

onBronzeMembershipClicked(fidelityCardId: number) {
  this.rs.addRewardIfBRONZEMembership(fidelityCardId)
    .subscribe(() => {
      console.log('Reward added for bronze membership');
    }, error => {
      console.error('Failed to add reward for bronze membership', error);
    });
}

onGiveRewardsClicked(fidelityCardId: number) {
  this.rs.giveRewards(fidelityCardId)
    .subscribe(() => {
      console.log('Rewards given');
    }, error => {
      console.error('Failed to give rewards', error);
    });
}
}

