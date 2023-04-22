export class Restaurant {
  idRestau?: number;
  nameRestau?: string;
  phoneNumber?: number;
  email?: string;
  adress?: string;
  archived?: boolean;
  rMemberships?: RMembership[];
  blockRestaus?: BlockRestau[];
  menus?: Menu[];

  archive() {
    this.archived = true;
}

unarchive() {
    this.archived = false;
}
}

export class RMembership {
// Define properties for RMembership entity class here
}

export class BlockRestau {
// Define properties for BlockRestau entity class here
}

export class Menu {
// Define properties for Menu entity class here

}
