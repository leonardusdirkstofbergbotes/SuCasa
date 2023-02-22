import { ImageFolders } from './../../../enums/ImageFolder';
import { ImageUploadService } from './../../shared/services/image-upload.service';
import { SnackBarService } from './../../shared/components/snack-bar/snack-bar.service';
import { ModalComponent } from './../../shared/components/modal/modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from './../../shared/services/category-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category';
import { AlertTypes } from 'src/app/enums/AlertTypes';
import { Subscription } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';

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
  subscription: Subscription = new Subscription();
  
  CATEGORIESTEST = makeStateKey<any>('categoriesTest');

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
    private snackbarService: SnackBarService,
    private state: TransferState
  ) {}

  ngOnInit (): void {
    this.getCategories();
  } 

  getCategories () {

    this.fetchingInitialData = true;
    if (this.state.hasKey(this.CATEGORIESTEST)) {
      this.categories = this.categoryService.formatCategories(this.state.get(this.CATEGORIESTEST, []));
      this.fetchingInitialData = false;
    }
    else {
      this.subscription.add(
          this.categoryService.getAllCategories().subscribe(data => {
            if (data != null) {
              this.state.set(this.CATEGORIESTEST, data);
              console.log('ready');
            }
              
            this.fetchingInitialData = false;
          })
        );
    }
    // this.fetchingInitialData = true;
    // this.subscription.add(
    //   this.categoryService.getAllCategories().subscribe(data => {
    //     if (data != null) {
    //       this.categories = this.categoryService.formatCategories(data);
    //     }

    //     this.fetchingInitialData = false;
    //   })
    // );
  }

  pictureChanged (file: File) {
    this.pictureToSave = file;
  }

  createNewCategory () {
    this.processingInput = true;
    if (this.isFormValid()) {

      this.subscription.add(
        this.categoryService.createNewCategory(this.categoryForm.value, this.pictureToSave as File).subscribe(newCategoryDetails => {
          console.log(newCategoryDetails);
          this.categories.push(newCategoryDetails);
          this.snackbarService.showMessage('New category added', AlertTypes.SUCCESS);
          this.processingInput = false
        })
      );
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

    this.subscription.add(
      this.categoryService.getCategory(categoryId).subscribe(categoryData => {
        this.editCategoryId = categoryId;
        this.categoryForm.patchValue(categoryData);
        this.fetchingFormInfo = false;
      })
    );
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

  deleteCategory (categoryId: string) {
    console.log('delete ', categoryId);
    this.fetchingInitialData = true;
    this.categoryService.deleteCategory(categoryId).subscribe(() => {
      // remove the category from categories array
      this.categories = this.categories.filter((category: Category) => {
        return category.id != categoryId;
      });
      
      this.fetchingInitialData = false;
      this.snackbarService.showMessage('Category deleted', AlertTypes.SUCCESS);
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
