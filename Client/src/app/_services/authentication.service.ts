import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  private apiRoot : String = 'http://172.19.141.215:3000/api';
  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post<any>('${apiRoot}/users/token', user)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
