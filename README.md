# Ngx Form Control

This module is used for [Angular 6](https://angular.io/).  
This module help you to quickly generate bootstrap controls.   

How to use:
-------------
### Installation:
```html
npm i ngx-form-controls
```

## Import library
Edit `.angular.json`
```json
{
  "projects": {
    "<your-app>": {
      ...
      "architect": {
        "build": {
          ...
          "options": {
            ...
            "styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "node_modules/select2/dist/css/select2.min.css",
              ...
            ],
            ...
          },
          ...
        }
      }
    },
    ...
  }
}
```

### Import module:
Edit in `src/app/app.module.ts`:
```typescript
//...
import { FormsModule } from '@angular/forms';
import { FormControlModule } from 'ngx-form-control';

@NgModule({
  //...
  imports: [
    //...
    FormsModule,
    FormControlModule
  ],
  //...
})
//...
```

And call in component:
### Input
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

### Textarea
```html
<ngx-form-textarea name="description"
                   label="Description"
                   placeholder="Type your description"
                   [(ngModel)]="data.description"></ngx-form-textarea>
```

### Select
```html
<ngx-form-select name="gender"
                 label="Gender *"
                 placeholder="Select your gender"
                 required="true"
                 valueKey="value"
                 [options]="listGender"
                 [(ngModel)]="data.gender"></ngx-form-select>
```

### Select2
```html
<ngx-form-select2 name="gender"
                  label="Gender *"
                  placeholder="Select your gender"
                  required="true"
                  valueKey="value"
                  [options]="listGender"
                  [(ngModel)]="data.gender"></ngx-form-select2>
```

### List Radio
```html
<ngx-form-radio name="gender"
                label="Gender *"
                required="true"
                valueKey="value"
                [options]="listGender"
                [(ngModel)]="data.gender"></ngx-form-radio>
```

### List Checkbox
```html
<ngx-form-checkbox name="skill"
                   label="Skills *"
                   required="true"
                   multiple="true"
                   [options]="listSkill"
                   [(ngModel)]="data.skill"></ngx-form-checkbox>
```

### Toggle
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
