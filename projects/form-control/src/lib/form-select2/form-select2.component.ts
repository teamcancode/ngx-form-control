import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as jQuery from 'jquery';
import 'select2';
import { BaseListControlComponent } from '../../utils/base-list-control.component';

const $ = jQuery;

@Component({
  selector: 'ngx-form-select2',
  templateUrl: './form-select2.component.html',
  styleUrls: ['./form-select2.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FormSelect2Component, multi: true},
    {provide: NG_VALIDATORS, useExisting: FormSelect2Component, multi: true}
  ]
})
export class FormSelect2Component extends BaseListControlComponent implements OnInit {

  @ViewChild('customSelectElement') customSelectElement: ElementRef;
  private _isTouched = false;

  private _placeholder: string;

  @Input() set placeholder(value: string) {
    this._placeholder = value;
    this.updateSelect2Options();
  }

  private _required: boolean;

  @Input() set required(value: boolean) {
    this._required = value;
    this.updateSelect2Options();
  }

  private _disabled: boolean;

  @Input() set disabled(value: boolean) {
    this._disabled = value;
    this.updateSelect2Options();
  }

  @Input() set multiple(value: boolean) {
    this._multiple = value;
    this.updateSelect2Options();
  }

  get value(): any {
    if (this._multiple) {
      if (!this._selectedIndexes || !this._selectedIndexes.length) {
        return null;
      }

      return this._selectedIndexes.map(index => this._selectOptions[index].value);
    } else {
      return this._selectedIndexes.length ? this._selectOptions[this._selectedIndexes[0]].value : null;
    }
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

  ngOnInit() {
    this.updateSelect2Options();
  }

  writeValue(value: any | Array<any>): void {
    if (this._multiple && value && value.length) {
      this.selectValues(value);
    } else if (!this._multiple) {
      this.selectValue(value);
    } else {
      this.cleanValue();
    }
  }

  validate(): {} {
    const result = {};

    if (this.hasRequiredError) {
      result['required'] = true;
    }

    return result;
  }

  // noinspection JSUnusedGlobalSymbols
  reset() {
    this._isTouched = false;
  }

  protected afterInitOptions() {
    this.updateSelect2Options();
  }

  private selectValues(values) {
    this._selectedIndexes = [];

    values.map((value) => {
      const index = this.findIndex(value);

      if (index > -1) {
        this._selectedIndexes.push(index);
      }
    });

    $(this.customSelectElement.nativeElement).val(this._selectedIndexes);
    $(this.customSelectElement.nativeElement).trigger('change');
  }

  private updateSelectedIndexes() {
    const value = $(this.customSelectElement.nativeElement).val();

    if ('string' === typeof value || 'number' === typeof value) {
      this._selectedIndexes = [+value];
    } else {
      this._selectedIndexes = value ? value.map(item => +item) : [];
    }

    this.triggerChange();
  }

  private selectValue(value) {
    const index = this.findIndex(value);

    if (index > -1) {
      this._selectedIndexes = [index];
      $(this.customSelectElement.nativeElement).val(this._selectedIndexes);
      $(this.customSelectElement.nativeElement).trigger('change');
    } else {
      this.cleanValue();
    }
  }

  private cleanValue() {
    this._selectedIndexes = [];
    $(this.customSelectElement.nativeElement).val(null);
    $(this.customSelectElement.nativeElement).trigger('change');
  }

  private updateSelect2Options() {
    if (!this.customSelectElement || !this.customSelectElement.nativeElement) {
      return;
    }

    if ($(this.customSelectElement.nativeElement).hasClass('select2-hidden-accessible')) {
      $(this.customSelectElement.nativeElement).select2('destroy');
    }

    $(this.customSelectElement.nativeElement).select2({
      placeholder: this._placeholder,
      allowClear: !this._required,
      multiple: this._multiple,
      data: this._selectOptions,
      disabled: this._disabled
    });

    $(this.customSelectElement.nativeElement).on('select2:select', () => {
      this.updateSelectedIndexes();
    });

    $(this.customSelectElement.nativeElement).on('select2:unselect', () => {
      this.updateSelectedIndexes();
    });

    $(this.customSelectElement.nativeElement).on('select2:close', () => {
      this._isTouched = true;
    });
  }

}
