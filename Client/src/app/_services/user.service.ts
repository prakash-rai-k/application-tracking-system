import {HttpHeaders, HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';

const httpOptions = { headers :new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable()
export class UserService{
    //private apiRoot : String = 'http://172.19.141.215:3000/api';
    private apiRoot : String = 'https://hidden-atoll-61671.herokuapp.com/api';

    constructor(private httpClient : HttpClient){}

    createUser(user){
        let body = JSON.stringify(user);
        return this.httpClient.post(`${this.apiRoot}/users`, body, httpOptions);
    }

    login(user){
        let body = JSON.stringify(user);
        console.log('here in service');
        return this.httpClient.post(`${this.apiRoot}/users/token`, body, httpOptions);
    }

    logout() {
        localStorage.removeItem('ATS_TOKEN');
      }
}
