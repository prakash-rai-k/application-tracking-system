import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {headers :new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable()
export class ApplicationService {
  //private apiRoot: string = 'http://172.19.141.215:3000/api';
  private apiRoot: string = 'https://hidden-atoll-61671.herokuapp.com/api';
  constructor(private httpClient: HttpClient) { }

  getApplications() {
    console.log(localStorage["ATS_USERID"]);
    return this.httpClient.get(`${this.apiRoot}/applications/user?userId=${localStorage["ATS_USERID"]}`);
  }

  getApplicationById(id){
    return this.httpClient.get(`${this.apiRoot}/applications/${id}`)
  }

  createApplication(application) {
    application.userId = localStorage["ATS_USERID"];
    let body = JSON.stringify(application);
    return this.httpClient.post(`${this.apiRoot}/applications`, body, httpOptions);
  }

  searchApplication(searchString){
    return this.httpClient.get(`${this.apiRoot}/applications/search?searchString=${searchString}&&userId=${localStorage["ATS_USERID"]}`);
  }

  addFollowups(app, followup){
    app.followUps.push(followup);
    return this.updateApplication(app);
  }

  updateApplication(application) {
    let body = JSON.stringify(application);
    return this.httpClient.put(`${this.apiRoot}/applications`, body, httpOptions);
  }

  deleteApplication(application){
    return this.httpClient.delete(`${this.apiRoot}/applications/${application._id}`)
  }
  
}
