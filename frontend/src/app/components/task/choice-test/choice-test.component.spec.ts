import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceTestComponent } from './choice-test.component';

describe('ChoiceTestComponent', () => {
  let component: ChoiceTestComponent;
  let fixture: ComponentFixture<ChoiceTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
