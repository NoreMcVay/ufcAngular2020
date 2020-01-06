import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FetchingDataService {
private dataUrl;

  constructor(private http: HttpClient) {
    this.dataUrl = `http://localhost:4200/assets`;
  }

  getData() {
    return this.http.get<[]>(`${this.dataUrl}/local.json`);
  }

}
