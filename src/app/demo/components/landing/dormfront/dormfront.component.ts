import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {BlockfoyerService} from "../../../../services/BlockFoyer/blockfoyer.service";
import {Foyer} from "../../../../models/foyer";
import {FoyerService} from "../../../../services/Foyer/foyer.service";
import {BlockFoyer} from "../../../../models/blockfoyer";
import {Room} from "../../../../models/room";

@Component({
  selector: 'app-dormfront',
  templateUrl: './dormfront.component.html',
  styleUrls: ['./dormfront.component.css']
})
export class DormfrontComponent {
  blockfoyers: BlockFoyer[] = [];
  blockfoyer: BlockFoyer = new BlockFoyer();

  room : Room[]=[];
  constructor(public layoutService: LayoutService, public router: Router) { }

  getTotalBedCount(blockfoyerName: string): number {
    const blockfoyer = this.blockfoyers.find(b => b.nameBlock === blockfoyerName);
    let totalBeds = 0;
    if (blockfoyer && blockfoyer.rooms) {
      for (const room of blockfoyer.rooms) {
        totalBeds += room.bedNbr || 0;
      }
    }
    return totalBeds;
  }


  getRoomCount(blockfoyerName: string): number {
    const blockfoyer = this.blockfoyers.find(b => b.nameBlock === blockfoyerName);
    return blockfoyer?.rooms?.length || 0;
  }



  getRooms(blockfoyer: BlockFoyer): Room[] {
    if (blockfoyer && blockfoyer.rooms) {
      return blockfoyer.rooms;
    }
    return [];
  }

}
