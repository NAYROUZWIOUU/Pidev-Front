import { Foyer } from './foyer';
import { Room } from './room';

export class BlockFoyer {
  idBlock? : number;
  nameBlock? : string;
  roomNbr? : number;
  placement? : string;
  rooms? : Room[];
  foyer? : Foyer;

}
