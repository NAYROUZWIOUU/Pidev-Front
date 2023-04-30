import { Hobbies } from "./hobbies";
import { Room } from "./room";
import { User } from "./user";
export class Fmembership {
    idFMembership?: number;
    startDate?: any;
    duration?: string;
    price?: number;
    user?: User;
    room?: Room;
    Hobbies?: Hobbies;
}