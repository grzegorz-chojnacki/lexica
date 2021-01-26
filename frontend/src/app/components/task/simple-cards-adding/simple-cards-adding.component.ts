import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { SimpleCardAddingComponent } from 'src/app/components/task/simple-card-adding/simple-card-adding.component'
import { SimpleCard } from 'src/app/classes/task'
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms'
import { TaskService } from 'src/app/services/task.service'
import { Router, ActivatedRoute } from '@angular/router'
import { SimpleCardTask } from 'src/app/classes/task-type'
import { Location } from '@angular/common'

// tslint:disable-next-line: no-any
const arrayNotEmpty = (c: AbstractControl): any => {
  console.log(c)
  return (c.value.length > 0) ? null : { arrayNotEmpty: { valid: false }}
}

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-cards-adding.component.html',
  styleUrls: ['./simple-cards-adding.component.scss']
})
export class SimpleCardsAddingComponent implements OnInit {
  public teamId!: string
  public taskId!: string
  public taskForm = this.formBuilder.group({
    name:        new FormControl('', [ Validators.required ]),
    description: new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
    examples:    new FormControl([], [ arrayNotEmpty ]),
    type:        SimpleCardTask
  })

  public constructor(
    private readonly dialog: MatDialog,
    private readonly taskService: TaskService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    public  readonly router: Router,
    public  readonly location: Location) { }

  // ToDo: check if team exists
  public ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId')
    const taskId = this.route.snapshot.paramMap.get('taskId')

    this.teamId = teamId as string

    this.taskService.getTask(teamId, taskId)
      .subscribe(task => {
        this.taskId = taskId as string
        this.taskForm.patchValue(task)
      })
  }

  public submit(): void {
    if (this.taskId) {
      this.taskService.updateTask(this.teamId, this.taskId, this.taskForm.value)
    } else {
      this.taskService.createTask(this.teamId, this.taskForm.value)
    }
  }

  public deleteCard(card: SimpleCard): void {
    this.taskForm.patchValue({
      examples: this.taskForm.value.examples.filter((c: SimpleCard) => c !== card)
    })
    this.taskForm.controls.examples.updateValueAndValidity()
  }

  public editCard(card: SimpleCard): void {
    this.dialog
      .open(SimpleCardAddingComponent, { data: card, hasBackdrop: false})
      .afterClosed()
      .subscribe(result => {
        if (result) {
          card.nativeWord  = result.nativeWord
          card.foreignWord = result.foreignWord
        }
      })
  }

  public addCard(): void {
    this.dialog
      .open(SimpleCardAddingComponent,
        { data: new SimpleCard('', ''), hasBackdrop: false })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.taskForm.value.examples.push(result)
          this.taskForm.controls.examples.updateValueAndValidity()
        }
      })
  }
}
