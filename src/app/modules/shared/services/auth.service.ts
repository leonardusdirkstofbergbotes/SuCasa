import { SnackBarService } from './../components/snack-bar/snack-bar.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

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

        // perhaps store in local storage or session???
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
      // Signed in 
      const user = userCredential.user;
      this.loginUser(user);
      // ...
    })
    .catch((error) => {
      this.showError(error);
    });
  }

  loginWithGoogle() {
    const auth = getAuth();
    const googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        this.loginUser(user);
        // ...
      }).catch((error) => {
        this.showError(error);
      });
  }

  loginWithFacebook() {
    const auth = getAuth();
    const facebookAuthProvider: FacebookAuthProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookAuthProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        this.loginUser(user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        // const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        this.showError(error);
      });
  }

  loginWithMicrosoft () {
    // TODO: still need to configue app ID
  }

  authenticateCredentials(email: string, password: string) {
    // firebase auth 
  }

  loginUser(user: any) {
    localStorage.setItem('uid', user.uid);
    this.router.navigate(['dashboard']);
  }

  logoutUser() {

  }

  showError (error: Error) {
    this.SnackBarService.message.next({
      message: error.message,
      type: 'error',
      link: undefined
    });
  }

}
