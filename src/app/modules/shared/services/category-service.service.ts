import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DefaultImages } from './../../../enums/DefaultImages';
import { Injectable } from '@angular/core';
import { getDatabase, ref, set, get, child, remove } from 'firebase/database';
import { Category } from 'src/app/models/category';
import { SITESETTINGS } from 'src/app/configs/site-settings';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private db = getDatabase();
  private baseUrl: string = SITESETTINGS.baseUrl;

  constructor (
    private http: HttpClient
  ) {}

  createNewCategory(categoryInputs: any, fileToSave: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', fileToSave);
    formData.append('formData', JSON.stringify(categoryInputs));

    return this.http.post(`${this.baseUrl}/api/categories`, formData);
  }

  updateCategory(categoryId: string, formValues: Category): Promise<void> {
    return set(ref(this.db, `categories/${categoryId}`), formValues);
  }

  getAllCategories (): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/categories`);
  }

  getCategory (categoryId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/categories/${categoryId}`);
  }

  deleteCategory (categoryId: string) {
    return this.http.delete(`${this.baseUrl}/api/categories/${categoryId}`);
  }

  formatCategories(categories: any): Category[] {
    let formattedCategories: Category[] = [];

    Object.keys(categories).forEach(async id => {

      // paths are returned with '\' instead of '/' and we need to remove the 'src/' from the path
      const imagePath = categories[id].imagePath.replace(/\\/g, "/").replace('src/', '');
      formattedCategories.push({...categories[id], id: id, imagePath: imagePath});
    });
    
    return formattedCategories;
  }
}
