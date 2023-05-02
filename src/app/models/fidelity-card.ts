import { Reward } from "./reward";
import { RUserTransaction } from "./ruser-transaction";
import { User } from "./user";

export class FidelityCard {
  idFidelityCard!: number;
  cardNumber!: number;
  membershipLevel!: string;
  totalPoints!: number;
  expirationDate!: any;
  user!: User;
  transactions!: RUserTransaction[];
  rewards!: Reward[];

}
