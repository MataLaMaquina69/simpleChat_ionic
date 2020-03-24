import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { promise } from 'protractor';
import { Router } from '@angular/router';
import { resolve } from 'url';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth, private router: Router, private database: AngularFirestore) { }

  login(email: string, password: string) {

    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        // console.log(user.user.uid);
        resolve(user);
      })
      .catch(err  => rejected(err ));
    });
  }

  logout() {
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });


  }

  register(email: string, password: string, name: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(ans => {
        // console.log(ans.user.uid);
        const uid = ans.user.uid;
        this.database.collection('users').doc(uid).set({
          name: name,
          uid: uid
        });
        resolve(ans);
      }).catch(error => reject(error));
    });
  }
}
