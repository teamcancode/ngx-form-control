import {Component, Input, ViewChild} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, ValidationErrors,} from '@angular/forms';
import {BaseControlComponent} from '../../utils/base-control.component';

@Component({
  selector: 'ngx-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FormInputComponent, multi: true},
    {provide: NG_VALIDATORS, useExisting: FormInputComponent, multi: true}
  ]
})
export class FormInputComponent extends BaseControlComponent {

  @Input() type = 'text';
  @Input() pattern = '';
  @Input() readonly = false;
  @Input() autocomplete = true;
  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() trimResult = true;
  @Input() minLengthErrorMessage = 'Value is too short.';
  @Input() patternErrorMessage = 'Value is not valid.';
  @Input() matchErrorMessage = 'Value does not match.';
  @ViewChild('customInput') customInput: NgModel;

  @Input() set match(value: string) {
    this._match = value || '';
    this.triggerChange();
  }

  private _innerValue: string;
  private _match;

  get value(): string {
    if (!this._innerValue) {
      return '';
    }

    if ('string' !== typeof this._innerValue) {
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

  get hasMatchError(): boolean {
    return !!this._match && this._match !== this.value;
  }

  get hasPatternError(): boolean {
    return this.customInput.errors && this.customInput.errors['pattern'];
  }

  get hasMinLengthError(): boolean {
    return this.customInput.errors && this.customInput.errors['minlength'];
  }

  get invalid(): boolean {
    if (this.hasCustomError) {
      return true;
    }

    if (!this.customInput.touched) {
      return false;
    }

    return this.customInput.invalid || this.hasMatchError || this.hasRequiredError;
  }

  get valid(): boolean {
    if (this.hasCustomError) {
      return false;
    }

    if (!this.customInput.touched) {
      return false;
    }

    return !this.customInput.invalid && !this.hasMatchError && !this.hasRequiredError;
  }

  get errorMessages(): Array<string> {
    if (this.hasCustomError) {
      return this.innerCustomErrorMessages;
    }

    if (this.hasRequiredError) {
      return [this.requiredErrorMessage];
    }

    if (this.hasMatchError) {
      return [this.matchErrorMessage];
    }

    if (this.hasPatternError) {
      return [this.patternErrorMessage];
    }

    if (this.hasMinLengthError) {
      return [this.minLengthErrorMessage];
    }
  }

  writeValue(value: string): void {
    this._innerValue = value;
  }

  validate(): ValidationErrors {
    const result = this.customInput.errors || {};

    if (this.hasRequiredError) {
      result['required'] = true;
    } else {
      delete result['required'];
    }

    if (this.hasMatchError) {
      result['match'] = true;
    }

    return result;
  }

  // noinspection JSUnusedGlobalSymbols
  reset() {
    this.customInput.reset();
  }

}
