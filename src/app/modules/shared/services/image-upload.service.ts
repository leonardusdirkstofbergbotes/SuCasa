import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import { ImageFolders } from 'src/app/enums/ImageFolder';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private storage = getStorage();

  uploadImageToFolder (folder: ImageFolders, file: File): Promise<any> {
     const imageRef = ref(this.storage, `${folder}/${file.name}`);

    return uploadBytes(imageRef, file);
  }

  downloadImageFromPath (pathToImage: string): Promise<string> {
    return getDownloadURL(ref(this.storage, pathToImage));
  }
}
