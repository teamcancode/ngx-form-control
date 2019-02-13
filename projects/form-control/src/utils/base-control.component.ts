import {ControlValueAccessor, ValidationErrors, Validator} from '@angular/forms';
import {Input} from '@angular/core';

export abstract class BaseControlComponent implements ControlValueAccessor, Validator {

  // noinspection JSUnusedGlobalSymbols
  public id = 'ngx-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  innerCustomErrorMessages: Array<string> = [];
  @Input() name = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() title = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() validMessage = '';
  @Input() requiredErrorMessage = 'This field is required.';
  @Input() cleanCustomErrorMessageOnChanged;
  protected _onTouchedCallback: () => void;
  protected _onChangeCallback: (_: any) => void;

  @Input() set customErrorMessages(messages: string | Array<string>) {
    if (!messages) {
      this.innerCustomErrorMessages = [];
    } else if ('string' === typeof messages) {
      this.innerCustomErrorMessages = [messages];
    } else if (messages[0]) {
      this.innerCustomErrorMessages = messages;
    } else {
      this.innerCustomErrorMessages = [];
    }
  }

  abstract get value();

  abstract get invalid(): boolean;

  abstract get valid(): boolean;

  abstract get errorMessages(): Array<string>;

  get hasCustomError(): boolean {
    return !!(this.innerCustomErrorMessages && this.innerCustomErrorMessages[0]);
  }

  get hasRequiredError(): boolean {
    return this.required && this.value !== false && this.value !== 0 && !this.value;
  }

  abstract writeValue(value: any): void;

  registerOnChange(fn: any): void {
    this._onChangeCallback = event => {
      if (this.cleanCustomErrorMessageOnChanged) {
        this.innerCustomErrorMessages = [];
      }

      return fn(event);
    };
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  triggerChange(): void {
    if (this._onChangeCallback) {
      this._onChangeCallback(this.value);
    }
  }

  abstract validate(): ValidationErrors;

  // noinspection JSUnusedGlobalSymbols
  abstract reset(): void;

}


