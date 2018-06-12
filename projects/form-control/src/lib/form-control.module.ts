import { NgModule } from '@angular/core';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormRadioComponent } from './form-radio/form-radio.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormSelect2Component } from './form-select2/form-select2.component';
import { FormTextareaComponent } from './form-textarea/form-textarea.component';
import { FormToggleComponent } from './form-toggle/form-toggle.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    FormCheckboxComponent,
    FormInputComponent,
    FormRadioComponent,
    FormSelectComponent,
    FormSelect2Component,
    FormTextareaComponent,
    FormToggleComponent,
  ],
  exports: [
    FormCheckboxComponent,
    FormInputComponent,
    FormRadioComponent,
    FormSelectComponent,
    FormSelect2Component,
    FormTextareaComponent,
    FormToggleComponent,
  ]
})
export class FormControlModule {
}
