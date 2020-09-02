import { Component, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Subscription } from 'rxjs';
import { trace } from '@angular/fire/performance';
import { map, tap } from 'rxjs/operators';
//import firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularfirebaseweb';

  private readonly userDisposable: Subscription|undefined;
  showLoginButton = false;
  showLogoutButton = false;

  constructor(public readonly auth: AngularFireAuth, @Inject(PLATFORM_ID) platformId: object) {
    debugger;
    if (!isPlatformServer(platformId)) {
      this.userDisposable = this.auth.authState.pipe(
        trace('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }
  }

  ngOnInit(): void { }

  login() {
    //this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }

}
