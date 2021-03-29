import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MultiTestDialogComponent } from './multi-test-dialog.component'

describe('MultiTestDialogComponent', () => {
  let component: MultiTestDialogComponent
  let fixture: ComponentFixture<MultiTestDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiTestDialogComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiTestDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
