import { GeolocationService } from './services/geolocation.service';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { FormTabsComponent } from './components/form/components/form-tabs/form-tabs.component';
import { InputComponent } from './components/input/input.component';
import { FormComponent } from './components/form/form.component';
import { ButtonComponent } from './components/button/button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ButtonComponent,
    FormComponent,
    InputComponent,
    FormTabsComponent,
    ButtonGroupComponent,
    SnackBarComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    GeolocationService
  ],
  exports: [
    ButtonComponent,
    FormComponent,
    InputComponent,
    FormTabsComponent,
    ButtonGroupComponent,
    SnackBarComponent,
  ]
})
export class SharedModule { }
