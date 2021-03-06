import { Component, OnInit } from '@angular/core'
import { ChoiceTest } from 'src/app/classes/example'
import { Task } from 'src/app/classes/task'
import { ChoiceTestTask } from 'src/app/classes/task-type'

@Component({
  selector: 'app-choice-test',
  templateUrl: './choice-test.component.html',
  styleUrls: ['./choice-test.component.scss']
})
export class ChoiceTestComponent implements OnInit {
  public ex1: ChoiceTest[] = [new ChoiceTest('Co oznacza słowo Winter?', 'Zima', ['Lato', 'Wiosna', 'Jesień'])]
  public task: Task<ChoiceTest> = new Task('1','Pory roku', this.ex1, ChoiceTestTask, true)

  public counter = 0
  public constructor() { }

  public ngOnInit(): void {
    this.ex1.forEach(example => example.addCorrectAnswerToDecoys())
  }

}
