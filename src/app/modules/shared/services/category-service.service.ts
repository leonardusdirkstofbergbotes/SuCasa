import { ImageUploadService } from './image-upload.service';
import { DefaultImages } from './../../../enums/DefaultImages';
import { Injectable } from '@angular/core';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private db = getDatabase();

  constructor (private imageUploaderService: ImageUploadService) {}

  createNewCategory(formValues: Category): Promise<void> {
    const uniqueId = Math.floor(Date.now() + Math.random());
    return set(ref(this.db, 'categories/' + uniqueId), formValues);
  }

  getAllCategories (): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      get(child(ref(this.db), 'categories/')).then((snapshot) => {
        if (snapshot.exists()) {
          let formattedCategories: Category[] = this.formatCategories(snapshot.val());
          resolve(formattedCategories);
        } else {
          resolve([] as any);
        }
      }).catch((error) => {
        reject(error);
      });
    })
  }

  formatCategories(categories: any): Category[] {
    let formattedCategories: Category[] = [];

    Object.keys(categories).forEach(async uid => {
      let imagePath: string = DefaultImages.CATEGORIES;

      if (categories[uid].imagePath) {
        await this.imageUploaderService.downloadImageFromPath(categories[uid].imagePath).then((downloadUrl: string) => {
          imagePath = downloadUrl;
        });
      }

      formattedCategories.push({...categories[uid], uid: uid, imagePath: imagePath});
    });
    
    return formattedCategories;
  }
}
