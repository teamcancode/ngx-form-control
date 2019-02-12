# ngx-form-radio

How to use:
-------------
```html
<ngx-form-radio name="gender"
                label="Gender *"
                required="true"
                valueKey="value"
                [options]="listGender"
                [(ngModel)]="data.gender"></ngx-form-radio>
```

### Attributes
Name | Type | Default | Description
---- | ---- | ------- | -----------
name | string | ''
label | string | ''
placeholder | string | ''
title | string | ''
required | boolean | false
disabled | boolean | false
validMessage | string | '' | Message display when current field is touched & valid
requiredErrorMessage | string | 'This field is required.' | Message display when current field is required & empty 
textKey | string | 'text' | Attribute of all texts of options.
comparedKey | string | ''
valueKey | string | '' | Attribute of output value. If empty, the output will be 1 option.
options | Array<any> | [] | List all options
customErrorMessages | array/string | [] | Customer error message
cleanCustomErrorMessageOnChanged | boolean | false | Clean custom error message when data is changed
