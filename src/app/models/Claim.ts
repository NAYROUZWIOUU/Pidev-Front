import {User} from "./user";
import {AboutClaim} from "./AboutClaim";

export class Claim {
  idClaim?: number;
  aboutClaim?: AboutClaim;
  title?: string;
  description?: string;
  dateClaim?: Date;
  solved?: boolean;
  user?: User;
  admin?: User;
}
