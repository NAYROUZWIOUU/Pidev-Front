import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ForumService} from "../../../../services/Forum/forum.service";
import {Forum} from "../../../../models/Forum";
import {Thread} from "../../../../models/Thread";
import {ForumStatisticsDTO} from "../../../../models/ForumStatisticsDTO";
import {ReactionService} from "../../../../services/Reaction/reaction.service";
import {Reaction} from "../../../../models/Reaction";
import {ReactionType} from "../../../../models/ReactionType";
import {Observable} from "rxjs";

@Component({
  selector: 'app-forum-front',
  templateUrl: './forum-front.component.html',
  styleUrls: ['./forum-front.component.css']
})
export class ForumFrontComponent implements OnInit{
  forums: Forum[]=[];
  // forumsToShow: Forum[]=[];
  currentPage: number = 1;
  pageSize: number = 4;
  pagesToShow: number[]=[];
  selectedForum: Forum={}as Forum;
  query: string='';
  list!: Forum[];
  showAddForm = false;
  showUpdateForm = false;
  forumStatistics: ForumStatisticsDTO={} as ForumStatisticsDTO;
  reaction :Reaction = new Reaction();
  ReactionType: ReactionType[]=[];






  constructor(private forumService: ForumService,private reactionService: ReactionService , private fb: FormBuilder,public layoutService: LayoutService, public router: Router, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.retrieveAllForums();
    this.getReactionsForForums();


  }
  // addReaction(reactionType: ReactionType, forumId: number) {
  //
  //   this.reactionService.addReactionToForum(reactionType, forumId)
  //     .subscribe(response => {
  //       // Mettez à jour les réactions du forum pour afficher la réaction ajoutée
  //       const index = this.forums.findIndex(f => f.id === forumId);
  //       if (index !== -1) {
  //         if (!this.forums[index].reactions) {
  //           this.forums[index].reactions = [];
  //         }
  //         this.forums[index].reactions!.push(response);
  //       }
  //     }, error => {
  //       console.log(error);
  //     });
  // }

  addReaction(forum: Forum, reactionTypeStr: string) {
    const reactionType: ReactionType = ReactionType[reactionTypeStr as keyof typeof ReactionType];
    const reaction: Reaction = { reactionType, forum };
    this.reactionService.addReactionToForum(reaction,forum.id).subscribe(() => {
      // do something after adding the reaction
    });
  }
  getReactionsForForums(): void {
    for (const forum of this.forums) {
      this.reactionService.getPostReactionsForEveryType(forum.id).subscribe((reactions) => {
        forum.reactions = reactions;
      });
    }
  }
  getReactionCount(forum: Forum, reactionType: ReactionType): number {
    if (forum.reactions) {
      return forum.reactions.filter((reaction) => reaction.reactionType === reactionType).length;
    }
    return 0;
  }




  getForumStatistics(): void {
    this.forumService.getForumStatistics()
      .subscribe(forumStatistics => this.forumStatistics = forumStatistics);
  }
  setCurrentPage(page: number): void {
    // set the current page number
    this.currentPage = page;
    // calculate the index of the first forum to display on the current page
    const startIndex = (this.currentPage - 1) * this.pageSize;
    // slice the forums array to get the forums to display on the current page
    this.forums = this.forums.slice(startIndex, startIndex + this.pageSize);
    // calculate the array of page numbers to display in the pagination
    const totalPages = Math.ceil(this.forums.length / this.pageSize);
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(totalPages, this.currentPage + 2);
    this.pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
  selectForum(forum: Forum): void {
    // set the selected forum
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

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }
  toggleUpdateForm(forum: Forum) {
    this.selectedForum = forum;
    this.showUpdateForm = !this.showUpdateForm;
  }



  searchForums(): void {
    if (this.query) {
      this.forumService.searchForums(this.query)
        .subscribe(forums => {
          this.forums = forums;
          this.setCurrentPage(1); // Réinitialise la page courante à 1 après une recherche
        });
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


  }
