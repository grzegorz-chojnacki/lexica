import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MultiTestEditorComponent } from './multi-test-editor.component'

describe('MultiTestEditorComponent', () => {
  let component: MultiTestEditorComponent
  let fixture: ComponentFixture<MultiTestEditorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiTestEditorComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiTestEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
