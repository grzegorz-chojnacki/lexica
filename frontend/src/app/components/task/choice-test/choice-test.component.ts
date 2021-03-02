import { Component, OnInit } from '@angular/core'
import { Example, ChoiceTest, Task } from 'src/app/classes/task'

@Component({
  selector: 'app-choice-test',
  templateUrl: './choice-test.component.html',
  styleUrls: ['./choice-test.component.scss']
})
export class ChoiceTestComponent implements OnInit {
  public task!: Task<ChoiceTest>
  public ex1: ChoiceTest[] = [new ChoiceTest('Co oznacza słowo Winter?', 'Zima', ['Lato', 'Wiosna', 'Jesień'])]
  public constructor() { }

  public ngOnInit(): void {
    this.ex1.forEach(example => example.addCorrectAnswerToDecoys())
  }

}
