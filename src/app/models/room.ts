import { Fmembership } from './fmembership';
import { BlockFoyer } from './blockfoyer';
export class Room {
  idRoom?: number;
  bedNbr?: number;
  archived?: boolean;
  fMemberships?: Fmembership[];
  blockFoyer?: BlockFoyer;
}
