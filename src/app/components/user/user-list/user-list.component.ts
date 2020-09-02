import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user.model';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  email: string;
  password: string;
  users: User[];
  constructor(private userService: UserService, public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          userId: e.payload.doc.data()['userId'],
          userName: e.payload.doc.data()['userName'],
          email: e.payload.doc.data()['email'],
          password: e.payload.doc.data()['password'],
          createdDate: e.payload.doc.data()['createdDate'],
          userRole: e.payload.doc.data()['userRole']
        } as User;
      })
    });
    
  }

  create(user: User){
      this.userService.createUser(user);
  }

  update(user: User) {
    this.userService.updateUser(user);
  }

  delete(id: string) {
    this.userService.deleteUser(id);
  }


  signUp() {
    console.log("Sign Up!!");
    console.log({"Email: ": this.email, "Password: ": this.password});
    this.authenticationService.SignUp(this.email, this.password);
    this.email = ''; 
    this.password = '';
  }

  signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = ''; 
    this.password = '';
  }

  signOut() {
    this.authenticationService.SignOut();
  }


}