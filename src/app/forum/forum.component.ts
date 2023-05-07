import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Forum } from '../models/Forum';
import { ForumService } from '../services/Forum/forum.service';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  query: string='';
  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  forumForm: FormGroup;
  forums: Forum[];
  selectedForum: Forum = new Forum();

  constructor(private forumService: ForumService, private fb: FormBuilder) {
    this.forumForm = this.fb.group({
      title: ['', Validators.required],
      topic: ['', Validators.required],
      image: ['', Validators.required]
    });
    this.forums = [];
    this.selectedForum = new Forum();
  }

  ngOnInit(): void {
    this.loadForums();
  }

  loadForums(): void {
    this.forumService.retrieveAllForums().subscribe(forums => {
      this.forums = forums;
    });
  }
  searchForums(): void {
    if (this.query) {
      this.forumService.searchForums(this.query)
        .subscribe(forums => this.forums = forums);
    } else {
      this.retrieveAllForums();
    }
  }
  onAddForum(): void {
    const forum = this.forumForm.value as Forum;
    this.forumService.addForum(forum).subscribe(newForum => {
      this.forums.push(newForum);
      this.forumForm.reset();
    });
  }

  onSelectForum(forum: Forum): void {
    this.selectedForum = forum;
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

  onUpdateForum(): void {
    const forum = this.selectedForum;
    const titleControl = this.forumForm.get('title');
    forum.title = titleControl ? titleControl.value : '';
    const topicControl = this.forumForm.get('topic');
    forum.topic = topicControl ? topicControl.value : '';
    const imageControl = this.forumForm.get('image');
    forum.image = imageControl ? imageControl.value : '';
    this.forumService.updateForum(forum).subscribe(updatedForum => {
      const index = this.forums.findIndex(f => f.id === updatedForum.id);
      this.forums[index] = updatedForum;
      this.forumForm.reset();
      this.selectedForum = new Forum();
    });
  }

  onDeleteForum(forum: Forum): void {
    if (forum.id) {
      this.forumService.deleteForum(forum.id).subscribe(() => {
        const index = this.forums.findIndex(f => f.id === forum.id);
        this.forums.splice(index, 1);
        this.selectedForum = new Forum();
      });
    }
  }
}
