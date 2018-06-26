import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormToggleComponent } from './form-toggle.component';

describe('FormToggleComponent', () => {
  let component: FormToggleComponent;
  let fixture: ComponentFixture<FormToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormToggleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
