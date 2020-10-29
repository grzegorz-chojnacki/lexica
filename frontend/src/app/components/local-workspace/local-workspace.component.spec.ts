import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LocalWorkspaceComponent } from './local-workspace.component'

describe('LocalComponent', () => {
  let component: LocalWorkspaceComponent
  let fixture: ComponentFixture<LocalWorkspaceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalWorkspaceComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalWorkspaceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
