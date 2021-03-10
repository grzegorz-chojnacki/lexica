import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Task } from 'src/app/classes/task'
import { ChoiceTest } from 'src/app/classes/example'

@Component({
  selector: 'app-choice-test-view',
  templateUrl: './choice-test-view.component.html',
  styleUrls: ['./choice-test-view.component.scss']
})
export class ChoiceTestViewComponent implements OnInit {
  @Input() public task!: Task<ChoiceTest>
  @Output() public onSubmit = new EventEmitter()

  public counter = 0
  public constructor() { }

  public ngOnInit(): void {
    // correct answer added
    this.task.examples.filter(example => example.decoys.push(example.answer))
    // random order of answers
    this.task.examples.filter(ex => ex.decoys.sort((a, b) => 0.5 - Math.random()))
  }


}
