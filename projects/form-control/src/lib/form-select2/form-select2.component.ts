import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BaseListControlComponent} from '../../utils/base-list-control.component';
import {Common} from '../../utils/common';

declare const $;

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

  private _selectElement;
  private _isTouched = false;
  private _placeholder: string;

  @ViewChild('customSelectElement') customSelectElement: ElementRef;

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

  private _tag: boolean;

  @Input() set tag(value: boolean) {
    this._tag = value;
    this.updateSelect2Options();
  }

  private _tokenSeparators: boolean;

  @Input() set tokenSeparators(value: boolean) {
    this._tag = value;
    this.updateSelect2Options();
  }

  get value(): any {
    if (!this._selectedIndexes || !this._selectedIndexes.length) {
      return null;
    }

    const result = this._selectedIndexes.reduce((currentResult, index) => {
      if (Number.isInteger(index) && this._selectOptions[index]) {
        currentResult.push(this._selectOptions[index].value);
      } else if (this._tag) {
        const match = index['value'].match(/^number: {([\d]+)}$/);

        if (match) {
          currentResult.push(match[1]);
        } else {
          currentResult.push(index['value']);
        }
      }

      return currentResult;
    }, []);

    return this._multiple ? result : result[0];
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
    if (this.hasRequiredError) {
      return [this.requiredErrorMessage];
    }

    if (this.hasCustomError) {
      return this.innerCustomErrorMessages;
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
    this._selectOptions = [...this._selectOptions];

    this.updateSelect2Options();
  }

  private selectValues(values) {
    this._selectedIndexes = [];
    const select2Data = [];

    if (values && values.length) {
      values.map((value) => {
        const index = this.findIndex(value);

        if (index > -1) {
          this._selectedIndexes.push(index);
          select2Data.push(index);
        } else if (this._tag) {
          this._selectedIndexes.push({value});
          select2Data.push(value);
        }
      });
    }

    if (Common.isClient()) {
      this._selectElement.val(select2Data);
      this._selectElement.trigger('change');
    }
  }

  private updateSelectedIndexes() {
    if (Common.isServer()) {
      return;
    }

    const oldSelectedIndexes = JSON.stringify(this._selectedIndexes);
    const value = this._selectElement.val();

    if ('number' === typeof value || ('string' === typeof value && Number.isInteger(+value))) {
      this._selectedIndexes = [+value];
    } else if ('string' === typeof value && this._tag) {
      this._selectedIndexes = [{value}];
    } else if (value && value.length) {
      this._selectedIndexes = value.map(item => {
        if (Number.isInteger(+item)) {
          return +item;
        }

        if (this._tag) {
          return {value: item};
        }

        return null;
      });
    } else {
      this._selectedIndexes = [];
    }

    const newSelectedIndexes = JSON.stringify(this._selectedIndexes);

    if (newSelectedIndexes !== oldSelectedIndexes) {
      this.triggerChange();
    }
  }

  private selectValue(value) {
    if (Common.isServer()) {
      return;
    }

    const index = this.findIndex(value);

    if (index > -1) {
      this._selectedIndexes = [index];
      this._selectElement.val(this._selectedIndexes);
      this._selectElement.trigger('change');
    } else if (this._tag) {
      this._selectedIndexes = [{value}];
      this._selectElement.val(value);
      this._selectElement.trigger('change');
    } else {
      this.cleanValue();
    }
  }

  private cleanValue() {
    if (Common.isServer()) {
      return;
    }

    this._selectedIndexes = [];
    this._selectElement.val(null);
    this._selectElement.trigger('change');
  }

  private updateSelect2Options() {
    if (Common.isServer() || !this.customSelectElement || !this.customSelectElement.nativeElement) {
      return;
    }

    this._selectElement = $(this.customSelectElement.nativeElement);
    if (this._selectElement.hasClass('select2-hidden-accessible')) {
      this._selectElement.select2().empty();
      this._selectElement.select2('destroy');
    }

    this._selectElement.select2({
      tags: this._tag,
      tokenSeparators: this._tokenSeparators || [],
      placeholder: this._placeholder,
      allowClear: !this._required,
      multiple: this._multiple,
      data: this._selectOptions,
      disabled: this._disabled,
      createTag: function (params) {
        const term = $.trim(params.term);

        if (term === '') {
          return null;
        }

        return {
          id: Number.isInteger(+term) ? `number: {${term}}` : term,
          text: term,
          newTag: true
        };
      }
    });

    this._selectElement.on('select2:select', () => {
      this.updateSelectedIndexes();
    });

    this._selectElement.on('select2:unselect', () => {
      this.updateSelectedIndexes();
    });

    this._selectElement.on('select2:close', () => {
      this._isTouched = true;
    });
  }

}
