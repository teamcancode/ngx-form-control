# ngx-form-toggle

How to use:
-------------
```html
<!-- Checkbox style -->
<ngx-form-toggle name="allowAd"
                 label="I agree to receive ad email!"
                 required="true"
                 [(ngModel)]="data.allowAd"></ngx-form-toggle>
```

```html
<!-- Toggle style -->
<ngx-form-toggle name="allowAd"
                 label="I agree to receive ad email!"
                 required="true"
                 type="toggle"
                 [(ngModel)]="data.allowAd"></ngx-form-toggle>
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
textKey | string | 'text' | Attribute of all texts of options.
valueKey | string | '' | Attribute of output value. If empty, the output will be 1 option.
options | Array<any> | [] | List all options
type | string | 'checkbox' | Style of input: 'checkbox' or 'toggle'
