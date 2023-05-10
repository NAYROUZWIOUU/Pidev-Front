import { User } from "./user";

export class RUserTransaction {
  id!: number;
  userId!: User;
  transactionDate!: Date;
  transactionAmount!: number;
}
