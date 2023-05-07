import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ForumService} from "../../../../services/Forum/forum.service";
import {Forum} from "../../../../models/Forum";
import {Thread} from "../../../../models/Thread";

@Component({
  selector: 'app-forum-front',
  templateUrl: './forum-front.component.html',
  styleUrls: ['./forum-front.component.css']
})
export class ForumFrontComponent implements OnInit{
  forums: Forum[]=[];
  selectedForum: Forum={}as Forum;
  query: string='';
  constructor(private forumService: ForumService, private fb: FormBuilder,public layoutService: LayoutService, public router: Router, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.retrieveAllForums();
  }

  retrieveAllForums() {
    this.forumService.retrieveAllForums().subscribe(
      (response) => {
        this.forums = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchForums(): void {
    if (this.query) {
      this.forumService.searchForums(this.query)
        .subscribe(forums => this.forums = forums);
    } else {
      this.retrieveAllForums();
    }
  }

  addForum(forum: Forum) {
    this.forumService.addForum(forum).subscribe(
      (response) => {
        this.forums.push(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateForum(forum: Forum) {
    this.forumService.updateForum(forum).subscribe(
      (response) => {
        const index = this.forums.findIndex(f => f.id === response.id);
        this.forums[index] = response;
        this.selectedForum = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addThreadToForum(forumId: number, thread: Thread) {
    this.forumService.addThreadToForum(forumId, thread).subscribe(
      (response) => {
        const index = this.forums.findIndex(f => f.id === forumId);
        if (this.forums[index]) {
          const threads = this.forums[index].threads || [];
          threads.push(response);
          this.forums[index].threads = threads;
        }


      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectForum(forum: Forum): void {
    this.selectedForum = forum;
  }
  }
