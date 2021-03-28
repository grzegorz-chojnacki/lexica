import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MultiTestViewComponent } from './multi-test-view.component'

describe('MultiChoiceTestViewComponent', () => {
  let component: MultiTestViewComponent
  let fixture: ComponentFixture<MultiTestViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiTestViewComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiTestViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
