import { BaseControlComponent } from './base-control.component';
import { Input } from '@angular/core';

export abstract class BaseListControlComponent extends BaseControlComponent {

  protected _multiple;
  protected _textKey;

  @Input() set textKey(value: string) {
    this._textKey = value;
    this.initOptions();
  }

  protected _valueKey;

  @Input() set valueKey(value: string) {
    this._valueKey = value;
    this.initOptions();
  }

  protected _comparedKey;

  @Input() set comparedKey(value: string) {
    this._comparedKey = value;
    this.initOptions();
  }

  protected _options: Array<any> = [];

  @Input() set options(options: Array<any>) {
    this._options = options;
    this.initOptions();
  }

  protected _selectOptions: Array<{ id, text, value, comparedValue }> = [];

  // noinspection JSUnusedGlobalSymbols
  public get selectOptions() {
    return this._selectOptions;
  }

  protected _selectedIndexes = [];

  public get selectedIndexes(): Array<number> {
    return this._selectedIndexes;
  }

  public set selectedIndexes(indexes: Array<number>) {
    this._selectedIndexes = indexes && indexes.length ? indexes.reduce((arr, value) => {
      value = +value;

      if (value > -1) {
        arr.push(value);
      }

      return arr;
    }, []) : [];

    this.triggerChange();
  }

  protected findIndex(value): number {
    const comparedValue = this.getComparedValue(value);

    return this._selectOptions.findIndex((option: { id, text, value, comparedValue }) => {
      return comparedValue === option.comparedValue;
    });
  }

  protected findIndexes(arrValue: Array<any>): Array<number> {
    if (!arrValue || !arrValue.length) {
      return [];
    }

    return arrValue.reduce((arr, value) => {
      const index = this.findIndex(value);

      if (index > -1) {
        arr.push(index);
      }

      return arr;
    }, []);
  }

  protected initOptions() {
    this.beforeInitOptions();

    this._options.map((option, index) => {
      let text, value;

      if ('string' === typeof option) {
        text = option;
        value = option;
      } else {
        text = option[this._textKey || 'text'];
        value = this._valueKey ? option[this._valueKey] : option;
      }

      this._selectOptions.push({
        id: index,
        text: text,
        value: value,
        comparedValue: this.getComparedValue(option),
      });
    });

    this.afterInitOptions();
  }

  protected beforeInitOptions() {
  }

  protected afterInitOptions() {
  }

  protected getComparedValue(option) {
    if (!option) {
      return '';
    }

    if ('string' === typeof option) {
      return option;
    }

    let value;

    if (this._comparedKey) {
      value = option[this._comparedKey];
    } else {
      value = this._valueKey ? option[this._valueKey] : option;
    }

    if ('string' === typeof value) {
      return value;
    }

    return JSON.stringify(value);
  }

}
