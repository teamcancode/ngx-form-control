import { Component, ElementRef, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { BaseListControlComponent } from '../../utils/base-list-control.component';
import * as jQuery from 'jquery';

const $ = jQuery;

@Component({
  selector: 'ngx-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FormCheckboxComponent, multi: true},
    {provide: NG_VALIDATORS, useExisting: FormCheckboxComponent, multi: true}
  ]
})
export class FormCheckboxComponent extends BaseListControlComponent {

  @ViewChild('listRadioElement') listRadioElement: ElementRef;

  private _isTouched = false;

  get isEmpty(): boolean {
    return !this._selectedIndexes || !this._selectedIndexes.length;
  }

  get value(): any {
    return this.isEmpty ? null : this._selectedIndexes.map(index => this._selectOptions[index].value);
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

  writeValue(value: Array<any>): void {
    $(this.listRadioElement.nativeElement).find('.custom-control-input').prop('checked', false);

    if (!value) {
      return;
    }

    this._selectedIndexes = this.findIndexes(value);

    if (!this.listRadioElement || !this.listRadioElement.nativeElement) {
      return;
    }

    if (this.value) {
      setTimeout(() => {
        const listCheckbox = $(this.listRadioElement.nativeElement).find('.custom-control-input');
        this._selectedIndexes.map(index => {
          listCheckbox.eq(index).prop('checked', true);
        });
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
    const element = $(event.target);
    const checked = element.prop('checked');

    index = +index;

    if (checked) {
      this._selectedIndexes.push(index);
    } else {
      const indexOfIndex = this._selectedIndexes.indexOf(index);

      if (indexOfIndex > -1) {
        this._selectedIndexes.splice(indexOfIndex, 1);
      }
    }

    this.triggerChange();
  }

  reset() {
    this._isTouched = false;
  }

}
