import { DefaultImages } from './src/app/enums/DefaultImages';
import 'zone.js/node';

import { FIREBASE } from './src/app/configs/keys';
import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, remove } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


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
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);
const storage = getStorage(firebase);

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const cors = require('cors');
  const fileUpload = require('express-fileupload');
  const path = require('path');
  const distFolder = join(process.cwd(), 'dist/Su-Casa/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // For legacy browser support
  };
  const db = getDatabase();

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);
  server.use(cors(corsOptions));
  server.use(express.json());
  server.use(express.urlencoded({extended: true})); 

  // CATEGORIES END POINTS

  // POST categories {formdata}
  server.post('/api/categories', (req: any, res: any) => {
    const pictureToSave = req.body.pictureToSave;
    let storagePath: string = DefaultImages.CATEGORIES;

    if (pictureToSave != null) {
      // save file first and get storage path. 
      const fileToSave = path.join(__dirname, 'assests', 'images', 'categories', `${pictureToSave.name}`);

      pictureToSave.mv(fileToSave, (error: any) => {
        if (error) {
          return res.status(500).send(error);
        }
        else {
          storagePath = fileToSave;
        }
      });
    };

    const formData = {
      ...req.body,
      imagePath: storagePath
    };
  
    const uniqueId = Math.floor(Date.now() + Math.random());
    set(ref(db, 'categories/' + uniqueId), formData).then(() => {
      res.status(200).send({
        id: uniqueId.toString(),
        storagePath: storagePath
      });
    }).catch(error => {
      res.status(400).send(error);
    });
  });

  // GET category {categoryId}
  server.get('/api/categories/:categoryId', (req: any, res: any) => {
    get(child(ref(db), `categories/${req.params.categoryId}`)).then(data => {
      return res.status(200).send(data);
    }).catch(error => {
      return res.status(400).send(error);
    });
  });

  // PATCH categories {categoryId, formData}
  server.patch('/api/categories/:categoryId', (req: any, res: any) => {
    set(ref(db, `categories/${req.params.categoryId}`), req.params.formData).then(() => {
      res.status(200).send();
    }).catch(error => {
      res.status(400).send(error);
    })
  });

  // DELETE category {categoryId}
  server.delete('/api/categories/:categoryId', (req: any, res: any) => {
    remove(ref(db, `categories/${req.params.categoryId}`)).then(() => {
      // also delete the file if it exists and its not the default image;
      res.status(200).send();
    }).catch(error => {
      res.status(400).send(error);
    })
  });

  // GET all categories
  server.get('/api/categories', (req:any, res: any) => {
    get(child(ref(db), 'categories/')).then(data => {
      return res.status(200).send(data);
    }).catch(error => {
      res.status(400).send(error);
    });
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
