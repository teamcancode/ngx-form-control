import { Component, Input } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { BaseControlComponent } from '../../utils/base-control.component';

@Component({
  selector: 'ngx-form-toggle',
  templateUrl: './form-toggle.component.html',
  styleUrls: ['./form-toggle.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FormToggleComponent, multi: true},
    {provide: NG_VALIDATORS, useExisting: FormToggleComponent, multi: true}
  ]
})
export class FormToggleComponent extends BaseControlComponent {

  @Input() type: 'checkbox' | 'toggle' = 'checkbox';
  private _innerValue = false;
  private _isTouch = false;

  get value(): boolean {
    return this._innerValue;
  }

  set value(value: boolean) {
    this._isTouch = true;
    this._innerValue = value;
    this.triggerChange();
  }

  get invalid(): boolean {
    if (this.hasCustomError) {
      return true;
    }

    if (!this._isTouch) {
      return false;
    }

    return this.hasRequiredError;
  }

  get valid(): boolean {
    if (this.hasCustomError) {
      return false;
    }

    if (!this._isTouch) {
      return false;
    }

    return !this.hasRequiredError;
  }

  get errorMessages(): Array<string> {
    if (this.hasCustomError) {
      return this.innerCustomErrorMessages;
    }

    if (this.hasRequiredError) {
      return [this.requiredErrorMessage];
    }
  }

  get isCheckboxType() {
    return 'checkbox' === this.type;
  }

  get isToggleType() {
    return !this.isCheckboxType;
  }

  writeValue(value: boolean): void {
    this._innerValue = value;
  }

  validate(): ValidationErrors {
    const result = {};

    if (this.hasRequiredError) {
      result['required'] = true;
    }

    return result;
  }

  reset() {
    this._isTouch = false;
  }

}
