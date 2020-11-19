import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { PreviousRouteService } from 'src/app/services/previous-route.service'
import { FormBuilder, FormControl } from '@angular/forms'
@Component({
  selector: 'app-task-adding',
  templateUrl: './task-adding.component.html',
  styleUrls: ['./task-adding.component.scss']
})
export class TaskAddingComponent implements OnInit {

  public readonly taskForm = this.formBuilder.group({
    name: '',
    description: '',
    image: new FormControl({ value: '', disabled: true })
  })

  public constructor(
private previousRouteService: PreviousRouteService,
private readonly formBuilder: FormBuilder
) { }

  public ngOnInit(): void {
  }
  public submit(): void {
    console.log('utwórz')
   // this.taskType.create(this.taskForm.value as TaskType
  }

}
