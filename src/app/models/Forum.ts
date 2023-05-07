import {Reaction} from "./Reaction";
import {Thread} from "./Thread";

export class Forum {
  id?: any;
  title?: string;
  topic?: string;
  image?: string;
  threads?: Thread[];
  reactions?: Reaction[];}
