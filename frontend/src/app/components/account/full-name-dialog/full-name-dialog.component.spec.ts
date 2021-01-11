import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullNameDialogComponent } from './full-name-dialog.component';

describe('FullNameDialogComponent', () => {
  let component: FullNameDialogComponent;
  let fixture: ComponentFixture<FullNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullNameDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
