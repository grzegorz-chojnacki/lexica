import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TaskEditorDispatchComponent } from './task-editor-dispatch.component'

describe('EditorViewComponent', () => {
  let component: TaskEditorDispatchComponent
  let fixture: ComponentFixture<TaskEditorDispatchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskEditorDispatchComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditorDispatchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
