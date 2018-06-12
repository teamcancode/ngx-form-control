import { Component, ElementRef, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { BaseListControlComponent } from '../../utils/base-list-control.component';
import * as jQuery from 'jquery';

const $ = jQuery;

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
  private _selectedIndex = -1;
  private _isTouched = false;

  get isEmpty(): boolean {
    return this._selectedIndex < 0;
  }

  get value(): any {
    return this.isEmpty ? null : this.innerOptions[this._selectedIndex].value();
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
    $(this.listRadioElement.nativeElement).find('.custom-control-input').prop('checked', false);

    if (!value) {
      return;
    }

    this._selectedIndex = this.findIndex(value);

    if (!this.listRadioElement || !this.listRadioElement.nativeElement) {
      return;
    }

    if (this.value) {
      $(this.listRadioElement.nativeElement).find('.custom-control-input').eq(this._selectedIndex)
                                            .prop('checked', true);
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
    index = +index;

    if (this.required || index !== this._selectedIndex) {
      this._selectedIndex = +index;
    } else {
      this._selectedIndex = -1;
      element.prop('checked', false);
    }

    this.triggerChange();
  }

  reset() {
    this._isTouched = false;
  }

}
