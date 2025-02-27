import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userDataUrl = 'assets/user.json';

  constructor(private readonly http: HttpClient) {}

  getUserData(): Observable<User> {
    return this.http
      .get<User>(this.userDataUrl, {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
        responseType: 'json',
      })
      .pipe(
        map(user => {
          return user;
        }),
        catchError(error => {
          return throwError(() => new Error(`Failed to load user data: ${error.message}`));
        }),
      );
  }
}
