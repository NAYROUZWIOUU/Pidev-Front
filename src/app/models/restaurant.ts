import {Menu} from "./menu";
import {Blockrestau} from "./blockrestau";

export class Restaurant {
  idRestau?: number;
  nameRestau?: string;
  phoneNumber?: number;
  email?: string;
  adress?: string;
  archived?: boolean;
  rMemberships?: RMembership[];
  blockRestaus?: Blockrestau[];
  menus?: Menu[];

  archive?() {
    this.archived = true;
}

unarchive?() {
    this.archived = false;
}
}

export class RMembership {
// Define properties for RMembership entity class here
}




