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
  newThread: Thread = {
    description: "",
    type: undefined}; // Modèle pour ajouter un nouveau thread

  replyText: any;



  constructor(private threadService: ThreadService, private  forumService: ForumService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const forumId = this.route.snapshot.paramMap.get('id');
    this.thre = this.route.snapshot.paramMap.get('thre');
    // this.getAllThreadsByForum(this.forum.id);
    this.threadService.getAllThreadsByForum(this.thre).subscribe(threads=>{
      this.threads=threads;
    })
  }
  // addThread(description: string, ): void {
  //   this.newThread = this.forum.id;
  //   this.threadService.addThreadtoForum(this.newThread, this.forum.id).subscribe(thread)
  // =>
  //   {
  //     if (this.thread === null) {
  //       this.thread = [thread]
  //     } else {
  //       this.thread.push(thread);
  //     }
  //   }
  // ,
  //   error =>
  //     console.log(error);
  //
  // }

  addThread() {
    this.newThread.forum = this.thre;


    this.threadService.addThreadtoForum(this.newThread, this.thre).subscribe(thread => {
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


  addThreadToForum(description: string): void {
    const thread: Thread = {
      description: description
    };
    this.threadService.addThreadtoForum(thread, this.forum.id).subscribe(newThread => {
      this.thread = newThread;
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

  getAllThreadsByForum(forumId: number): void {
    this.threadService.getAllThreadsByForum(forumId).subscribe(threads => {
      // traitement des threads récupérés
    });
  }

  getAllRepliesByThread(threadId: number): void {
    this.threadService.getAllRepliesByThread(threadId).subscribe(replies => {
      // traitement des réponses récupérées
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
