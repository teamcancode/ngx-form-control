import { Component, ElementRef, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { BaseListControlComponent } from '../../utils/base-list-control.component';

@Component({
  selector: 'ngx-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FormRadioComponent, multi: true},
    {provide: NG_VALIDATORS, useExisting: FormRadioComponent, multi: true}
  ]
})
export class FormRadioComponent extends BaseListControlComponent {

  @ViewChild('listRadioElement') listRadioElement: ElementRef;

  private _isTouched = false;

  get isEmpty(): boolean {
    return !this._selectedIndexes || !this._selectedIndexes.length;
  }

  get value(): any {
    return this.isEmpty ? null : this._selectOptions[this._selectedIndexes[0]].value;
  }

  get invalid(): boolean {
    if (this.hasCustomError) {
      return true;
    }

    if (!this._isTouched) {
      return false;
    }

    return this.hasRequiredError;
  }

  get valid(): boolean {
    if (this.hasCustomError) {
      return false;
    }

    if (!this._isTouched) {
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

  writeValue(value: any): void {
    const listElement = this.listRadioElement.nativeElement.querySelectorAll('.custom-control-input');

    for (const element of listElement) {
      element.checked = false;
    }

    if (!value) {
      return;
    }

    this._selectedIndexes = this.findIndexes([value]);

    if (!this.listRadioElement || !this.listRadioElement.nativeElement) {
      return;
    }

    if (this.value) {
      setTimeout(() => {
        const index = this._selectedIndexes[0];
        listElement[index].checked = true;
      });
    }
  }

  validate(): ValidationErrors {
    const result = {};

    if (this.hasRequiredError) {
      result['required'] = true;
    }

    return result;
  }

  // noinspection JSMethodCanBeStatic
  toggle(index, event) {
    this._isTouched = true;
    index = +index;

    if (this.required || index !== this._selectedIndexes[0]) {
      this._selectedIndexes = [+index];
    } else {
      this._selectedIndexes = [];
      event.target.checked = false;
    }

    this.triggerChange();
  }

  reset() {
    this._isTouched = false;
  }

}
