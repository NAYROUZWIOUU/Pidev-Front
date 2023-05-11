import { User } from "./User";
import {FNameBlock} from "./fnameblock";

export class WaitingList {
  id?: number;
  createdDate?: Date;
  fNameBlock?: FNameBlock;
  priorityLevel?: number;
  user?: User;
}
