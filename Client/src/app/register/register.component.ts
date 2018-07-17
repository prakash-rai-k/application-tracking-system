import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.modal';

import { Observable } from 'rxjs';
import { UserService } from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user:User = new User();
  @ViewChild('f') userForm;

  constructor(private _userService : UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    //this.createUser();
  }

  createUser(){
    this._userService.createUser(this.user)
        .subscribe(
          data => this.router.navigate(['login']),
          err => Observable.throw(err)
        );
  }

}
