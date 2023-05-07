import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Reaction} from "../../models/Reaction";
import {ReactionType} from "../../models/ReactionType";


@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  public apiUrl = 'http://localhost:8082/test/reaction'; // Remplacez cela par votre URL de l'API Spring Boot

  constructor(private http: HttpClient) { }

  addReactionToForum(reaction: Reaction, forumId: number): Observable<Reaction> {
    return this.http.post<Reaction>(`${this.apiUrl}/forum/${forumId}`, reaction);
  }

  addReactionToThread(reaction: Reaction, threadId: number): Observable<Reaction> {
    return this.http.post<Reaction>(`${this.apiUrl}/thread/${threadId}`, reaction);
  }

  getAllReactionsByPost(id: number): Observable<Reaction[]> {
    return this.http.get<Reaction[]>(`${this.apiUrl}/forum/${id}`);
  }

  getAllReactionsByForumAndOwner(forumId: number, userId: number): Observable<Reaction[]> {
    return this.http.get<Reaction[]>(`${this.apiUrl}/forum/${forumId}/owner/${userId}`);
  }

  getAllReactionsByComment(id: number): Observable<Reaction[]> {
    return this.http.get<Reaction[]>(`${this.apiUrl}/thread/${id}`);
  }

  getAllReactionsByThreadAndOwner(threadId: number, userId: number): Observable<Reaction[]> {
    return this.http.get<Reaction[]>(`${this.apiUrl}/thread/${threadId}/owner/${userId}`);
  }

  getNbrOfReactionsByForumAndType(forumId: number, type: ReactionType): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/forum/${forumId}/type/${type}`);
  }

  getNbrOfReactionsByThreadAndType(threadId: number, type: ReactionType): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/thread/${threadId}/type/${type}`);
  }

  getPostReactionsForEveryType(forumId: number): Observable<Reaction[]> {
    return this.http.get<Reaction[]>(`${this.apiUrl}/details/forum/${forumId}`);
  }

  getThreadReactionsForEveryType(threadId: number): Observable<Reaction[]> {
    return this.http.get<Reaction[]>(`${this.apiUrl}/details/thread/${threadId}`);
  }
}
