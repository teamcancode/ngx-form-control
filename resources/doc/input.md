# ngx-form-input

How to use:
-------------
```html
<!-- Email field -->
<ngx-form-input name="email"
                label="Email *"
                placeholder="Type your email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required="true"
                [(ngModel)]="data.email"></ngx-form-input>
```

```html
<!-- Password field -->
<ngx-form-input name="password"
                label="Password *"
                type="password"
                placeholder="Type your password"
                required="true"
                minlength="3"
                [(ngModel)]="data.password"></ngx-form-input>

<ngx-form-input name="password"
                label="Repeat password *"
                type="password"
                placeholder="Type your password again"
                [match]="data.password"
                required="true"
                [(ngModel)]="data.repeatPassword"></ngx-form-input>
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
type | string | 'text' | Input type (text, password, ...)
pattern | string | '' | Input pattern (Example email pattern: [a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$)
readonly | boolean | false
minlength | number | null
maxlength | number | null
trimResult | boolean | true | true: the string output will be trim.
minLengthErrorMessage | string | 'Value is too short.' | Message display when length of output is less than min length
patternErrorMessage | string | 'Value is not valid.' | Message display when output is not match with pattern
match | string | null | The output must be same with this string. Example "repeat password" field will have attribute [match]="password"
matchErrorMessage | string | 'Value is not match.' | Message display when output is different with match attribute
