import { User } from './User';
import { Restaurant } from './restaurant';
import { TypeMembership } from './typeMembership';
import { Duration } from './duration';
export class RMembership {
  idRMembership?: number;
  typeMembership?: TypeMembership;
  startDate?: any  ;
  endDate?: any | undefined;
  duration?: Duration;
  price?: number;
  validated?: boolean;
  hasRenewed?: boolean;
  renewalCount?: number;
  user?: User;
  restaurant?: Restaurant;
}
