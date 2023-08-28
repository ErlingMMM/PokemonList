import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingFormComponent } from './landing-form.component';

describe('LandingFormComponent', () => {
  let component: LandingFormComponent;
  let fixture: ComponentFixture<LandingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingFormComponent]
    });
    fixture = TestBed.createComponent(LandingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
