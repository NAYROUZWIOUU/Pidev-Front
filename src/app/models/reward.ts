import { FidelityCard } from "./fidelity-card";

export class Reward {
  idReward!: number;
  nameReward!: string;
  description!: string;
  pointValue!: number;
  quantityAvailable!: number;
  fidelityCard?: FidelityCard;
}
