import { Application } from './../_models/application.modal';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationService } from '../_services/application.service';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.scss']
})
export class ApplicationEditComponent implements OnInit {
  public application;

  constructor(private _applicationService : ApplicationService, private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe(params => {
      this._applicationService.getApplicationById(params.id)
            .subscribe(app => {this.application = app;});
    });
    
  }

  ngOnInit() {}

    updateApplication(){
    this._applicationService.updateApplication(this.application)
        .subscribe(
          data => { this.router.navigate(['dashboard/list']); },
          err => { Observable.throw(err);console.log(err); }
        );
  }

  @ViewChild('newfollowup') newfollowup : ElementRef;//: TextInput;
  addFollowUp(){
    this._applicationService
        .addFollowups(this.application, this.newfollowup.nativeElement.value)
        .subscribe(data => this.application = data);

    this.newfollowup.nativeElement.value = '';
  }

}
