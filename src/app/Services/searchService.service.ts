import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class SearchService {
  private dataUrl;

  constructor(private http: HttpClient) {
    this.dataUrl = `http://localhost:4200/assets/local.json`;
  }

  search(inputVal: string) {
    return this.http.get<[]>(`${this.dataUrl}`)
        .pipe(
            map((arrayFighters$) => arrayFighters$.filter((arrayFighter: any) => arrayFighter.fullName.includes(inputVal)))
        );
  }
}
