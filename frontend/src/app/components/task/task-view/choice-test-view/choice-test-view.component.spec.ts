import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceTestViewComponent } from './choice-test-view.component';

describe('ChoiceTestViewComponent', () => {
  let component: ChoiceTestViewComponent;
  let fixture: ComponentFixture<ChoiceTestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceTestViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceTestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
