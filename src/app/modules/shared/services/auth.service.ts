import { SnackBarService } from './../components/snack-bar/snack-bar.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail  } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private SnackBarService: SnackBarService) { }

  registerNewUser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.loginUser(user);
      })
      .catch((error) => {
        this.showError(error);
      });
  }

  loginWithEmailAndPassword (email: string, password: string) {
    const auth = getAuth();
    const googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      this.loginUser(user);
      // ...
    })
    .catch((error) => {
      this.showError(error);
    });
  }


  resetPassword (email: string) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        this.SnackBarService.message.next({
          message: "A reset link has been sent to your email address. Please follow the steps in the email",
          type: 'success',
          link: undefined
        });
      })
      .catch((error) => {
        this.showError(error);
      });
  }


  loginUser(user: any) {
    localStorage.setItem('uid', user.uid);
  }

  logoutUser() {
    localStorage.removeItem('uid');
  }

  private showError (error: Error) {
    this.SnackBarService.message.next({
      message: error.message,
      type: 'error',
      link: undefined
    });
  }

}
