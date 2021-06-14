import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getSomething() {
    return this.http.get<any>("https://jsonplaceholder.typicode.com/todos/1");
  }
}
