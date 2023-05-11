import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from 'src/app/models/room';
import { BlockFoyer } from 'src/app/models/blockfoyer';

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  private baseUrl = 'http://localhost:8092/test/blockfoyer';

  constructor(private http: HttpClient) {}

  retrieveAllBlocks() {
    return this.http.get(`${this.baseUrl}/getAllBlockFoyers`);
  }
  retrieveBlock(id: number) {
    return this.http.get(`${this.baseUrl}/getBlockFoyer/` + id);
  }
}
