import { BaseControlComponent } from './base-control.component';
import { Input } from '@angular/core';

export abstract class BaseListControlComponent extends BaseControlComponent {

  innerOptions: Array<{ text, value, json }> = [];

  @Input() textKey = 'text';
  @Input() valueKey = '';

  @Input() set options(options: Array<any>) {
    const currentValue = this.value;
    this.innerOptions = [];

    options.map((option) => {
      const textFunc = () => 'string' === typeof option ? option : option[this.textKey || 'text'];
      const valueFunc = () => 'string' === typeof option ? option : this.valueKey ? option[this.valueKey] : option;

      this.innerOptions.push({
        text: textFunc,
        value: valueFunc,
        json: () => JSON.stringify(valueFunc()),
      });
    });

    if (currentValue) {
      this.writeValue(currentValue);
    }
  }

  protected findIndex(value): number {
    const json = JSON.stringify(value);

    return this.innerOptions.findIndex((option: { text, value, json }) => {
      return json === option.json();
    });
  }

  protected findIndexes(arrValue: Array<any>): Array<number> {
    if (!arrValue || !arrValue.length) {
      return [];
    }

    const result: Array<number> = arrValue.reduce((arr, value) => {
      const index = this.findIndex(value);
      if (index > -1) {
        arr.push(index);
      }

      return arr;
    }, []);

    return result && result.length ? result : [];
  }

}
