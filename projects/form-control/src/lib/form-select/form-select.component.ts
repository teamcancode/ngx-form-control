import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel, ValidationErrors} from '@angular/forms';
import {BaseListControlComponent} from '../../utils/base-list-control.component';

@Component({
  selector: 'ngx-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FormSelectComponent, multi: true},
    {provide: NG_VALIDATORS, useExisting: FormSelectComponent, multi: true}
  ]
})
export class FormSelectComponent extends BaseListControlComponent {

  @ViewChild('customSelect') customSelect: NgModel;
  @ViewChild('customSelectElement') customSelectElement: ElementRef;

  get multiple() {
    return this._multiple;
  }

  @Input() set multiple(value: boolean) {
    this._multiple = value;
  }

  get isEmpty(): boolean {
    return !this._selectedIndexes ||
      !this._selectedIndexes.length ||
      (1 === this._selectedIndexes.length && -1 === this._selectedIndexes[0]);
  }

  get value(): any {
    if (this.isEmpty) {
      return null;
    }

    if (this._multiple) {
      return this._selectedIndexes.map(index => this._selectOptions[index].value);
    } else {
      const index = this._selectedIndexes[0];
      return this.selectOptions[index].value;
    }
  }

  get invalid(): boolean {
    if (this.hasCustomError) {
      return true;
    }

    if (!this.customSelect.touched) {
      return false;
    }

    return this.customSelect.invalid || this.hasRequiredError;
  }

  get valid(): boolean {
    if (this.hasCustomError) {
      return false;
    }

    if (!this.customSelect.touched) {
      return false;
    }

    return !this.customSelect.invalid && !this.hasRequiredError;
  }

  get errorMessages(): Array<string> {
    if (this.hasRequiredError) {
      return [this.requiredErrorMessage];
    }

    if (this.hasCustomError) {
      return this.innerCustomErrorMessages;
    }
  }

  writeValue(value: any | Array<any>): void {
    if (!this.multiple) {
      value = [value];
    }

    this._selectedIndexes = this.findIndexes(value);
  }

  validate(): ValidationErrors {
    const result = this.customSelect.errors || {};

    if (this.hasRequiredError) {
      result['required'] = true;
    } else {
      delete result['required'];
    }

    return result;
  }

  reset() {
    this.customSelect.reset();
  }

}
