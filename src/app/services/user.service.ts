import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:8080/api/v1/users';
  users: User[];

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get(`${this.baseUrl}`).pipe(
      map((res) => {
        this.users = Object.values(res);
        return this.users;
      })
    );
  }
}
