# ngx-form-textarea

How to use:
-------------
```html
<ngx-form-textarea name="description"
                   label="Description"
                   placeholder="Type your description"
                   [(ngModel)]="data.description"></ngx-form-textarea>
```

### Attribute
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
rows | number | 5 
readonly | boolean | false
minlength | number | null
maxlength | number | null
trimResult | boolean | true | true: the string output will be trim.
minLengthErrorMessage | string | 'Value is too short.' | Message display when length of output is less than min length
