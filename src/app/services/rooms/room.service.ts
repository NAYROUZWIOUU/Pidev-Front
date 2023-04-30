import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from 'src/app/models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = 'http://localhost:8092/test/room';

  constructor(private http: HttpClient) { }

  retrieveAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/retrieveAllRooms`);
  }

  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.baseUrl}/addRoom`, room);
  }

  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.baseUrl}/updateRoom`, room);
  }

  retrieveRoom(idRoom: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}/Room/${idRoom}`);
  }

  deleteRoom(idRoom: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteRoom/${idRoom}`);
  }

  assignMembershiptoRoom(idRoom: number, idFmembership: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/assignMembershiptoRoom/${idRoom}/${idFmembership}`, null);
  }
}
