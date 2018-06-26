# ngx-form-select

How to use:
-------------
```html
<ngx-form-select name="gender"
                 label="Gender *"
                 placeholder="Select your gender"
                 required="true"
                 valueKey="value"
                 [options]="listGender"
                 [(ngModel)]="data.gender"></ngx-form-select>
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
valueKey | string | '' | Attribute of output value. If empty, the output will be 1 option.
comparedKey | string | ''
options | Array<any> | [] | List all options
multiple | boolean | false
