import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MultiTest } from 'src/app/classes/example'

type Checkbox = { text: string, checked: boolean }

const pack = (s: string, b: boolean): Checkbox => ({ text: s, checked: b })

@Component({
  selector: 'app-multi-test-dialog',
  templateUrl: './multi-test-dialog.component.html',
  styleUrls: ['./multi-test-dialog.component.scss']
})
export class MultiTestDialogComponent implements OnInit {
  public question = this.example.question
  public options = this.initializeOptions()
  public next = ''

  public constructor(@Inject(MAT_DIALOG_DATA) private readonly example: MultiTest) { }

  public ngOnInit(): void { }

  private initializeOptions(): Checkbox[] {
    return [
      ...this.example.answers.map(a => pack(a, true)),
      ...this.example.decoys.map(a => pack(a, false))
    ]
  }

  public addOption(option: string): void {
    const isFirstCheckbox = this.options.length === 0
    this.options = [pack(option, isFirstCheckbox), ...this.options]
    this.next = ''
  }

  public deleteOption(option: Checkbox): void {
    this.options = this.options.filter(o => o !== option)
  }

  public toggle(option: Checkbox): void {
    option.checked = !option.checked
  }

  public isValid(): boolean {
    const answers = this.options.filter(o => o.checked)
    return !!this.question && answers.length > 0 && this.options.length > 1
  }

  public isValidNext(): boolean {
    return !!this.next && !this.options.find(o => o.text === this.next)
  }

  public displayHint(): string {
    if (this.options.length < 2) {
      return 'Wymagane są przynajmniej dwie odpowiedzi'
    } else if (this.options.filter(o => o.checked).length === 0) {
      return 'Przynajmniej jedna odpowiedź musi być zaznaczona'
    } else {
      return ''
    }
  }

  public submit(): MultiTest {
    return {
      question: this.question,
      answers: this.options.filter(o => o.checked).map(o => o.text),
      decoys: this.options.filter(o => !o.checked).map(o => o.text)
    }
  }
}
