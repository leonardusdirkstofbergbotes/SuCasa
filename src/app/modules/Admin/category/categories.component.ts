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
  
  @ViewChild('categoryModal') categoryModal!: ModalComponent; 

  fetchingFormInfo: boolean = false;
  fetchingInitialData: boolean = false;
  processingInput: boolean = false;

  categories: Category[] = [];
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
    description: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    imagePath: new FormControl(null, [Validators.maxLength(1000)]),
    active: new FormControl(true, [Validators.required]),
    activeUntil: new FormControl(null),
    dailyCutoffTime: new FormControl(null),
    promote: new FormControl(false, [Validators.required])
  });

  editCategoryId: string | null = null;
  pictureToSave: File | null = null;

  constructor (
    private categoryService: CategoryService,
    private imageUploadService: ImageUploadService,
    private snackbarService: SnackBarService
  ) {}

  ngOnInit (): void {
    this.getCategories();
  } 

  getCategories () {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = this.categoryService.formatCategories(data);
    })
  }

  pictureChanged (file: File) {
    this.pictureToSave = file;
  }

  async createNewCategory () {
    this.processingInput = true;
    if (this.isFormValid()) {

      this.categoryService.createNewCategory(this.pictureToSave as File).subscribe(newCategoryId => {
        console.log(newCategoryId);
      });
    }
    else this.processingInput = false;
  }

  async fileToBlob (file: File): Promise<Blob>  {
    return new Blob([new Uint8Array(await file.arrayBuffer())], {type: file.type });
  }
  

  editCategory(categoryId: string) {
    this.categoryForm.reset();
    this.categoryModal.open();
    this.fetchingFormInfo = true;

    this.categoryService.getCategory(categoryId).subscribe(categoryData => {
      this.editCategoryId = categoryId;
      this.categoryForm.patchValue(categoryData);
      this.fetchingFormInfo = false;
    });
  }

  async updateCategory () {
    this.processingInput = true;
    if (this.isFormValid()) {
      // check if image has been updated
      // if (this.pictureToSave != null) {
      //   await this.uploadImage().then(storageInfo => {
      //     this.categoryForm.patchValue({
      //       imagePath: storageInfo.metadata.fullPath
      //     });
      //   });
      // }

      // await this.categoryService.updateCategory(this.editCategoryId as string, this.categoryForm.value).then(() => {
      //   this.refresh();
      // }).catch((error) => {
      //   console.log('error occured');
      // });
    }
    else this.processingInput = false;
  }

  isFormValid (): boolean {
    if (this.categoryForm.valid) {
      if (this.isCategoryNameUnique()) {
        return true;
      }
      else this.categoryForm.get('name')?.setErrors({
        notUnique: true
      })
    }
    else this.categoryForm.markAllAsTouched();

    return false;
  }

  uploadImage (): Promise<any> {
    return new Promise((resolve, reject) => {
      this.imageUploadService.uploadImageToFolder(ImageFolders.CATEGORIES, this.pictureToSave as File).then((storageInfo) => { 
        resolve(storageInfo);       
      //   this.categoryForm.patchValue({
      //     imagePath: storageInfo.metadata.fullPath
      //  });
      }).catch(error => {
        reject(error);
      })
    })
  }

  async deleteCategory (categoryId: string) {
    const confirmDelete = confirm("Are you sure you want to delete this category");

    this.fetchingInitialData = true;
    this.categoryService.deleteCategory(categoryId).subscribe(() => {
      console.log('delete complete');
      this.fetchingInitialData = false;
    });
  }

  isCategoryNameUnique () {
    if (this.editCategoryId != null) return true;

    return this.categories.find((category: Category) => {
      return category.name == this.categoryForm.get('name')?.value;
    }) == undefined;
  }

  resetForm () {
    this.categoryForm.reset();
    this.editCategoryId = null;
  }

  refresh() {
    this.categoryModal?.close();
    this.getCategories();
    this.categoryForm.reset();
    this.pictureToSave = null;
    this.editCategoryId = null;
    this.processingInput = false;
  }
}
