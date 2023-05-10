import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Forum} from "../../models/Forum";
import {ForumStatisticsDTO} from "../../models/ForumStatisticsDTO";
import {Thread} from "../../models/Thread";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  public apiUrl = 'http://localhost:8082/test/forum'; // Remplacez l'URL par celle de votre backend Spring Boot

  constructor(private http: HttpClient) { }

  searchForums(query: string): Observable<Forum[]> {
    return this.http.get<Forum[]>(`${this.apiUrl}/search?query=${query}`);
  }
  getForumsPaginated(page: number, pageSize: number): Observable<any> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.http.get<any>(`${this.apiUrl}?_start=${startIndex}&_end=${endIndex}`);
  }
  retrieveAllForums(): Observable<Forum[]> {
    return this.http.get<Forum[]>(`${this.apiUrl}/retrieveAllForums`);
  }

  addForum(forum: Forum): Observable<Forum> {
    return this.http.post<Forum>(`${this.apiUrl}/addForum`, forum);
  }

  updateForum(forum: Forum): Observable<Forum> {
    return this.http.put<Forum>(`${this.apiUrl}/updateForum`, forum);
  }

  retrieveForum(idForum: number): Observable<Forum> {
    return this.http.get<Forum>(`${this.apiUrl}/retrieveForum/${idForum}`);
  }

  deleteForum(idForum: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteForum/${idForum}`);
  }

  getForumStatistics(): Observable<ForumStatisticsDTO> {
    return this.http.get<ForumStatisticsDTO>(`${this.apiUrl}/forum/statistics`);
  }

  addThreadToForum(forumId: number, threadRequest: Thread): Observable<Thread> {
    return this.http.post<Thread>(`${this.apiUrl}/${forumId}/threads`, threadRequest);
  }
}
