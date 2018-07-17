import { Component, OnInit } from '@angular/core';
import { Application } from '../application/application.modal';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationService } from '../_services/application.service';

@Component({
  selector: 'app-application-new',
  templateUrl: './application-new.component.html',
  styleUrls: ['./application-new.component.scss']
})
export class ApplicationNewComponent implements OnInit {
  application : Application = new Application();  
  constructor(private _applicationService : ApplicationService, private router : Router) { }

  ngOnInit() {
  }

  createApplication(){
    console.log('here');
    this._applicationService.createApplication(this.application)
        .subscribe(
          data => { this.router.navigate(['dashboard/list']); },
          err => { Observable.throw(err);console.log(err);
          }
        );
  }

}
