import { User } from './user';
import { Restaurant } from './restaurant';
export class RMembership {
  idRMembership?: number;
  typeMembership?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  price?: number;
  validated?: boolean;
  hasRenewed?: boolean;
  renewalCount?: number;
  user?: User;
  restaurant?: Restaurant;
}
