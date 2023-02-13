import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { FIREBASE } from './app/configs/keys';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE.ApiKey,
  authDomain: FIREBASE.AuthDomain,
  projectId: FIREBASE.ProjectId,
  storageBucket: FIREBASE.StorageBucket,
  messagingSenderId: FIREBASE.MessagingSenderId,
  appId: FIREBASE.AppId,
  databaseURL: FIREBASE.DatabaseURL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);