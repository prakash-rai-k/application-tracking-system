import { AuthenticationService } from './../_services/authentication.service';

import { Component, OnInit } from '@angular/core';
import { User } from '../register/user.modal';
import { UserService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user : User = new User();
  constructor(private _userService : UserService, private router: Router, _authService : AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(){
    this._userService.login(this.user)
          .subscribe(
            data => {
              console.log(data);
              console.log(data['token']);
              console.log(data['userId']);

              if(!(data['token'] === 'NOT_VALID')){
                localStorage.setItem('ATS_TOKEN', data['token'].toString());
                localStorage.setItem("ATS_USERID", data['userId']);
                this.router.navigate(['dashboard'])
              }
            },
            err => console.log(err)
          );      
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
