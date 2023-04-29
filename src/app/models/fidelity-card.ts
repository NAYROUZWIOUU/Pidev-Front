import { User } from "./user";

export class FidelityCard {
  idFidelityCard!: number;
  cardNumber!: number;
  membershipLevel!: string;
  totalPoints!: number;
  expirationDate!: Date;
  user!: User;
  transactions!: any[];
  rewards!: any[];

  setCardNumber(cardNumber: number): void {
    this.cardNumber = cardNumber;
  }

  getCardNumber(): number {
    return this.cardNumber;
  }

  generateCardNumber(): void {
    let random = Math.random();
    let newCardNumber = Math.floor(random * 10000000000000000);
    while (newCardNumber === this.cardNumber) {
      newCardNumber = Math.floor(Math.random() * 10000000000000000);
    }
    this.cardNumber = newCardNumber;
  }

}
