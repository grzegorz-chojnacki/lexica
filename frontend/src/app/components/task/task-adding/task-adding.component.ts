import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-task-adding',
  templateUrl: './task-adding.component.html',
  styleUrls: ['./task-adding.component.scss']
})
export class TaskAddingComponent implements OnInit {
  public readonly taskForm = this.formBuilder.group({
    name: '',
    description: '',
    type: 'simplecard',
    image: new FormControl({ value: '', disabled: true })
  })

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    ) { }

  public ngOnInit(): void { }

  public redirect(): any {
    const type = this.taskForm.value.type
    this.router.navigate([this.router.url, 'task', 'new'], { queryParams: { type }})
  }
}
