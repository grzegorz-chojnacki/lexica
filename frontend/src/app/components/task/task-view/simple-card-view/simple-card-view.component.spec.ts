import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SimpleCardViewComponent } from './simple-card-view.component'

describe('SimpleCardViewComponent', () => {
  let component: SimpleCardViewComponent
  let fixture: ComponentFixture<SimpleCardViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleCardViewComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCardViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
