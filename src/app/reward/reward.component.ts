import { Component ,OnInit } from '@angular/core';
import { Reward } from '../models/reward';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
import { RewardService } from '../services/Reward/reward.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css'],
  providers:[MessageService,DatePipe]
})

export class RewardComponent implements OnInit {

  list!: Reward[];
  idreward!: number;
  cols: any[] = [];

  rewardDialog: boolean = false;

  rewardUpdateDialog: boolean = false;

  deleterewardDialog: boolean = false;

  deleterewardsDialog: boolean = false;

  rewards: Reward[] = [];

  reward: Reward;

  selectedrewards: Reward[] = [];

  submitted: boolean = false;
  messageService: any;



  rowsPerPageOptions = [5, 10, 20];


  constructor(private rs: RewardService) {
    this.reward = new Reward();
  }

  ngOnInit(): void {

    this.cols = [
      { field: 'reward', header: 'reward' },
      { field: 'nameReward', header: 'nameReward' },
      { field: 'description', header: 'description' },
      { field: 'pointValue', header: 'pointValue' },
      { field: 'quantityAvailable', header: 'quantityAvailable' },

  ];
    this.rs.getAllRewards().subscribe(rewards => {
      this.rewards = rewards;
    });


  }



  deletereward(idreward: number) {
    if (confirm("do you really want to delete this item ?"))
    {
      this.rs.deleteReward(idreward).subscribe();

    }
  }

  openNew() {
    this.reward = new Reward();
    this.submitted = false;
    this.rewardDialog = true;
  }


deleteSelectedrewards() {
    this.deleterewardsDialog = true;
}




///////////////

preEditreward(reward: Reward) {
    this.reward = { ...reward };
    this.rewardUpdateDialog = true;
}

updateReward() {
  this.rs.updateReward(this.reward.idReward,this.reward).subscribe((res) => {
    console.log(res);
  });

}


hiderewardUpdateDialog() {
  this.rewardUpdateDialog = false;
  this.submitted = false;
}


confirmDeleteSelected() {
    this.deleterewardsDialog = false;
    this.rewards = this.rewards.filter(val => !this.selectedrewards.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'rewards Deleted', life: 3000 });
    this.selectedrewards = [];

}

hideDialog() {
    this.rewardDialog = false;
    this.submitted = false;
}

savereward() {
  this.rs.createReward(this.reward).subscribe((res) => {
    console.log(res);
  });
}


findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.rewards.length; i++) {
        if (this.rewards[i].idReward === id) {
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
