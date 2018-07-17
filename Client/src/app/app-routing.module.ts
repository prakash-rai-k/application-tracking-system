import { ApplicationEditComponent } from './application-edit/application-edit.component';
import { ApplicationNewComponent } from './application-new/application-new.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'register', component:RegisterComponent},
  //{path:'dashboard', component:DashboardComponent, canActivate : [AuthGuard]},
  {
    path: 'dashboard',
    component:DashboardComponent, canActivate : [AuthGuard],
    children: [
      {path: '', redirectTo: 'list', pathMatch :'full'}, 
      {path: 'list', component: ApplicationListComponent}, 
      {path: 'new', component: ApplicationNewComponent},
      {path: 'edit/:id', component: ApplicationEditComponent} 
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
