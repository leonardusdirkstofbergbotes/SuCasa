import { ImageFolders } from './../../../enums/ImageFolder';
import { ImageUploadService } from './../../shared/services/image-upload.service';
import { SnackBarService } from './../../shared/components/snack-bar/snack-bar.service';
import { ModalComponent } from './../../shared/components/modal/modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from './../../shared/services/category-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category';
import { AlertTypes } from 'src/app/enums/AlertTypes';

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
    imagePath: new FormControl(null, [Validators.maxLength(1000)]),
    active: new FormControl(true, [Validators.required]),
    activeUntil: new FormControl(null),
    dailyCutoffTime: new FormControl(null),
    promote: new FormControl(false, [Validators.required])
  });

  pictureToSave!: File;

  constructor (
    private categoryService: CategoryService,
    private imageUploadService: ImageUploadService,
    private snackbarService: SnackBarService
  ) {}

  ngOnInit (): void {
    this.getCategories();
  } 

  async getCategories () {
    this.loading = true;
    await this.categoryService.getAllCategories().then((categories: Category[]) => {
      this.categories = categories;
      console.log(this.categories);
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
      if (this.categories.find((category: Category) => {
        return category.name == this.newCategoryForm.value;
      }) == undefined) {       
        // add picture to firebase storage and reference the path
        await this.imageUploadService.uploadImageToFolder(ImageFolders.CATEGORIES, this.pictureToSave).then((storageInfo) => {          
          this.newCategoryForm.patchValue({
            imagePath: storageInfo.metadata.fullPath
         });
        }).catch(error => {
          console.log(error);
        })

        await this.categoryService.createNewCategory(this.newCategoryForm.value).then(() => {
          // the categories Array needs to be updated (hopefully without a DB query)

          this.newCategoryModal?.close();
        }).catch((error) => {
          console.log('error occured');
        });
      }
      else this.snackbarService.showMessage("This category name already exists", AlertTypes.ERROR);      
    } 

    else this.newCategoryForm.markAllAsTouched();
    this.loading = false;
  }
}
