import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {BlockFoyer} from "../../models/blockfoyer";

@Injectable({
  providedIn: 'root'
})
export class BlockfoyerService {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  b: boolean = false;
  text: string = "";

  apiUrl = "http://localhost:8082/test/blockfoyer";

  constructor(private http: HttpClient) {}

  getAllBlockFoyers(): Observable<BlockFoyer[]> {
    return this.http.get<BlockFoyer[]>(this.apiUrl +"/getAllBlockFoyers");
  }

  removeBlockFoyer(idBlock: number): Observable<BlockFoyer> {
    return this.http.delete<BlockFoyer>(
      this.apiUrl + "/removeBlockFoyer/" + idBlock
    );
  }

  addBlockFoyer(blockfoyer: BlockFoyer): Observable<BlockFoyer> {
    return this.http.post<BlockFoyer>(
      this.apiUrl + "/addBlockFoyer",
      blockfoyer,
      this.httpOptions
    );
  }

  updateBlockFoyer(blockfoyer: BlockFoyer, idBlock: number,): Observable<BlockFoyer> {
    return this.http.put<BlockFoyer>(
      this.apiUrl + "/updateBlockFoyer/" + idBlock + "/"+blockfoyer.nameBlock+"/"+blockfoyer.roomNbr+"/"+blockfoyer.placement+"/"+blockfoyer.rooms+"/"+blockfoyer.foyer,
      BlockFoyer,
      this.httpOptions
    );
  }

  getBlockFoyer(idBlock: number): Observable<BlockFoyer> {
    return this.http.get<BlockFoyer>(this.apiUrl + "/getBlockFoyer/" + idBlock);
  }

}

