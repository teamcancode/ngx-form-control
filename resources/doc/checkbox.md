# ngx-form-checkbox

How to use:
-------------
```html
<ngx-form-checkbox name="skill"
                   label="Skills *"
                   required="true"
                   multiple="true"
                   [options]="listSkill"
                   [(ngModel)]="data.skill"></ngx-form-checkbox>
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
