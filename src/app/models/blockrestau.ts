import {Restaurant} from "./restaurant";
import {Rblockrestau} from "./rblockrestau";

export interface Blockrestau {
  idBlock?:number;
  nameBlock?:Rblockrestau;
  tableNbr?:number;
  placement?:string;
  archived?:boolean;
  restaurant?:Restaurant[];

}

