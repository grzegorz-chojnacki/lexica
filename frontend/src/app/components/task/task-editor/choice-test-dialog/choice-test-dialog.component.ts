import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ChoiceTest } from 'src/app/classes/example'

@Component({
  selector: 'app-choice-test-card-dialog',
  templateUrl: './choice-test-dialog.component.html',
  styleUrls: ['./choice-test-dialog.component.scss']
})
export class ChoiceTestDialogComponent implements OnInit {
  public question = this.card.question
  public answer = this.card.answer
  public options = this.initializeOptions()
  public next = ''

  public constructor(@Inject(MAT_DIALOG_DATA) private readonly card: ChoiceTest) { }

  public ngOnInit(): void { }

  private initializeOptions(): string[] {
    return (this.card.answer) ? [this.card.answer, ...this.card.decoys] : []
  }

  public addOption(option: string): void {
    if (this.options.length === 0) { this.answer = option }
    this.options = [option, ...this.options]
    this.next = ''
  }

  public deleteOption(option: string): void {
    if (option === this.answer) { this.answer = '' }
    this.options = this.options.filter(o => o != option)
  }

  public isValid(): boolean {
    return !!this.question && !!this.answer && this.options.length > 1
  }

  public isValidNext(): boolean {
    return !!this.next && !this.options.includes(this.next)
  }

  public displayHint(): string {
    if (this.options.length < 2) {
      return 'Wymagane są przynajmniej dwie odpowiedzi'
    } else if (this.answer === '') {
      return 'Jedna odpowiedź musi być zaznaczona'
    } else {
      return ''
    }
  }

  public submit(): ChoiceTest {
    return {
      answer: this.answer,
      question: this.question,
      decoys: this.options.filter(o => o != this.answer)
    }
  }
}
