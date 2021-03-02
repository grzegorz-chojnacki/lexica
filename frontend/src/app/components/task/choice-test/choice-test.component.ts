import { Component, OnInit } from '@angular/core'
import { Example, ChoiceTest, Task } from 'src/app/classes/task'

@Component({
  selector: 'app-choice-test',
  templateUrl: './choice-test.component.html',
  styleUrls: ['./choice-test.component.scss']
})
export class ChoiceTestComponent implements OnInit {
  public task!: Task<ChoiceTest>
  public ex1: ChoiceTest[] = [new ChoiceTest('Co oznacza słowo Winter?', 'Zima', ['Lato', 'Jesień'])]
  public favoriteSeason!: string
  public constructor() { }

  public ngOnInit(): void {
  }

}
