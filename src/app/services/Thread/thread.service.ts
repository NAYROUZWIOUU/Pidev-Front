import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Thread} from "../../models/Thread";

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  public baseUrl = 'http://localhost:8082/test/thread';
  public baseUrl1 = 'http://localhost:8082/test/forum';

  constructor(private http: HttpClient) { }

  getAllThreads(): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.baseUrl}/retrieveAllThreads`);
  }

  getThreadById(id: number): Observable<Thread> {
    return this.http.get<Thread>(`${this.baseUrl}/retrieveThread/${id}`);
  }

  addThread(thread: Thread, forumId: number): Observable<Thread> {
    return this.http.post<Thread>(`${this.baseUrl}/addThread/${forumId}`, thread);
  }
  addThreadtoForum(thread: any, forumId: number): Observable<Thread> {
    console.log(forumId)
    return this.http.post<Thread>(`${this.baseUrl1}/${forumId}/threads`, thread);
  }

  updateThread(thread: Thread, threadId: number): Observable<Thread> {
    return this.http.put<Thread>(`${this.baseUrl}/updateThread/${threadId}`, thread);
  }

  deleteThread(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteThread/${id}`, { responseType: 'text' });
  }

  getAllThreadsByForum(id: any): Observable<Thread[]> {
    console.log(id)
    return this.http.get<Thread[]>(`${this.baseUrl}/forum/${id}`);
  }

  getAllThreadsByForumAndOwner(forumId: number, userId: number): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.baseUrl}/forum/${forumId}/owner/${userId}`);
  }

  getAllRepliesByThread(id: number): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.baseUrl}/comment/${id}`);
  }

  replyToThread(thread: Thread, threadId: number): Observable<Thread> {
    return this.http.post<Thread>(`${this.baseUrl}/reply/${threadId}`, thread);
  }
}
