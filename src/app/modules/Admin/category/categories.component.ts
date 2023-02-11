import { ModalComponent } from './../../shared/components/modal/modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from './../../shared/services/category-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  
  @ViewChild('newCategoryModal') newCategoryModal!: ModalComponent; 

  loading: boolean = false;
  categories: Category[] = [];
  newCategoryForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    description: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    imagePath: new FormControl("", [Validators.maxLength(200)]),
    active: new FormControl(true, [Validators.required]),
    activeUntil: new FormControl(""),
    dailyCutoffTime: new FormControl(""),
    promote: new FormControl(false, [Validators.required])
  });

  pictureToSave!: File;

  constructor (private categoryService: CategoryService) {}

  ngOnInit (): void {
    this.getCategories();
  } 

  async getCategories () {
    this.loading = true;
    await this.categoryService.getAllCategories().then((categories: Category[]) => {
      this.categories = categories;
    }).catch((error) => {
      console.log(error);
    });

    this.loading = false;
  }

  pictureChanged (file: File) {
    this.pictureToSave = file;
  }

  async createNewCategory () {
    if (this.newCategoryForm.valid) {
      this.loading = true;
      // first check if name doesnt already exist

      // then do something with the picture
      // actual picture path needs to be added to DB

      await this.categoryService.createNewCategory(this.newCategoryForm.value).then(() => {
        // the categories Array needs to be updated (hopefully without a DB query)
        this.newCategoryModal?.close();
      }).catch((error) => {
        console.log('error occured');
      });
    } 

    else this.newCategoryForm.markAllAsTouched();
    this.loading = false;
  }
}
