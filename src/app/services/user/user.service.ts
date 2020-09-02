import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  createUser(user: User){
    return this.firestore.collection('users').add(user);
  }

  updateUser(user: User){
    delete user.userId;
    this.firestore.doc('users/' + user.userId).update(user);
  } 

  deleteUser(policyId: string){
    this.firestore.doc('users/' + policyId).delete();
  }

}
