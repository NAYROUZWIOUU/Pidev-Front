import { User } from "./User";
import {Forum} from "./Forum";
import {CommentType} from "./CommentType";



export class Thread {
  id?: any;

  description?: string;
  type?: CommentType;

  user?: User;
  parent?: Thread;
  forum?: Forum;
}
