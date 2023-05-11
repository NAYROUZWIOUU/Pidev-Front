import { User } from "./User";

export class RUserTransaction {
  id!: number;
  userId!: User;
  transactionDate!: Date;
  transactionAmount!: number;
}
