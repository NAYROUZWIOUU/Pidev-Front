import {Component, OnInit} from '@angular/core';
import {ForumService} from "../../../../services/Forum/forum.service";
import {FormBuilder} from "@angular/forms";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ThreadService} from "../../../../services/Thread/thread.service";
import {Thread} from "../../../../models/Thread";
import {Forum} from "../../../../models/Forum";

@Component({
  selector: 'app-thread-front',
  templateUrl: './thread-front.component.html',
  styleUrls: ['./thread-front.component.css']
})
export class ThreadFrontComponent implements OnInit {

  three :any;
  threads: Thread[] = [];

  thread: Thread=new Thread();
  forum: Forum=new Forum();
  replyText: any;

  id:any;

  newThread: Thread = {
    description: "",
    type: undefined}; // Modèle pour ajouter un nouveau thread
  constructor(private forumService: ForumService,private threadService: ThreadService,private fb: FormBuilder,public layoutService: LayoutService, public router: Router,private route: ActivatedRoute ) {
  }

  ngOnInit(): void {

    const forumId = this.route.snapshot.paramMap.get('id');
    this.three = this.route.snapshot.paramMap.get('three');
    // this.getAllThreadsByForum(this.forum.id);
    this.getAllThreadsByForum();
    // this.getAllRepliesByThread();
  }
  getAllThreadsByForum(): void {
    this.threadService.getAllThreadsByForum(this.three).subscribe(threads=>{
      this.threads=threads;
    })

  }
  getAllRepliesByThread(threadId: any): void {
    const id=this.selecReplies(this.thread.parent?.id)
    this.threadService.getAllRepliesByThread(id).subscribe(replies => {
      this.threads=replies;
    });
  }
  addThread() {
    this.newThread.forum = this.three;


    this.threadService.addThread(this.newThread, this.three).subscribe(thread => {
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

  updateThread(): void {
    const updatedThread: Thread = {

      description: this.thread.description,


    };
    this.threadService.updateThread(updatedThread, this.three).subscribe(updatedThread => {
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


}
