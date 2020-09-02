import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserListComponent } from './components/user/user-list/user-list.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'home', component: AppComponent, pathMatch:'full' },
  { path: 'userlist', component: UserListComponent, pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
