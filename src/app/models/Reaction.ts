import {Forum} from "./Forum";
import {Thread} from "./Thread";
import {ReactionType} from "./ReactionType";
import {ReactionEntity} from "./ReactionEntity";

export class Reaction {
  id?: number;
  reactionType?: ReactionType;
  forum?: Forum;
  thread?: Thread;
  entity?: ReactionEntity;
}
