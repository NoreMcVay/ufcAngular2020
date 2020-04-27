import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class FetchingDataService {
private dataUrl;
idNumberValue = new Subject<any>();
deletedArray = [];
nonDeletedArray = [];

getidNumberUpdateListener() {
  return this.idNumberValue.asObservable();
}

  constructor(private http: HttpClient) {
    this.dataUrl = `http://localhost:4200/assets`;
  }

  getData() {
    return this.http.get<[]>(`${this.dataUrl}/local.json`);
  }

  getFighterDataById(fighterId) {
    return this.http.get<[]>(`${this.dataUrl}/local.json`)
    .pipe(
      map(
        // tslint:disable-next-line:triple-equals
        (fighters) => fighters.filter((fighter: any) => fighter.id == fighterId)
      )
    );
  }


}
