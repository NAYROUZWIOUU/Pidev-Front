import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Reward } from "src/app/models/reward";
@Injectable({
  providedIn: 'root'
})
export class RewardService {
  private baseUrl = 'http://localhost:8083/test';

  constructor(private http: HttpClient) { }

  createReward(reward: Reward): Observable<Reward> {
    return this.http.post<Reward>(`${this.baseUrl}/createReward`, reward);
  }

  getRewardById(rewardId: number): Observable<Reward> {
    return this.http.get<Reward>(`${this.baseUrl}/getRewardById/${rewardId}`);
  }

  getAllRewards(): Observable<Reward[]> {
    return this.http.get<Reward[]>(`${this.baseUrl}/getAllRewards`);
  }

  updateReward(rewardId: number, reward: Reward): Observable<Reward> {
    return this.http.put<Reward>(`${this.baseUrl}/updateReward/${rewardId}`, reward);
  }

  deleteReward(rewardId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteReward/${rewardId}`);
  }

  addRewardIfGoldMembership(fidelityCardId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/addRewardIfGoldMembership?fidelityCardId=${fidelityCardId}`, {});
  }

  addRewardIfSILVERMembership(fidelityCardId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/addRewardIfSILVERMembership?fidelityCardId=${fidelityCardId}`, {});
  }

  addRewardIfBRONZEMembership(fidelityCardId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/addRewardIfBRONZEMembership?fidelityCardId=${fidelityCardId}`, {});
  }

  giveRewards(fidelityCardId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/giveRewards?fidelityCardId=${fidelityCardId}`, {});
  }
}
