import { Component, Input, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, ValidationErrors, } from '@angular/forms';
import { BaseControlComponent } from '../../utils/base-control.component';

@Component({
  selector: 'ngx-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FormTextareaComponent, multi: true},
    {provide: NG_VALIDATORS, useExisting: FormTextareaComponent, multi: true}
  ]
})
export class FormTextareaComponent extends BaseControlComponent {

  @Input() rows = 5;
  @Input() readonly = false;
  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() trimResult = true;
  @Input() minLengthErrorMessage = 'Value is too short.';
  @ViewChild('customTextarea') customTextarea: NgModel;
  private _innerValue: string;

  get value(): string {
    if (!this._innerValue) {
      return '';
    }

    if ('string' !== typeof  this._innerValue) {
      return this._innerValue;
    }

    return this.trimResult ? this._innerValue.trim() : this._innerValue;
  }

  set value(value: string) {
    if (value !== this._innerValue) {
      this._innerValue = value;
      this.triggerChange();
    }
  }

  get hasMinLengthError(): boolean {
    return this.customTextarea.errors && this.customTextarea.errors['minlength'];
  }

  get invalid(): boolean {
    if (this.hasCustomError) {
      return true;
    }

    if (!this.customTextarea.touched) {
      return false;
    }

    return this.customTextarea.invalid || this.hasRequiredError;
  }

  get valid(): boolean {
    if (this.hasCustomError) {
      return false;
    }

    if (!this.customTextarea.touched) {
      return false;
    }

    return !this.customTextarea.invalid && !this.hasRequiredError;
  }

  get errorMessages(): Array<string> {
    if (this.hasCustomError) {
      return this.innerCustomErrorMessages;
    }

    if (this.hasRequiredError) {
      return [this.requiredErrorMessage];
    }

    if (this.hasMinLengthError) {
      return [this.minLengthErrorMessage];
    }
  }

  writeValue(value: string): void {
    this._innerValue = value;
  }

  validate(): ValidationErrors {
    const result = this.customTextarea.errors || {};

    if (this.hasRequiredError) {
      result['required'] = true;
    } else {
      delete result['required'];
    }

    return result;
  }

  // noinspection JSUnusedGlobalSymbols
  reset() {
    this.customTextarea.reset();
  }

}
