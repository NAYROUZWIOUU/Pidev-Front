
import { RMembership } from './rmembership';
import { Sex } from './sex';
import { TypeUser } from './type-user';
export class User {
  idUser?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  cinUser?: number;
  address?: string;
  phoneNum?: number;
  nationality?: string;
  dateOfBirth?: Date;
  resetPasswordToken?: string;
  state?: boolean;
  sex?: Sex;
  typeUser?: TypeUser;
  rMembership?: RMembership[];
}
