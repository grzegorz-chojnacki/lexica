import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { choiceTestTask } from 'src/app/test-data'
import { ChoiceTestDialogComponent } from './choice-test-dialog.component'

describe('ChoiceTestDialogComponent', () => {
  let component: ChoiceTestDialogComponent
  let fixture: ComponentFixture<ChoiceTestDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatRadioModule,
        MatDialogModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [ChoiceTestDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: choiceTestTask.examples[0] }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceTestDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize options', () => {
    const { answer, decoys } = choiceTestTask.examples[0]
    expect(component.options).toContain(answer)
    decoys.forEach(d => expect(component.options).toContain(d))
  })

  it('should let add option', () => {
    const option = 'test'
    component.addOption(option)
    expect(component.options).toContain(option)
  })

  it('should mark first option as the answer', () => {
    component.options.forEach(o => component.deleteOption(o))
    expect(component.options.length).toBe(0)

    const option = 'first'
    component.addOption(option)

    expect(component.answer).toBe(option)
  })

  it('should not change answer when adding new option', () => {
    const initialAnswer = component.answer
    const option = 'next'

    component.addOption(option)

    expect(component.answer).toBe(initialAnswer)
  })

  it('should let remove option', () => {
    const option = component.options[0]
    component.deleteOption(option)
    expect(component.options).not.toContain(option)
  })

  it('should clear answer when it is deleted from options', () => {
    const answer = component.answer
    component.deleteOption(answer)
    expect(component.answer).toBeFalsy()
  })

  it('should be valid when initialized with test data', () => {
    expect(component.isValid()).toBeTrue()
  })

  it('should not be valid when there is no answer', () => {
    const answer = component.answer
    component.deleteOption(answer)
    expect(component.isValid()).toBeFalse()
  })

  it('should not be valid when there are no options', () => {
    component.options.forEach(o => component.deleteOption(o))
    expect(component.isValid()).toBeFalse()
  })

  it('should not let user add two equal options', () => {
    component.next = component.answer
    expect(component.isValidNext()).toBeFalse()

    component.next = component.options[0]
    expect(component.isValidNext()).toBeFalse()
  })

  it('should display different error messages', () => {
    component.options.forEach(o => component.deleteOption(o))
    // No options
    const errorNoOpts = component.displayHint()
    expect(errorNoOpts.length).toBeGreaterThan(0)

    // One option, it is answer
    component.addOption('A')
    const errorOneAns = component.displayHint()
    expect(errorOneAns.length).toBeGreaterThan(0)

    // At least two options with one aswenr = oK
    component.addOption('B')
    const ok = component.displayHint()
    expect(ok.length).toBe(0)

    // Additional option, to have at least 2 options left
    component.addOption('C')

    // No answer
    component.deleteOption('A')
    const errorNoAns = component.displayHint()
    expect(errorNoAns.length).toBeGreaterThan(0)

    expect(errorNoOpts).not.toBe(errorNoAns)
  })
})
