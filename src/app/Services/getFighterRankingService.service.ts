import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GetFighterRankingService {
private dataUrl;

  constructor(private http: HttpClient) {
    this.dataUrl = `http://localhost:4200/assets`;
  }

  getData() {
    return this.http.get<[]>(`${this.dataUrl}/fighterRankings.json`);
  }
}
