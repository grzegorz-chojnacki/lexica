import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceTestEditorComponent } from './choice-test-editor.component';

describe('ChoiceTestEditorComponent', () => {
  let component: ChoiceTestEditorComponent;
  let fixture: ComponentFixture<ChoiceTestEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceTestEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceTestEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
