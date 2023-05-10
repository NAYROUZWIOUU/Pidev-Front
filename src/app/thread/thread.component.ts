
import {Component, OnInit} from '@angular/core';
import {Thread} from "../models/Thread";
import {ThreadService} from "../services/Thread/thread.service";
import {Forum} from "../models/Forum";
import {ActivatedRoute} from "@angular/router";
import {ForumService} from "../services/Forum/forum.service";
import {CommentType} from "../models/CommentType";

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  thread: Thread=new Thread();
  forum: Forum=new Forum();
  threads: Thread[] = [];
  thre :any;
  id:any;
  newThread: Thread = {
    description: "",
    type: undefined}; // Modèle pour ajouter un nouveau thread

  replyText: any;



  constructor(private threadService: ThreadService, private  forumService: ForumService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const forumId = this.route.snapshot.paramMap.get('id');
    this.thre = this.route.snapshot.paramMap.get('thre');
    // this.getAllThreadsByForum(this.forum.id);
    this.getAllThreadsByForum();
   // this.getAllRepliesByThread();

  }
  getAllThreadsByForum(): void {
    this.threadService.getAllThreadsByForum(this.thre).subscribe(threads=>{
      this.threads=threads;
    })

  }

  getAllRepliesByThread(threadId: any): void {
    const id=this.selecReplies(this.thread.parent?.id)
    this.threadService.getAllRepliesByThread(id).subscribe(replies => {
      this.threads=replies;
    });
  }
  onThreadSelect(thread :Thread) {
    this.thread = thread;
      // Load the replies for the selected thread
      this.getAllRepliesByThread(this.thread.id);

  }

  addThread() {
    this.newThread.forum = this.thre;


    this.threadService.addThread(this.newThread, this.thre).subscribe(thread => {
        if (this.threads === null) {
          this.threads = [thread];
        } else {
          this.threads.push(thread);
        }
      },
      error => {
        console.log(error);
      });
  }

  updateThread(description: string): void {
    const updatedThread: Thread = {
      id: this.thread.id,
      description: description,
      type: this.thread.type,

    };

    this.threadService.updateThread(updatedThread, updatedThread.id).subscribe(updatedThread => {
      this.thread = updatedThread;
    });
  }



  replyToThread(): void {
    const replyThread: Thread = {
      description: this.replyText
    };
    this.threadService.replyToThread(replyThread, this.thread.id).subscribe(newThread => {
      this.thread = newThread;
      this.replyText = '';
    });
  }
  selectThread(thread: Thread) {
    this.thread = thread;
  }
  selecReplies(thread: Thread){
    if (this.thread.type=='REPLY'){
      this.thread=thread;
    }
  }
  CommentTypeValues(): string[] {
    return Object.values(CommentType);
  }
}




// selectThread(thread: Thread) {
//   this.selectedThread = thread;
// }
// CommentTypeValues(): string[] {
//   return Object.values(CommentType);
// }
