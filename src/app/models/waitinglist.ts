import { User } from './user';

export class WaitingList {
  id?: number;
  createdDate?: Date;
  fNameBlock?: string;
  priorityLevel?: number;
  user?: User;
}
