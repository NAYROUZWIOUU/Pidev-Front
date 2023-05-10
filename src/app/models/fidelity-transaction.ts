import { FidelityCard } from "./fidelity-card";

export class FidelityTransaction {
  idFidelityTransaction!: number;
  transactionType!: string;
  points!: number;
  transactionDate!: Date;
  fidelityCard!: FidelityCard;
}
